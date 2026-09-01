'use client'
import { useRef, useState } from 'react'

const COUNTRIES = [
  'Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain',
  'United Kingdom', 'United States', 'Canada', 'Germany', 'Australia', 'Other',
]
const METHODS = ['Bank transfer', 'JazzCash', 'Easypaisa', 'Other'] as const

const MAX_MB = 8

function prettySize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function EnrolForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [err, setErr] = useState<string | null>(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('Pakistan')
  const [otherCountry, setOtherCountry] = useState('')
  const [method, setMethod] = useState<(typeof METHODS)[number]>('Bank transfer')
  const [amount, setAmount] = useState('PKR 28,000')

  const [proof, setProof] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function acceptFile(f: File | undefined | null) {
    setErr(null)
    if (!f) return
    const okType = f.type.startsWith('image/') || f.type === 'application/pdf' || /\.pdf$/i.test(f.name)
    if (!okType) { setErr('Please attach an image or a PDF of your payment.'); return }
    if (f.size > MAX_MB * 1024 * 1024) { setErr(`That file is ${prettySize(f.size)} — the limit is ${MAX_MB} MB. A phone screenshot works best.`); return }
    setProof(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(f.type.startsWith('image/') ? URL.createObjectURL(f) : null)
  }

  function clearFile() {
    setProof(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr(null)
    if (!proof) { setErr('Please attach your payment screenshot — it’s how we verify the transfer.'); return }
    setState('sending')
    const fd = new FormData()
    fd.append('full_name', fullName.trim())
    fd.append('email', email.trim())
    fd.append('phone', phone.trim())
    fd.append('country', (country === 'Other' ? otherCountry : country).trim())
    fd.append('amount_note', `${amount.trim()} via ${method}`)
    fd.append('proof', proof)
    const res = await fetch('/api/mastery/request', { method: 'POST', body: fd })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) { setErr(data.error ?? 'Something went wrong. Please try again.'); setState('idle'); return }
    setState('done')
  }

  if (state === 'done')
    return (
      <div className="ef-done" role="status">
        <div className="ef-done-icon" aria-hidden>✓</div>
        <h3>Request received</h3>
        <p>
          We&apos;ll verify your payment and email your sign-in link to <b>{email}</b> — usually within a few
          hours, always within one working day. No password needed; the link signs you straight in.
        </p>
      </div>
    )

  return (
    <form className="ef" onSubmit={submit} noValidate>
      <div className="ef-grid">
        <div className="ef-field">
          <label htmlFor="full_name">Full name <span className="ef-req">*</span></label>
          <input id="full_name" name="full_name" required autoComplete="name" value={fullName}
            onChange={e => setFullName(e.target.value)} placeholder="e.g. Ayesha Khan" />
          <span className="ef-hint">Exactly as it should appear on your certificate.</span>
        </div>

        <div className="ef-field">
          <label htmlFor="email">Email <span className="ef-req">*</span></label>
          <input id="email" name="email" type="email" required autoComplete="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <span className="ef-hint">Your sign-in link goes here — use an inbox you check.</span>
        </div>

        <div className="ef-field">
          <label htmlFor="phone">WhatsApp number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={phone}
            onChange={e => setPhone(e.target.value)} placeholder="+92 3xx xxxxxxx" />
          <span className="ef-hint">Optional — for the DSP support group and the weekend debugging calls.</span>
        </div>

        <div className="ef-field">
          <label htmlFor="country">Country</label>
          <select id="country" value={country} onChange={e => setCountry(e.target.value)}>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {country === 'Other' && (
            <input style={{ marginTop: 8 }} aria-label="Your country" value={otherCountry}
              onChange={e => setOtherCountry(e.target.value)} placeholder="Type your country" />
          )}
        </div>
      </div>

      <div className="ef-field">
        <label id="method-label">How did you pay?</label>
        <div className="ef-chips" role="radiogroup" aria-labelledby="method-label">
          {METHODS.map(m => (
            <button key={m} type="button" role="radio" aria-checked={method === m}
              className={`ef-chip${method === m ? ' on' : ''}`} onClick={() => setMethod(m)}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="ef-field" style={{ maxWidth: 280 }}>
        <label htmlFor="amount">Amount sent</label>
        <input id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="PKR 28,000" />
      </div>

      <div className="ef-field">
        <label htmlFor="proof">Payment screenshot <span className="ef-req">*</span></label>
        {!proof ? (
          <div
            className={`ef-drop${dragOver ? ' over' : ''}`}
            onClick={() => fileRef.current?.click()}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileRef.current?.click() } }}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); acceptFile(e.dataTransfer.files?.[0]) }}
            role="button" tabIndex={0} aria-label="Upload your payment screenshot"
          >
            <div className="ef-drop-icon" aria-hidden>⬆</div>
            <b>Click to upload</b> or drag the screenshot here
            <span className="ef-hint">Image or PDF, up to {MAX_MB} MB. A photo of the receipt is fine too.</span>
          </div>
        ) : (
          <div className="ef-file">
            {preview
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image doesn't apply
              ? <img className="ef-thumb" src={preview} alt="Payment screenshot preview" />
              : <div className="ef-thumb ef-thumb-pdf" aria-hidden>PDF</div>}
            <div className="ef-file-meta">
              <b>{proof.name}</b>
              <span className="ef-hint">{prettySize(proof.size)} · attached</span>
            </div>
            <button type="button" className="ef-remove" onClick={clearFile} aria-label="Remove file">Remove</button>
          </div>
        )}
        <input ref={fileRef} id="proof" type="file" accept="image/*,.pdf" hidden
          onChange={e => acceptFile(e.target.files?.[0])} />
      </div>

      {err && <p className="ef-error" role="alert">{err}</p>}

      <button className="btn btn-gold ef-submit" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? <><span className="ef-spin" aria-hidden /> Sending your request…</> : 'Submit and get access'}
      </button>
      <p className="ef-hint" style={{ textAlign: 'center', marginTop: 10 }}>
        We only use these details to verify your payment and set up your dashboard.
      </p>
    </form>
  )
}
