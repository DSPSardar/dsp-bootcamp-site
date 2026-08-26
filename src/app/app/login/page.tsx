'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const params = useSearchParams()
  const pending = params.get('pending')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function send(e: React.FormEvent) {
    e.preventDefault(); setErr(null)
    const { error } = await supabaseBrowser().auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/callback?next=/app` } })
    if (error) setErr(error.message); else setSent(true)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="panel" style={{ maxWidth: 440, width: '100%' }}>
        <div className="eyebrow">DSP AI Agent Mastery</div>
        <h1 style={{ fontSize: 28 }}>Student sign-in</h1>
        {pending ? (
          <p className="note">Your sign-in worked, but this email isn't enrolled yet. If you've paid, message us on WhatsApp with the email you used and we'll activate you within a few hours.</p>
        ) : sent ? (
          <p className="note">Check your inbox — we've sent a sign-in link to <b>{email}</b>. It's valid for one hour.</p>
        ) : (
          <form onSubmit={send}>
            <label htmlFor="email">Email you enrolled with</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            {err && <p className="note">{err}</p>}
            <button className="btn btn-gold" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} type="submit">Send me a sign-in link</button>
            <p className="muted" style={{ marginTop: 14 }}>No password. We email you a link each time you sign in.</p>
          </form>
        )}
      </div>
    </main>
  )
}
