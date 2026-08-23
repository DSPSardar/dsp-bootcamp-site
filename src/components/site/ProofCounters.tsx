'use client'
import { useEffect, useRef, useState } from 'react'
import { agency } from '@/config/site'

// Product proof bar: 4 stat blocks whose numbers count up when scrolled
// into view. Falls back to static numbers when reduced motion is set or
// IntersectionObserver is unavailable.
const DURATION_MS = 1400

const stats = [
  { value: agency.proof.leads, label: 'leads processed', decimals: 0, suffix: '' },
  { value: agency.proof.sales, label: 'sales closed by AI', decimals: 0, suffix: '' },
  { value: agency.proof.zeroTakeoverPct, label: 'handled with zero human takeover', decimals: 1, suffix: '%' },
  { value: agency.proof.daysToLive, label: 'from signup to live', decimals: 0, suffix: ' days' },
]

export default function ProofCounters() {
  const ref = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      raf = requestAnimationFrame(() => setProgress(1))
      return () => cancelAnimationFrame(raf)
    }
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
