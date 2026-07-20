import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

const waHref =
  'https://wa.me/923420580864?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp'

const blogCopies = [
  {
    label: 'App blog post',
    postPath: 'src/app/blog/[slug]/page.tsx',
    cssPath: 'src/app/blog/blog.css',
  },
  {
    label: 'Migration blog post',
    postPath: 'dsp-blog-migration/app/blog/[slug]/page.tsx',
    cssPath: 'dsp-blog-migration/blog.css',
  },
]

const checks = []

for (const copy of blogCopies) {
  const postSource = readFileSync(join(root, copy.postPath), 'utf8')
  const blogCss = readFileSync(join(root, copy.cssPath), 'utf8')
  const ctaBtnBlock = blogCss.match(/\.dsp-post__cta-btn\s*\{(?<body>[^}]+)\}/)?.groups?.body ?? ''

  checks.push(
    {
      ok: postSource.includes('className="dsp-post__cta-btn"'),
      message: `${copy.label} CTA button is missing.`,
    },
    {
      ok: postSource.includes('Join the Bootcamp'),
      message: `${copy.label} CTA button needs a visible label.`,
    },
    {
      ok: postSource.includes(`href="${waHref}"`),
      message: `${copy.label} CTA button needs the bootcamp WhatsApp link.`,
    },
    {
      ok: postSource.includes('target="_blank"') && postSource.includes('rel="noopener noreferrer"'),
      message: `${copy.label} CTA link should open safely in a new tab.`,
    },
    {
      ok: /background:\s*(#fff|#ffffff|white)\s*;/i.test(ctaBtnBlock),
      message: `${copy.label} CTA button needs a white pill background.`,
    },
    {
      ok: /color:\s*(#0A0E1C|#0a0e1c|var\(--navy\)|var\(--cta-dark\))\s*;/.test(ctaBtnBlock),
      message: `${copy.label} CTA button needs dark text on the white pill.`,
    }
  )
}

const failures = checks.filter((check) => !check.ok)

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure.message)
  }
  process.exit(1)
}
