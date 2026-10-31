'use client'

import { useCallback, useEffect, useRef, useState, type ComponentProps } from 'react'

/** Lesson player frame with self-healing playback.
 *
 *  Why this exists: students on slow or flaky connections (mobile data, throttled
 *  international routes) hit a Bunny player that stops advancing — spinner or frozen
 *  frame — and the only way out was a full page reload that threw away their position.
 *
 *  What it does now:
 *  1. Keeps the mounted player's URL fixed (progress refreshes can cross a signing-time
 *     bucket; the iframe must not reload mid-lecture).
 *  2. Watches playback through the player.js protocol. If the player claims to be playing
 *     but the position has not moved for STALL_MS, it remounts the iframe, seeks back to
 *     where the student was and presses play — up to MAX_AUTO times in a row.
 *  3. The manual "Video stuck?" button does the same soft recovery, resuming from the saved
 *     position. It only falls back to a full page reload when the signed link has expired
 *     (a new link can only come from the server).
 *  4. A page restored from the back/forward cache with an expired link reloads itself. */
const STALL_MS = 25_000
const CHECK_MS = 5_000
const MAX_AUTO = 3
const EXPIRY_MARGIN_S = 120

function linkExpired(src: string | undefined): boolean {
  if (!src) return false
  try {
    const exp = Number(new URL(src, window.location.href).searchParams.get('expires'))
    return Number.isFinite(exp) && exp > 0 && exp - Date.now() / 1000 < EXPIRY_MARGIN_S
  } catch {
    return false
  }
}

export default function StableVideoFrame(props: ComponentProps<'iframe'>) {
  const [src] = useState(props.src)
  const [instance, setInstance] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)
  const ref = useRef<HTMLIFrameElement>(null)
  const readyHandled = useRef(false)
  const st = useRef({ playing: false, time: 0, progressAt: 0, resumeAt: 0, autos: 0, recoveredAt: 0 })

  const tell = useCallback((method: string, value?: unknown) => {
    ref.current?.contentWindow?.postMessage(
      JSON.stringify({ context: 'player.js', version: '0.0.11', method, value, listener: 'dsp-frame' }),
      '*'
    )
  }, [])

  const subscribe = useCallback(() => {
    // Player.js answers an addEventListener('ready') command immediately when ready.
    // Never re-request it from the ready handler: that creates a message feedback loop.
    for (const ev of ['play', 'pause', 'ended', 'timeupdate', 'error']) tell('addEventListener', ev)
  }, [tell])

  /** Remount the iframe and resume from the last known position. */
  const softReload = useCallback((auto: boolean) => {
    const s = st.current
    if (auto) {
      if (s.autos >= MAX_AUTO) {
        s.playing = false
        setNotice('The connection looks slow. Press the button to try again, or switch to a stronger network.')
        return
      }
      s.autos += 1
    } else {
      s.autos = 0
    }
    s.resumeAt = s.time
    s.playing = false
    s.progressAt = Date.now()
    s.recoveredAt = Date.now()
    setNotice(null)
    setInstance((i) => i + 1)
  }, [])

  const onButton = useCallback(() => {
    if (linkExpired(src)) window.location.reload()
    else softReload(false)
  }, [src, softReload])

  // After a remount: tell the progress tracker to re-bind to the new iframe, and re-subscribe.
  useEffect(() => {
    readyHandled.current = false
    if (instance > 0) window.dispatchEvent(new Event('dsp:video-remount'))
    const t = setTimeout(subscribe, 1500)
    return () => clearTimeout(t)
  }, [instance, subscribe])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const iframe = ref.current
      if (!iframe || e.source !== iframe.contentWindow) return
      if (e.origin !== new URL(iframe.src).origin) return
      let d: { event?: string; method?: string; value?: unknown }
      try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
      if (!d || typeof d !== 'object' || (d as { context?: string }).context !== 'player.js') return
      const s = st.current
      const now = Date.now()
      if (d.event === 'ready') {
        if (readyHandled.current) return
        readyHandled.current = true
        subscribe()
        if (s.resumeAt > 1) {
          tell('setCurrentTime', s.resumeAt)
          tell('play')
          s.resumeAt = 0
        }
        s.progressAt = now
        return
      }
      if (d.event === 'play') { s.playing = true; s.progressAt = now; return }
      if (d.event === 'pause' || d.event === 'ended') { s.playing = false; return }
      if (d.event === 'timeupdate' && d.value && typeof d.value === 'object') {
        const sec = (d.value as { seconds?: number }).seconds
        if (typeof sec === 'number') {
          if (Math.abs(sec - s.time) > 0.2) s.progressAt = now
          s.time = sec
          // Healthy for a minute since the last recovery: forget earlier attempts.
          if (s.autos > 0 && now - s.recoveredAt > 60_000) s.autos = 0
        }
        return
      }
      if (d.event === 'error') { softReload(true); return }
      // Reply to the watchdog's getPaused probe: not paused + no progress = genuinely stuck.
      if ((d.event === 'getPaused' || d.method === 'getPaused') && typeof d.value === 'boolean') {
        if (d.value) s.playing = false
        else if (s.playing && now - s.progressAt > STALL_MS) softReload(true)
      }
    }
    const onRemount = () => { readyHandled.current = false }
    window.addEventListener('dsp:video-remount', onRemount)
    window.addEventListener('message', onMessage)

    const watchdog = setInterval(() => {
      const s = st.current
      if (!s.playing || document.visibilityState === 'hidden') return
      if (Date.now() - s.progressAt > STALL_MS) tell('getPaused')
    }, CHECK_MS)

    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted && linkExpired(src)) window.location.reload() }
    window.addEventListener('pageshow', onPageShow)
    // When the tab becomes visible again, restart the stall clock so a background-throttled
    // tab is not mistaken for a stalled player.
    const onVisible = () => { if (document.visibilityState === 'visible') st.current.progressAt = Date.now() }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.removeEventListener('dsp:video-remount', onRemount)
      window.removeEventListener('message', onMessage)
      window.removeEventListener('pageshow', onPageShow)
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(watchdog)
    }
  }, [src, subscribe, tell, softReload])

  return (
    <>
      <iframe {...props} ref={ref} key={instance} src={src} onLoad={subscribe} />
      {notice && (
        <div
          role="status"
          style={{ position: 'absolute', left: 8, right: 8, bottom: 8, zIndex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(10,23,48,0.92)', color: '#fff', fontSize: 13 }}
        >
          {notice}
        </div>
      )}
      <button
        type="button"
        onClick={onButton}
        style={{ position: 'absolute', right: 8, top: 8, zIndex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #8893a5', background: '#0A1730', color: '#fff', cursor: 'pointer', fontSize: 12 }}
        title="Restarts the player and resumes from where you were. Your saved lesson progress is kept."
      >
        Video stuck? Reload video
      </button>
    </>
  )
}
