// src/components/Project.tsx
import Reveal from './Reveal'

const STEPS = [
  { label: 'Task Planner',       desc: 'Define the agent\'s goal and plan its steps.' },
  { label: 'Tool Steps',         desc: 'Select and sequence the tools the agent will use.' },
  { label: 'Memory & Context',   desc: 'Add memory so the agent retains relevant information.' },
  { label: 'Final Review',       desc: 'Evaluate agent output and refine behaviour.' },
  { label: 'Presentation',       desc: 'Present your working agent to the cohort on Day 7.' },
]

export default function Project() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div
        className="section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Copy */}
        <Reveal>
          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Final Project</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Ship something real on Day&nbsp;7.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              Every student builds and presents a working AI agent. You'll plan
              it, tool it, give it memory, evaluate it, and demo it live to the
              cohort.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp Us →
              </a>
              <a
                href="tel:+923118122222"
                className="btn-ghost"
              >
                Call +92 311 8122222
              </a>
            </div>
          </div>
        </Reveal>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.label} delay={i * 70}>
              <div
                className="panel"
                style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--gold)',
                    background: 'rgba(255,195,77,0.1)',
                    border: '1px solid rgba(255,195,77,0.2)',
                    borderRadius: 4,
                    padding: '0.2rem 0.5rem',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
