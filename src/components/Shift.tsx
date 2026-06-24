// src/components/Shift.tsx
import Reveal from './Reveal'

const CARDS = [
  {
    title: 'Chatbot',
    desc: 'Replies to prompts, forgets after the chat.',
    accent: false,
  },
  {
    title: 'AI Agent',
    desc: 'Plans a goal, uses tools, remembers context, acts.',
    accent: true,
  },
  {
    title: 'Agentic Fleet',
    desc: 'Teams of agents passing work, running real workflows.',
    accent: false,
  },
]

export default function Shift() {
  return (
    <section id="shift" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Shift</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            From chatting to acting.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div
                style={{
                  position: 'relative',
                  padding: '2rem',
                  borderRadius: 14,
                  border: card.accent
                    ? '1.5px solid var(--gold)'
                    : '1px solid var(--line)',
                  background: card.accent
                    ? 'rgba(255,195,77,0.06)'
                    : 'var(--panel)',
                  textAlign: 'center',
                }}
              >
                {i < CARDS.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      right: -18,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted)',
                      fontSize: '1.25rem',
                      zIndex: 1,
                    }}
                  >
                    →
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: card.accent ? 'var(--gold)' : 'var(--text)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
