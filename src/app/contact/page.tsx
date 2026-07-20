// src/app/contact/page.tsx
import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Contact DSP — Book a Free Intro Session',
  description:
    'Get in touch with Digital Services Program. Book a free intro session via WhatsApp or reach us by phone.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact DSP — Book a Free Intro Session',
    description:
      'Get in touch with Digital Services Program. Book a free intro session via WhatsApp or reach us by phone.',
    url: '/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--mint)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1rem',
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Get in touch.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          Book a free intro session, ask a question, or just say hi. We&apos;re
          available on WhatsApp every day.
        </p>

        {/* Quick links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          <a
            href="https://wa.me/923420580864?text=Hi%20DSP%2C%20I%20want%20to%20learn%20more"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp Us →
          </a>
          <a href="tel:+923420580864" className="btn-ghost">
            +92 342 0580864
          </a>
        </div>

        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '2rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            Book a free intro session
          </h2>
          <BookingForm />
        </div>

        {/* Info */}
        <div
          style={{
            marginTop: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            lineHeight: 2,
          }}
        >
          <p>SECP Registered · Digital Services Program</p>
          <p>digitalservicesprogram.com</p>
        </div>
      </div>
    </div>
  )
}
