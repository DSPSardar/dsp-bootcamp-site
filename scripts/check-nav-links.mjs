import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// V3 primary nav (owner ruling 15 Sep 2026), identical on both shells:
// AI Employees · Agent Hub · Pricing · Mastery · Case Studies · About · Blog
// + one CTA [Talk to Zara] → WhatsApp (agency.zaraDemoWaNumber). Agent Hub
// is a homepage anchor. /agents, /channelops, /academy/bootcamp and /contact
// are out of nav but stay live via the footers.
const navSources = [
  'src/components/Nav.tsx', // blog/contact shell
  'src/components/site/SiteHeader.tsx', // company shell
]

const requiredLinks = [
  '/ai-employees',
  '/#agent-hub',
  '/pricing',
  '/mastery',
  '/agents/case-studies',
  '/about',
  '/blog',
]

// The single nav CTA: label + Zara's WhatsApp line from config.
const requiredCtaLabel = 'Talk to Zara'
const requiredCtaHref = 'agency.zaraDemoWaNumber'

// Headings that must never return to a nav or footer (owner ruling 15 Sep 2026).
const bannedHeadings = ['DSP Academy', 'Agentic Lab</h3>', 'AI Agents</h3>', '>Academy<']

// Both footers must keep the pages that left the header reachable.
const footerSources = {
  'src/components/site/SiteFooter.tsx': ['/contact', '/agents', '/channelops', '/academy/bootcamp'],
  'src/components/Footer.tsx': ['/contact', '/agents', '/channelops'],
}

let failed = false

for (const file of navSources) {
  const source = readFileSync(join(root, file), 'utf8')

  const missing = requiredLinks.filter((href) => !source.includes(`href: '${href}'`))
  if (missing.length > 0) {
    console.error(`${file}: missing required nav links: ${missing.join(', ')}`)
    failed = true
  }

  if (!source.includes(requiredCtaLabel)) {
    console.error(`${file}: nav CTA must be labelled "${requiredCtaLabel}"`)
    failed = true
  }
  if (!source.includes(requiredCtaHref)) {
    console.error(`${file}: nav CTA must link Zara's WhatsApp line (agency.zaraDemoWaNumber)`)
    failed = true
  }
}

for (const [file, hrefs] of Object.entries(footerSources)) {
  const source = readFileSync(join(root, file), 'utf8')
  const missing = hrefs.filter((href) => !source.includes(`"${href}"`) && !source.includes(`'${href}'`))
  if (missing.length > 0) {
    console.error(`${file}: footer must keep out-of-nav pages reachable: ${missing.join(', ')}`)
    failed = true
  }
}

for (const file of [...navSources, ...Object.keys(footerSources)]) {
  const source = readFileSync(join(root, file), 'utf8')
  const hit = bannedHeadings.find((h) => source.includes(h))
  if (hit) {
    console.error(`${file}: nav/footer heading "${hit}" was retired — do not reintroduce it`)
    failed = true
  }
}

if (failed) {
  console.error('Site navigation must work from every page.')
  process.exit(1)
}
