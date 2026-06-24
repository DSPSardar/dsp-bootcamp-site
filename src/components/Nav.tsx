'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'The Shift', href: '#shift' },
  { label: 'Learn', href: '#learn' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Modules', href: '#modules' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '#faq' },
]

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
            flexShrink: 0,
          }}
        >
          <LogoMark />
          <span
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
            href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
          >
            Join Bootcamp →
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
        </nav>
      )}

      <style>{`
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          .hamburger { display: none !important; }
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
