'use client'
import { useState } from 'react'
import { track } from '@/lib/track'
import { fde, waLink } from '@/config/site'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function FdeApplicationForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const honeypot = (f.elements.namedItem('website') as HTMLInputElement).value
    if (honeypot) return // honeypot — silently drop bots

    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (f.elements.namedItem('email') as HTMLInputElement).value.trim()
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value.trim()
    const background = (f.elements.namedItem('background') as HTMLSelectElement).value
    const why = (f.elements.namedItem('why') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !phone || !background || !why) {
      f.reportValidity()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'fde_application',
          name,
          email,
          phone,
          background,
          why,
          source: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      track('fde_apply_submit', { background })
      setStatus('ok')
      f.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="form-ok" role="status">
        <strong>Application received.</strong> We review every application personally and
        reply on WhatsApp within 24 hours. Want to talk sooner?{' '}
        <a href={waLink('Hi DSP, I just applied for the FDE program.')}>Message us now</a>.
      </div>
    )
  }

  return (
    <form id="fde-apply" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="fde-name">Full name</label>
        <input id="fde-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="fde-email">Email</label>
        <input id="fde-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div>
        <label htmlFor="fde-phone">WhatsApp number</label>
        <input id="fde-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" required />
      </div>
      <div>
        <label htmlFor="fde-bg">Your background</label>
        <select id="fde-bg" name="background" required defaultValue="">
          <option value="" disabled>Select your background</option>
          <option>DSP Bootcamp graduate</option>
          <option>Software developer</option>
          <option>IT / engineering student</option>
          <option>Data / AI professional</option>
          <option>Career switcher</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="fde-why">Why do you want to become a Forward Deployed Engineer?</label>
        <textarea id="fde-why" name="why" required placeholder="Tell us in a few sentences. There are no wrong answers — we're looking for drive, not polish." />
      </div>
      {/* honeypot: bots fill this, humans never see it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="fde-website">Website</label>
        <input id="fde-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn-gold" type="submit" disabled={status === 'sending'} style={{ justifyContent: 'center' }}>
        {status === 'sending' ? 'Sending…' : `Apply for the next batch — ${fde.seats} seats only`}
      </button>
      {status === 'error' && (
        <p className="form-err" role="alert">
          Something went wrong sending your application. Please try again, or apply directly
          on <a href={waLink('Hi DSP, I want to apply for the FDE program.')}>WhatsApp</a>.
        </p>
      )}
      <p className="form-note">
        Bootcamp graduates: your {fde.alumniCreditDisplay}{' '}credit is applied automatically —
        just pick &ldquo;DSP Bootcamp graduate&rdquo; above. Questions first?{' '}
        <a href={waLink('Hi DSP, I have a question about the FDE program.')}>Ask on WhatsApp</a>.
      </p>
    </form>
  )
}
