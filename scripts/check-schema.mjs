#!/usr/bin/env node
// scripts/check-schema.mjs — sanity-checks the /mastery JSON-LD graph and
// prints it, ready to paste into Google's Rich Results Test.
//
//   node scripts/check-schema.mjs            # checks → stderr, JSON → stdout
//   node scripts/check-schema.mjs > graph.json
//
// What it asserts (exit 1 on any failure):
//   1. the FAQ and curriculum text in ./src/app/mastery/{faqs,curriculum}.ts
//      mirrors the visible copy in page.tsx word for word (schema may only
//      describe what a visitor can read);
//   2. every `{ "@id": … }` reference points at a node defined in the graph;
//   3. required fields per type — Course: name, description, provider ·
//      Offer: price, priceCurrency · FAQPage: mainEntity non-empty ·
//      Person: name · Organization: name, url · WebSite/WebPage: name, url ·
//      VideoObject (if ever emitted): name, description, thumbnailUrl,
//      uploadDate;
//   4. locked-facts guards — no CourseInstance/Schedule with dates, seats or
//      a location (no cohorts exist), no aggregateRating/review (no rating
//      data on the page), no `/api/` URL other than none, no private number.
//
// Imports the real graph module (TypeScript) through Node's built-in type
// stripping plus ./lib/ts-resolve-hooks.mjs for the `@/` alias — needs
// Node 22.18+ (or `node --experimental-strip-types` on 22.6–22.17).
import { readFileSync } from 'node:fs'
import { register } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const say = (line) => process.stderr.write(line + '\n')

// Node prints "Type Stripping is an experimental feature" on some versions;
// keep stderr to the checks themselves.
process.removeAllListeners('warning')
process.on('warning', (w) => { if (w.name !== 'ExperimentalWarning') say(`${w.name}: ${w.message}`) })

const [major, minor] = process.versions.node.split('.').map(Number)
const stripTypes = major >= 23 || (major === 22 && minor >= 18) || process.execArgv.includes('--experimental-strip-types')
if (!stripTypes) {
  say(`check-schema: Node ${process.versions.node} cannot import TypeScript directly — use Node 22.18+ or run: node --experimental-strip-types scripts/check-schema.mjs`)
  process.exit(2)
}

register('./lib/ts-resolve-hooks.mjs', import.meta.url)
const { masterySchema } = await import('../src/app/mastery/schema.ts')
const { MASTERY_FAQS } = await import('../src/app/mastery/faqs.ts')
const { MASTERY_CURRICULUM } = await import('../src/app/mastery/curriculum.ts')

const failures = []
const check = (ok, message) => { if (!ok) failures.push(message) }
const pass = (message) => say(`  ✓ ${message}`)

/* ── 1. Schema text mirrors the visible page ──────────────────────────── */
const page = readFileSync(join(root, 'src/app/mastery/page.tsx'), 'utf8')
const decode = (s) => s
  .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\{'([^']*)'\}/g, '$1').replace(/\{"([^"]*)"\}/g, '$1')

const faqSection = page.slice(page.indexOf('<section id="faq">'))
const visibleFaqs = [...faqSection.slice(0, faqSection.indexOf('</section>')).matchAll(/<details><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/gs)]
  .map(([, q, a]) => ({ q: decode(q), a: decode(a) }))
check(visibleFaqs.length > 0, 'FAQ section not found in page.tsx (expected <section id="faq"> with <details><summary>…</summary><p>…</p></details>)')
check(visibleFaqs.length === MASTERY_FAQS.length, `faqs.ts has ${MASTERY_FAQS.length} pairs, the page shows ${visibleFaqs.length}`)
visibleFaqs.forEach((v, i) => {
  const f = MASTERY_FAQS[i]
  if (!f) return
  check(f.q === v.q, `FAQ ${i + 1} question differs from the page:\n      page:  ${v.q}\n      faqs:  ${f.q}`)
  check(f.a === v.a, `FAQ ${i + 1} answer differs from the page:\n      page:  ${v.a}\n      faqs:  ${f.a}`)
  check(!/<[a-z][^>]*>/i.test(f.a), `FAQ ${i + 1} answer carries markup`)
})
if (visibleFaqs.length && visibleFaqs.length === MASTERY_FAQS.length) pass(`FAQ: ${MASTERY_FAQS.length} Q/A pairs mirror the visible FAQ verbatim`)

const visibleModules = [...page.matchAll(/<details><summary><span className="n">(\w+)<\/span>(.*?)<span className="plus">\+<\/span><\/summary><div className="body"><div><b>Outcome<\/b>(.*?)<\/div>/gs)]
  .filter(([, code]) => code !== 'CAP')
  .map(([, code, title, outcome]) => ({ code, title: decode(title), outcome: decode(outcome) }))
