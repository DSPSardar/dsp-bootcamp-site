// src/app/mastery/curriculum.ts — the 16 modules of the visible curriculum, as data.
//
// Feeds `syllabusSections` on the Course node in ./schema.ts, the module
// table on /ai-agent-course-in-urdu, the full curriculum page at
// /mastery/curriculum and /llms.txt. Each entry MUST mirror the module's
// <summary> title and its "Outcome" line in the #curriculum accordion of
// ./page.tsx (schema may only describe what a visitor can read) — the
// outcomes here are the page's, not course.json's, which is worded
// differently. `build` mirrors the accordion's "You build" line and `phase`
// the phase names of the /mastery journey rail. The capstone (CAP) is
// deliberately not a syllabus section — it is exported separately for
// /mastery/curriculum. `npm run test:schema` diffs this file against the
// page, so edit both together. Lesson counts and minutes are NOT published
// here or anywhere on the site.
export type CurriculumPhase = { id: string; name: string; span: string }

export const MASTERY_PHASES: readonly CurriculumPhase[] = [
  { id: '0', name: 'Phase 0 — Zero: Foundations', span: 'Modules 1–3' },
  { id: '1', name: 'Phase 1 — Builder', span: 'Modules 4–6' },
  { id: '2', name: 'Phase 2 — Agent Engineer', span: 'Modules 7–10' },
  { id: '3', name: 'Phase 3 — Production', span: 'Modules 11–13' },
  { id: '4', name: 'Phase 4 — Seller', span: 'Modules 14–16 + capstone' },
]

export type CurriculumModule = { code: string; title: string; outcome: string; build: string; phase: string }

export const MASTERY_CURRICULUM: readonly CurriculumModule[] = [
  { code: 'M01', title: 'AI Foundations', phase: '0',
    outcome: 'Explain what an LLM and an agent are, what each can\'t do, and pick one idea worth building.',
    build: '5 ideas through the Agent Idea Filter, one chosen with a clear user and success condition.' },
  { code: 'M02', title: 'Prompting & Context Engineering', phase: '0',
    outcome: 'Write a production-grade Job Description using the 7-Part JD: Role, Goal, Audience, Tone, Steps, Rules, Examples.',
    build: 'Your JD v2 with three real test inputs and a note on what you changed.' },
  { code: 'M03', title: 'Claude · ChatGPT · Gemini', phase: '0',
    outcome: 'Set up Claude, Console, Claude Code, GitHub and Vercel correctly; know when to reach for each tool.',
    build: 'A working Claude Project and a completed setup checklist.' },
  { code: 'M04', title: 'Vibe Coding', phase: '1',
    outcome: 'Build software by describing it: PLAN → BUILD ONE FEATURE → TEST → COMMIT → NEXT, with Claude Code.',
    build: 'Your AI Employee, Part 1 running locally, on video.' },
  { code: 'M05', title: 'Websites', phase: '1',
    outcome: 'Ship a responsive multi-page site with forms from a one-page spec.',
    build: 'The AI Employee\'s four pages, desktop and mobile screenshots.' },
  { code: 'M06', title: 'Git & GitHub', phase: '1',
    outcome: 'Version-control every project; branch, merge, recover a mistake, fix the common permission errors.',
    build: 'A public repo with ten meaningful commits.' },
  { code: 'M07', title: 'AI Agents', phase: '2',
    outcome: 'Build a real agent — Job Description + Tools + Loop — that completes a multi-step task.',
    build: 'A demo of your AI Employee taking a full order, plus its architecture on one page.' },
  { code: 'M08', title: 'APIs', phase: '2',
    outcome: 'Connect to the Claude API and one external service; keep keys safe; handle errors and cost.',
    build: 'An order sent by email/Sheets from the agent, with a clean repo history.' },
  { code: 'M09', title: 'RAG & Memory', phase: '2',
    outcome: 'Give an agent knowledge and memory using the Memory Ladder; pick the right rung for the job.',
    build: 'Five grounded answers from a knowledge base and memory across two sessions.' },
  { code: 'M10', title: 'MCP', phase: '2',
    outcome: 'Connect an agent to real tools — Sheets, Calendar, Gmail — through the Model Context Protocol.',
    build: 'An MCP tool executing from the agent, result visible in the external app.' },
  { code: 'M11', title: 'Testing & Observability', phase: '3',
    outcome: 'Test systematically with the DSP 10-Question Test Sheet; read logs instead of guessing.',
    build: 'The completed sheet, three fixes with before/after, and a log.' },
  { code: 'M12', title: 'Security', phase: '3',
    outcome: 'Protect keys, block prompt injection, limit what the agent can do and spend.',
    build: 'A 15-point checklist signed off and ten injection attempts logged.' },
  { code: 'M13', title: 'Deployment', phase: '3',
    outcome: 'Put your AI Employee on a public HTTPS URL with the backend hosted and env vars set.',
    build: 'The live URL — share it in the group.' },
  { code: 'M14', title: 'Multi-Agent & Business Automation', phase: '4',
    outcome: 'Turn one agent into a business system: One Agent Many Clients, notifications, and when multi-agent is worth it.',
    build: 'Your AI Employee serving two cafés from one deployment.' },
  { code: 'M15', title: 'Selling AI Solutions', phase: '4',
    outcome: 'Run discovery, price the work, write the proposal, deliver, get paid — as a freelancer or a one-person agency.',
    build: 'A discovery sheet and a proposal for a real business.' },
  { code: 'M16', title: 'AI Search Dominance Engine', phase: '4',
    outcome: 'Take one target query from research to a deployed page that Google and AI assistants cite — query fan-out, SERP intelligence, competitor gap, content architecture, technical SEO, structured data, SEO Win Score — and sell it as a monthly SEO retainer.',
    build: 'Your first Dominance page: one query → live URL → SEO Win Score. Open from day one, no prerequisites.' },
]

/** The capstone — shown on /mastery and /mastery/curriculum, never a syllabus section. */
export const MASTERY_CAPSTONE: CurriculumModule = {
  code: 'CAP', title: 'Capstone — your own agent', phase: '4',
  outcome: 'Build, test, secure, deploy and pitch an original agent for a real use case — not the café AI Employee.',
  build: 'Live URL, repo, 3-minute demo, 1-page proposal — reviewed by the DSP team. This earns the certificate.',
}
