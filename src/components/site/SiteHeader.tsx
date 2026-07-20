'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { waLink } from '@/config/site'
import { WhatsAppIcon } from '@/components/home/icons'

const links = [
  { label: 'AI Agents', href: '/agents' },
  { label: 'Academy', href: '/academy' },
  { label: 'Bootcamp', href: '/academy/bootcamp' },
  { label: 'FDE Program', href: '/academy/fde' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/" aria-label="Digital Services Program — home">
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
        <a className="btn btn-primary btn-sm" href={waLink('Hi DSP, I have a question.')}>
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </div>
    </header>
  )
}
