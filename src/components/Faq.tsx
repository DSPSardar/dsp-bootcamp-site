'use client'
import { useState } from 'react'
import Reveal from './Reveal'

const FAQS = [
  {
    q: 'Do I need coding experience?',
    a: 'No. The bootcamp is designed for complete beginners. Vibe coding means you direct AI to write code for you — no syntax required.',
  },
  {
    q: 'Is this beginner-friendly?',
    a: 'Yes. Every concept is introduced from scratch with real-world examples. If you can use WhatsApp, you can start this bootcamp.',
  },
  {
    q: 'Are classes live?',
    a: 'Yes — all sessions run live over Zoom so you can ask questions, get feedback, and interact with your cohort in real time.',
  },
  {
    q: 'Are there assignments?',
    a: "Days 7–8 are dedicated to assignments and guided practice. You’ll apply each module before moving to the next.",
  },
  {
    q: 'What is the final project?',
    a: 'On Day 15 you build and present a working AI agent: task planner, tools, memory, evaluation, and a live demo to the cohort.',
  },
  {
    q: 'What certificates will I receive?',
    a: 'Four certificates: Claude Certificate, Claude Cowork Certificate, Claude Code Certificate (all guided by DSP), and the DSP Completion Certificate.',
  },
  {
    q: "I'm a marketer or business owner — is this for me?",
    a: 'Absolutely. Understanding how agents work lets you automate workflows, build client tools, and make better decisions with AI — no technical background needed.',
  },
  {
    q: "I'm a student — will this help my career?",
    a: "Yes. Top students receive a 1-month internship and access to job opportunities within DSP's network.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={{ padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 760 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>FAQ</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '2.5rem',
            }}
          >
            Common questions.
          </h2>
        </Reveal>

        <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 10,
                overflow: 'hidden',
                background: open === i ? 'var(--panel)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <dt>
                <button
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.125rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      color: 'var(--gold)',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                      transform: open === i ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    +
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd
                  id={`faq-answer-${i}`}
                  style={{
                    padding: '0 1.25rem 1.25rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--muted)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
