import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

// V3 primary nav (Sept 2026), mirrored on both shells: AI Employees ·
// Agent Hub · AI Mastery · How It Works · Results · About + one CTA
// [Build with DSP] → WhatsApp. Agent Hub / How It Works / Results are
// homepage anchors. /pricing, /blog, /agents, /channelops, /academy/bootcamp
// and /contact are out of nav but stay live via the footers.
const navSources = [
  'src/components/Nav.tsx', // blog/contact shell
  'src/components/site/SiteHeader.tsx', // company shell
]

const requiredLinks = [
  '/ai-employees',
  '/#agent-hub',
  '/mastery',
  '/#how-it-works',
  '/#results',
  '/about',
]

// The single nav CTA: label + WhatsApp destination via the locked helper.
const requiredCtaLabel = 'Build with DSP'
const requiredCtaHref = 'waLink('

// Both footers must keep the pages that left the header reachable.
const footerSources = {
  'src/components/site/SiteFooter.tsx': ['/pricing', '/blog', '/contact', '/agents', '/channelops', '/academy/bootcamp'],
  'src/components/Footer.tsx': ['/pricing', '/blog', '/contact', '/agents', '/channelops'],
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
    console.error(`${file}: nav CTA must use waLink() — the locked WhatsApp number`)
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

if (failed) {
  console.error('Site navigation must work from every page.')
  process.exit(1)
}
