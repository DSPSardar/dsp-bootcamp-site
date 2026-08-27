'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

type Mode = 'password' | 'link' | 'set'

function LoginForm() {
  const params = useSearchParams()
  const pending = params.get('pending')
  const urlErr = params.get('err')
  const [mode, setMode] = useState<Mode>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState<string | null>(urlErr)
  const [note, setNote] = useState<string | null>(null)

  const redirect = () => (window.location.href = '/app')

  async function signInPassword(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setBusy(true)
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) { setErr(error.message === 'Invalid login credentials' ? "That email and password don't match. If you've never set a password, use \"Email me a sign-in link\" below, then set one from the dashboard." : error.message); return }
    redirect()
  }

  async function sendLink(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setBusy(true)
    const { error } = await supabaseBrowser().auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/confirm` } })
    setBusy(false)
    if (error) { setErr(error.message.includes('rate limit') ? 'Too many emails just now — try again in a few minutes, or sign in with your password.' : error.message); return }
    setSent(true)
  }

  async function sendReset(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setBusy(true)
    const { error } = await supabaseBrowser().auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/auth/confirm` })
    setBusy(false)
    if (error) { setErr(error.message); return }
    setNote('Check your email — the link lets you set a new password.')
  }

  if (sent)
    return <p className="note">Check your inbox — we&apos;ve sent a sign-in link to <b>{email}</b>. It&apos;s valid for one hour.</p>

  return (
    <>
      {pending && <p className="note">Your sign-in worked, but this email isn&apos;t enrolled yet. If you&apos;ve paid, message us on WhatsApp with the email you used and we&apos;ll activate you.</p>}

      <form onSubmit={mode === 'password' ? signInPassword : mode === 'link' ? sendLink : sendReset}>
        <label htmlFor="email">Email you enrolled with</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />

        {mode === 'password' && (
          <>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" />
          </>
        )}

        {err && <p className="note">{err}</p>}
        {note && <p className="note">{note}</p>}

        <button className="btn btn-gold" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} type="submit" disabled={busy}>
          {busy ? 'Working…' : mode === 'password' ? 'Sign in' : mode === 'link' ? 'Email me a sign-in link' : 'Email me a reset link'}
        </button>
      </form>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mode !== 'password' && <button className="btn btn-ghost btn-sm" onClick={() => { setMode('password'); setErr(null); setNote(null) }}>← Sign in with a password</button>}
        {mode !== 'link' && <button className="btn btn-ghost btn-sm" onClick={() => { setMode('link'); setErr(null); setNote(null) }}>Email me a sign-in link instead</button>}
        {mode === 'password' && <button className="btn btn-ghost btn-sm" onClick={() => { setMode('set'); setErr(null); setNote(null) }}>Forgot / never set a password</button>}
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="panel" style={{ maxWidth: 440, width: '100%' }}>
        <div className="eyebrow">DSP AI Agent Mastery</div>
        <h1 style={{ fontSize: 28 }}>Student sign-in</h1>
        <Suspense fallback={<p className="muted">Loading…</p>}><LoginForm /></Suspense>
      </div>
    </main>
  )
}
