'use client'
// The site-wide SARDAR launcher: a fixed pill that opens a small panel with
// the same live-call session as /sardar. This chunk holds only the pill and
// its nudge; the panel (with the ElevenLabs SDK, the 2D avatar and the
// /sardar stylesheet) is a second chunk that loads on the first interaction
// — a hover or focus on the pill pre-warms it, a tap opens it.
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'
import { OPEN_EVENT, configFor } from './config'
import './launcher.css'

const Panel = dynamic(() => import('./LauncherPanel'), { ssr: false })
const prewarm = () => { void import('./LauncherPanel') }

/** Home only: one gentle nudge, once per browser, after this long. */
const NUDGE_AFTER_MS = 20_000
const NUDGE_SHOW_MS = 8_000
const NUDGE_KEY = 'sardar_nudged'

export default function Launcher({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const openedAt = useRef(0)
  const isOpen = useRef(false)
  const pill = useRef<HTMLButtonElement>(null)
  const config = configFor(pathname)

  const openPanel = useCallback((source: string) => {
    setNudge(false)
    if (isOpen.current) return
    isOpen.current = true
    openedAt.current = Date.now()
    setOpen(true)
    track('sardar_open', { source, page: pathname })
  }, [pathname])

  // Closing unmounts the panel, and with it the voice session (VoiceSession
  // hangs up and releases the microphone in its unmount cleanup).
  const closePanel = useCallback((how: string) => {
    isOpen.current = false
    setOpen(false)
    track('sardar_close', { duration_s: Math.round((Date.now() - openedAt.current) / 1000), how, page: pathname })
    // Hand focus back to the pill once it is on screen again.
    window.setTimeout(() => pill.current?.focus(), 0)
  }, [pathname])

  // Anything on the page can open the panel (the /mastery "Ask SARDAR" card).
  useEffect(() => {
    const onOpen = (e: Event) => openPanel((e as CustomEvent<{ source?: string }>).detail?.source ?? 'event')
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [openPanel])

  // Home only: "Ask me in Urdu or English", once, 20s in, unless the panel is
  // already open. Remembered per browser so it never nags.
  useEffect(() => {
    if (pathname !== '/' || open) return
    let seen = false
    try { seen = window.localStorage.getItem(NUDGE_KEY) === '1' } catch { /* storage blocked: nudge once per load */ }
    if (seen) return
    const t = window.setTimeout(() => {
      try { window.localStorage.setItem(NUDGE_KEY, '1') } catch { /* fine */ }
      setNudge(true)
    }, NUDGE_AFTER_MS)
    return () => window.clearTimeout(t)
  }, [pathname, open])
  useEffect(() => {
    if (!nudge) return
    const t = window.setTimeout(() => setNudge(false), NUDGE_SHOW_MS)
    return () => window.clearTimeout(t)
  }, [nudge])

  return (
    <div className="sardar-launcher" data-open={open ? 'true' : 'false'}>
      {open && <Panel pathname={pathname} config={config} onClose={closePanel} />}
      {!open && nudge && (
        <div className="sl-nudge" role="status">Ask me in Urdu or English</div>
      )}
      {!open && (
        <button
          ref={pill}
          type="button"
          className="sl-pill"
          aria-haspopup="dialog"
          aria-expanded={false}
          aria-label="Talk to SARDAR, DSP's voice AI Employee"
          onPointerEnter={prewarm}
          onFocus={prewarm}
          onClick={() => openPanel('pill')}
        >
          <span className="sl-face" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="30" height="30">
              <path d="M100 26c-34 0-56 26-56 62 0 30 14 52 34 62v18h44v-18c20-10 34-32 34-62 0-36-22-62-56-62z" fill="#0B1630" stroke="#3FE0F5" strokeWidth="6" />
              <ellipse cx="78" cy="98" rx="11" ry="7" fill="#3FE0F5" /><ellipse cx="122" cy="98" rx="11" ry="7" fill="#3FE0F5" />
              <rect x="84" y="128" width="32" height="12" rx="6" fill="#3FE0F5" fillOpacity=".85" />
            </svg>
          </span>
          <span className="sl-label">Talk to SARDAR</span>
          <svg className="sl-mic" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4Zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2Z" /></svg>
        </button>
      )}
    </div>
  )
}
