'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { waLink } from '@/config/site'
import { WhatsAppIcon } from '@/components/home/icons'
import TrackedLink from '@/components/site/TrackedLink'

// The Agentic Lab left primary nav at the bootcamp sunset (2026-08-30);
// its evergreen explainer stays reachable via the footer history entry.
const links = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'AI Agents', href: '/agents' },
  { label: 'AI Agent Mastery', href: '/mastery' },
  { label: 'ChannelOps', href: '/channelops' },
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
          href={waLink('Hi DSP, I have a question.')}
          event="whatsapp_cta_click"
          params={{ cta: 'site_header' }}
        >
          <WhatsAppIcon />
          WhatsApp us
        </TrackedLink>
      </div>
    </header>
  )
}
