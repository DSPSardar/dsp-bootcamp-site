#!/usr/bin/env node
/**
 * Builds the knowledge base Ustad (the /app tutor) answers from.
 *
 * Sources: the 70 Resource Vault docs + every module/lesson in course.json.
 * Output:  src/content/mastery/tutor-index.json  (committed, imported by the API).
 *
 * Why a committed file and not a runtime fs read: Vercel only traces what is
 * imported, so a build-time index is the one thing guaranteed to be there.
 * Re-run this whenever the vault or course.json changes:  node scripts/build-tutor-index.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), 'src/content/mastery')
const VAULT = path.join(ROOT, 'vault')
const OUT = path.join(ROOT, 'tutor-index.json')
const MAX = 1400            // chars per chunk — ~350 tokens, small enough to send 6 of them

const course = JSON.parse(fs.readFileSync(path.join(ROOT, 'course.json'), 'utf8'))
const moduleOfFolder = new Map(course.modules.map((m) => [m.id, m]))

/** Split markdown on headings, then pack paragraphs up to MAX so no chunk cuts a sentence. */
function chunk(text) {
  const parts = text.split(/\n(?=#{1,3} )/g)
  const out = []
  for (const part of parts) {
    if (part.length <= MAX) { if (part.trim()) out.push(part.trim()); continue }
    let buf = ''
    for (const para of part.split(/\n{2,}/)) {
      if ((buf + '\n\n' + para).length > MAX && buf) { out.push(buf.trim()); buf = para }
      else buf = buf ? buf + '\n\n' + para : para
    }
    if (buf.trim()) out.push(buf.trim())
  }
  return out
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name)
  return e.isDirectory() ? walk(p) : e.name.endsWith('.md') ? [p] : []
})

const docs = []

// 1. Vault documents — the templates, checklists and companion notes students already have.
for (const file of walk(VAULT)) {
  const rel = path.relative(VAULT, file)
  const moduleId = (rel.match(/^M\d\d/) || [])[0] || null
  const raw = fs.readFileSync(file, 'utf8')
  const docTitle = (raw.match(/^#\s+(.+)$/m) || [])[1] || path.basename(file, '.md').replace(/-/g, ' ')
  chunk(raw).forEach((text, i) => docs.push({
    id: `vault:${rel}#${i}`, kind: 'vault', module: moduleId,
    title: docTitle, path: rel, text,
  }))
}

// 2. One card per module — what it teaches, what you build, what is in it.
for (const m of course.modules) {
  const lessons = (m.lessons || []).map((l, i) =>
    `${i + 1}. ${l.title || l.file} (${l.kind}, ${l.minutes} min) [${l.file.slice(0, 7)}]`).join('\n')
  docs.push({
    id: `module:${m.id}`, kind: 'module', module: m.id, title: `${m.id} — ${m.title}`, path: null,
    text: [
      `Module ${m.id}: ${m.title} (Phase ${m.phase} — ${m.phase_name})`,
      `What you can do after it: ${m.outcome}`,
      m.build_project ? `Build project: ${m.build_project}` : '',
      m.downloads?.length ? `Resources: ${m.downloads.join(', ')}` : '',
      `Lessons in teaching order:\n${lessons}`,
    ].filter(Boolean).join('\n'),
  })
}

// 3. How the course itself works — the questions students ask most in week one.
docs.push({
  id: 'course:how-it-works', kind: 'course', module: null, title: 'How the Mastery course works', path: null,
  text: [
    `${course.course}. ${course.access || 'Lifetime access, self-paced.'}`,
    course.formula ? `The DSP method: ${course.formula}` : '',
    course.support ? `Support: ${course.support}` : '',
    'A lesson marks itself complete automatically once you have watched 80% of it — you do not have to click anything, but there is a "Mark lesson complete" button as a fallback and a Refresh link if the page is stale.',
    'Modules unlock in order: module N opens when every core lesson of module N-1 is complete. M15 (Selling AI Solutions) and M16 (AI Search Dominance Engine) are open to everyone from day one.',
    'There are no tests, no quizzes and no grades. Each module has a build project you do yourself; only the final capstone is reviewed by the DSP team, and you can resubmit any time.',
    'Slides: every module page has a "Download all slides for this module" button.',
    'Live help: there is a debugging session every weekend where you bring your build and get your errors fixed, plus a year of support in the DSP group.',
    'Sign-in trouble: use "Email me a sign-in link" or "Forgot password" on /app/login. Nobody will ever send you your password in a chat.',
  ].filter(Boolean).join('\n'),
})

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify({ built: new Date().toISOString(), docs }))
const kb = (fs.statSync(OUT).size / 1024).toFixed(0)
console.log(`tutor-index.json — ${docs.length} chunks from ${new Set(docs.map(d => d.path || d.id)).size} sources, ${kb} KB`)
