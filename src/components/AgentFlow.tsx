'use client'
import { useEffect, useRef, useState } from 'react'

const FLOW_NODES = [
  'User', 'Planner', 'Research', 'Tool', 'Memory', 'Evaluation', 'Final Output',
]

export default function AgentFlow() {
  const [active, setActive] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    const t = setInterval(() => {
      setActive((a) => (a + 1) % FLOW_NODES.length)
    }, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: 'var(--ink-1)', padding: '4rem 0' }}>
      <div className="section">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>Agent Communication</p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: 'var(--text)',
            marginBottom: '2.5rem',
          }}
        >
          How agents pass work.
        </h2>

        <div
          role="img"
          aria-label="Agent communication flow: User to Planner to Research to Tool to Memory to Evaluation to Final Output"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          {FLOW_NODES.map((node, i) => (
            <div
              key={node}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: 8,
                  border: `1.5px solid ${i === active ? 'var(--mint)' : 'var(--line)'}`,
                  background:
                    i === active
                      ? 'rgba(84,230,192,0.1)'
                      : 'var(--panel)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: i === active ? 'var(--mint)' : 'var(--muted)',
                  transition: 'all 0.3s',
                  boxShadow:
                    i === active
                      ? '0 0 16px rgba(84,230,192,0.25)'
                      : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {node}
              </div>
              {i < FLOW_NODES.length - 1 && (
                <span
                  aria-hidden
                  style={{
                    color: 'var(--muted)',
                    fontSize: '1rem',
                    opacity: 0.5,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
