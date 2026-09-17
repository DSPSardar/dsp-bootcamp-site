// src/content/post-refits.ts — answer-first refits for the money-intent posts.
//
// Corroboration Engine, Day 3 (2026-09-08). The 43 legacy posts were
// migrated verbatim from the old PHP site; their slugs are frozen. Rather
// than rewrite them, the five posts that carry buying intent (learning AI
// agents, choosing a course, AI employees, careers) get a refit rendered by
// src/app/blog/[slug]/page.tsx: a 2–3 sentence direct answer under the
// title, an "Updated" date in the byline (also BlogPosting.dateModified and
// the sitemap lastmod), and a "Go deeper" box linking Mastery and the guide
// pages that answer the same query in full. The post body is untouched.
//
// Keyed by slug — a slug missing here renders the post exactly as before.
import { mastery } from '@/config/site'

export type PostRefit = {
  /** The direct answer, 2–3 sentences, rendered first as the passage an answer engine lifts. */
  answer: string
  /** ISO date of the refit — feeds the byline, BlogPosting.dateModified and the sitemap. */
  updated: string
  /** Where to go next — Mastery plus the relevant guides. */
  goDeeper: ReadonlyArray<{ href: string; label: string }>
}

/* The Day 3 constant (2026-09-08) is gone: of the five posts that carried
 * it, three were merged away by the consolidation and the other two moved
 * to MERGED_UPDATED when they were rewritten. */

/** Day 8 (2026-09-12): the definition-cluster refits below. */
const DEFS_UPDATED = '2026-09-12'

/** Day 11 (2026-09-18): the two pillars rewritten for depth — the Pakistan
 *  post and the multi-agent explainer. Only those two move to this date;
 *  the other nine definition-cluster posts keep DEFS_UPDATED. */
const DEPTH_UPDATED = '2026-09-18'

/** The consolidation (2026-09-18): 43 posts became 12. The six targets below
 *  absorbed 31 posts between them and were rewritten around that material, so
 *  all six carry the day the merge shipped. This was built to be held until
 *  21 Sep — the indexed count dips while the redirects settle — and the owner
 *  released it early on the 18th, so the date moved with the merge rather than
 *  advertising a change three days before it existed. The absorbed posts' own
 *  refits are gone: each answer was folded into its target as a section rather
 *  than discarded, per the consolidation spec. */
const MERGED_UPDATED = '2026-09-18'

const MASTERY_LINK = { href: mastery.url, label: `${mastery.name} — ${mastery.modules} modules, Urdu + English, ${mastery.priceDisplay} one-time` }

