'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Props = {
  src: string
  title: string
  /** Optional still frame for the facade (site-relative, e.g.
   *  '/mastery/welcome-poster.jpg'). Served through next/image, lazy, sized
   *  to the box. Without it the facade is the plain play button. */
  poster?: string
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

export default function LazyEmbed({ src, title, poster, load = 'visible', portrait = false, style, className }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (load !== 'visible' || ready) return
    const el = box.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      // No observer support: mount on the next tick (not synchronously in
      // the effect, which React flags as a cascading render).
      const t = setTimeout(() => setReady(true), 0)
      return () => clearTimeout(t)
    }
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
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes={portrait ? '(max-width: 640px) 100vw, 300px' : '(max-width: 900px) 100vw, 900px'}
              style={{ objectFit: 'cover', zIndex: 0 }}
            />
          )}
          <span aria-hidden style={{ position: 'relative', zIndex: 1, width: 64, height: 64, borderRadius: '50%', border: '2px solid currentColor', display: 'grid', placeItems: 'center', fontSize: 26, background: poster ? 'rgba(0,0,0,.45)' : undefined }}>▶</span>
          <span style={{ position: 'relative', zIndex: 1, fontSize: 14, opacity: .8, textShadow: poster ? '0 1px 6px rgba(0,0,0,.7)' : undefined }}>{title}</span>
        </button>
      )}
    </div>
  )
}
