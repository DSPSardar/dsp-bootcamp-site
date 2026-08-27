'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

/** Set or change the password used at /app/login. */
export default function AccountPage() {
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function save(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setMsg(null)
    if (password.length < 8) { setErr('Use at least 8 characters.'); return }
    setBusy(true)
    const { error } = await supabaseBrowser().auth.updateUser({ password })
    setBusy(false)
    if (error) { setErr(error.message); return }
    setPassword(''); setMsg('Password saved. You can now sign in with your email and password.')
  }

  return (
    <div className="panel">
      <div className="eyebrow">Account</div>
      <h1>Set your password</h1>
      <p className="md">With a password you can sign in any time without waiting for an email.</p>
      <form onSubmit={save}>
        <label htmlFor="pw">New password</label>
        <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
        {err && <p className="note">{err}</p>}
        {msg && <p className="note">{msg}</p>}
        <button className="btn btn-gold" style={{ marginTop: 16 }} type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
      </form>
    </div>
  )
}
