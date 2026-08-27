'use client'
import { useState } from 'react'

type Result = { status: string; email?: string; phone?: string | null; full_name?: string; temp_password?: string | null; email_sent?: boolean; login_url?: string }

export default function DecideButtons({ id }: { id: string }) {
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [res, setRes] = useState<Result | null>(null)

  async function decide(action: 'approve' | 'reject') {
    setBusy(true); setErr(null)
    const r = await fetch('/api/mastery/admin/decide', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, action, note }) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setErr(d.error || `failed (${r.status})`); return }
    setRes(d)
  }

  if (res?.status === 'rejected') return <p className="note">Rejected.</p>
  if (res?.status === 'approved') {
    const msg = `Assalam o Alaikum ${res.full_name?.split(' ')[0] || ''}! Welcome to DSP AI Agent Mastery 🎓\n\nYour dashboard: ${res.login_url}\nEmail: ${res.email}${res.temp_password ? `\nPassword: ${res.temp_password}` : '\n(Sign in with the link we emailed you, or set a password from "Forgot / never set a password".)'}\n\nStart with Module 1, Lesson 1. Support is free for a year — ask here any time.`
    const wa = res.phone ? `https://wa.me/${res.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(msg)}` : null
    return (
      <div className="note" style={{ whiteSpace: 'pre-wrap' }}>
        <b>Access created.</b> {res.email_sent ? 'Sign-in email sent.' : 'Email could not be sent (mailer limit) — send the details below on WhatsApp.'}
        {res.temp_password && <><br /><br />Email: <code>{res.email}</code><br />Password: <code>{res.temp_password}</code></>}
        <br /><br />
        {wa && <a className="btn btn-gold btn-sm" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp</a>}
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8 }} onClick={() => navigator.clipboard.writeText(msg)}>Copy message</button>
      </div>
    )
  }

  return (
    <div style={{ marginTop: 12 }}>
      <label>Note (optional)</label>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. paid via JazzCash, verified" />
      {err && <p className="note">{err}</p>}
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button className="btn btn-gold" disabled={busy} onClick={() => decide('approve')}>{busy ? 'Working…' : 'Approve & create access'}</button>
        <button className="btn btn-ghost" disabled={busy} onClick={() => decide('reject')}>Reject</button>
      </div>
    </div>
  )
}
