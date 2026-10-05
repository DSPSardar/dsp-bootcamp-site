// src/content/radar-results.ts — the Prompt Radar, DSP's own measurement of
// its AI-search visibility, and the single source of truth for the research
// page at /research/ai-search-dominance-engine and its CSV.
//
// Why this file exists at all: the site's whole strategy is being citable by
// answer engines, and the most citable thing DSP owns is not a claim about
// its visibility — it is the measurement of it, published with the waves
// where the number went down. Every figure below was recorded by a scored
// run on the date given. Nothing here is estimated except the single row
// explicitly marked `full: false`, and nothing is back-filled.
//
// The discipline, which matters more than the numbers: the 30 prompts were
// fixed on 2026-09-05 and have never been edited, including the four known
// to suffer intent drift. Changing a prompt because it embarrasses you is
// exactly what would stop the series being evidence.

export type PromptCategory =
  | 'Pakistan, general'
  | 'Islamabad, local'
  | 'Urdu language'
  | 'Beginner / non-coder'
  | 'Business buyer'
  | 'Brand'

export type RadarPrompt = {
  id: number
  category: PromptCategory
  en: string
  /** Set where the prompt is known to be read by engines as a different
   *  question than intended. Kept in the set and scored anyway. */
  drift?: string
}

export type RadarWave = {
  id: string
  /** ISO date of the scored run. */
  date: string
  /** Campaign day, where day 1 = 2026-09-20. Null before the campaign. */
  day: number | null
  /** Sum of the 30 per-prompt scores, out of 90. */
  total: number
  /** False only for the 5 Sep baseline, which was sampling, not a scored run. */
  full: boolean
  note?: string
}

export type RadarObservation = {
  promptId: number
  date: string
  score: 0 | 1 | 2 | 3
  /** The #1 result on that date — what makes the row re-checkable. */
  top: string
  note?: string
}

