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

        {/* Course Outline Download Card */}
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--panel)', borderRadius: 12, border: '1px solid var(--line)', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mint)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              📋 Detailed Curriculum
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
              Get the Full Course Outline
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
              Download the complete 5-day curriculum with learning objectives, daily projects, and deliverables
            </p>
            <a
              href="/DSP_Bootcamp_Course_Outline.docx"
              download="DSP_Bootcamp_Course_Outline.docx"
              className="btn-primary"
              style={{ display: 'inline-flex', gap: '0.5rem' }}
            >
              ⬇️ Download (DOCX)
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
