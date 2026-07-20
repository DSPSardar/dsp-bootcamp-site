import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const navSource = readFileSync(join(root, 'src/components/Nav.tsx'), 'utf8')

// The blog/contact nav must always reach both company divisions and the two
// course pages. (The old /#section anchors moved with the bootcamp page to
// /academy/bootcamp in the July 2026 restructure.)
const requiredLinks = [
  '/agents',
  '/academy',
  '/academy/bootcamp',
  '/academy/fde',
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
