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

/** Published 2026-09-19 from the survey read - never edit a count by hand. */
export const RESULTS: SurveyResults | null = {
  responses: 60,
  fieldedFrom: '2026-09-12',
  fieldedTo: '2026-09-17',
  published: '2026-09-19',
  headlines: [
    'Only one respondent in 60 (1.7%) named English-only material as the biggest thing stopping them learning AI — even though 70% would rather learn in Urdu, Roman Urdu or a mix of Urdu and English. Preferring to learn in Urdu and being blocked by English are not the same thing, and this survey was run by a company that sells an Urdu-English course.',
    'The barriers people did name were guidance and money: 27% said they do not know where to start or whom to trust, and 25% said courses cost too much. 30% said nothing has stopped them at all.',
    '73% would pay PKR 15,000 or less for a complete AI agents course, and 10% would pay nothing at all. Only 18% chose the PKR 15,000–30,000 band that DSP\'s own course sits in, and 8.3% would pay more than PKR 30,000.',
    '58% want this for freelancing income — more than a job (5.0%), their own business (25%), curiosity (3.3%) and teaching others (8.3%) put together.',
    'This is a sample of people already close to AI, not a sample of Pakistan: 83% were already learning it, 68% had built something, and every respondent had used ChatGPT, Claude or Gemini. 37% named Claude against 10% for ChatGPT — a split that reflects where the survey was distributed, not the country.',
    '62% of respondents live in Pakistan, 18% in the Gulf and 12% in the UK, US, Canada or Australia.',
  ],
  method: [
    'Self-selected online questionnaire of ten closed questions, offered in Urdu and English side by side, open from 2026-09-12 to 2026-09-17. 60 responses were received and all are counted; none were removed or weighted. The first response, on 12 September 2026, was a test submission made by DSP while verifying that the collection pipeline worked; it is counted with the rest.',
    'Distributed through Digital Services Program\'s own audience - its Facebook page, WhatsApp groups, LinkedIn and YouTube community - and open to anyone with the link. People already interested in learning AI are therefore over-represented, and the sample is not representative of Pakistan as a whole.',
    'The survey collected no name and no phone number. Email was optional and used only to send respondents the results. Responses are reported only in aggregate; the CSV on this page holds the counts, not individual answers.',
    'Respondents could skip a question, so each table\'s percentages are of the people who answered that question. Every figure on this page, in the CSV and in the structured data is computed from the same counts.',
  ],
  results: [
    {
      id: 'country',
      counts: {
        'Pakistan': 37,
        'Saudi Arabia': 4,
        'United Arab Emirates': 7,
        'United States': 3,
        'Canada': 3,
        'Australia': 1,
        'Other': 5,
      },
    },
    {
      id: 'age',
      counts: {
        'Under 18': 2,
        '18–24': 9,
        '25–34': 13,
        '35–44': 22,
        '45 or older': 11,
      },
    },
    {
      id: 'work',
      counts: {
        'Student': 10,
        'Employed full time': 20,
        'Employed part time': 2,
        'Freelancer': 3,
        'Business owner': 9,
        'Looking for work': 11,
        'Not working right now': 5,
      },
    },
    {
      id: 'tried',
      counts: {
        'Yes, and I am still learning': 50,
        'Yes, but I stopped': 3,
        'No, not yet': 7,
      },
    },
    {
      id: 'blocker',
      counts: {
        'Everything is in English': 1,
        'I cannot code': 4,
        'Courses cost too much': 15,
        'I do not have time': 4,
        'I do not know where to start or who to trust': 16,
        'Internet or device problems': 2,
        'Nothing has stopped me': 18,
      },
    },
    {
      id: 'language',
      counts: {
        'Urdu': 13,
        'English': 11,
        'A mix of Urdu and English': 29,
        'It makes no difference to me': 7,
      },
    },
    {
      id: 'budget',
      counts: {
        'Free only': 6,
        'Under PKR 5,000': 15,
        'PKR 5,000–15,000': 23,
        'PKR 15,000–30,000': 11,
        'PKR 30,000–60,000': 3,
        'More than PKR 60,000': 2,
      },
    },
    {
      id: 'tools',
      counts: {
        'ChatGPT': 6,
        'Claude': 22,
        'Gemini': 1,
        'More than one of these': 31,
      },
    },
    {
      id: 'goal',
      counts: {
        'A job': 3,
        'Freelancing income': 35,
        'To use AI in my own business': 15,
        'Curiosity — I just want to understand it': 2,
        'To teach it to others': 5,
      },
    },
    {
      id: 'built',
      counts: {
        'No, I have only chatted with AI': 8,
        'I have tried but never finished anything': 11,
        'Yes, something small': 32,
        'Yes, something running that other people use': 9,
      },
    },
  ],
}

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
