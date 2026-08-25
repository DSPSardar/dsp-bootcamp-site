#!/usr/bin/env node
/**
 * Upload course masters to Bunny Stream and record the video GUID in course.json.
 *
 *   node scripts/bunny-upload.mjs <file-or-folder> [--wait]
 *
 * Matches each file to a lesson by its "M07-L01_" style prefix (or 00-W01_ / V_ for welcome & vault).
 * Reads BUNNY_STREAM_* from .env.local. Updates src/content/mastery/course.json and, if present,
 * ~/Desktop/DSP-Mastery/course.json so both copies stay in sync.
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawnSync } from 'node:child_process'

const root = path.resolve(new URL('..', import.meta.url).pathname)
for (const line of fs.readFileSync(path.join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
}
const LIB = process.env.BUNNY_STREAM_LIBRARY_ID, KEY = process.env.BUNNY_STREAM_API_KEY
if (!LIB || !KEY) { console.error('Missing BUNNY_STREAM_LIBRARY_ID / BUNNY_STREAM_API_KEY in .env.local'); process.exit(1) }
const API = `https://video.bunnycdn.com/library/${LIB}`
const H = { AccessKey: KEY, accept: 'application/json' }

const target = process.argv[2]
const wait = process.argv.includes('--wait')
if (!target) { console.error('usage: node scripts/bunny-upload.mjs <file-or-folder> [--wait]'); process.exit(1) }

const courseFiles = [path.join(root, 'src/content/mastery/course.json'), path.join(os.homedir(), 'Desktop/DSP-Mastery/course.json')].filter(fs.existsSync)
const course = JSON.parse(fs.readFileSync(courseFiles[0], 'utf8'))
const allLessons = [...course.welcome, ...course.vault, ...course.modules.flatMap((m) => m.lessons)]

const prefixOf = (name) => (name.match(/^(M\d\d-[LS]\d\d|00-W\d\d|V_[A-Za-z0-9-]+)/) || [])[1]
const files = fs.statSync(target).isDirectory()
  ? fs.readdirSync(target).filter((f) => /\.(mp4|mov|m4v)$/i.test(f)).map((f) => path.join(target, f))
  : [target]

const save = () => courseFiles.forEach((f) => fs.writeFileSync(f, JSON.stringify(course, null, 2) + '\n'))

for (const file of files) {
  const base = path.basename(file)
  const prefix = prefixOf(base)
  const lesson = prefix && allLessons.find((l) => l.file.startsWith(prefix))
  if (!lesson) { console.log(`skip  ${base} — no lesson with prefix ${prefix ?? '?'} in course.json`); continue }
  if (lesson.bunny?.guid) { console.log(`have  ${base} — already uploaded as ${lesson.bunny.guid}`); continue }

  const title = base.replace(/\.(mp4|mov|m4v)$/i, '').replace(/_[A-Za-z0-9_-]{11}(_v\d+)?(_[A-Z-]+)?$/, '').replace(/_/g, ' — ').replace(/-/g, ' ')
  process.stdout.write(`create ${base} → "${title}" … `)
  const created = await fetch(`${API}/videos`, { method: 'POST', headers: { ...H, 'content-type': 'application/json' }, body: JSON.stringify({ title }) }).then((r) => r.json())
  if (!created.guid) { console.log('FAILED', created); continue }
  console.log(created.guid)

  process.stdout.write(`upload ${(fs.statSync(file).size / 1048576).toFixed(0)} MB … `)
  const up = spawnSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '-X', 'PUT', '-H', `AccessKey: ${KEY}`, '--upload-file', file, `${API}/videos/${created.guid}`], { encoding: 'utf8' })
  if (up.stdout.trim() !== '200') { console.log('FAILED HTTP', up.stdout, up.stderr); continue }
  console.log('done')

  lesson.bunny = { guid: created.guid, status: 'processing', uploaded_at: new Date().toISOString() }
  lesson.master = base
  save()

  if (wait) {
    process.stdout.write('encoding ')
    for (;;) {
      await new Promise((r) => setTimeout(r, 15000))
      const v = await fetch(`${API}/videos/${created.guid}`, { headers: H }).then((r) => r.json())
      // status: 0 queued 1 processing 2 encoding 3 finished 4 resolution finished 5 failed 6 presigned upload started 7 presigned upload finished 8 presigned upload failed 9 captions generated 10 title/description generated
      if (v.status >= 3 && v.status !== 5) { lesson.bunny.status = 'ready'; lesson.bunny.length_sec = v.length; lesson.bunny.thumbnail = v.thumbnailFileName; save(); console.log(`ready (${Math.round(v.length / 60)} min, ${v.availableResolutions})`); break }
      if (v.status === 5) { lesson.bunny.status = 'failed'; save(); console.log('FAILED'); break }
      process.stdout.write(`${v.encodeProgress ?? 0}% `)
    }
  }
}
console.log('course.json updated:', courseFiles.join(', '))
