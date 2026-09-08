// src/components/Byline.tsx — the sitewide author line for blog posts.
//
// Entity Lock (Corroboration Engine, Day 1 — 2026-09-06): every post carries
// the same visible byline the BlogPosting schema asserts — the founder by
// his ONE public name, linking to his entity page — plus a machine-readable
// date. Text and link target come from src/config/site.ts `founder`.
import Link from 'next/link'
import { founder, site } from '@/config/site'

// Fixed month names so the label renders identically on every Node/ICU build.
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const short = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return `${d} ${SHORT[m - 1]} ${y}`
}

/** `updated` (Day 3 refits, 2026-09-08) adds "Updated 8 Sep 2026" — the
 *  same ISO date the BlogPosting's dateModified and the sitemap carry. */
export default function Byline({ date, updated }: { date: string; updated?: string }) {
  const label = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <p className="dsp-post__byline">
      By <Link href={founder.path} rel="author">{founder.name}</Link>
      {' · '}
      {founder.jobTitle}, {site.shortName}
      {' · '}
      <time dateTime={date}>{label}</time>
      {updated && updated !== date && (
        <>
          {' · '}
          Updated <time dateTime={updated}>{short(updated)}</time>
        </>
      )}
    </p>
  )
}
