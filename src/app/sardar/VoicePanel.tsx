'use client'
// Push-to-talk button + text input under the transcript. Light on purpose:
// the ElevenLabs SDK loads (dynamic import) only when the visitor first
// presses the mic or sends a line. Without NEXT_PUBLIC_ELEVENLABS_AGENT_ID
// the controls render disabled with a note, so the page never half-works.
import dynamic from 'next/dynamic'
import { useCallback, useRef, useState, type FormEvent } from 'react'
import { track } from '@/lib/track'
import type { VoiceApi } from './VoiceSession'

const VoiceSession = dynamic(() => import('./VoiceSession'), { ssr: false })

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''

type Status = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'

export type VoicePanelProps = {
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  /** Lets the parent route chip taps into the live conversation. */
  onApi: (api: VoiceApi | null) => void
  disabled?: boolean
}

export default function VoicePanel({ onTranscript, onSpeaking, onApi, disabled }: VoicePanelProps) {
  const [engaged, setEngaged] = useState(false)
  const [holding, setHolding] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [detail, setDetail] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [pending, setPending] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0) // bumps to remount a dropped session
  const api = useRef<VoiceApi | null>(null)
  const configured = AGENT_ID.length > 0

  const onReady = useCallback((a: VoiceApi | null) => { api.current = a; onApi(a) }, [onApi])
  const onStatus = useCallback((s: Exclude<Status, 'idle'>, d?: string) => { setStatus(s); setDetail(d ?? null) }, [])

  const engage = () => {
    if (!engaged) { setEngaged(true); track('sardar_voice', { action: 'start' }); return }
    if (status === 'disconnected' || status === 'error') { setAttempt((n) => n + 1); track('sardar_voice', { action: 'reconnect' }) }
  }

  const pressStart = () => { if (disabled || !configured) return; engage(); setHolding(true) }
  const pressEnd = () => setHolding(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = text.trim()
    if (!t || disabled || !configured) return
    setText('')
    onTranscript('you', t)
    track('sardar_voice', { action: 'text' })
    if (api.current) api.current.send(t)
    else { setPending(t); engage() }
  }

  const label =
    !configured ? 'Voice is being set up. Tap a question above to see SARDAR work.'
    : status === 'idle' ? 'Hold to talk · English, Urdu or Roman Urdu'
    : status === 'connecting' ? 'Connecting…'
    : status === 'connected' ? (holding ? 'Listening… release to send' : 'Connected · hold the mic or type')
    : status === 'error' ? `Voice unavailable${detail ? `: ${detail}` : ''}. You can still type or tap a chip.`
    : 'Disconnected. Press the mic to reconnect.'

  return (
    <div className="voice">
      {engaged && configured && (
        <VoiceSession
          key={attempt}
          agentId={AGENT_ID}
          holding={holding}
          initialText={pending}
          onTranscript={onTranscript}
          onSpeaking={onSpeaking}
          onStatus={onStatus}
          onReady={onReady}
        />
      )}
      <form className="row" onSubmit={submit}>
        <button
          type="button"
          className={`mic${holding ? ' on' : ''}`}
          aria-label={holding ? 'Release to stop talking' : 'Hold to talk to SARDAR'}
          aria-pressed={holding}
          disabled={disabled || !configured}
          onPointerDown={pressStart}
          onPointerUp={pressEnd}
          onPointerCancel={pressEnd}
          onPointerLeave={pressEnd}
          onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !holding) { e.preventDefault(); pressStart() } }}
          onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') pressEnd() }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4Zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2Z" /></svg>
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={configured ? 'Or type a question…' : 'Text chat is being set up'}
          aria-label="Type a question for SARDAR"
          disabled={disabled || !configured}
          enterKeyHint="send"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-ghost btn-sm" disabled={disabled || !configured || !text.trim()}>Send</button>
      </form>
      <p className="hint" aria-live="polite">{label}</p>
    </div>
  )
}
