#!/usr/bin/env node
// scripts/indexnow-ping.mjs — tell IndexNow (Bing, Yandex, Naver, Seznam —
// and therefore the index ChatGPT Search reads) which URLs changed.
//
//   node scripts/indexnow-ping.mjs                  # URLs from the live sitemap modified in the last 7 days
//   node scripts/indexnow-ping.mjs --all            # every URL in the live sitemap
//   node scripts/indexnow-ping.mjs /about /mastery  # explicit paths or absolute URLs
//
// Runs after every production deploy (.github/workflows/deploy.yml). The key
// is public by design (engines verify it by fetching /{key}.txt); it lives in
// src/config/site.ts `indexNow` and public/{key}.txt. Never fails the deploy:
// a network error prints and exits 0.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const siteTs = readFileSync(join(root, 'src/config/site.ts'), 'utf8')
const KEY = siteTs.match(/key:\s*'([0-9a-f]{32})'/)?.[1]
const ENDPOINT = siteTs.match(/endpoint:\s*'([^']+)'/)?.[1] ?? 'https://api.indexnow.org/indexnow'
const SITE = 'https://www.digitalservicesprogram.com'
const HOST = new URL(SITE).host

if (!KEY) {
  console.error('indexnow: no key found in src/config/site.ts')
  process.exit(0)
}

const args = process.argv.slice(2)
const all = args.includes('--all')
const explicit = args.filter((a) => !a.startsWith('--')).map((a) => (a.startsWith('http') ? a : `${SITE}${a}`))

async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`, { headers: { 'user-agent': 'dsp-indexnow-ping' } })
  const xml = await res.text()
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map(([, loc, lastmod]) => ({ loc, lastmod }))
  if (all) return entries.map((e) => e.loc)
  const cutoff = Date.now() - 7 * 24 * 3600 * 1000
  const recent = entries.filter((e) => e.lastmod && new Date(e.lastmod).getTime() >= cutoff).map((e) => e.loc)
  return recent.length ? recent : [SITE]
}

try {
  const urlList = explicit.length ? explicit : await urlsFromSitemap()
  const body = { host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  // 200 OK · 202 Accepted (key validation pending) are both success.
  console.log(`indexnow: ${res.status} ${res.statusText} — ${urlList.length} URL(s)`)
  for (const u of urlList) console.log(`  ${u}`)
  if (res.status >= 400) console.log(await res.text())
} catch (err) {
  console.log(`indexnow: skipped (${err?.message ?? err})`)
}
