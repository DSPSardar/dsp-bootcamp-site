// src/components/Admission.tsx
import Reveal from './Reveal'
import BookingForm from './BookingForm'

export default function Admission() {
  return (
    <section id="admission" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
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
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Admissions</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Join the next cohort.
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
              Fill the form and we&apos;ll open WhatsApp so you can book your free
              intro session. Seats are limited — register early.
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
              <a href="tel:+923118122222" className="btn-ghost">
                Call +92 311 8122222
              </a>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <div className="panel" style={{ padding: '2rem' }}>
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
