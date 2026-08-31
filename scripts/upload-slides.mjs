// Uploads the per-module slide ZIPs to the private Supabase bucket "mastery-slides".
// Run from the repo root:  node scripts/upload-slides.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local'); process.exit(1) }

const ZIPS = join(process.env.HOME, 'Desktop/DSP-Mastery/_SLIDES/_ZIP')
if (!existsSync(ZIPS)) { console.error('No _SLIDES/_ZIP folder at ' + ZIPS); process.exit(1) }

const sb = createClient(url, key, { auth: { persistSession: false } })
const BUCKET = 'mastery-slides'

const { data: buckets } = await sb.storage.listBuckets()
if (!buckets?.some((b) => b.name === BUCKET)) {
  // Non-fatal: the bucket may already exist but not be visible to listBuckets.
  // If it genuinely doesn't exist, the uploads below fail with a clear message.
  const { error } = await sb.storage.createBucket(BUCKET, { public: false })
  if (error) console.warn(`createBucket skipped (${error.message}) — assuming ${BUCKET} already exists`)
  else console.log(`created private bucket ${BUCKET}`)
}

let ok = 0, fail = 0
for (const f of readdirSync(ZIPS).filter((f) => f.endsWith('.zip')).sort()) {
  const body = readFileSync(join(ZIPS, f))
  const { error } = await sb.storage.from(BUCKET).upload(f, body, { contentType: 'application/zip', upsert: true })
  if (error) { console.error(`FAIL ${f}: ${error.message}`); fail++ }
  else { console.log(`ok   ${f}  ${(body.length / 1e6).toFixed(1)} MB`); ok++ }
}
console.log(`\n${ok} uploaded, ${fail} failed.`)
