'use client'
import { useEffect, useRef, useState } from 'react'
import { agency } from '@/config/site'

// Product proof bar: 4 stat blocks. The REAL values are rendered into the
// server HTML (progress starts at 1) so crawlers and no-JS users never see
// zeros; the count-up animation only runs on top of them, after mount, for
// users without reduced-motion. Values + as-of date live in config.
const DURATION_MS = 1400

const stats = [
  { value: agency.proof.leads, label: 'leads processed', decimals: 0, suffix: '' },
  { value: agency.proof.sales, label: 'sales closed by AI', decimals: 0, suffix: '' },
  { value: agency.proof.zeroTakeoverPct, label: 'handled with zero human takeover', decimals: 1, suffix: '%' },
  { value: agency.proof.daysToLive, label: 'from signup to live', decimals: 0, suffix: ' days' },
]

export default function ProofCounters() {
  const ref = useRef<HTMLUListElement>(null)
  // 1 = final values, matching the server-rendered HTML exactly.
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reduced motion or no IntersectionObserver: keep the static values.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1)
          setProgress(1 - Math.pow(1 - t, 3)) // ease-out cubic
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <ul ref={ref}>
      {stats.map((s) => (
        <li key={s.label}>
          <strong>
            {(s.value * progress).toFixed(s.decimals)}
            {s.suffix}
          </strong>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}
