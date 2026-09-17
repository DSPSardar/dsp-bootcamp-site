'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { agency, site } from '@/config/site'
import { track } from '@/lib/track'

// V3 nav (owner ruling 15 Sep 2026), identical to SiteHeader on the company
// shell: AI Employees · Agent Hub · Pricing · Mastery · Case Studies · About ·
// Blog + one CTA [Talk to Zara] → WhatsApp. Guarded by test:nav.
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

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,14,28,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.25rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
            minWidth: 0,
          }}
        >
          <LogoMark />
          <span
            className="nav-wordmark"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}
          >
            Digital Services Program
          </span>
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="md-nav"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                padding: '0.375rem 0.625rem',
                borderRadius: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--text)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--muted)')
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener"
            className="btn-primary nav-cta"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
            onClick={() => track('whatsapp_cta_click', { cta: 'blog_header_zara' })}
          >
            {CTA_LABEL}
          </a>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '0.375rem 0.5rem',
              cursor: 'pointer',
              color: 'var(--text)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            className="hamburger"
          >
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                opacity: open ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: 'var(--ink-1)',
            borderTop: '1px solid var(--line)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '0.625rem 0.5rem',
                borderRadius: 6,
              }}
            >
              {l.label}
            </Link>
          ))}
          {/* The CTA repeats here because the header one is hidden on mobile
              (see .nav-cta below) — same pattern as the company shell's
              .nav-cta-item. test:nav reads the label and href off this file,
              so both copies must keep using CTA_LABEL and CTA_HREF. */}
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener"
            className="btn-primary nav-menu-cta"
            style={{
              marginTop: '0.5rem',
              justifyContent: 'center',
              padding: '0.85rem 1rem',
              fontSize: '1rem',
            }}
            onClick={() => {
              track('whatsapp_cta_click', { cta: 'blog_menu_zara' })
              setOpen(false)
            }}
          >
            {CTA_LABEL}
          </a>
        </nav>
      )}

      {/* The header row used to demand a fixed 477px: an unshrinkable 266px
          wordmark + a 175px cluster of [Talk to Zara] and the hamburger. Below
          ~497px it ran off the right edge, and body{overflow-x:hidden} at
          640px (globals.css) hid the evidence — so on a 390px phone the
          hamburger sat at 433-477px, entirely outside the viewport, and the
          mobile menu could not be opened at all. Fixed the way the company
          shell does it: the CTA leaves the row and reappears in the menu.
          The wordmark may now also shrink, so no future addition can push the
          row past the viewport again.

          The collapse breakpoint moves 768px -> 1080px to match site.css
          ("seven nav items + CTA need ~1060px"). At 768px this shell showed
          the full desktop nav in a row that wanted 947px, so a tablet
          widened its own layout viewport to 947px to fit — the same bug as
          on phones, two breakpoints up, and outside the reach of the 640px
          overflow-x mask. */}
      <style>{`
        .nav-wordmark { overflow: hidden; text-overflow: ellipsis; }
        @media (max-width: 1079px) {
          .nav-cta { display: none !important; }
        }
        @media (max-width: 420px) {
          .nav-wordmark { font-size: 0.9375rem; }
        }
        @media (min-width: 1080px) {
          .md-nav { display: flex !important; }
          .hamburger { display: none !important; }
          .nav-menu-cta { display: none !important; }
        }
      `}</style>
    </header>
  )
}

function LogoMark() {
  return (
    <div style={{ width: 32, height: 32, flexShrink: 0 }}>
      <Image
        src="/logo.webp"
        alt="DSP logo"
        width={32}
        height={32}
        priority
        style={{ objectFit: 'contain', borderRadius: 6 }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const fallback = el.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        aria-hidden
        style={{
          display: 'none',
          width: 32,
          height: 32,
          borderRadius: 6,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.125rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        D
      </div>
    </div>
  )
}
