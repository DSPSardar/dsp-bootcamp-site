'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Props = {
  src: string
  title: string
  /** 'visible' — mount when the box scrolls near the viewport (default, UX
   *  unchanged). 'click' — render a play facade and mount on tap (largest
   *  saving; the player still needs its own press to start). */
  load?: 'visible' | 'click'
  /** Portrait (9:16) or landscape (16:9). */
  portrait?: boolean
  style?: CSSProperties
  className?: string
}

const IFRAME_STYLE: CSSProperties = { border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }

export default function LazyEmbed({ src, title, load = 'visible', portrait = false, style, className }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (load !== 'visible' || ready) return
    const el = box.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setReady(true); return }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setReady(true); io.disconnect() } },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [load, ready])

  return (
    <div
      ref={box}
      className={className}
      style={{ position: 'relative', paddingTop: portrait ? '150%' : '56.25%', overflow: 'hidden', background: 'var(--ink)', ...style }}
    >
      {ready ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          style={IFRAME_STYLE}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label={`Play: ${title}`}
          onClick={() => setReady(true)}
          style={{
            ...IFRAME_STYLE,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,.06), transparent 70%)',
            color: 'var(--paper, #fff)', cursor: 'pointer', font: 'inherit',
          }}
        >
          <span aria-hidden style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid currentColor', display: 'grid', placeItems: 'center', fontSize: 26 }}>▶</span>
          <span style={{ fontSize: 14, opacity: .8 }}>{title}</span>
        </button>
      )}
    </div>
  )
}
