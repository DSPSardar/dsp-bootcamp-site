// src/components/Byline.tsx — the sitewide author line for blog posts.
//
// Entity Lock (Corroboration Engine, Day 1 — 2026-09-06): every post carries
// the same visible byline the BlogPosting schema asserts — the founder by
// his ONE public name, linking to his entity page — plus a machine-readable
// date. Text and link target come from src/config/site.ts `founder`.
import Link from 'next/link'
import { founder, site } from '@/config/site'

export default function Byline({ date }: { date: string }) {
  const label = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <p className="dsp-post__byline">
      By <Link href={founder.path} rel="author">{founder.name}</Link>
      {' · '}
      {founder.jobTitle}, {site.shortName}
      {' · '}
      <time dateTime={date}>{label}</time>
    </p>
  )
}
