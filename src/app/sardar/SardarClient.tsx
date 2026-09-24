'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'
import TrackedLink from '@/components/site/TrackedLink'
import Stage from './Stage'
import VoicePanel from './VoicePanel'
import type { VoiceApi } from './VoiceSession'
import Chart2D from './Chart2D'
import { DEMO_BADGE, DEMO_CHIPS, type Chart, type Chip } from './demo'
import { ASOS_DEMO_URL, MASTERY_URL } from './links'
import { lipsync, look } from './store'

type Msg = { role: 'you' | 'ai'; text: string; chart?: Chart | null; cta?: Chip['cta'] | null; done: boolean }

const GREETING =
  'Hi, I am SARDAR, an AI Employee built on DSP Agent Hub. Tap a question below and I will show you what I do all day. Or ask in English, Urdu or Roman Urdu.'

/** Words per second for the typewriter reveal; the voice layer (step 4) replaces this pacing with real audio. */
const WPS = 3.4

export default function SardarClient({ canGoLive = false, avatarUrl = null }: { canGoLive?: boolean; avatarUrl?: string | null }) {
  const [mode, setMode] = useState<'demo' | 'live'>('demo')
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: GREETING, done: true }])
  const [active, setActive] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [chart, setChart] = useState<Chart | null>(null)
  const [canned, setCanned] = useState(false) // a scripted answer is typing out
  const stageRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)
  const voice = useRef<VoiceApi | null>(null)

  // Head-tracks the cursor (and the last touch) by writing --look-x/-y on
  // the stage. Kept to a CSS variable so both the 2D and 3D avatars read it.
  useEffect(() => {
    const el = stageRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2
      look.x = Math.max(-1, Math.min(1, x)); look.y = Math.max(-1, Math.min(1, y))
      el.style.setProperty('--look-x', look.x.toFixed(3))
      el.style.setProperty('--look-y', look.y.toFixed(3))
    }
    const onLeave = () => { look.x = 0; look.y = 0; el.style.setProperty('--look-x', '0'); el.style.setProperty('--look-y', '0') }
    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => { window.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); lipsync.synthetic = false }, [])

  // The mouth follows real audio once step 4 attaches a stream; until then a
  // synthetic level runs while the canned answer types out.
  useEffect(() => { lipsync.synthetic = speaking && !lipsync.attached }, [speaking])

  // Live voice: the agent's words land in the same transcript, its speaking
  // state drives the same mouth, and chips become spoken questions.
  const onTranscript = useCallback((role: 'you' | 'ai', text: string) => {
    setMsgs((m) => [...m, { role, text, done: true }])
  }, [])
  const onVoiceSpeaking = useCallback((on: boolean) => {
    if (timer.current) return // a canned answer is mid-flight; leave its state alone
    setSpeaking(on)
  }, [])
  const onVoiceApi = useCallback((api: VoiceApi | null) => { voice.current = api }, [])

  const play = useCallback((chip: Chip) => {
    if (timer.current) window.clearInterval(timer.current)
    track('sardar_chip', { chip: chip.id, mode, voice: Boolean(voice.current) })
    setActive(chip.id)
    setChart(null)
    if (voice.current) {
      // Connected to the voice agent: ask it out loud and let it answer in
      // its own words; the chart still comes from the chip.
      voice.current.send(chip.label)
      setMsgs((m) => [...m, { role: 'you', text: chip.label, done: true, chart: null }])
      setChart(chip.chart)
      return
    }
    setSpeaking(true)
    setCanned(true)
    const words = chip.answer.split(' ')
    let i = 0
    setMsgs((m) => [...m, { role: 'you', text: chip.label, done: true }, { role: 'ai', text: '', done: false }])
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = reduced ? words.length : 1
    timer.current = window.setInterval(() => {
      i = Math.min(words.length, i + step)
      const text = words.slice(0, i).join(' ')
      const finished = i >= words.length
      setMsgs((m) => {
        const next = m.slice()
        next[next.length - 1] = { role: 'ai', text, done: finished, chart: finished ? chip.chart : null, cta: finished ? chip.cta : null }
        return next
      })
      if (finished) {
        if (timer.current) window.clearInterval(timer.current)
        timer.current = null
        setSpeaking(false)
        setCanned(false)
        setChart(chip.chart)
      }
    }, 1000 / WPS)
  }, [mode])

  return (
    <>
      <div className="stage" ref={stageRef}>
        <div className="holo">
          <span className={`badge${mode === 'live' ? ' live' : ''}`}>{mode === 'live' ? 'Live · DSP tenant' : DEMO_BADGE}</span>
          <span className={`status${speaking ? ' speaking' : ''}`} aria-live="polite"><i className="dot" />{speaking ? 'Speaking' : 'Listening'}</span>
          <Stage avatarUrl={avatarUrl} speaking={speaking} chart={chart} />
        </div>

        <div className="glass">
          <div className="k">Transcript</div>
          <div className="transcript" ref={logRef} aria-live="polite">
            {msgs.map((m, i) => (
              <div className={`msg ${m.role}`} key={i}>
                <span className="who">{m.role === 'ai' ? 'SARDAR' : 'You'}</span>
                {m.text}{!m.done && <span className="cursor" aria-hidden="true" />}
                {m.chart && <Chart2D chart={m.chart} badge={mode === 'demo' ? DEMO_BADGE : null} />}
                {m.cta && (
                  <p style={{ marginTop: 10 }}>
                    {m.cta.kind === 'mastery' ? (
                      <TrackedLink className="btn btn-accent btn-sm" href={MASTERY_URL} event="academy_cta_click" params={{ cta: `sardar_answer_${active ?? ''}` }}>{m.cta.label} →</TrackedLink>
                    ) : (
                      <TrackedLink className="btn btn-accent btn-sm" href={ASOS_DEMO_URL} target="_blank" rel="noopener" event="agent_hub_click" params={{ cta: `sardar_answer_${active ?? ''}` }}>{m.cta.label} →</TrackedLink>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
          <VoicePanel onTranscript={onTranscript} onSpeaking={onVoiceSpeaking} onApi={onVoiceApi} disabled={canned} />
          <div className="mode">
            <span>Mode</span>
            <span className="seg" role="group" aria-label="Data mode">
              <button type="button" aria-pressed={mode === 'demo'} onClick={() => setMode('demo')}>Demo</button>
              <button type="button" aria-pressed={mode === 'live'} disabled={!canGoLive} title={canGoLive ? 'Read live numbers from DSP Agent Hub' : 'Admins only'} onClick={() => setMode('live')}>Live</button>
            </span>
            {!canGoLive && <span className="muted">Live mode reads DSP&apos;s own Agent Hub. Admin sign-in only.</span>}
          </div>
        </div>
      </div>

      <div className="chips" role="group" aria-label="Ask SARDAR">
        {DEMO_CHIPS.map((c) => (
          <button type="button" className="chip" key={c.id} aria-pressed={active === c.id} disabled={speaking} onClick={() => play(c)}>
            {c.label}
          </button>
        ))}
      </div>
    </>
  )
}
