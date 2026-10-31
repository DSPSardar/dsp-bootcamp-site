'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

/** Reports real playback position from the Bunny player back to our API.
 *  Bunny's iframe speaks the player.js protocol, so we listen rather than guess.
 *
 *  `unlockAt` / `initialFrac`: the "Mark lesson complete" button is rendered on the
 *  server from the watch record at page-load time. Once the student crosses the
 *  threshold *during* playback we flush the position and re-render the page so the
 *  button enables itself — otherwise it would stay "Keep watching — 0%" until a
 *  manual reload, and the next module never unlocks.
 *
 *  Why the subscription is so insistent (29 Sep 2026): the old version asked the
 *  iframe for `timeupdate` events exactly twice, at 1.2s and 4s after mount. On a
 *  slow connection the Bunny player is not loaded yet at 4s, both messages fall on
 *  the floor, and the student watches the whole lecture at "0%" — module never
 *  unlocks. Now we (1) re-ask on the iframe's `load` event and on the player's
 *  `ready` event, (2) keep re-asking every 2s until the first `timeupdate` arrives,
 *  and (3) poll `getCurrentTime` / `getDuration` every 15s as a belt-and-braces
 *  fallback in case events never come through. */
export default function WatchTracker({ lesson, unlockAt = 0.8, initialFrac = 0 }: { lesson: string; unlockAt?: number; initialFrac?: number }) {
  const sent = useRef(0)
  const refreshed = useRef(initialFrac >= unlockAt)
  const router = useRouter()
  useEffect(() => {
    void fetch('/api/mastery/view', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lesson, opened: true, seconds: 0 }) })

    // Resolve the player lazily: StableVideoFrame can remount the iframe (stall recovery),
    // so a reference captured at mount time would point at a dead window.
    const frame = () => document.querySelector<HTMLIFrameElement>('iframe[src*="mediadelivery.net"]')
    if (!frame()) return
    let duration = 0
    let readyHandled = false
    let subscribed = false          // first timeupdate received — stop re-asking
    let lastSeconds = 0

    const send = (seconds: number) => fetch('/api/mastery/view', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lesson, seconds, duration }) })

    const post = (seconds: number) => {
      if (!Number.isFinite(seconds) || seconds < 0) return
      lastSeconds = Math.max(lastSeconds, seconds)
      // Crossed the completion threshold: write immediately, then re-render so the button enables.
      if (!refreshed.current && duration > 0 && seconds / duration >= unlockAt) {
        refreshed.current = true
        sent.current = seconds
        void send(seconds).then(() => router.refresh())
        return
      }
      if (seconds - sent.current < 20) return          // at most one write per 20s of playback
      sent.current = seconds
      void send(seconds)
    }

    const tell = (method: string, value?: string) =>
      frame()?.contentWindow?.postMessage(JSON.stringify({ context: 'player.js', version: '0.0.11', method, value, listener: 'dsp' }), '*')
    // `ready` is emitted automatically. Subscribing to it inside its own handler
    // makes Player.js immediately emit it again, creating an unbounded message loop.
    const subscribe = () => { tell('addEventListener', 'timeupdate') }

    const onMessage = (e: MessageEvent) => {
      const iframe = frame()
      if (!iframe || e.source !== iframe.contentWindow) return
      if (e.origin !== new URL(iframe.src).origin) return
      let d: { event?: string; method?: string; value?: unknown }
      try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
      if (!d || typeof d !== 'object' || (d as { context?: string }).context !== 'player.js') return
      if (d.event === 'ready') {
        if (readyHandled) return
        readyHandled = true
        subscribe()
        return
      }
      if (d.event === 'timeupdate' && d.value && typeof d.value === 'object') {
        subscribed = true
        const v = d.value as { seconds?: number; duration?: number }
        if (v.duration) duration = Math.floor(v.duration)
        if (typeof v.seconds === 'number') post(Math.floor(v.seconds))
        return
      }
      // Replies to the polling fallback below.
      if ((d.event === 'getDuration' || d.method === 'getDuration') && typeof d.value === 'number' && d.value > 0) duration = Math.floor(d.value)
      if ((d.event === 'getCurrentTime' || d.method === 'getCurrentTime') && typeof d.value === 'number') post(Math.floor(d.value))
    }
    window.addEventListener('message', onMessage)

    // Ask for events now, again when the iframe finishes loading, and keep asking every 2s
    // (for up to 2 minutes) until the player answers — slow networks load the player late.
    let tries = 0
    let retry: ReturnType<typeof setInterval> | undefined
    const startRetry = () => {
      clearInterval(retry)
      tries = 0
      retry = setInterval(() => { if (subscribed || ++tries > 60) { clearInterval(retry); return } subscribe() }, 2000)
    }
    let boundFrame = frame()
    boundFrame?.addEventListener('load', subscribe)
    subscribe()
    startRetry()
    // The frame was remounted (stall recovery): bind to the new iframe and subscribe again.
    const onRemount = () => {
      boundFrame?.removeEventListener('load', subscribe)
      boundFrame = frame()
      boundFrame?.addEventListener('load', subscribe)
      subscribed = false
      readyHandled = false
      subscribe()
      startRetry()
    }
    window.addEventListener('dsp:video-remount', onRemount)

    // Fallback: poll position directly. Harmless when events already work (same numbers).
    const poll = setInterval(() => { tell('getDuration'); tell('getCurrentTime') }, 15000)

    // final flush when the student leaves the page
    const flush = () => {
      const s = Math.max(sent.current, lastSeconds)
      if (s > 0) navigator.sendBeacon?.('/api/mastery/view', new Blob([JSON.stringify({ lesson, seconds: s, duration })], { type: 'application/json' }))
    }
    const onHide = () => { if (document.visibilityState === 'hidden') flush() }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.removeEventListener('message', onMessage); window.removeEventListener('pagehide', flush); document.removeEventListener('visibilitychange', onHide)
      boundFrame?.removeEventListener('load', subscribe); window.removeEventListener('dsp:video-remount', onRemount); clearInterval(retry); clearInterval(poll)
    }
  }, [lesson, unlockAt, router])
  return null
}
