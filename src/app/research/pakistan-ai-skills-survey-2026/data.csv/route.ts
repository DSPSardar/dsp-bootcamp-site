// src/app/research/pakistan-ai-skills-survey-2026/data.csv/route.ts
//
// The downloadable counts (Corroboration Engine, Day 6). Generated from the
// same src/content/survey-results.ts the page renders, so the CSV can never
// disagree with the tables — and a journalist checking a figure finds the
// same number we published.
import { RESULTS, answered, optionOrder, pct } from '@/content/survey-results'
import { QUESTIONS } from '@/app/survey/questions'

export const dynamic = 'force-static'

/** RFC 4180: wrap in quotes and double any internal quote. */
function cell(v: string | number): string {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function GET() {
  if (!RESULTS) {
    return new Response('Not found', { status: 404 })
  }
  const r = RESULTS

  const rows: string[][] = [
    ['question_id', 'question', 'answer', 'respondents', 'share_percent'],
  ]

  for (const q of r.results) {
    const total = answered(q)
    const text = QUESTIONS.find((x) => x.id === q.id)?.en ?? q.id
    for (const label of optionOrder(q.id)) {
      const count = q.counts[label]
      if (count === undefined) continue
      rows.push([q.id, text, label, String(count), pct(count, total)])
    }
  }

  const header = [
    `# Pakistan AI Skills Survey 2026 — Digital Services Program`,
    `# ${r.responses} responses, fielded ${r.fieldedFrom} to ${r.fieldedTo}, published ${r.published}`,
    `# Self-selected online sample, questionnaire in Urdu and English.`,
    `# Free to reuse with attribution (CC BY 4.0): https://www.digitalservicesprogram.com/research/pakistan-ai-skills-survey-2026`,
    `# Percentages are of those who answered that question, not of all respondents.`,
  ].join('\n')

  const csv = `${header}\n${rows.map((row) => row.map(cell).join(',')).join('\n')}\n`

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="pakistan-ai-skills-survey-2026.csv"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
