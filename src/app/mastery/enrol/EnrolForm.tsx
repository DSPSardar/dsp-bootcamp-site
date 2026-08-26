'use client'
import { useState } from 'react'

export default function EnrolForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(null); setState('sending')
    const res = await fetch('/api/mastery/request', { method: 'POST', body: new FormData(e.currentTarget) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) { setErr(data.error ?? 'Something went wrong. Please try again.'); setState('idle'); return }
    setState('done')
  }

  if (state === 'done')
    return (
      <div className="note">
        <b>Got it.</b> We&apos;ll verify your payment and email your sign-in link — usually within a few hours, always within one working day. Check the inbox of the email you entered.
      </div>
    )

  return (
    <form onSubmit={submit}>
      <label htmlFor="full_name">Your full name</label>
      <input id="full_name" name="full_name" required placeholder="As it should appear on your certificate" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required placeholder="you@example.com" />
      <p className="muted" style={{ marginTop: 6 }}>This is the email you&apos;ll sign in with. Make sure it&apos;s one you check.</p>
      <label htmlFor="phone">WhatsApp number (for the support group)</label>
      <input id="phone" name="phone" placeholder="+92 3xx xxxxxxx" />
      <label htmlFor="country">Country</label>
      <input id="country" name="country" placeholder="Pakistan" />
      <label htmlFor="amount_note">What did you pay, and how?</label>
      <input id="amount_note" name="amount_note" placeholder="PKR 28,000 via JazzCash" />
      <label htmlFor="proof">Payment screenshot</label>
      <input id="proof" name="proof" type="file" accept="image/*,.pdf" required />
      {err && <p className="note">{err}</p>}
      <button className="btn btn-gold" style={{ marginTop: 18, width: '100%', justifyContent: 'center' }} type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Submit and get access'}
      </button>
    </form>
  )
}
