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

const UPDATED = '2026-09-08'

const MASTERY_LINK = { href: mastery.url, label: `${mastery.name} — ${mastery.modules} modules, Urdu + English, ${mastery.priceDisplay} one-time` }

export const POST_REFITS: Record<string, PostRefit> = {
  'how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners': {
    answer:
      'Learn AI in 2026 by building, not by collecting tutorials: understand what an AI agent is, learn to write clear instructions for Claude, build one small agent with Claude Code, give it memory and tools, deploy it to a live URL, and put it in front of one real user. No Python is required for that path, and the tools cost about $20 a month from the third stage on.',
    updated: UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'The 6-stage roadmap for learning AI agents in Pakistan' },
      { href: '/best-ai-courses-in-pakistan', label: 'Best AI Courses in Pakistan (2026), compared' },
      MASTERY_LINK,
    ],
  },
  'what-to-expect-from-an-ai-agentic-ai-training-program': {
    answer:
      'A good AI or agentic-AI training program ends with something running: an agent you built, on a public URL, that does a job for a real business. Expect a fixed order of topics — foundations, prompting, building, memory and tools, deployment, selling — one project that grows through them, and support that outlasts the classes. A certificate alone is the weakest thing a program can give you.',
    updated: UPDATED,
    goDeeper: [
      { href: '/mastery/curriculum', label: 'What a 16-module AI agent curriculum looks like, module by module' },
      { href: '/best-ai-courses-in-pakistan', label: 'Nine AI courses in Pakistan compared on price, format and what you build' },
      { href: '/ai-training-islamabad', label: 'AI training in Islamabad: 11 options compared' },
      MASTERY_LINK,
    ],
  },
  'what-is-an-ai-agent': {
    answer:
      'An AI agent is software that takes a goal, plans the steps, uses tools to act — search, book, email, update a sheet — checks the result and loops until the job is done. A chatbot only answers; an agent completes tasks. When an agent is given one specific job in a business, with memory of that business and a channel customers already use, DSP calls it an AI employee.',
    updated: UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What is an AI employee? Definition, the 4 parts, 5 real examples' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: 5 questions before you build one' },
      MASTERY_LINK,
    ],
  },
  'solo-entrepreneurs-using-ai-agents-how-one-person-can-build-a-powerful-ai-driven-business': {
    answer:
      'One person can run what used to take a small team by giving each repeatable job to an AI employee: a sales agent that answers every lead on WhatsApp, a support agent for the same fifty questions, a booking agent that keeps the calendar full. You can hire them built, or build them yourself without a coding background and sell the same agent to other businesses.',
    updated: UPDATED,
    goDeeper: [
      { href: '/ai-employees', label: 'The AI Employees DSP builds: Zara, Adam, Maya, Emma' },
      { href: '/what-is-an-ai-employee', label: 'What is an AI employee?' },
      { href: '/learn-ai-agents-pakistan', label: 'How to learn to build them yourself: the 6-stage roadmap' },
      MASTERY_LINK,
    ],
  },
  'why-ai-skills-are-the-highest-paid-in-2025': {
    answer:
      'AI skills pay because the people who can make AI do useful work — build an agent that answers customers, takes orders or books appointments — are far fewer than the businesses that want one. The skill that pays is building and deploying, not prompting; and in 2026 it no longer requires a computer-science degree or Python, which is why the gap is open to career changers.',
    updated: UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'How to learn AI agents in Pakistan: the 6-stage roadmap and what the tools cost' },
      { href: '/what-is-an-ai-employee', label: 'What businesses are actually paying for: the AI employee' },
      { href: '/best-ai-courses-in-pakistan', label: 'Best AI Courses in Pakistan (2026)' },
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
}

export const getPostRefit = (slug: string): PostRefit | undefined => POST_REFITS[slug]
