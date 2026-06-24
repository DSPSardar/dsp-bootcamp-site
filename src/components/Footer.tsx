// src/components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '3rem 1.25rem',
        marginTop: '4rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <FooterLogo />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--text)',
              fontSize: '0.9375rem',
            }}
          >
            Digital Services Program
          </span>
        </div>

        {/* Links */}
        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 1.5rem' }}
        >
          {[
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
            {
              label: 'WhatsApp',
              href: 'https://wa.me/923118122222',
              external: true,
            },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#top"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            Back to top ↑
          </a>
        </nav>

        {/* Legal */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            width: '100%',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          © 2026 DSP · digitalservicesprogram.com · SECP Registered
        </p>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <div style={{ width: 28, height: 28, flexShrink: 0 }}>
      <Image
        src="/logo.webp"
        alt=""
        width={28}
        height={28}
        style={{ objectFit: 'contain', borderRadius: 4 }}
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
          width: 28,
          height: 28,
          borderRadius: 4,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.875rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        D
      </div>
    </div>
  )
}
