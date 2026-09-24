'use client'
// The open launcher: SARDAR's 2D face, the transcript, the same VoicePanel
// as /sardar (live-call toggle + text input), three page-aware prompt chips
// and one page-aware CTA. Loaded on the first interaction with the pill.
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import '@/app/sardar/sardar.css'
import Avatar2D from '@/app/sardar/Avatar2D'
import VoicePanel, { type VoiceControls } from '@/app/sardar/VoicePanel'
import { track } from '@/lib/track'
import type { LauncherConfig } from './config'

type Msg = { role: 'you' | 'ai'; text: string }
type Source = 'chip' | 'voice' | 'text'

const GREETING = 'Salam! I’m SARDAR, DSP’s voice AI Employee. Ask me about AI Agent Mastery or an AI Employee for your business — in English, Urdu or Roman Urdu.'
/** A reply that talks money or next steps lights the CTA up once. */
const CTA_TRIGGER = /enrol|enroll|price|pricing|\$\s?\d|pkr|\brs\.?\s?\d|demo|dakhla|daakhla|qeemat|keemat|fees?\b|داخلہ|قیمت|ڈیمو|فیس/i

export type LauncherPanelProps = {
  pathname: string
  config: LauncherConfig
  onClose: (how: 'close' | 'escape') => void
}

export default function LauncherPanel({ pathname, config, onClose }: LauncherPanelProps) {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: GREETING }])
  const [speaking, setSpeaking] = useState(false)
  const [pulse, setPulse] = useState(0)
  const controls = useRef<VoiceControls | null>(null)
  const pendingSource = useRef<Source | null>(null)
  const log = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => { closeBtn.current?.focus() }, [])
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }) }, [msgs])

  const onTranscript = useCallback((role: 'you' | 'ai', text: string) => {
    setMsgs((m) => [...m, { role, text }])
    if (role === 'you') {
      // Typed and chip questions mark themselves before VoicePanel echoes
      // them; anything unmarked came in over the microphone.
      const source: Source = pendingSource.current ?? 'voice'
      pendingSource.current = null
      track('sardar_question', { source, page: pathname })
    } else if (CTA_TRIGGER.test(text)) {
      setPulse((n) => n + 1)
    }
  }, [pathname])
  const onAsk = useCallback(() => { if (!pendingSource.current) pendingSource.current = 'text' }, [])
  const onControls = useCallback((c: VoiceControls | null) => { controls.current = c }, [])
  const onSpeaking = useCallback((on: boolean) => setSpeaking(on), [])
  const onApi = useCallback(() => {}, [])

  // Chips speak: the tap starts the live call (or uses the open one) and the
  // chip text is sent once connected, so the reply comes back as voice and
  // the visitor can keep talking. Mic refused → the same line goes over text.
  const askChip = (label: string) => {
    pendingSource.current = 'chip'
    controls.current?.askAloud(label)
  }

  // Closing unmounts this panel; VoiceSession's unmount cleanup ends the
  // call and releases the mic, so nothing is ended twice here.
  const close = useCallback((how: 'close' | 'escape') => onClose(how), [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); close('escape') } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const { chips, cta } = config
  const ctaClass = `btn btn-accent btn-sm sl-cta${pulse ? ' pulse' : ''}`
  const onCta = () => track('sardar_cta_click', { cta: cta.id, page: pathname })

  return (
    <div className="sl-panel" role="dialog" aria-modal="true" aria-label="Talk to SARDAR">
      <div className="sl-head">
        <div className="sl-avatar" aria-hidden="true"><Avatar2D speaking={speaking} /></div>
        <div className="sl-title">
          <b>SARDAR</b>
          <span className={`sl-state${speaking ? ' speaking' : ''}`} aria-live="polite"><i />{speaking ? 'Speaking' : 'Listening'}</span>
        </div>
        <button ref={closeBtn} type="button" className="sl-close" aria-label="Close and end the call" onClick={() => close('close')}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z" /></svg>
        </button>
      </div>

      <div className="sl-body">
        <div className="transcript" ref={log} role="log" aria-live="polite" aria-label="Conversation with SARDAR">
          {msgs.map((m, i) => (
            <div className={`msg ${m.role}`} key={i}>
              <span className="who">{m.role === 'ai' ? 'SARDAR' : 'You'}</span>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chips" aria-label="Suggested questions">
          {chips.map((c) => (
            <button key={c} type="button" className="chip" onClick={() => askChip(c)}>{c}</button>
          ))}
        </div>
        <VoicePanel onTranscript={onTranscript} onSpeaking={onSpeaking} onApi={onApi} onAsk={onAsk} onControls={onControls} eager />
      </div>

      <div className="sl-foot">
        {cta.external ? (
          <a className={ctaClass} key={pulse} href={cta.href} target="_blank" rel="noopener" onClick={onCta}>{cta.label}</a>
        ) : (
          <Link className={ctaClass} key={pulse} href={cta.href} onClick={onCta}>{cta.label}</Link>
        )}
        <Link className="sl-3d" href="/sardar">See SARDAR in 3D →</Link>
      </div>
    </div>
  )
}
