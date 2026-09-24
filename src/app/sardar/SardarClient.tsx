'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'
import TrackedLink from '@/components/site/TrackedLink'
import Stage from './Stage'
import VoicePanel from './VoicePanel'
import Chart2D from './Chart2D'
import type { VoiceApi } from './VoiceSession'
import { DEMO_BADGE, DEMO_CHIPS, type Chart, type Chip } from './demo'
import { ASOS_DEMO_URL, MASTERY_URL } from './links'
import { CHIP_LIVE_PATH, fetchLive, hasSessionCookie, probeLive } from './live'
import { lipsync, look } from './store'

type Msg = { role: 'you' | 'ai'; text: string; chart?: Chart | null; badge?: string | null; cta?: Chip['cta'] | null; done: boolean }
type Mode = 'demo' | 'live'

const GREETING =
  'Hi, I am SARDAR, an AI Employee built on DSP Agent Hub. Tap a question below and I will show you what I do all day. Or ask in English, Urdu or Roman Urdu.'

/** Words per second for the typewriter reveal of scripted and live answers. */
const WPS = 3.4

const timeLabel = (iso: string) => {
  try { return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) } catch { return '' }
}

export default function SardarClient({ avatarUrl = null }: { avatarUrl?: string | null }) {
  const [mode, setMode] = useState<Mode>('demo')
  const [live, setLive] = useState<{ admin: boolean; configured: boolean } | null>(null)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: GREETING, done: true }])
  const [active, setActive] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [chart, setChart] = useState<Chart | null>(null)
  const [canned, setCanned] = useState(false) // a scripted or live answer is typing out
  const stageRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)
  const voice = useRef<VoiceApi | null>(null)
  const inflight = useRef<AbortController | null>(null)

  // Live Mode is admin-only. Anonymous visits never call the API: the probe
  // runs only when a Supabase session cookie is present.
  useEffect(() => {
    if (!hasSessionCookie()) return
    let on = true
    probeLive().then((r) => { if (on) setLive(r) })
    return () => { on = false }
  }, [])

  // Head-tracks the cursor (and the last touch) by writing --look-x/-y on
  // the stage and the shared `look` store the 3D scene reads.
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

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); inflight.current?.abort(); lipsync.synthetic = false }, [])

  // The mouth follows real audio once the voice session is up; otherwise a
  // synthetic level runs while an answer types out.
  useEffect(() => { lipsync.synthetic = speaking && !lipsync.attached }, [speaking])

  /** Type `text` into a fresh SARDAR bubble, then reveal its chart + CTA. */
  const speak = useCallback((text: string, extra: { chart?: Chart | null; badge?: string | null; cta?: Chip['cta'] | null }) => {
    if (timer.current) window.clearInterval(timer.current)
    setSpeaking(true)
    setCanned(true)
    setChart(null)
    const words = text.split(' ')
    let i = 0
    setMsgs((m) => [...m, { role: 'ai', text: '', done: false }])
    const step = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? words.length : 1
    timer.current = window.setInterval(() => {
      i = Math.min(words.length, i + step)
      const finished = i >= words.length
      setMsgs((m) => {
        const next = m.slice()
        next[next.length - 1] = { role: 'ai', text: words.slice(0, i).join(' '), done: finished, ...(finished ? extra : {}) }
        return next
      })
      if (finished) {
        if (timer.current) window.clearInterval(timer.current)
        timer.current = null
        setSpeaking(false)
        setCanned(false)
        setChart(extra.chart ?? null)
      }
    }, 1000 / WPS)
  }, [])

  // Live voice: the agent's words land in the same transcript, its speaking
  // state drives the same mouth, and chips become spoken questions.
  const onTranscript = useCallback((role: 'you' | 'ai', text: string) => {
    setMsgs((m) => [...m, { role, text, done: true }])
  }, [])
  const onVoiceSpeaking = useCallback((on: boolean) => {
    if (timer.current) return // an answer is mid-flight; leave its state alone
    setSpeaking(on)
  }, [])
  const onVoiceApi = useCallback((api: VoiceApi | null) => { voice.current = api }, [])

  const play = useCallback((chip: Chip) => {
    const livePath = mode === 'live' ? CHIP_LIVE_PATH[chip.id] : null
    track('sardar_chip', { chip: chip.id, mode, voice: Boolean(voice.current) })
    setActive(chip.id)
    setMsgs((m) => [...m, { role: 'you', text: chip.label, done: true }])

    if (voice.current && !livePath) {
      // Connected to the voice agent: ask it out loud and let it answer in
      // its own words; the chart still comes from the chip.
      voice.current.send(chip.label)
      setChart(chip.chart)
      return
    }

    if (livePath) {
      inflight.current?.abort()
      const ac = new AbortController()
      inflight.current = ac
      setSpeaking(true); setCanned(true); setChart(null)
      setMsgs((m) => [...m, { role: 'ai', text: 'Reading DSP Agent Hub…', done: false }])
      fetchLive(livePath, ac.signal)
        .then((r) => {
          if (ac.signal.aborted) return
          setMsgs((m) => m.slice(0, -1))
          speak(r.text, { chart: r.chart, badge: `Live · DSP Agent Hub · ${timeLabel(r.fetchedAt)}`, cta: chip.cta })
        })
        .catch((err: Error) => {
          if (ac.signal.aborted) return
          setMsgs((m) => m.slice(0, -1))
          speak(`I could not read DSP Agent Hub just now (${err.message}). Switch to Demo to see the scripted answer.`, {})
        })
      return
    }

    speak(chip.answer, { chart: chip.chart, badge: DEMO_BADGE, cta: chip.cta })
  }, [mode, speak])

  const canGoLive = Boolean(live?.admin)
  const liveHint = live === null
    ? 'Live mode reads DSP’s own Agent Hub. Admin sign-in only.'
    : !live.admin ? 'Live mode reads DSP’s own Agent Hub. Admin sign-in only.'
    : !live.configured ? 'Signed in as admin. ASOS_API_URL / ASOS_API_KEY are not set on this deployment.'
    : mode === 'live' ? 'Live: numbers come straight from DSP Agent Hub, read-only.'
    : 'Signed in as admin. Switch to Live for real Agent Hub numbers.'

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
                {m.chart && <Chart2D chart={m.chart} badge={m.badge ?? null} />}
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
              <button type="button" aria-pressed={mode === 'live'} disabled={!canGoLive} title={canGoLive ? 'Read live numbers from DSP Agent Hub' : 'Admins only'} onClick={() => { setMode('live'); track('sardar_mode', { mode: 'live' }) }}>Live</button>
            </span>
            <span className="muted">{liveHint}</span>
          </div>
        </div>
      </div>

      <div className="chips" role="group" aria-label="Ask SARDAR">
        {DEMO_CHIPS.map((c) => (
          <button type="button" className="chip" key={c.id} aria-pressed={active === c.id} disabled={canned} onClick={() => play(c)}>
            {c.label}
          </button>
        ))}
      </div>
    </>
  )
}
