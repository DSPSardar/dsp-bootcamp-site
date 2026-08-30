import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// Only the app copy is checked. dsp-blog-migration/ is the frozen original
// migration bundle (not part of the app) and intentionally keeps its old
// bootcamp CTA — do not "fix" it and do not re-add it here.
// The CTA moved from the bootcamp WhatsApp link to /mastery at the
// bootcamp sunset (2026-08-30).
const postPath = 'src/app/blog/[slug]/page.tsx'
const cssPath = 'src/app/blog/blog.css'

const postSource = readFileSync(join(root, postPath), 'utf8')
const blogCss = readFileSync(join(root, cssPath), 'utf8')
const ctaBtnBlock = blogCss.match(/\.dsp-post__cta-btn\s*\{(?<body>[^}]+)\}/)?.groups?.body ?? ''

const checks = [
  {
    ok: postSource.includes('className="dsp-post__cta-btn"'),
    message: 'Blog post CTA button is missing.',
  },
  {
    ok: postSource.includes('Start AI Agent Mastery'),
    message: 'Blog post CTA button needs a visible label.',
  },
  {
    ok: postSource.includes('href="/mastery"'),
    message: 'Blog post CTA button must link to /mastery.',
  },
  {
    ok: !/join%20the%20bootcamp|Join the Bootcamp/i.test(postSource),
    message: 'Blog post CTA must not reintroduce the sunset bootcamp enrolment link.',
  },
  {
    ok: /background:\s*(#fff|#ffffff|white)\s*;/i.test(ctaBtnBlock),
    message: 'Blog post CTA button needs a white pill background.',
  },
  {
    ok: /color:\s*(#0A0E1C|#0a0e1c|var\(--navy\)|var\(--cta-dark\))\s*;/.test(ctaBtnBlock),
    message: 'Blog post CTA button needs dark text on the white pill.',
  },
]

const failures = checks.filter((check) => !check.ok)

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure.message)
  }
  process.exit(1)
}
