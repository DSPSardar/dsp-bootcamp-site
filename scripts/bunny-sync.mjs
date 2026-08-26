#!/usr/bin/env node
/** Check every uploaded lesson on Bunny; flip status processing → ready (or failed) in course.json (repo + Desktop copy).
 *  Run any time: node scripts/bunny-sync.mjs   (safe, read-only against Bunny) */
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'
const root = path.resolve(new URL('..', import.meta.url).pathname)
for (const line of fs.readFileSync(path.join(root, '.env.local'), 'utf8').split('\n')) { const m = line.match(/^([A-Z_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim() }
const API = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}`, H = { AccessKey: process.env.BUNNY_STREAM_API_KEY, accept: 'application/json' }
const files = [path.join(root, 'src/content/mastery/course.json'), path.join(os.homedir(), 'Desktop/DSP-Mastery/course.json')].filter(fs.existsSync)
const course = JSON.parse(fs.readFileSync(files[0], 'utf8'))
const all = [...course.welcome, ...course.vault, ...course.modules.flatMap((m) => m.lessons)]
let changed = 0
for (const l of all) {
  if (!l.bunny?.guid) continue
  const v = await fetch(`${API}/videos/${l.bunny.guid}`, { headers: H }).then((r) => r.json()).catch(() => null)
  if (!v) continue
  const next = v.status === 5 ? 'failed' : v.status >= 3 && v.status !== 5 && v.availableResolutions ? 'ready' : 'processing'
  const line = `${l.file.padEnd(62)} ${next.padEnd(10)} ${v.encodeProgress ?? 0}%  ${v.availableResolutions ?? ''}`
  console.log(line)
  if (l.bunny.status !== next) { l.bunny.status = next; l.bunny.length_sec = v.length; changed++ }
}
if (changed) files.forEach((f) => fs.writeFileSync(f, JSON.stringify(course, null, 2) + '\n'))
console.log(changed ? `updated ${changed} lesson(s)` : 'no changes')
