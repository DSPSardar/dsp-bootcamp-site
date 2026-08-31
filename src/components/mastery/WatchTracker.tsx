'use client'
import { useEffect, useRef } from 'react'

/** Reports real playback position from the Bunny player back to our API.
 *  Bunny's iframe speaks the player.js protocol, so we listen rather than guess. */
export default function WatchTracker({ lesson }: { lesson: string }) {
  const sent = useRef(0)
  useEffect(() => {
    void fetch('/api/mastery/view', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lesson, opened: true, seconds: 0 }) })

    const iframe = document.querySelector<HTMLIFrameElement>('iframe[src*="mediadelivery.net"]')
    if (!iframe) return
    let duration = 0

    const post = (seconds: number) => {
      if (seconds - sent.current < 20) return          // at most one write per 20s of playback
      sent.current = seconds
      void fetch('/api/mastery/view', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lesson, seconds, duration }) })
    }

    const onMessage = (e: MessageEvent) => {
      if (!/mediadelivery\.net$/.test(new URL(e.origin).hostname)) return
      let d: { event?: string; value?: { seconds?: number; duration?: number } }
      try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
      if (d?.event === 'timeupdate' && d.value) {
        if (d.value.duration) duration = Math.floor(d.value.duration)
        if (typeof d.value.seconds === 'number') post(Math.floor(d.value.seconds))
      }
    }
    window.addEventListener('message', onMessage)

    // ask the player to start sending timeupdate events
    const ask = () => iframe.contentWindow?.postMessage(JSON.stringify({ context: 'player.js', method: 'addEventListener', value: 'timeupdate' }), '*')
    const t = setTimeout(ask, 1200)
    const t2 = setTimeout(ask, 4000)

    // final flush when the student leaves the page
    const flush = () => { if (sent.current > 0) navigator.sendBeacon?.('/api/mastery/view', new Blob([JSON.stringify({ lesson, seconds: sent.current, duration })], { type: 'application/json' })) }
    window.addEventListener('pagehide', flush)
    return () => { window.removeEventListener('message', onMessage); window.removeEventListener('pagehide', flush); clearTimeout(t); clearTimeout(t2) }
  }, [lesson])
  return null
}
