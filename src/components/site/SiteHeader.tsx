'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { agency, site } from '@/config/site'
import TrackedLink from '@/components/site/TrackedLink'

// V3 nav (owner ruling 15 Sep 2026), identical on both shells:
// AI Employees · Agent Hub · Pricing · Mastery · Case Studies · About · Blog
// + one CTA [Talk to Zara] → WhatsApp (Zara answers the site line; see
// agency.zaraDemoWaNumber). Agent Hub is a homepage section, so it is an
// anchor. /agents, /channelops, /academy/bootcamp and /contact are out of
// nav but stay live and linked from both footers. scripts/check-nav-links.mjs
// guards this list on both shells.
const links = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Agent Hub', href: '/#agent-hub' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Mastery', href: '/mastery' },
  { label: 'Case Studies', href: '/agents/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

const CTA_LABEL = 'Talk to Zara'
const CTA_HREF = `https://wa.me/${agency.zaraDemoWaNumber ?? site.whatsappNumber}?text=${encodeURIComponent('Hi Zara!')}`

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="wrap nav">
        {/* No aria-label: the visible wordmark is the accessible name, so they
            can't mismatch (the "D" mark is decorative and hidden). */}
        <Link prefetch={false} className="brand" href="/">
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
              <Link prefetch={false}
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
              params={{ cta: 'site_menu_zara' }}
              onClick={() => setOpen(false)}
            >
              {CTA_LABEL}
            </TrackedLink>
          </li>
        </ul>
        <TrackedLink
          className="btn btn-gold btn-sm"
          href={CTA_HREF}
          target="_blank"
          rel="noopener"
          event="whatsapp_cta_click"
          params={{ cta: 'site_header_zara' }}
        >
          {CTA_LABEL}
        </TrackedLink>
      </div>
    </header>
  )
}
