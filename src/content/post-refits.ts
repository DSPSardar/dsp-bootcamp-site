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

/** Day 8 (2026-09-12): the definition-cluster refits below. */
const DEFS_UPDATED = '2026-09-12'

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
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is: one agent, one job, inside a business' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: five questions before you build one' },
      { href: '/mastery/curriculum', label: 'The 16 modules that teach agents, memory, tools and deployment' },
      MASTERY_LINK,
    ],
  },
  'what-is-agentic-ai-the-shift-from-chatbots-to-autonomous-systems': {
    answer:
      'Agentic AI is an AI system you give a goal rather than a single prompt: it decides the steps, chooses the tools, handles obstacles and keeps going until the goal is met or it reports that it cannot finish. Traditional AI answers a question; agentic AI completes a mission without a human directing each step.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What is an AI employee? Definition, the four parts, five real examples' },
      { href: '/learn-ai-agents-pakistan', label: 'How to learn to build agentic AI: the 6-stage roadmap' },
      MASTERY_LINK,
    ],
  },
  'ai-vs-agentic-ai-a-side-by-side-comparison': {
    answer:
      'Traditional AI takes one prompt and returns one response, with a human reviewing every step. Agentic AI takes a high-level goal, keeps memory across steps, uses tools, adapts when something fails, and involves you only at the start and at checkpoints. Use traditional AI for single-step work; agentic AI for research, automation and multi-step workflows.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'AI employee vs chatbot vs agent, compared in a table' },
      { href: '/frameworks/agent-idea-filter', label: 'The Agent Idea Filter: when a job is worth an agent' },
      MASTERY_LINK,
    ],
  },
  'the-agent-loop-explained-how-ai-plans-acts-and-learns': {
    answer:
      'The agent loop is the cycle every AI agent repeats: receive a goal, plan the steps, act with a tool, observe the result, then adjust and go round again until the job is done. It is what separates an agent from a chatbot — the model checks its own output and keeps working instead of handing it back.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/frameworks/7-part-job-description', label: 'The 7-Part Job Description: how to write what the loop follows' },
      { href: '/frameworks/memory-ladder', label: 'The Memory Ladder: how much an agent should remember between runs' },
      { href: '/mastery/curriculum', label: 'Where the loop is taught, module by module' },
      MASTERY_LINK,
    ],
  },
  'ai-assistants-vs-ai-agents-understanding-the-future-of-artificial-intelligence': {
    answer:
      'An AI assistant is reactive — ChatGPT, Siri, a support chatbot — it waits for your instruction and answers it. An AI agent is proactive: given a goal it plans, decides, uses software tools and executes a multi-step workflow to completion. The practical test is whether the system finishes the job or hands the work back to you.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/what-is-an-ai-employee', label: 'What an AI employee is, and the five jobs DSP gives one' },
      { href: '/ai-employees', label: 'The AI Employees DSP builds: sales, support, bookings, phone orders' },
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
  'how-large-language-models-actually-work-no-math-required': {
    answer:
      'A large language model does one thing: predict the next token in a sequence. Trained on hundreds of billions of words, it absorbs patterns the way someone who has read widely can finish a familiar sentence. Everything else — essays, code, explanations, conversation — emerges from that single operation performed billions of times.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'From understanding models to building with them: the 6-stage roadmap' },
      { href: '/what-is-an-ai-employee', label: 'What you can build once a model has tools and memory' },
      MASTERY_LINK,
    ],
  },
  'machine-learning-vs-deep-learning-vs-ai-whats-the-difference': {
    answer:
      'The three terms are nested. Artificial intelligence is any technique that lets a machine mimic human intelligence, hand-written rules included. Machine learning is the subset that learns the rules from data instead of being given them. Deep learning is the subset of machine learning built on many-layered neural networks — and generative AI sits inside deep learning.',
    updated: DEFS_UPDATED,
    goDeeper: [
      { href: '/learn-ai-agents-pakistan', label: 'Where to start if the vocabulary is new: the 6-stage roadmap' },
      { href: '/best-ai-courses-in-pakistan', label: 'Best AI Courses in Pakistan (2026), compared' },
      MASTERY_LINK,
    ],
  },
}

export const getPostRefit = (slug: string): PostRefit | undefined => POST_REFITS[slug]
