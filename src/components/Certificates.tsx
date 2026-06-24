// src/components/Certificates.tsx
import Reveal from './Reveal'

const CERTS = [
  { title: 'Claude Certificate',        by: 'Guided by DSP',  mint: false },
  { title: 'Claude Cowork Certificate', by: 'Guided by DSP',  mint: false },
  { title: 'Claude Code Certificate',   by: 'Guided by DSP',  mint: false },
  { title: 'DSP Completion Certificate',by: 'Awarded by DSP', mint: true  },
]

export default function Certificates() {
  return (
    <section id="certificates" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Certificate Pathway</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Four certificates on completion.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {CERTS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80}>
              <div
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: 14,
                  border: `1.5px solid ${cert.mint ? 'var(--mint)' : 'var(--line)'}`,
                  background: cert.mint
                    ? 'rgba(84,230,192,0.06)'
                    : 'var(--panel)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontSize: '1.75rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  🏅
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: cert.mint ? 'var(--mint)' : 'var(--text)',
                    lineHeight: 1.3,
                  }}
                >
                  {cert.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--muted)',
                  }}
                >
                  {cert.by}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
