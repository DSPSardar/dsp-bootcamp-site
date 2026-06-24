'use client'
import { useState, FormEvent } from 'react'

const BACKGROUNDS = [
  'Student',
  'Marketer',
  'Entrepreneur',
  'Sales professional',
  'Teacher',
  'Business owner',
  'Other',
]

export default function BookingForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setLoading(true)

    const waText = encodeURIComponent(
      `Hi DSP! I want to book a free intro session.\n\nName: ${name}\nPhone: ${phone}\nBackground: ${background || 'Not specified'}\n\nمیں بوٹ کیمپ میں شامل ہونا چاہتا/چاہتی ہوں۔`
    )
    const waUrl = `https://wa.me/923118122222?text=${waText}`

    // Fire-and-forget — never blocks WhatsApp open
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, background }),
    }).catch(() => {})

    window.open(waUrl, '_blank', 'noopener,noreferrer')

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: '2rem',
          background: 'rgba(84,230,192,0.08)',
          border: '1px solid rgba(84,230,192,0.25)',
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--mint)',
            marginBottom: '0.5rem',
          }}
        >
          ✓ Opening WhatsApp…
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--muted)',
          }}
        >
          We&apos;ll continue your registration on WhatsApp. See you there!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          htmlFor="booking-name"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Full name *
        </label>
        <input
          id="booking-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
        />
      </div>

      <div>
        <label
          htmlFor="booking-phone"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Phone *
        </label>
        <input
          id="booking-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3XX XXXXXXX"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
        />
      </div>

      <div>
        <label
          htmlFor="booking-background"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          I am a…
        </label>
        <select
          id="booking-background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: background ? 'var(--text)' : 'var(--muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Select your background</option>
          {BACKGROUNDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || !phone.trim()}
        className="btn-primary"
        style={{
          justifyContent: 'center',
          opacity: loading || !name.trim() || !phone.trim() ? 0.6 : 1,
          cursor: loading || !name.trim() || !phone.trim() ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Opening WhatsApp…' : 'Book Free Intro on WhatsApp →'}
      </button>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--muted)',
          textAlign: 'center',
        }}
      >
        You&apos;ll be taken to WhatsApp to complete your booking.
      </p>
    </form>
  )
}
