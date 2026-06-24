// src/components/Learn.tsx
import Reveal from './Reveal'

const ITEMS = [
  'AI Agent Thinking',
  'Vibe Coding',
  'Agent Tools & APIs',
  'Agent-to-Agent Comms',
  'Skills & Memory',
  'Testing & Evaluation',
  'Agent Security',
  'Deployment Readiness',
  'Production Workflows',
]

export default function Learn() {
  return (
    <section id="learn" style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Curriculum</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            What you will learn.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {ITEMS.map((item, i) => (
            <Reveal key={item} delay={i * 50}>
              <div
                className="panel"
                style={{ padding: '1.5rem' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--gold)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                  }}
                >
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
