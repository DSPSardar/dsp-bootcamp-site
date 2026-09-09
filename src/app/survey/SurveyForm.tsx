'use client'
// src/app/survey/SurveyForm.tsx — the ten questions, bilingual, anonymous.
//
// Every question shows English and Urdu together rather than behind a language
// toggle: a toggle asks the respondent to make a decision before they have
// started, and this survey exists precisely because that friction is what
// keeps Urdu speakers out of research like this.
import { useState } from 'react'
import { QUESTIONS } from './questions'

export default function SurveyForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [err, setErr] = useState<string | null>(null)

  const answered = QUESTIONS.filter((q) => answers[q.id]).length
  const required = ['country', 'blocker']
  const missing = required.filter((id) => !answers[id])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    if (missing.length) {
      setErr('Please answer at least the country and the “what stopped you” questions.')
      return
    }
    setState('sending')
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, email, comment }),
      })
      if (!res.ok) throw new Error('failed')
      setState('done')
    } catch {
      setState('idle')
      setErr('That did not send. Please check your connection and try again.')
    }
  }

  if (state === 'done') {
    return (
      <div className="answer" role="status">
        <p className="kicker">Thank you</p>
        <p>
          Your answers are in. We are publishing the results — every number, including the ones that
          do not flatter us — as the Pakistan AI Skills Survey 2026, free for anyone to quote.
        </p>
        <p lang="ur" dir="rtl">
          شکریہ۔ آپ کے جوابات محفوظ ہو گئے۔ نتائج ہم سب کے لیے مفت شائع کریں گے۔
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      {QUESTIONS.map((q, i) => (
        <fieldset
          key={q.id}
          style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '1.1rem 1.3rem', margin: '0 0 1rem', background: 'var(--white)' }}
        >
          <legend style={{ fontWeight: 600, padding: '0 .4rem' }}>
            {i + 1}. {q.en}
            <span lang="ur" dir="rtl" style={{ display: 'block', fontWeight: 400, opacity: 0.75, marginTop: '.15rem' }}>{q.ur}</span>
          </legend>
          <div style={{ display: 'grid', gap: '.35rem', marginTop: '.6rem' }}>
            {q.options.map((o) => (
              <label key={o.en} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start', cursor: 'pointer', lineHeight: 1.45 }}>
                <input
                  type="radio"
                  name={q.id}
                  value={o.en}
                  checked={answers[q.id] === o.en}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.en }))}
                  style={{ marginTop: '.3rem' }}
                />
                <span>
                  {o.en}
                  {o.ur !== o.en && (
                    <span lang="ur" dir="rtl" style={{ opacity: 0.7 }}> — {o.ur}</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '1.1rem 1.3rem', margin: '0 0 1rem', background: 'var(--white)' }}>
        <legend style={{ fontWeight: 600, padding: '0 .4rem' }}>
          Anything else you want to tell us? (optional)
          <span lang="ur" dir="rtl" style={{ display: 'block', fontWeight: 400, opacity: 0.75, marginTop: '.15rem' }}>کچھ اور کہنا چاہیں تو لکھیے (اختیاری)</span>
        </legend>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3}
          style={{ width: '100%', marginTop: '.6rem', padding: '.6rem .7rem', borderRadius: 8, border: '1px solid var(--line)', font: 'inherit' }}
        />
        <label style={{ display: 'block', marginTop: '.9rem' }}>
          Email, only if you want the results sent to you (optional)
          <span lang="ur" dir="rtl" style={{ display: 'block', opacity: 0.75 }}>نتائج چاہیے ہوں تو ای میل لکھیے (اختیاری)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ width: '100%', marginTop: '.4rem', padding: '.6rem .7rem', borderRadius: 8, border: '1px solid var(--line)', font: 'inherit' }}
          />
        </label>
      </fieldset>

      {err && <p style={{ color: '#B3261E', fontWeight: 600 }} role="alert">{err}</p>}

      <p className="note">{answered} of {QUESTIONS.length} answered. Nothing here asks for your name or phone number.</p>

      <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send my answers'}
      </button>
    </form>
  )
}
