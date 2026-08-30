import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const navSource = readFileSync(join(root, 'src/components/Nav.tsx'), 'utf8')

// The blog/contact nav must always reach both company divisions and the
// education product. (/academy and the Agentic Lab left primary nav at the
// bootcamp sunset, 2026-08-30 — education links point at /mastery now; the
// Lab's evergreen explainer at /academy/bootcamp is linked from SiteFooter.)
const requiredLinks = [
  '/agents',
  '/mastery',
  '/blog',
  '/about',
]

const missing = requiredLinks.filter(
  (href) => !navSource.includes(`href: '${href}'`)
)

if (missing.length > 0) {
  console.error(
    `Site navigation links must work from every page. Missing: ${missing.join(', ')}`
  )
  process.exit(1)
}
