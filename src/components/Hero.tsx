// src/components/Hero.tsx
import AgentConsole from './AgentConsole'

const CHIPS = [
  'Live Zoom Training',
  'Beginner Friendly',
  '3 Anthropic Certificates',
  'Hands-On Practice',
  'Final Project',
]

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '5rem 1.25rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      <style>{`
        @media (min-width: 900px) {
          #hero-inner { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        id="hero-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p className="eyebrow">
            DSP Live Training Program · Cohort Open
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              lineHeight: 1.05,
            }}
          >
            AI Agents Bootcamp — Build Real-World AI in 7 Days
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: 520,
            }}
          >
            No coding experience needed. Live Zoom training. 3 official
            Claude/Anthropic certificates + 1 DSP certificate. Beginner-friendly
            and built for the future of work.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join the Bootcamp →
            </a>
            <a href="#roadmap" className="btn-ghost">
              View 7-Day Roadmap
            </a>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
            }}
          >
            Or call / WhatsApp us:{' '}
            <a
              href="tel:+923118122222"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              +92 311 8122222
            </a>
          </p>

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--mint)',
                  background: 'rgba(84,230,192,0.08)',
                  border: '1px solid rgba(84,230,192,0.2)',
                  borderRadius: 4,
                  padding: '0.25rem 0.625rem',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Console */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AgentConsole />
        </div>
      </div>
    </section>
  )
}
