'use client'
import { useEffect, useRef, useState } from 'react'
import { track } from '@/lib/track'

// Homepage section 02 (blueprint §4) — the evolution rail, and the site's
// ONE animation (§7): stages light up as they scroll into view, 200ms
// opacity/translate, nothing else. Server HTML and no-JS render fully lit
// (so crawlers and reduced-motion users see everything); the observer only
// dims-then-reveals after mount. Fires view_evolution_complete (§11) once,
// when the final stage has actually been seen.
const STAGES = [
  {
    name: 'Website',
    verb: 'displays',
    line: 'Your business, visible. It shows information and waits.',
  },
  {
    name: 'Chatbot',
    verb: 'talks',
    line: 'Scripted answers to expected questions. Off-script, it breaks.',
  },
  {
    name: 'AI Agent',
    verb: 'acts',
    line: 'Understands a goal, picks its tools, completes the task.',
  },
  {
    // 2x visual weight per §4 — the category this site owns.
    name: 'AI Employee',
    verb: 'works',
    line:
      'An agent with a job description, knowledge, memory, tools, and guardrails — doing one real job in your business, around the clock, and reporting its work.',
    featured: true,
  },
  {
    name: 'AI Workforce',
    verb: 'collaborates',
    line: 'Several Employees on one team, handing work to each other.',
  },
]

export default function Evolution() {
  const ref = useRef<HTMLOListElement>(null)
  // Server-rendered state: every stage lit (never ship a dimmed page to
  // no-JS users or crawlers). The observer takes over after mount.
  const [lit, setLit] = useState(STAGES.length)
  const completeFired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return // keep everything lit, no animation
    }
    const items = Array.from(el.children)
    // Dim on the next frame (not synchronously in the effect) — the server
    // HTML stays fully lit until the observer takes over.
    const raf = requestAnimationFrame(() => setLit(0))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = items.indexOf(entry.target)
          setLit((current) => Math.max(current, index + 1))
          observer.unobserve(entry.target)
          if (index === items.length - 1 && !completeFired.current) {
            completeFired.current = true
            track('view_evolution_complete')
          }
        }
      },
      { threshold: 0.5 }
    )
    items.forEach((item) => observer.observe(item))
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <ol className="evo" ref={ref}>
      {STAGES.map((stage, i) => (
        <li key={stage.name} className={`${stage.featured ? 'featured' : ''}${i < lit ? ' on' : ''}`}>
          <span className="stage-verb">{stage.verb}</span>
          <h3>{stage.name}</h3>
          <p>{stage.line}</p>
        </li>
      ))}
    </ol>
  )
}