export const POST_REFITS: Record<string, PostRefit> = {
  'how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners': {
    answer:
      'Learn AI in 2026 by building, not by collecting tutorials: understand what an AI agent is, learn to write clear instructions for Claude, build one small agent with Claude Code, give it memory and tools, deploy it to a live URL, and put it in front of one real user. No Python is required for that path, and the tools cost about $20 a month from the third stage on.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'The 6-stage roadmap for learning AI agents in Pakistan' },
      { href: '/best-ai-courses-in-pakistan', label: 'Best AI Courses in Pakistan (2026), compared' },
      MASTERY_LINK,
    ],
  },
  'what-is-an-ai-agent': {
    answer:
      'An AI agent is software that takes a goal, plans the steps, uses tools to act — search, book, email, update a sheet — checks the result and loops until the job is done. A chatbot only answers; an agent completes tasks. When an agent is given one specific job in a business, with memory of that business and a channel customers already use, DSP calls it an AI employee.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What is an AI employee? Definition, the 4 parts, 5 real examples' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: 5 questions before you build one' },
      MASTERY_LINK,
    ],
  },
  // The site's highest-impression blog URL: ~70 distinct "what is vibe
  // coding" queries, 223 impressions in three months at an average position
  // of 63. The body was a 113-word stub until 2026-09-10; it is now a full
  // answer to the query cluster, so it earns the refit the money-intent
  // posts get.
  'vibe-coding-explained': {
    answer:
      'Vibe coding is building software by describing what you want in plain language and letting an AI model write the code. Andrej Karpathy named it in February 2025 and Collins Dictionary made it the Word of the Year for 2025. You still run, test and correct the result — what you stop doing is typing syntax, which makes judgement, not syntax, the skill that decides whether you ship anything.',
    updated: '2026-09-10',
    goDeeper: [
      { href: '/mastery/curriculum', label: 'The 16 modules that teach vibe coding with Claude Code, end to end' },
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is, and what people build with vibe coding' },
      { href: '/learn-ai-agents-pakistan', label: 'How to learn AI agents in Pakistan: the 6-stage roadmap' },
      MASTERY_LINK,
    ],
  },
  // ── Day 8 (2026-09-12): the definition cluster ──────────────────────────
  // Bing Webmaster's AI Performance report shows Microsoft Copilot citing
  // DSP 18 times in early September — and one of the two cited URLs is
  // /blog/multi-agent-systems-when-ais-work-as-a-team, a generic explainer
  // with no answer block. Copilot cites explainers. The 43 legacy posts are
  // also the only surface Google has crawled for years. So the ten posts
  // below — the ones that answer a definition or comparison question people
  // actually ask an answer engine — get the same answer-first treatment the
  // money-intent posts got on Day 3. Bodies untouched; the answer is the
  // passage an engine can lift, and "Go deeper" gives it somewhere to go.
  'multi-agent-systems-when-ais-work-as-a-team': {
    answer:
      'A multi-agent system is a team of AI agents working on one goal: an orchestrator agent breaks the goal into sub-tasks, hands each to a specialist agent with its own tools and knowledge, then synthesises what comes back. It exists because one agent has a finite context window and cannot specialise deeply in every domain at once.',
    updated: DEPTH_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is: one agent, one job, inside a business' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: five questions before you build one' },
      { href: '/mastery/curriculum', label: 'The 16 modules that teach agents, memory, tools and deployment' },
      MASTERY_LINK,
    ],
  },
  'the-top-5-agentic-ai-frameworks-you-should-know-about': {
    answer:
      'The five agent frameworks worth knowing are LangChain (flexible, most widely adopted), Microsoft AutoGen (multi-agent conversations), CrewAI (role-based crews), LlamaIndex (agents over your own documents and data) and the native model APIs — Anthropic’s Claude tool use and OpenAI’s Assistants — for production agents without a separate framework layer.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/claude-code-course-pakistan', label: 'Building agents with Claude and Claude Code, without a framework' },
      { href: '/mastery/curriculum', label: 'The 16 modules: what DSP builds with, and why' },
      MASTERY_LINK,
    ],
  },
  'how-to-write-effective-ai-prompts-the-skill-everyone-needs': {
    answer:
      'A good AI prompt is specific, assigns a role, shows an example of the output you want, and states the format. Vague prompts get vague results from the same model that can produce excellent ones. For an agent the same discipline becomes a written job description — the standing instruction it follows on every single run.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/frameworks/7-part-job-description', label: 'The 7-Part Job Description: the prompt an AI agent runs on' },
      { href: '/claude-code-course-pakistan', label: 'Claude Code in Pakistan: writing instructions instead of syntax' },
      MASTERY_LINK,
    ],
  },
  'hands-on-vs-theory-only-why-practical-ai-training-gets-better-results': {
    answer:
      'Practical AI training beats theory-only because the skill is contextual: you learn how a model behaves by building with it, breaking it and fixing it. People who have read widely about AI still write mediocre prompts and pick the wrong tool. The test of a course is whether you finish it with something running that you built.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/best-ai-courses-in-pakistan', label: 'Nine AI courses in Pakistan compared on price, format and what you build' },
      { href: '/ai-training-islamabad', label: 'AI training in Islamabad: 11 options compared' },
      { href: '/mastery/curriculum', label: 'One project that grows through 16 modules to a live URL' },
      MASTERY_LINK,
    ],
  },
  // ── Day 11 (2026-09-18): the rewritten pillars ──────────────────────────
  // Search Console, 18 Sep 2026: 35 URLs indexed and 47 not — every non-blog
  // URL is in, but only 9 of the 43 posts, with 30 at "Discovered — currently
  // not indexed". This post was the thinnest page on the site (161 words of
  // body) and the only one with geographic intent, which is the one place DSP
  // can realistically outrank anyone. It was rewritten to ~2,000 words of
  // Pakistan-specific substance — tool costs in rupees, local business
  // arithmetic, the freelancing and dollar-earning angle, and the four
  // constraints (payment rails, power, English-medium material, proof) — so it
  // now earns the same answer-first treatment the money-intent posts get.
  'why-pakistan-needs-ai-agents': {
    answer:
      'Pakistan’s entrepreneurs need AI agents now because the arithmetic is unusually favourable here: the tools cost about $20 a month, the labour they replace is priced in rupees, and the same agent can be sold to a client paying in dollars. The real constraints — payment rails, connectivity, English-medium material — are all workable.',
    updated: DEPTH_UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'How to learn AI agents in Pakistan: the 6-stage roadmap and what the tools cost' },
      { href: '/ai-agent-course-in-urdu', label: 'An AI agent course taught in Urdu, and the other Urdu options compared' },
      { href: '/ai-training-islamabad', label: 'AI training in Islamabad: 11 options compared on fee and format' },
      MASTERY_LINK,
    ],
  },
  'machine-learning-vs-deep-learning-vs-ai-whats-the-difference': {
    answer:
      'The three terms are nested. Artificial intelligence is any technique that lets a machine mimic human intelligence, hand-written rules included. Machine learning is the subset that learns the rules from data instead of being given them. Deep learning is the subset of machine learning built on many-layered neural networks — and generative AI sits inside deep learning.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'Where to start if the vocabulary is new: the 6-stage roadmap' },
      { href: '/best-ai-courses-in-pakistan', label: 'Best AI Courses in Pakistan (2026), compared' },
      MASTERY_LINK,
    ],
  },
  /** The consolidation (2026-09-18) gave these three targets their first
   *  refit. They had none before because they were short listicles; each has
   *  now absorbed between five and twelve posts and answers a question people
   *  put to an answer engine, so each gets the answer block and a "Go deeper"
   *  box like the rest. That also gives all twelve surviving posts a real
   *  content-change date, which the sitemap reads off `updated`. */
  '10-ways-businesses-can-use-agentic-ai-in-2026': {
    answer:
      'Businesses use agentic AI most profitably on repetitive, measurable work: answering and qualifying inbound leads, triaging support, taking bookings, chasing follow-ups, watching competitors and closing the monthly books. The job worth automating first is the dull one you repeat forty times a week, not the most impressive one.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/ai-employees', label: 'DSP AI Employees: sales, support, booking and order-taking agents' },
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is: one agent, one job, inside a business' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: five questions before you build one' },
      MASTERY_LINK,
    ],
  },
  'why-sales-is-the-first-job-ai-is-replacing': {
    answer:
      'Sales automates first because the work is repetitive, script-based and measurable, and because it sits directly on revenue. An AI sales agent finds leads, researches them, writes and follows up, qualifies, books the call and updates the CRM. Humans keep the relationships, the negotiation and the high-value closes.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/ai-employees', label: 'DSP AI Employees: the sales agent that answers every lead' },
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is: definition, the four parts, five real examples' },
      { href: '/frameworks/7-part-job-description', label: 'The 7-Part Job Description: how to brief an agent so it stays on scope' },
      MASTERY_LINK,
    ],
  },
  'the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake': {
    answer:
      'Responsibility for an agent’s mistake is currently shared between whoever set its goal, whoever built it, the model provider and the organisation that deployed it — which is why governance has to be settled in advance: narrow permissions, human checkpoints before irreversible actions, full audit trails, and escalation instead of improvisation.',
    updated: MERGED_UPDATED,
    goDeeper: [
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: five questions, including the risk ones' },
      { href: '/frameworks/7-part-job-description', label: 'The 7-Part Job Description: where scope and escalation rules get written' },
      { href: '/mastery/curriculum', label: 'The 16 modules, including the ethics of handing autonomy to software' },
      MASTERY_LINK,
    ],
  },
}

export const getPostRefit = (slug: string): PostRefit | undefined => POST_REFITS[slug]
