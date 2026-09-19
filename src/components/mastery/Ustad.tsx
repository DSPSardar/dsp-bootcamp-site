'use client'
import { useEffect, useRef, useState } from 'react'
import Rich from './Rich'

type Msg = { role: 'user' | 'assistant'; content: string }
type Props = {
  moduleId?: string | null
  lessonFile?: string | null
  lessonTitle?: string | null
  /** 'float' = button bottom-right on lesson/module pages. 'page' = the full /app/tutor view. */
  variant?: 'float' | 'page'
  initial?: Msg[]
  initialThreadId?: string | null
}

const STARTERS = (lesson?: string | null) => lesson
  ? [`Explain "${lesson}" in simple words`, 'I got an error, here it is:', 'Give me the prompt to build this myself']
  : ['Where should I start?', 'I got an error, here it is:', 'What does MCP mean?']

export default function Ustad({ moduleId, lessonFile, lessonTitle, variant = 'float', initial = [], initialThreadId = null }: Props) {
  const [open, setOpen] = useState(variant === 'page')
  const [msgs, setMsgs] = useState<Msg[]>(initial)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [left, setLeft] = useState<number | null>(null)
  const threadId = useRef<string | null>(initialThreadId)
  const endRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs, busy])
  useEffect(() => { if (open && variant === 'float') boxRef.current?.focus() }, [open, variant])

  async function send(text: string) {
    const q = text.trim()
    if (!q || busy) return
    setError(null); setInput(''); setBusy(true)
    setMsgs((m) => [...m, { role: 'user', content: q }, { role: 'assistant', content: '' }])
    try {
      const res = await fetch('/api/mastery/tutor', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q, threadId: threadId.current, moduleId, lessonFile }),
      })
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Something went wrong. Try again in a moment.')
        setMsgs((m) => m.slice(0, -1))   // drop the empty bubble, keep their question visible
        return
      }
      threadId.current = res.headers.get('x-thread-id') ?? threadId.current
      const remaining = res.headers.get('x-tutor-left')
      if (remaining) setLeft(Number(remaining))
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const piece = dec.decode(value, { stream: true })
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: 'assistant', content: c[c.length - 1].content + piece }; return c })
      }
    } catch {
      setError('Lost connection. Check your internet and send it again.')
      setMsgs((m) => (m[m.length - 1]?.content === '' ? m.slice(0, -1) : m))
    } finally { setBusy(false) }
  }

  const panel = (
    <div className={variant === 'page' ? 'ust ust-page' : 'ust ust-float'}>
      {variant === 'float' && (
        <div className="ust-head">
          <div>
            <strong>Ustad</strong>
            <span className="ust-sub">{lessonTitle ? `asking about: ${lessonTitle}` : 'your AI tutor · 24/7'}</span>
          </div>
          <button className="ust-x" onClick={() => setOpen(false)} aria-label="Close tutor">×</button>
        </div>
      )}

      <div className="ust-body">
        {msgs.length === 0 && (
          <div className="ust-empty">
            <p><strong>Stuck? Ask me anything — any time.</strong></p>
            <p className="muted">English, Urdu ya Roman Urdu — jis zubaan mein likhein ge, usi mein jawab milega. I know all 16 modules, and I will point you back to the exact lesson.</p>
            <div className="ust-chips">
              {STARTERS(lessonTitle).map((s) => (
                <button key={s} className="ust-chip" onClick={() => { setInput(s); boxRef.current?.focus() }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((m, i) => (
          <div key={i} className={`ust-msg ${m.role}`}>
            <div className="ust-who">{m.role === 'user' ? 'You' : 'Ustad'}</div>
            <div className="ust-bubble">
              {m.content ? <Rich text={m.content} /> : <span className="ust-dots"><i /><i /><i /></span>}
            </div>
          </div>
        ))}

        {error && <div className="ust-err">{error}</div>}
        <div ref={endRef} />
      </div>

      <form className="ust-foot" onSubmit={(e) => { e.preventDefault(); send(input) }}>
        <textarea
          ref={boxRef} value={input} rows={1} disabled={busy}
          placeholder="Apna sawaal likhein… / Type your question…"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
        />
        <button className="btn btn-gold" type="submit" disabled={busy || !input.trim()}>{busy ? '…' : 'Ask'}</button>
      </form>
      <div className="ust-note">
        Ustad can be wrong — always check against the lesson. Still stuck? Bring it to the weekend live debugging session.
        {left != null && <> · {left} questions left today</>}
      </div>
    </div>
  )

  if (variant === 'page') return panel
  return (
    <>
      {!open && (
        <button className="ust-fab" onClick={() => setOpen(true)}>
          <span className="ust-fab-dot" /> Ask Ustad
        </button>
      )}
      {open && panel}
    </>
  )
}
