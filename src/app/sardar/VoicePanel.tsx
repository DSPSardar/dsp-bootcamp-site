'use client'
// Push-to-talk button + text input under the transcript. Light on purpose:
// the ElevenLabs SDK loads (dynamic import) only when the visitor first
// presses the mic or sends a line. Without NEXT_PUBLIC_ELEVENLABS_AGENT_ID
// the controls render disabled with a note, so the page never half-works.
// While a session is up an End button sits beside the mic, and Escape ends
// it too; VoiceSession ends it by itself after 8s without input.
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { track } from '@/lib/track'
import type { VoiceApi, VoiceMode, VoiceStatus } from './VoiceSession'

const VoiceSession = dynamic(() => import('./VoiceSession'), { ssr: false })

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''

type Status = VoiceStatus

export type VoicePanelProps = {
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  /** Lets the parent route chip taps into the live conversation. */
  onApi: (api: VoiceApi | null) => void
  disabled?: boolean
}

export default function VoicePanel({ onTranscript, onSpeaking, onApi, disabled }: VoicePanelProps) {
  const [engaged, setEngaged] = useState(false)
  const [mode, setMode] = useState<VoiceMode>('voice') // what the visitor did first: mic or keyboard
  const [holding, setHolding] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [detail, setDetail] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [pending, setPending] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0) // bumps to remount a dropped session
  const api = useRef<VoiceApi | null>(null)
  const configured = AGENT_ID.length > 0

  const onReady = useCallback((a: VoiceApi | null) => { api.current = a; onApi(a) }, [onApi])
  const reset = useCallback(() => {
    setEngaged(false); setHolding(false); setPending(null); setStatus('idle'); setDetail(null)
    api.current = null; onApi(null)
  }, [onApi])
  // `idle` from the session means it ended cleanly (idle timer, or our own
  // End) — back to the resting state, ready for a fresh press.
  const onStatus = useCallback((s: Status, d?: string) => {
    if (s === 'idle') { reset(); return }
    setStatus(s); setDetail(d ?? null)
  }, [reset])
  const onInitialSent = useCallback(() => setPending(null), [])
  const onTextOnly = useCallback(() => setMode('text'), [])

  // Start (or restart) a session of the given kind. A typed question opens a
  // text-only session; holding the mic opens a voice session — and upgrades
  // a text session to voice by remounting under a new key.
  const engage = (want: VoiceMode) => {
    if (!engaged) { setMode(want); setEngaged(true); track('sardar_voice', { action: 'start' }); return }
    if (status === 'disconnected' || status === 'error') { setMode(want); setAttempt((n) => n + 1); track('sardar_voice', { action: 'reconnect' }); return }
    if (want === 'voice' && mode === 'text' && status !== 'connecting') { setMode('voice'); setAttempt((n) => n + 1); track('sardar_voice', { action: 'upgrade' }) }
  }

  const pressStart = () => { if (disabled || !configured) return; engage('voice'); setHolding(true) }
  const pressEnd = () => setHolding(false)

  const active = engaged && (status === 'connecting' || status === 'connected')

  // End: hang up now. The session's own endSession stops the SDK's tracks and
  // releases the mic; unmounting it (engaged=false) is the backstop.
  const endCall = useCallback((how: 'end' | 'escape') => {
    api.current?.end()
    track('sardar_voice', { action: how })
    reset()
  }, [reset])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); endCall('escape') } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, endCall])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = text.trim()
    if (!t || disabled || !configured) return
    setText('')
    onTranscript('you', t)
    track('sardar_voice', { action: 'text' })
    if (api.current) api.current.send(t)
    else { setPending(t); engage('text') }
  }

  const label =
    !configured ? 'Voice is being set up. Tap a question above to see SARDAR work.'
    : status === 'idle' ? 'Hold to talk · English, Urdu or Roman Urdu'
    : status === 'connecting' ? 'Connecting…'
    : status === 'connected' ? (holding ? 'Listening… release to send' : mode === 'text' ? 'Connected · type, or hold the mic to talk' : 'Connected · hold the mic or type')
    : status === 'error' ? `Voice unavailable${detail ? `: ${detail}` : ''}. You can still type or tap a chip.`
    : 'Disconnected. Press the mic to reconnect.'

  return (
    <div className="voice">
      {engaged && configured && (
        <VoiceSession
          key={attempt}
          agentId={AGENT_ID}
          mode={mode}
          holding={holding}
          initialText={pending}
          onInitialSent={onInitialSent}
          onTextOnly={onTextOnly}
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
        {active && (
          <button
            type="button"
            className="end"
            aria-label="End the conversation"
            title="End (Esc)"
            onClick={() => endCall('end')}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" /></svg>
            End
          </button>
        )}
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
