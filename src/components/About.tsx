// src/components/About.tsx
import Reveal from './Reveal'

export default function About() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 720 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>About DSP</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            SECP-registered. Practically focused.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}
          >
            Digital Services Program (DSP) is a SECP-registered organisation
            that helps students, professionals, and entrepreneurs learn practical
            AI skills they can apply immediately.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            Top students receive a{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
              1-month internship
            </span>{' '}
            and access to job opportunities within DSP's network.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
