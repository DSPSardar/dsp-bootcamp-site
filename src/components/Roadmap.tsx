// src/components/Roadmap.tsx
import Reveal from './Reveal'

const STEPS = [
  { range: 'Days 1–2',  label: 'Live modules & guided learning' },
  { range: 'Days 3–4',  label: 'Agent tools, memory & practice' },
  { range: 'Days 5–6',  label: 'Build, implement & deploy prep' },
  { range: 'Day 7',     label: 'Final project, showcase & next steps' },
]

export default function Roadmap() {
  return (
    <section id="roadmap" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 700 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Schedule</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            7-Day Roadmap.
          </h2>
        </Reveal>

        <div style={{ position: 'relative' }}>
          <div
            aria-hidden
            style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--gold) 0%, var(--mint) 100%)', borderRadius: 2 }}
          />
          <ol style={{ listStyle: 'none' }}>

          {STEPS.map((step, i) => (
            <Reveal key={step.range} delay={i * 80}>
              <li
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  paddingBottom: i < STEPS.length - 1 ? '2rem' : 0,
                  position: 'relative',
                }}
              >
                {/* Pin */}
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--panel)',
                    border: '2px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--gold)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.range}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text)',
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
