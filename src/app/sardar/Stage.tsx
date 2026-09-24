'use client'
// Chooses the 3D hologram or the 2D avatar for this device, and keeps the
// 3D scene from ever taking the page down: any capability miss or runtime
// error lands on Avatar2D. The R3F bundle is a separate client chunk
// (dynamic import, ssr:false) so it never touches first paint.
import dynamic from 'next/dynamic'
import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import Avatar2D from './Avatar2D'
import type { Chart } from './demo'

const Avatar3D = dynamic(() => import('./Avatar3D'), { ssr: false, loading: () => <Avatar2D speaking={false} /> })

type Props = { avatarUrl: string | null; speaking: boolean; chart: Chart | null }

function canRun3D(): { ok: boolean; mobile: boolean } {
  const mobile = window.matchMedia('(max-width: 720px), (pointer: coarse)').matches
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { ok: false, mobile }
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (typeof mem === 'number' && mem < 4) return { ok: false, mobile }
  if (new URLSearchParams(window.location.search).get('avatar') === '2d') return { ok: false, mobile }
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return { ok: false, mobile }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch { return { ok: false, mobile } }
  return { ok: true, mobile }
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: unknown) { console.warn('[sardar] 3D stage failed, using 2D avatar', err) }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export default function Stage({ avatarUrl, speaking, chart }: Props) {
  // Decided once, on the client, after hydration: the server always renders
  // the 2D avatar, then the first client render swaps in 3D where it can run.
  const [caps, setCaps] = useState<{ ok: boolean; mobile: boolean } | null>(null)
  const [visible, setVisible] = useState(true)
  const host = useRef<HTMLDivElement>(null)

  // The 2D avatar is already on screen, so the ~1 MB three.js chunk waits
  // for the visitor's first gesture (pointer, touch, scroll, key) or, if
  // they just look, an idle moment a few seconds after load. That keeps
  // parsing it off the critical path on slow phones and out of the
  // Lighthouse window (TBT), and costs nothing anyone sees.
  useEffect(() => {
    let done = false
    const go = () => { if (done) return; done = true; cleanup(); setCaps(canRun3D()) }
    const evs: Array<keyof WindowEventMap> = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown']
    evs.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }))
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    const t = window.setTimeout(() => { if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 2000 }); else go() }, 3500)
    const cleanup = () => { evs.forEach((e) => window.removeEventListener(e, go)); window.clearTimeout(t) }
    return () => { done = true; cleanup() }
  }, [])
  const mode = caps === null ? 'pending' : caps.ok ? '3d' : '2d'
  const mobile = caps?.mobile ?? false

  // Pause the render loop while the stage is scrolled away.
  useEffect(() => {
    const el = host.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const fallback = <Avatar2D speaking={speaking} />
  return (
    <div ref={host} style={{ position: 'absolute', inset: 0 }}>
      {mode === '3d' ? (
        <Boundary fallback={fallback}>
          <Avatar3D avatarUrl={avatarUrl} speaking={speaking} chart={chart} active={visible} mobile={mobile} />
        </Boundary>
      ) : fallback}
    </div>
  )
}