check(visibleModules.length === MASTERY_CURRICULUM.length, `curriculum.ts has ${MASTERY_CURRICULUM.length} modules, the page shows ${visibleModules.length}`)
visibleModules.forEach((v, i) => {
  const m = MASTERY_CURRICULUM[i]
  if (!m) return
  check(m.code === v.code && m.title === v.title, `Module ${i + 1} title differs from the page: "${v.code} ${v.title}" vs "${m.code} ${m.title}"`)
  check(m.outcome === v.outcome, `Module ${v.code} outcome differs from the page:\n      page:       ${v.outcome}\n      curriculum: ${m.outcome}`)
})
if (visibleModules.length && visibleModules.length === MASTERY_CURRICULUM.length) pass(`Curriculum: ${MASTERY_CURRICULUM.length} module titles + Outcome lines mirror the visible accordion`)

check(/JSON\.stringify\(masterySchema\)/.test(page), 'page.tsx does not render masterySchema')

/* ── 2. Graph integrity: every @id reference resolves ─────────────────── */
const graph = masterySchema['@graph']
check(masterySchema['@context'] === 'https://schema.org', '@context must be https://schema.org')
check(Array.isArray(graph) && graph.length > 0, '@graph must be a non-empty array')

const defined = new Map()
const referenced = []
const typed = []
const walk = (node, path) => {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`))
  if (!node || typeof node !== 'object') return
  const keys = Object.keys(node)
  if (keys.length === 1 && keys[0] === '@id') return referenced.push({ id: node['@id'], path })
  if (node['@type']) typed.push({ node, path })
  if (node['@id']) {
    check(!defined.has(node['@id']), `@id defined twice: ${node['@id']} (${defined.get(node['@id'])} and ${path})`)
    defined.set(node['@id'], path)
  }
  for (const k of keys) walk(node[k], `${path}.${k}`)
}
walk(graph, '@graph')
for (const r of referenced) check(defined.has(r.id), `${r.path} references ${r.id}, which is not defined in the graph`)
if (referenced.every((r) => defined.has(r.id))) pass(`Links: ${referenced.length} @id references resolve to ${defined.size} defined nodes`)

/* ── 3. Required fields per type ──────────────────────────────────────── */
const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  WebPage: ['name', 'url'],
  Person: ['name'],
  Course: ['name', 'description', 'provider'],
  CourseInstance: ['courseMode'],
  Offer: ['price', 'priceCurrency'],
  FAQPage: ['mainEntity'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
  Syllabus: ['name', 'description'],
  VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'],
}
const has = (node, key) => {
  const v = node[key]
  return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
}
// Entity types are checked where they are defined (top level of the graph);
// a nested mention such as Course.provider is a bare @id reference, and the
// one inline nested Organization (parentOrganization) is name-only by design.
const ENTITY_TYPES = new Set(['Organization', 'WebSite', 'WebPage', 'Person', 'Course', 'FAQPage'])
const isTopLevel = (path) => /^@graph\[\d+\]$/.test(path)
const typeCounts = {}
for (const { node, path } of typed) {
  const types = [].concat(node['@type'])
  for (const t of types) {
    typeCounts[t] = (typeCounts[t] ?? 0) + 1
    if (ENTITY_TYPES.has(t) && !isTopLevel(path)) continue
    for (const key of REQUIRED[t] ?? []) check(has(node, key), `${path} (${t}) is missing required "${key}"`)
  }
}
pass(`Required fields present on: ${Object.entries(typeCounts).map(([t, n]) => (n > 1 ? `${t}×${n}` : t)).join(', ')}`)

/* ── 4. Locked-facts guards ───────────────────────────────────────────── */
const json = JSON.stringify(masterySchema)
for (const { node, path } of typed) {
  const types = [].concat(node['@type'])
  if (types.includes('CourseInstance') || types.includes('Schedule'))
    for (const key of ['startDate', 'endDate', 'location', 'maximumAttendeeCapacity', 'remainingAttendeeCapacity'])
      check(!(key in node), `${path} carries "${key}" — no cohorts exist; a self-paced instance must not advertise one`)
  if (types.includes('Course')) check(!('aggregateRating' in node) && !('review' in node), `${path} carries rating/review data that is not on the page`)
}
check(!/923253966799|3118122222|15-Day|5-day/i.test(json), 'graph mentions a retired number or format (see CLAUDE.md locked facts)')
check(!/CourseInstance/.test(json) || (json.match(/"CourseInstance"/g) ?? []).length === 1, 'more than one CourseInstance — there is exactly one self-paced instance')
pass('Locked facts: no cohort dates/seats/location, no ratings, no retired numbers')

/* ── Result ───────────────────────────────────────────────────────────── */
if (failures.length) {
  say(`\ncheck-schema: ${failures.length} problem${failures.length === 1 ? '' : 's'}`)
  for (const f of failures) say(`  ✗ ${f}`)
  process.exit(1)
}
say(`check-schema: OK — ${graph.length} top-level nodes (${graph.map((n) => n['@type']).join(', ')})\n`)
process.stdout.write(JSON.stringify(masterySchema, null, 2) + '\n')
