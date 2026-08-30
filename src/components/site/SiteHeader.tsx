'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mastery } from '@/config/site'
import TrackedLink from '@/components/site/TrackedLink'

// Blueprint §2: AI Employees · Mastery · Student Work · Hire · Blog · About
// + one CTA [Enrol — $100]. /agents, /channelops, /academy/bootcamp and
// /contact are out of nav but stay live (linked from SiteFooter).
// Student Work joins when /student-work ships (Phase 5) — never link a 404.
const links = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Mastery', href: '/mastery' },
  { label: 'Hire', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="wrap nav">
        {/* No aria-label: the visible wordmark is the accessible name, so they
            can't mismatch (the "D" mark is decorative and hidden). */}
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">D</span> Digital Services Program
        </Link>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <span className="sr-only">Menu</span>
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`} id="site-nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <TrackedLink
          className="btn btn-primary btn-sm"
          href="/mastery/enrol"
          event="begin_enrol"
          params={{ cta: 'site_header' }}
        >
          Enrol — ${mastery.priceUsd}
        </TrackedLink>
      </div>
    </header>
  )
}
