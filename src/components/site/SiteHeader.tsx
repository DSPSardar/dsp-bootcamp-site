'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { waLink } from '@/config/site'
import TrackedLink from '@/components/site/TrackedLink'

// V3 nav (Sept 2026): AI Employees · Agent Hub · AI Mastery · How It Works ·
// Results · About + one CTA [Build with DSP] → WhatsApp, the site's primary
// conversion channel. Agent Hub, How It Works and Results are homepage
// sections, not pages — anchors keep the nav honest without thin new URLs.
// /pricing, /blog, /agents, /channelops, /academy/bootcamp and /contact are
// out of nav but stay live and linked from both footers. scripts/
// check-nav-links.mjs guards this list on both shells.
const links = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Agent Hub', href: '/#agent-hub' },
  { label: 'AI Mastery', href: '/mastery' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'About', href: '/about' },
]

const CTA_HREF = waLink('Hi DSP, I want to build with DSP.')

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
          {/* The CTA repeats inside the mobile menu, where the header button is hidden. */}
          <li className="nav-cta-item">
            <TrackedLink
              className="btn btn-gold"
              href={CTA_HREF}
              target="_blank"
              rel="noopener"
              event="whatsapp_cta_click"
              params={{ cta: 'site_menu' }}
              onClick={() => setOpen(false)}
            >
              Build with DSP
            </TrackedLink>
          </li>
        </ul>
        <TrackedLink
          className="btn btn-gold btn-sm"
          href={CTA_HREF}
          target="_blank"
          rel="noopener"
          event="whatsapp_cta_click"
          params={{ cta: 'site_header' }}
        >
          Build with DSP
        </TrackedLink>
      </div>
    </header>
  )
}
