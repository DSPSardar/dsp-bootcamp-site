// src/content/survey-results.ts — the Pakistan AI Skills Survey 2026 result
// counts (Corroboration Engine, Day 6).
//
// This file is the ONLY place the numbers live. The results page, the CSV
// download and the Dataset schema all render from it, so a figure can never
// disagree with itself across the three — the fact-drift problem that makes
// an answer engine hedge on a claim.
//
// RESULTS stays `null` until the survey closes on 14 September 2026. While it
// is null the page returns a 404 and the guide registry keeps the URL
// `live: false`, because a research page with placeholder numbers is worse
// than no research page: it is the one asset here whose whole value is that
// the numbers are real.
//
// TO PUBLISH: fill `responses`, `fieldedFrom`/`fieldedTo` and the `counts`
// for each question from the responses sheet, write the headlines, then flip
// `live: true` on '/research/pakistan-ai-skills-survey-2026' in site.ts.
// Percentages are computed from the counts here — never type a percentage by
// hand, and never round a count to make a headline rounder.
import { QUESTIONS } from '@/app/survey/questions'

export type QuestionResult = {
  /** Must match an id in QUESTIONS. */
  id: string
  /** Answer label (must match an option's `en`) → number of respondents. */
  counts: Record<string, number>
}

export type SurveyResults = {
  /** Total responses received. */
  responses: number
  /** ISO dates the survey was open. */
  fieldedFrom: string
  fieldedTo: string
  /** Date the results were published. */
  published: string
  /** The findings, written as sentences. Include at least one that is
   *  inconvenient for DSP — that is what separates research from marketing,
   *  and it is the reason a journalist will trust the rest. */
  headlines: readonly string[]
  /** How the sample was gathered, stated plainly, including its limits. */
  method: readonly string[]
  results: readonly QuestionResult[]
}

/** null until the survey closes — see the note above. */
export const RESULTS: SurveyResults | null = null

/** Percentage of respondents who chose an option, to one decimal place.
 *  Computed from counts so the page, the CSV and the schema always agree. */
export function pct(count: number, total: number): string {
  if (!total) return '0'
  const p = (count / total) * 100
  return p >= 10 ? p.toFixed(0) : p.toFixed(1)
}

/** Question text for an id, taken from the live form so the results page
 *  always asks the question the respondents actually answered. */
export function questionText(id: string): { en: string; ur: string } | null {
  const q = QUESTIONS.find((x) => x.id === id)
  return q ? { en: q.en, ur: q.ur } : null
}

/** Ordered option labels for a question, as the form presented them —
 *  so a results table never silently reorders the answers. */
export function optionOrder(id: string): readonly string[] {
  const q = QUESTIONS.find((x) => x.id === id)
  return q ? q.options.map((o) => o.en) : []
}

/** Total answers for one question. Respondents may skip questions, so this
 *  is the denominator for that question — not the overall response count. */
export function answered(r: QuestionResult): number {
  return Object.values(r.counts).reduce((a, b) => a + b, 0)
}
