// src/components/Outcomes.tsx
import Reveal from './Reveal'

const OUTCOMES = [
  'Understand how AI agents work',
  'Design agentic workflows',
  'Use tools and APIs conceptually',
  'Build with vibe coding',
  'Add memory and skills to agents',
  'Test and evaluate agents',
  'Understand agent security',
  'Prepare agents for deployment',
  'Present a final project',
]

export default function Outcomes() {
  return (
    <section id="outcomes" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Course Outcomes</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            What you'll walk away with.
          </h2>
        </Reveal>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
            listStyle: 'none',
          }}
        >
          {OUTCOMES.map((outcome, i) => (
            <Reveal key={outcome} delay={i * 50}>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    color: 'var(--mint)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                    lineHeight: 1.55,
                  }}
                >
                  {outcome}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
