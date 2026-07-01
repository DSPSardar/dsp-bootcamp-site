import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const navSource = readFileSync(join(root, 'src/components/Nav.tsx'), 'utf8')

const requiredHomeSectionLinks = [
  '/#week',
  '/#instructor',
  '/#projects',
  '/#pricing',
  '/#faq',
]

const missing = requiredHomeSectionLinks.filter(
  (href) => !navSource.includes(`href: '${href}'`)
)

if (missing.length > 0) {
  console.error(
    `Home-section navigation links must work from every page. Missing: ${missing.join(', ')}`
  )
  process.exit(1)
}
