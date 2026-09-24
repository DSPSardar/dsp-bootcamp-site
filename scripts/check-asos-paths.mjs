import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// /sardar Live Mode proxies four read-only GETs to ASOS (DSP Agent Hub).
// ASOS mounts everything under /api/v1 and its read-only API key is
// allow-listed to exactly these routes (ASOS README "Read-only API key",
// backend/src/middleware/readApiKey.js, merged in DSPSardar/asos#39).
// A path without the prefix is a 404 upstream, which the proxy reports as
// a 502 — that is the bug this check exists to keep out.
const routeFile = 'src/app/api/sardar/asos/route.ts'
const base = 'https://asos.example.com'
const expectedUpstream = {
  pipeline: `${base}/api/v1/leads/pipeline`,
  hot: `${base}/api/v1/leads/hot`,
  insights: `${base}/api/v1/insights/sentiment`,
  reports: `${base}/api/v1/analytics/overview`,
}

const source = readFileSync(join(root, routeFile), 'utf8')
let failed = false

// Pull the ASOS_PATHS map out of the route the same way TypeScript reads it.
const block = source.match(/const ASOS_PATHS = \{([\s\S]*?)\} as const/)
if (!block) {
  console.error(`${routeFile}: could not find "const ASOS_PATHS = { ... } as const"`)
  process.exit(1)
}
const paths = {}
for (const m of block[1].matchAll(/^\s*(\w+):\s*'([^']*)'/gm)) paths[m[1]] = m[2]

// The proxy joins base and path with a single slash; keep the check honest
// by asserting that template is still how the upstream URL is built.
if (!source.includes('const upstream = `${base}/${ASOS_PATHS[path as AsosPath]}`')) {
  console.error(`${routeFile}: upstream URL is no longer built as \`\${base}/\${ASOS_PATHS[path]}\` — update this check to match`)
  failed = true
}

for (const [key, want] of Object.entries(expectedUpstream)) {
  const got = key in paths ? `${base}/${paths[key]}` : undefined
  if (got !== want) {
    console.error(`${routeFile}: path=${key} → ${got ?? '(missing)'}; ASOS allow-lists ${want}`)
    failed = true
  }
}
for (const key of Object.keys(paths)) {
  if (!(key in expectedUpstream)) {
    console.error(`${routeFile}: path=${key} is not one of the four ASOS read-only routes — remove it or extend the ASOS allow-list first`)
    failed = true
  }
}

if (failed) {
  console.error('Live Mode must only call the /api/v1 routes the ASOS read-only key allows.')
  process.exit(1)
}
console.log(`ok — ${Object.keys(expectedUpstream).length} upstream URLs match the ASOS read-only allow-list`)
