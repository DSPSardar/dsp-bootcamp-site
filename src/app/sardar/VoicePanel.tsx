'use client'
// The call button + text input under the transcript. The mic is a toggle:
// one tap starts a live, full-duplex call with the ElevenLabs agent, the
// next tap (or Escape) ends it. While live, a level meter shows the
// visitor's mic and the badge over the stage shows LISTENING / SPEAKING
// from the agent's mode events. Typing during a call goes into the call;
// typing with no call open starts a text-only session.
//
// The ElevenLabs chunk (VoiceSession) loads after the visitor's first
// gesture or an idle window and then stays mounted, idle, so the tap can
// start the session synchronously — iOS Safari only lets audio play when
// the start happens inside the gesture. Without NEXT_PUBLIC_ELEVENLABS_AGENT_ID
// the controls render disabled with a note, so the page never half-works.
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { track } from '@/lib/track'
import type { SessionKind, VoiceApi, VoiceHandle, VoiceStatus } from './VoiceSession'

const VoiceSession = dynamic(() => import('./VoiceSession'), { ssr: false })

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''
/** Load the SDK chunk this long after mount if no gesture came first. */
const IDLE_LOAD_MS = 3000
const METER_BARS = 7

/** What a host (SardarClient's chips, the site-wide launcher) can drive. */
export type VoiceControls = {
  /** Ask a line as if typed: into the live session, or as a new text session. */
  ask: (text: string) => void
  /** Ask a line out loud: into the live call, or by starting one and sending
   *  it once connected, so the reply is spoken and the visitor can keep
   *  talking. Falls back to a text session if the call cannot start. */
  askAloud: (text: string) => void
  /** Hang up whatever is open. */
  end: () => void
}

export type VoicePanelProps = {
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  /** Lets the parent route chip taps into the live conversation. */
  onApi: (api: VoiceApi | null) => void
  /** Fires just before a typed or asked line is echoed to the transcript. */
  onAsk?: (text: string) => void
  /** Hands the host ask/end once mounted, null on unmount. */
  onControls?: (controls: VoiceControls | null) => void
  /** Load the SDK chunk on mount instead of waiting for a gesture or the idle
   *  window — for hosts that only mount after a gesture (the launcher panel). */
  eager?: boolean
  disabled?: boolean
}

/** iOS Safari unlocks audio output during a gesture. The SDK does its own
 *  unlock in a capture-phase listener once loaded; this covers the tap that
 *  arrives before the chunk has. */
function unlockAudio() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const src = ctx.createBufferSource()
    src.buffer = ctx.createBuffer(1, 1, 22050)
    src.connect(ctx.destination)
    src.start(0)
    void ctx.resume().then(() => window.setTimeout(() => { void ctx.close().catch(() => {}) }, 1000)).catch(() => {})
  } catch { /* no WebAudio: nothing to unlock */ }
}

