export default function WhyDsp() {
  return (
    <section id="why-dsp" style={{ padding: '2rem 0 0' }}>
      <div className="section" style={{ maxWidth: 960 }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--text)',
            marginBottom: '1.5rem',
          }}
        >
          Why DSP vs. a typical online bootcamp
        </h2>

        <div
          style={{
            border: '1px solid var(--line)',
            borderRadius: 14,
            overflow: 'hidden',
            background: 'var(--panel)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr 1fr',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            <span>Feature</span>
            <span>DSP</span>
            <span>Most online bootcamps</span>
          </div>

          {[
            ['Coding required', 'None', 'Python required'],
            ['Live sessions', '6 live Zoom modules', 'Self-paced video'],
            ['Anthropic certificates', '3 official', '—'],
            ['Final project + presentation', 'Yes', 'Rare'],
            ['Post-bootcamp internship', 'Yes', '—'],
            ['Duration', '7 days, structured', 'Varies'],
          ].map(([feature, dsp, other]) => (
            <div
              key={feature}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr 1fr',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--font-body)',
                color: 'var(--muted)',
              }}
            >
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{feature}</span>
              <span>{dsp}</span>
              <span>{other}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
