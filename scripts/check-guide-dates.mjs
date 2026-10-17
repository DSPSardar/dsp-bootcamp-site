// scripts/check-guide-dates.mjs — a content-change date must have ONE value.
//
// Why this gate exists. A guide's change date lives in two hand-kept places:
// the page's own `const UPDATED` (which feeds the Article `dateModified` and
// the visible "Last updated" byline) and the `guides` registry entry in
// src/config/site.ts (which feeds the sitemap `lastModified` and /llms.txt).
// Nothing connected them, so they drifted: on 2026-10-13 two guides were
// publishing one date in their schema and a different one in the sitemap,
// which is the kind of contradiction a crawler is entitled to distrust.
//
// The gate is deliberately dumb: for every registry entry that has a page
// with a `const UPDATED`, the two strings must be identical. It does not try
// to decide which one is right — only that there is one answer.
//
// Blog entries are excluded: their dates come from src/content/post-refits.ts
// and posts.json, not from a page module.
import { readFileSync } from 'node:fs'
import { existsSync } from 'node:fs'

const siteSrc = readFileSync('src/config/site.ts', 'utf8')

// Each registry line looks like:
//   { path: '/x', title: '…', updated: 'YYYY-MM-DD', live: true, footer: true },
const entries = [...siteSrc.matchAll(/\{\s*path:\s*'([^']+)',[^}]*?updated:\s*'([0-9-]+)'/g)].map(
  (m) => ({ path: m[1], updated: m[2] }),
)

if (entries.length < 10) {
  console.error(`check-guide-dates: parsed only ${entries.length} registry entries — the registry shape changed`)
  process.exit(1)
}

const problems = []
let checked = 0

for (const { path, updated } of entries) {
  if (path.startsWith('/blog/')) continue
  const file = `src/app${path}/page.tsx`
  if (!existsSync(file)) continue
  const src = readFileSync(file, 'utf8')
  const m = src.match(/^const UPDATED = '([0-9-]+)'/m)
  if (!m) {
    // The gate used to `continue` here, which silently skipped any page that
    // passed its date straight into <Guide updated="…"> as a literal — and
    // one page did, publishing a byline two days older than its own sitemap
    // entry for a week. A page with an inline literal is now a failure, not a
    // skip: the date must be a named constant so there is one place to change.
    const inline = src.match(/updated="([0-9-]+)"/)
    if (inline) {
      problems.push(
        `${path}: passes updated="${inline[1]}" as an inline literal — declare \`const UPDATED\` instead so this gate can see it`,
      )
    }
    continue
  }
  checked += 1
  if (m[1] !== updated) {
    problems.push(`${path}: page says ${m[1]}, registry says ${updated}`)
  }
}

if (checked === 0) {
  console.error('check-guide-dates: no page exported a `const UPDATED` — the convention changed')
  process.exit(1)
}

if (problems.length) {
  console.error(`check-guide-dates: ${problems.length} guide(s) publish two different change dates:`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('Set the page constant and the registry entry to the day the content actually changed.')
  process.exit(1)
}

console.log(`check-guide-dates: ${checked} guides, page date == registry date`)
