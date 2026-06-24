// src/components/Audience.tsx
import Reveal from './Reveal'

const PILLS = [
  'Beginners', 'Non-programmers', 'Marketers', 'Sales professionals',
  'Teachers', 'Entrepreneurs', 'Small business owners', 'Students',
  'Business teams', 'Future AI builders',
]

export default function Audience() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Who This Is For</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '2.5rem',
            }}
          >
            Anyone can start here.
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          {PILLS.map((pill, i) => (
            <Reveal key={pill} delay={i * 40}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  color: 'var(--text)',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 9999,
                  padding: '0.5rem 1.125rem',
                }}
              >
                {pill}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
