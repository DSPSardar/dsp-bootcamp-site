'use client'
import { useState } from 'react'
import { ChevronIcon } from './icons'

// The live bootcamp was sunset on 2026-08-30. Only questions that stay
// accurate as historical fact remain — nothing about fees, batches, start
// dates, or joining a cohort. Keep this list in sync with the FAQPage
// JSON-LD on the bootcamp page.
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Did students need coding experience?',
    a: <p>No. The bootcamp used vibe coding: students described what they wanted in plain English and directed AI to build it. If you can write a clear WhatsApp message, you had the prerequisite.</p>,
  },
  {
    q: 'What were the four certificates, exactly?',
    a: <p>Three were certificates of completion for Anthropic&apos;s official Claude courses (Claude Fundamentals, Claude Cowork, Claude Code), completed during the week with live DSP guidance. The fourth was the DSP Bootcamp Certificate, awarded after the Day 7 presentation.</p>,
  },
  {
    q: 'What language was it taught in?',
    a: <p>English and Urdu, mixed naturally — terminology in English, explanation in whichever language landed best. Questions were welcome in either.</p>,
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