export const RADAR = {
  /** The fixed prompt set. */
  promptsFixedOn: '2026-09-05',
  maxScore: 90,
  /** The 0–3 rubric, in the words it is applied in. */
  rubric: [
    { score: 3, when: 'A DSP property is the #1 result' },
    { score: 2, when: 'A DSP property is at position 2 or 3' },
    { score: 1, when: 'A DSP property appears anywhere in the result set' },
    { score: 0, when: 'No DSP property appears' },
  ],
  method: [
    'One search per prompt, per wave. No re-runs and no best-of — a second look at a disappointing result is how a series stops being a measurement.',
    'Scored by three independent agents, ten prompts each, none of them told which company the run belongs to or what result is hoped for. Priming the scorer is the easiest way to fake a dataset like this, so it is the thing most deliberately prevented.',
    'The #1 result is recorded for every prompt, which is what lets a stranger re-check a row months later.',
    'A DSP property means digitalservicesprogram.com or any profile DSP controls — its GitHub, its directory listings, its social pages. Third-party pages that merely mention DSP do not count.',
    'Full waves run weekly. Five-prompt spot-checks between waves are recorded as observations and never mixed into the /90 series.',
  ],
  limits: [
    'The search tool used resolves to a US locale. A Pakistan-locale run would plausibly score differently on the Islamabad and Pakistan categories, and this is the largest known weakness in the series.',
    'One sample per cell. Result sets are volatile, so a single-wave move is noise and only a trend across waves is signal.',
    'This measures the retrieval layer — the live index that ChatGPT Search, Perplexity, Gemini with grounding, Google AI Overviews and Claude web search all draw from before they synthesise. It is a proxy for AI-search visibility, not a measurement of any one engine’s rendered answer, because those vary by account, session and model version and cannot be used as a time series by anyone who does not control those variables.',
    'Per-prompt rows were retained from 2026-10-03 onward. Earlier waves are published as dated totals plus the individual observations recorded at the time.',
    'The 5 September figure is an approximate baseline from sampling, not a scored run, and is marked as such.',
    'This dataset is published by the company it measures. The protections against that are the fixed prompt set, the unprimed scorers, the recorded #1 results — and findings that are mostly unflattering.',
  ],
  waves: [
    { id: 'w00', date: '2026-09-05', day: null, total: 2, full: false, note: 'Approximate baseline from web-search sampling' },
    { id: 'a', date: '2026-09-13', day: null, total: 3, full: true },
    { id: 'b', date: '2026-09-18', day: null, total: 6, full: true },
    { id: 'c', date: '2026-09-19', day: null, total: 7, full: true, note: 'Highest of the series' },
    { id: 'd', date: '2026-09-20', day: 1, total: 5, full: true },
    { id: 'w01', date: '2026-09-26', day: 7, total: 4, full: true },
    { id: 'w02', date: '2026-10-03', day: 14, total: 3, full: true, note: 'Lowest of the series — 29 of the 30 prompts scored 0' },
  ] satisfies ReadonlyArray<RadarWave>,
  prompts: [
    { id: 1, category: 'Pakistan, general', en: 'What are the best AI training institutes in Pakistan?' },
    { id: 2, category: 'Pakistan, general', en: 'Where can I learn AI agents in Pakistan?' },
    { id: 3, category: 'Pakistan, general', en: 'What are the best AI education platforms in Pakistan?' },
    { id: 4, category: 'Pakistan, general', en: 'Best agentic AI course in Pakistan 2026' },
    { id: 5, category: 'Pakistan, general', en: 'How much does an AI course cost in Pakistan?' },
    { id: 6, category: 'Pakistan, general', en: 'Is there an AI course in Pakistan with Anthropic/Claude certification?' },
    { id: 7, category: 'Pakistan, general', en: 'Which AI course in Pakistan teaches Claude Code?' },
    { id: 8, category: 'Pakistan, general', en: 'Free vs paid AI courses in Pakistan — which is worth it?' },
    { id: 9, category: 'Islamabad, local', en: 'Best AI training companies in Islamabad' },
    { id: 10, category: 'Islamabad, local', en: 'AI training institute in Islamabad F-10 / Blue Area' },
    { id: 11, category: 'Islamabad, local', en: 'Who teaches AI agents in Islamabad?' },
    { id: 12, category: 'Islamabad, local', en: 'Top AI companies in Islamabad that also train' },
    { id: 13, category: 'Urdu language', en: 'Is there an AI agent course in Urdu?' },
    { id: 14, category: 'Urdu language', en: 'Best way to learn AI in Urdu online', drift: 'Read by engines as "learn the Urdu language", not "learn AI through Urdu".' },
    { id: 15, category: 'Urdu language', en: 'AI course for Pakistanis living in UAE / Saudi Arabia' },
    { id: 16, category: 'Urdu language', en: 'Roman Urdu AI course for beginners', drift: 'Read as Roman-script Urdu tuition rather than AI taught in Roman Urdu.' },
    { id: 17, category: 'Urdu language', en: 'Can I learn to build AI agents without knowing English well?', drift: 'Read as "without coding", which is a different question.' },
    { id: 18, category: 'Urdu language', en: 'AI course in Urdu with certificate' },
    { id: 19, category: 'Beginner / non-coder', en: 'Best AI agent courses for beginners and non-coders' },
    { id: 20, category: 'Beginner / non-coder', en: 'Self-paced AI agent course under $100 with lifetime access' },
    { id: 21, category: 'Beginner / non-coder', en: 'Course that teaches building AI agents with Claude and Claude Code, no coding' },
    { id: 22, category: 'Beginner / non-coder', en: 'What is vibe coding and where can I learn it?' },
    { id: 23, category: 'Business buyer', en: 'Best AI mastery programs for business professionals' },
    { id: 24, category: 'Business buyer', en: 'Who provides practical AI agent training for businesses in Pakistan?' },
    { id: 25, category: 'Business buyer', en: 'What is an AI Employee?' },
    { id: 26, category: 'Business buyer', en: 'AI agency in Islamabad that builds WhatsApp sales agents' },
    { id: 27, category: 'Business buyer', en: 'How to write a job description / system prompt for an AI agent', drift: 'Read as HR job descriptions for human staff.' },
    { id: 28, category: 'Brand', en: 'What is Digital Services Program (DSP) in Pakistan?' },
    { id: 29, category: 'Brand', en: 'Who is Sardar Ghaffar?' },
    { id: 30, category: 'Brand', en: 'Is DSP AI Agent Mastery worth it? Reviews' },
  ] satisfies ReadonlyArray<RadarPrompt>,
  observations: [
    { promptId: 11, date: '2026-09-13', score: 3, top: 'github.com/DSPSardar', note: 'Held #1 through seven consecutive verifications, 13–20 September' },
    { promptId: 11, date: '2026-10-03', score: 0, top: 'piaic.org', note: 'github.com/DSPSardar absent — the one durable #1 of the series, lost' },
    { promptId: 11, date: '2026-10-04', score: 0, top: 'piaic.org', note: 'Second confirmation absent' },
    { promptId: 11, date: '2026-10-05', score: 0, top: 'piaic.org', note: 'Third confirmation absent' },
    { promptId: 28, date: '2026-10-03', score: 3, top: 'facebook.com/digitalservices.pk', note: 'A differently-owned company with a near-identical name already at #2' },
    { promptId: 28, date: '2026-10-04', score: 1, top: 'facebook.com/digitalservices.pk', note: '"Digital Services Pakistan" takes #1; itprofiles.com #2; digitalservicesprogram.com #5' },
    { promptId: 28, date: '2026-10-05', score: 1, top: 'facebook.com/digitalservices.pk', note: 'Unchanged. Two of the ten results are the Deputy Superintendent of Police rank' },
    { promptId: 29, date: '2026-10-03', score: 0, top: 'Mixed, unrelated', note: 'All ten results were unrelated public figures' },
    { promptId: 29, date: '2026-10-04', score: 0, top: 'Mixed, unrelated', note: 'Ten of ten unrelated politicians, scholars and cricketers; Wikipedia held eight slots' },
    { promptId: 1, date: '2026-10-03', score: 0, top: 'pnytrainings.com' },
    { promptId: 3, date: '2026-10-03', score: 0, top: 'Mixed', note: 'A paid "Pakistan’s Best AI Academy" placement ranked #3' },
    { promptId: 5, date: '2026-10-03', score: 0, top: 'pnytrainings.com' },
    { promptId: 10, date: '2026-10-03', score: 0, top: 'aitech.edu.pk', note: 'One competitor held four of the nine slots' },
    { promptId: 9, date: '2026-10-05', score: 0, top: 'designrush.com', note: 'The entire top three is directories: DesignRush, GoodFirms, TechBehemoths. No company’s own site until #4' },
    { promptId: 24, date: '2026-10-05', score: 0, top: 'theknowledgeacademy.com', note: 'Then nobleprog ×2, aaghaz ×2, zensbot, nexskill ×2' },
    { promptId: 25, date: '2026-10-05', score: 0, top: 'medium.com', note: 'Then Slack, Lindy, Nextiva, Blue Prism, and four newer vendors' },
  ] satisfies ReadonlyArray<RadarObservation>,
} as const

export const LATEST_WAVE = RADAR.waves[RADAR.waves.length - 1]
export const PEAK_WAVE = RADAR.waves.reduce((a, b) => (b.total > a.total ? b : a))
export const FULL_WAVES = RADAR.waves.filter((w) => w.full)

/** Observations for one prompt, oldest first. */
export const observationsFor = (id: number) =>
  RADAR.observations.filter((o) => o.promptId === id)

/** The prompt text for an id, for the CSV and the tables. */
export const promptText = (id: number) =>
  RADAR.prompts.find((p) => p.id === id)?.en ?? String(id)