export default function VoicePanel({ onTranscript, onSpeaking, onApi, onAsk, onControls, eager, disabled }: VoicePanelProps) {
  const configured = AGENT_ID.length > 0
  const [loaded, setLoaded] = useState(Boolean(eager)) // mount the SDK chunk
  const [status, setStatus] = useState<VoiceStatus>('idle')
  const [detail, setDetail] = useState<string | null>(null)
  const [kind, setKind] = useState<SessionKind | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)
  const [text, setText] = useState('')
  const handle = useRef<VoiceHandle | null>(null)
  // A tap or a typed line that arrived before the chunk did; replayed on load.
  const wanted = useRef<{ kind: SessionKind; first: string | null } | null>(null)
  const meter = useRef<HTMLDivElement>(null)

  // Load the SDK on the first gesture anywhere on the page, or after an idle
  // window — the same policy as the 3D stage — never in the initial bundle.
  useEffect(() => {
    if (!configured || loaded) return
    const arm = () => setLoaded(true)
    const timer = window.setTimeout(arm, IDLE_LOAD_MS)
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, arm, { once: true, passive: true }))
    return () => { window.clearTimeout(timer); events.forEach((e) => window.removeEventListener(e, arm)) }
  }, [configured, loaded])

  const onHandle = useCallback((h: VoiceHandle | null) => {
    handle.current = h
    if (!h) return
    const w = wanted.current
    wanted.current = null
    if (w?.kind === 'voice') h.startCall(w.first ?? undefined)
    else if (w?.kind === 'text' && w.first) h.startText(w.first)
  }, [])
  const onStatus = useCallback((s: VoiceStatus, d?: string) => { setStatus(s); setDetail(d ?? null) }, [])
  const onKind = useCallback((k: SessionKind | null) => setKind(k), [])
  const onPrompt = useCallback((p: string | null) => setPrompt(p), [])

  const live = status === 'connected' && kind === 'voice'
  const busy = status === 'connecting'
  const active = status === 'connecting' || status === 'connected'

  const endCall = useCallback((how: 'end' | 'escape') => {
    wanted.current = null
    if (handle.current) handle.current.end(how === 'escape' ? 'Escape pressed' : 'ended by the visitor')
    else setStatus('idle')
    track('sardar_voice', { action: how })
  }, [])

  // The mic toggle. Everything here runs synchronously inside the tap.
  const toggle = () => {
    if (disabled || !configured) return
    if (live || (busy && kind === 'voice')) { endCall('end'); return }
    unlockAudio()
    setStatus('connecting'); setDetail(null); setKind('voice')
    track('sardar_voice', { action: status === 'error' ? 'retry' : 'start' })
    if (handle.current) handle.current.startCall()
    else { wanted.current = { kind: 'voice', first: null }; setLoaded(true) }
  }

  const ask = (line: string) => {
    const t = line.trim()
    if (!t || disabled || !configured) return
    onAsk?.(t)
    onTranscript('you', t)
    track('sardar_voice', { action: 'text' })
    const h = handle.current
    if (h && status === 'connected') { h.send(t); return }
    setStatus('connecting'); setDetail(null); setKind('text')
    if (h) h.startText(t)
    else { wanted.current = { kind: 'text', first: t }; setLoaded(true) }
  }

  // A chip: the visitor wants to hear the answer. Send it into the live call,
  // or start one and send it once connected — synchronously inside the tap,
  // so iOS still lets the mic prompt and playback through.
  const askAloud = (line: string) => {
    const t = line.trim()
    if (!t || disabled || !configured) return
    onAsk?.(t)
    onTranscript('you', t)
    const h = handle.current
    if (h && live) { track('sardar_voice', { action: 'text' }); h.send(t); return }
    unlockAudio()
    setStatus('connecting'); setDetail(null); setKind('voice')
    track('sardar_voice', { action: 'start' })
    if (h) h.startCall(t)
    else { wanted.current = { kind: 'voice', first: t }; setLoaded(true) }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = text
    setText('')
    ask(t)
  }

  // Hand the host stable controls that always call the latest ask/endCall.
  const askRef = useRef(ask)
  const askAloudRef = useRef(askAloud)
  const endRef = useRef(endCall)
  useEffect(() => { askRef.current = ask; askAloudRef.current = askAloud; endRef.current = endCall })
  useEffect(() => {
    if (!onControls) return
    onControls({ ask: (t) => askRef.current(t), askAloud: (t) => askAloudRef.current(t), end: () => endRef.current('end') })
    return () => onControls(null)
  }, [onControls])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); endCall('escape') } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, endCall])

  // Visitor mic meter: METER_BARS bars scaled from the SDK's input level,
  // written straight to the DOM every frame so nothing re-renders.
  useEffect(() => {
    if (!live) return
    let raf = 0
    let smooth = 0
    const bars = Array.from(meter.current?.children ?? []) as HTMLElement[]
    const tick = () => {
      const level = handle.current?.inputLevel() ?? 0
      smooth = smooth + (Math.min(1, level * 2.5) - smooth) * 0.35
      bars.forEach((b, i) => {
        const mid = (METER_BARS - 1) / 2
        const weight = 1 - Math.abs(i - mid) / (mid + 1)
        b.style.transform = `scaleY(${Math.max(0.12, smooth * (0.5 + 0.5 * weight))})`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); bars.forEach((b) => { b.style.transform = '' }) }
  }, [live])

  const buttonLabel =
    !configured ? 'Voice is being set up'
    : busy ? 'Connecting…'
    : live ? 'Live · tap to end'
    : status === 'error' ? 'Retry'
    : 'Talk to SARDAR'

  const hint =
    !configured ? 'Voice is being set up. Tap a question above to see SARDAR work.'
    : prompt ? prompt
    : status === 'error' ? `Voice unavailable${detail ? `: ${detail}` : ''}. Tap Retry, or type below.`
    : busy ? (kind === 'text' ? 'Opening text chat…' : 'Connecting your call…')
    : live ? 'Just talk — SARDAR listens and replies as you speak. Interrupt any time. Esc ends the call.'
    : status === 'connected' ? 'Text chat open · tap the mic to switch to a live call.'
    : detail ?? 'Tap the mic for a live call · English, Urdu or Roman Urdu'

  return (
    <div className="voice">
      {loaded && configured && (
        <VoiceSession
          agentId={AGENT_ID}
          onHandle={onHandle}
          onTranscript={onTranscript}
          onSpeaking={onSpeaking}
          onStatus={onStatus}
          onKind={onKind}
          onApi={onApi}
          onPrompt={onPrompt}
        />
      )}
      <button
        type="button"
        className={`call ${live ? 'live' : busy ? 'busy' : status === 'error' ? 'err' : 'idle'}`}
        aria-pressed={live}
        aria-label={live ? 'End the live call' : busy ? 'Connecting' : 'Start a live call with SARDAR'}
        disabled={disabled || !configured || (busy && kind === 'text')}
        onClick={toggle}
      >
        <span className="ring" aria-hidden="true">
          {busy ? (
            <span className="spin" />
          ) : live ? (
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4Zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2Z" /></svg>
          )}
        </span>
        <span className="lbl">{buttonLabel}</span>
        {live && (
          <span className="meter" ref={meter} aria-hidden="true">
            {Array.from({ length: METER_BARS }, (_, i) => <i key={i} />)}
          </span>
        )}
      </button>
      <form className="row" onSubmit={submit}>
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); handle.current?.touch() }}
          placeholder={configured ? (live ? 'Or type into the call…' : 'Or type a question…') : 'Text chat is being set up'}
          aria-label="Type a question for SARDAR"
          disabled={disabled || !configured}
          enterKeyHint="send"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-ghost btn-sm" disabled={disabled || !configured || !text.trim()}>Send</button>
      </form>
      <p className={`hint${prompt ? ' warn' : ''}`} aria-live="polite">{hint}</p>
    </div>
  )
}
