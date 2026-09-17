import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// Guards the one invariant the blog consolidation (2026-09-21) created: a
// /blog/ slug is either a live post or a 301 source, never both, and nothing
// in this repo may link to a 301 source.
//
// An internal link to a redirect is a crawl-budget leak — Google spends a
// fetch on the redirect before it ever reaches the page, which is exactly the
// waste the consolidation existed to remove. It is also invisible: the page
// still works for a human, so nothing breaks and nobody notices.
//
// The case that prompted this: /mastery's FREE_LESSONS list named the
// agent-loop post as its Module 7 preview. That slug became a 301, and the
// list's `.filter(l => l.post)` dropped the card silently — the section went
// from six free lessons to five with nothing failing anywhere. This script
// catches that class of mistake in source, before a build.

const posts = JSON.parse(readFileSync(join(root, 'src/content/posts.json'), 'utf8'))
const liveSlugs = new Set(posts.filter((p) => p.published).map((p) => p.slug))

// The redirect table is read out of next.config.ts rather than duplicated
// here, so the config stays the single source of truth. Same static-parsing
// approach the other check scripts use.
const config = readFileSync(join(root, 'next.config.ts'), 'utf8')
const rules = [...config.matchAll(
  /\{\s*source:\s*"(\/blog\/[^"]+)",\s*destination:\s*"(\/blog\/[^"]+)"/g,
)].map(([, source, destination]) => ({
  sourceSlug: source.replace('/blog/', ''),
  destSlug: destination.replace('/blog/', ''),
}))
const redirectSources = new Set(rules.map((r) => r.sourceSlug))

// Files that may legitimately name a redirected slug: the redirect table
// itself, and prose that explains the consolidation.
const allowed = new Set(['next.config.ts', 'CLAUDE.md'])

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(ts|tsx|mjs|json|md)$/.test(entry)) out.push(full)
  }
  return out
}

let failed = false

// 1 · No slug may both resolve and redirect. Next checks redirects before the
//     filesystem, so a slug in both places becomes unreachable.
for (const slug of redirectSources) {
  if (liveSlugs.has(slug)) {
    console.error(`next.config.ts: /blog/${slug} is a 301 source AND a published post — it can never be reached`)
    failed = true
  }
}

// 2 · Every redirect must land on a live post, and never on another redirect.
for (const { sourceSlug, destSlug } of rules) {
  if (!liveSlugs.has(destSlug)) {
    console.error(`next.config.ts: /blog/${sourceSlug} redirects to /blog/${destSlug}, which is not a published post`)
    failed = true
  }
  if (redirectSources.has(destSlug)) {
    console.error(`next.config.ts: /blog/${sourceSlug} redirects to /blog/${destSlug}, which itself redirects — no chains`)
    failed = true
  }
}

// 3 · Nothing in the repo may link a redirected slug.
for (const file of walk(join(root, 'src')).concat(join(root, 'next.config.ts'))) {
  const rel = relative(root, file)
  if (allowed.has(rel)) continue
  const text = readFileSync(file, 'utf8')
  for (const slug of new Set([...text.matchAll(/\/blog\/([a-z0-9-]+)/g)].map((m) => m[1]))) {
    if (redirectSources.has(slug)) {
      console.error(`${rel}: links /blog/${slug}, which 301s — point it at the destination instead`)
      failed = true
    }
  }
}

// 4 · Every /mastery free-lesson slug must be a live post. This list renders
//     the post's own title and is keyed by slug, so a dead entry disappears
//     and a repeated one duplicates a card.
const mastery = readFileSync(join(root, 'src/app/mastery/page.tsx'), 'utf8')
const block = mastery.slice(mastery.indexOf('const FREE_LESSONS = ['))
const lessons = [...block.slice(0, block.indexOf(']')).matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
if (lessons.length === 0) {
  console.error('src/app/mastery/page.tsx: could not read FREE_LESSONS — this check needs updating')
  failed = true
}
for (const slug of lessons) {
  if (!liveSlugs.has(slug)) {
    console.error(`src/app/mastery/page.tsx: FREE_LESSONS names /blog/${slug}, which is not a published post`)
    failed = true
  }
}
const dupes = lessons.filter((s, i) => lessons.indexOf(s) !== i)
if (dupes.length > 0) {
  console.error(`src/app/mastery/page.tsx: FREE_LESSONS repeats ${dupes.join(', ')} — duplicate React key and duplicate card`)
  failed = true
}

// 5 · Both footers' pillar rows and the homepage reading block read from
//     site.ts `pillars`. Every pillar must be a live post.
const site = readFileSync(join(root, 'src/config/site.ts'), 'utf8')
const pillarBlock = site.slice(site.indexOf('export const pillars = ['))
const pillars = [...pillarBlock.slice(0, pillarBlock.indexOf('] as const')).matchAll(/path: '\/blog\/([^']+)'/g)].map((m) => m[1])
if (pillars.length === 0) {
  console.error('src/config/site.ts: could not read `pillars` — this check needs updating')
  failed = true
}
for (const slug of pillars) {
  if (!liveSlugs.has(slug)) {
    console.error(`src/config/site.ts: pillar /blog/${slug} is not a published post — it is linked site-wide from both footers and the homepage`)
    failed = true
  }
}

// 6 · Every published post needs a refit: it carries the answer box, the
//     "Go deeper" box and the date the sitemap reports.
const refits = readFileSync(join(root, 'src/content/post-refits.ts'), 'utf8')
const refitKeys = new Set([...refits.matchAll(/\n {2}'([a-z0-9-]+)': \{/g)].map((m) => m[1]))
for (const slug of liveSlugs) {
  if (!refitKeys.has(slug)) {
    console.error(`src/content/post-refits.ts: /blog/${slug} has no refit — it would render with no answer box and report its post date as lastmod`)
    failed = true
  }
}
for (const slug of refitKeys) {
  if (!liveSlugs.has(slug)) {
    console.error(`src/content/post-refits.ts: refit for /blog/${slug} is dead — that post is not published`)
    failed = true
  }
}

if (failed) {
  console.error('\nInternal links must point at pages that resolve, not at redirects.')
  process.exit(1)
}

console.log(
  `Internal links OK: ${liveSlugs.size} live posts, ${redirectSources.size} redirected slugs, ` +
  `${lessons.length} free lessons, ${pillars.length} pillars, ${refitKeys.size} refits — no link points at a 301.`,
)
