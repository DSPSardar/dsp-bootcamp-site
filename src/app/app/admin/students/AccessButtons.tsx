'use client'
import { useState } from 'react'

/** Suspend / restore one student's dashboard access from the Students page.
 *  Two-step: the first click asks for confirmation inline, so a mis-click on a
 *  card in a long list can't cut off a paying student. */
export default function AccessButtons({ userId, email, status }: { userId: string; email: string; status: string }) {
  const [now, setNow] = useState(status)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const suspended = now === 'suspended'

  async function run(action: 'suspend' | 'reactivate') {
    setBusy(true); setErr(null)
    const r = await fetch('/api/mastery/admin/access', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId, action }),
    })
    const d = await r.json().catch(() => ({}))
    setBusy(false); setConfirming(false)
    if (!r.ok) { setErr(d.error || `failed (${r.status})`); return }
    setNow(d.status)
  }

  return (
    <div style={{ marginTop: 12 }}>
      {err && <p className="note">{err}</p>}

      {suspended ? (
        <>
          <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => run('reactivate')}>
            {busy ? 'Working…' : 'Reactivate access'}
          </button>
          <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Access is off — this student is sent back to the sign-in screen. Their progress is untouched.
          </p>
        </>
      ) : confirming ? (
        <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>Cut off <code>{email}</code>?</span>
            <button className="btn btn-gold btn-sm" disabled={busy} onClick={() => run('suspend')}>
              {busy ? 'Working…' : 'Yes, deactivate'}
            </button>
            <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => setConfirming(false)}>Cancel</button>
          </div>
          <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Nothing is deleted — you can reactivate from this same card at any time.
          </p>
        </>
      ) : (
        <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(true)}>Deactivate access</button>
      )}
    </div>
  )
}
