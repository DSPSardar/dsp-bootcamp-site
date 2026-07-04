'use client'
import { useState } from 'react'
import { ChevronIcon } from './icons'

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How much does it cost — and is anything extra?',
    a: <p>PKR 10,000, one-time. That covers all five live classes, the showcase, replays, the syllabus, and all four certificates. There are no hidden fees and nothing to buy later.</p>,
  },
  {
    q: 'When exactly are the classes?',
    a: <p>Five live Zoom classes, Monday to Friday, 9:00–10:00 PM Pakistan time. Saturday is a guided build day; Sunday is the live final-project showcase. One hour a night — designed for people with jobs, studies, and families. A fresh batch starts every Monday, so if you miss one, the next is never more than a week away.</p>,
  },
  {
    q: 'Do I need coding experience?',
    a: <p>No. The bootcamp uses vibe coding: you describe what you want in plain English and direct AI to build it. If you can write a clear WhatsApp message, you have the prerequisite.</p>,
  },
  {
    q: "What's the refund policy?",
    a: <p>Attend Day 1 live. If the bootcamp isn&apos;t for you, message us on WhatsApp before Day 2 begins and we refund the full fee. See the refund policy below for details.</p>,
  },
  {
    q: 'What are the four certificates, exactly?',
    a: <p>Three are certificates of completion for Anthropic&apos;s official Claude courses (Claude Fundamentals, Claude Cowork, Claude Code), which you complete during the week with live DSP guidance. The fourth is the DSP Bootcamp Certificate, awarded after your Day 7 presentation.</p>,
  },
  {
    q: 'What language is it taught in?',
    a: <p>English and Urdu, mixed naturally — terminology in English, explanation in whichever language lands best. Questions are welcome in either.</p>,
  },
  {
    q: 'I miss a class — what happens?',
    a: <p>Every class is recorded and the replay is shared with your cohort the same night. Live attendance is strongly recommended — the Q&amp;A is where most learning happens.</p>,
  },
  {
    q: "I'm a marketer / business owner / student — is this for me?",
    a: <p>Yes — the bootcamp is built for non-programmers. Marketers build lead-qualifying agents, business owners automate operations, and students leave with a deployed project for their portfolio. Your final project fits your own work.</p>,
  },
  {
    q: 'I work / study during the day. Will I manage?',
    a: <p>Yes — that&apos;s why classes run 9–10 PM, just one hour a night. Homework takes 20–30 minutes. Every session is recorded, so if you miss a night, you catch up before the next class.</p>,
  },
  {
    q: 'What do I need to join?',
    a: <p>A laptop and an internet connection. That&apos;s it. No software to install, no coding background, no technical setup — we start from zero together on Day 1.</p>,
  },
]

export default function HomeFaq() {
  // First question open by default, matching the source design.
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <>
      {FAQS.map((item, i) => {
        const expanded = openIdx === i
        const panelId = `faq${i + 1}`
        return (
          <div className="faq-item" key={panelId}>
            <button
              className="faq-q"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenIdx(expanded ? null : i)}
            >
              {item.q}
              <ChevronIcon />
            </button>
            <div className="faq-a" id={panelId} hidden={!expanded}>
              {item.a}
            </div>
          </div>
        )
      })}
    </>
  )
}
