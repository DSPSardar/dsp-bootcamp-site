// src/components/Modules.tsx
import Reveal from './Reveal'

const MODULES = [
  { n: '01', title: 'Intro to AI Agents & Vibe Coding' },
  { n: '02', title: 'Agent Tools & Interoperability' },
  { n: '03', title: 'Agent Skills & Memory' },
  { n: '04', title: 'Vibe Coding, Security & Evaluation' },
  { n: '05', title: 'Production-Grade Agentic Fleets' },
  { n: '06', title: 'Deployment & Production Readiness' },
]

export default function Modules() {
  return (
    <section id="modules" style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Live Zoom Modules</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Six live sessions.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={i * 60}>
              <div
                className="module-row"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  cursor: 'default',
                  transition: 'border-color 0.2s, background 0.2s',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="ghost-num"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)',
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'color 0.2s',
                    pointerEvents: 'none',
                  }}
                >
                  {m.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--gold)',
                    minWidth: '2rem',
                  }}
                >
                  {m.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text)',
                  }}
                >
                  {m.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .module-row:hover {
          border-color: rgba(255,195,77,0.3) !important;
          background: rgba(255,195,77,0.03) !important;
        }
        .module-row:hover .ghost-num {
          color: rgba(255,195,77,0.12) !important;
        }
      `}</style>
    </section>
  )
}
