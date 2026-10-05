// src/app/research/ai-search-dominance-engine/data.csv/route.ts
//
// The downloadable series. Generated from the same src/content/radar-results.ts
// the page renders, so the CSV can never disagree with the tables — and a
// practitioner re-checking a row finds the same number and the same #1 result
// we published.
//
// One flat table with a record_type column rather than two stacked blocks, so
// it parses in a spreadsheet, in pandas and in a shell one-liner without
// anyone having to split the file first.
import { RADAR, promptText } from '@/content/radar-results'

export const dynamic = 'force-static'

/** RFC 4180: wrap in quotes and double any internal quote. */
function cell(v: string | number): string {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function GET() {
  const rows: (string | number)[][] = [
    ['record_type', 'date', 'wave_id', 'prompt_id', 'prompt', 'category', 'score', 'out_of', 'top_result', 'note'],
  ]

  for (const w of RADAR.waves) {
    rows.push([
      w.full ? 'wave' : 'wave_sampled_baseline',
      w.date,
      w.id,
      '',
      '',
      '',
      w.total,
      RADAR.maxScore,
      '',
      w.note ?? '',
    ])
  }

  for (const p of RADAR.prompts) {
    rows.push(['prompt', RADAR.promptsFixedOn, '', p.id, p.en, p.category, '', 3, '', p.drift ?? ''])
  }

  for (const o of RADAR.observations) {
    const p = RADAR.prompts.find((x) => x.id === o.promptId)
    rows.push([
      'observation',
      o.date,
      '',
      o.promptId,
      promptText(o.promptId),
      p?.category ?? '',
      o.score,
      3,
      o.top,
      o.note ?? '',
    ])
  }

  const header = [
    `# The AI Search Dominance Engine — Digital Services Program`,
    `# ${RADAR.prompts.length} prompts fixed ${RADAR.promptsFixedOn} and never edited; ${RADAR.waves.filter((w) => w.full).length} scored waves to ${RADAR.waves[RADAR.waves.length - 1].date}.`,
    `# Rubric: 3 = a DSP property is #1, 2 = position 2-3, 1 = present anywhere, 0 = absent. Wave total is out of ${RADAR.maxScore}.`,
    `# Measures the retrieval layer AI answer engines draw from, not any one engine's rendered answer.`,
    `# Known limits, stated in full on the page: US-locale search tool; one sample per cell; per-prompt rows retained from 2026-10-03; the ${RADAR.waves[0].date} row is a sampled baseline, not a scored run; published by the company it measures.`,
    `# Free to reuse with attribution (CC BY 4.0): https://www.digitalservicesprogram.com/research/ai-search-dominance-engine`,
  ].join('\n')

  const csv = `${header}\n${rows.map((row) => row.map(cell).join(',')).join('\n')}\n`

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="ai-search-dominance-engine.csv"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
