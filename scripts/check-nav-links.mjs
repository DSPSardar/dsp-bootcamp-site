import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// Blueprint §2 primary nav, mirrored on both shells: AI Employees · Mastery ·
// Student Work · Hire · Blog · About + one CTA [Enrol]. Student Work joins the
// required list when /student-work ships (Phase 5). /agents, /channelops,
// /academy/bootcamp and /contact are out of nav but stay live via the footers.
const navSources = [
  'src/components/Nav.tsx', // blog/contact shell
  'src/components/site/SiteHeader.tsx', // company shell
]

const requiredLinks = [
  '/ai-employees',
  '/mastery',
  '/pricing', // "Hire"
  '/blog',
  '/about',
]

// The single nav CTA must point at the enrolment flow.
const requiredCta = '/mastery/enrol'

let failed = false

for (const file of navSources) {
  const source = readFileSync(join(root, file), 'utf8')

  const missing = requiredLinks.filter(
    (href) => !source.includes(`href: '${href}'`)
  )
  if (missing.length > 0) {
    console.error(`${file}: missing required nav links: ${missing.join(', ')}`)
    failed = true
  }

  if (!source.includes(`"${requiredCta}"`)) {
    console.error(`${file}: nav CTA must link ${requiredCta}`)
    failed = true
  }
}

if (failed) {
  console.error('Site navigation must work from every page (blueprint §2).')
  process.exit(1)
}
