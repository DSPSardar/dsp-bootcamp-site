// src/app/mastery/curriculum.ts — the 15 modules of the visible curriculum, as data.
//
// Feeds `syllabusSections` on the Course node in ./schema.ts. Each entry MUST
// mirror the module's <summary> title and its "Outcome" line in the
// #curriculum accordion of ./page.tsx (schema may only describe what a
// visitor can read) — the outcomes here are the page's, not course.json's,
// which is worded differently. The capstone (CAP) is deliberately not a
// syllabus section. `npm run test:mastery-schema` diffs this file against the
// page, so edit both together.
export type CurriculumModule = { code: string; title: string; outcome: string }

export const MASTERY_CURRICULUM: readonly CurriculumModule[] = [
  { code: 'M01', title: 'AI Foundations',
    outcome: 'Explain what an LLM and an agent are, what each can\'t do, and pick one idea worth building.' },
  { code: 'M02', title: 'Prompting & Context Engineering',
    outcome: 'Write a production-grade Job Description using the 7-Part JD: Role, Goal, Audience, Tone, Steps, Rules, Examples.' },
  { code: 'M03', title: 'Claude · ChatGPT · Gemini',
    outcome: 'Set up Claude, Console, Claude Code, GitHub and Vercel correctly; know when to reach for each tool.' },
  { code: 'M04', title: 'Vibe Coding',
    outcome: 'Build software by describing it: PLAN → BUILD ONE FEATURE → TEST → COMMIT → NEXT, with Claude Code.' },
  { code: 'M05', title: 'Websites',
    outcome: 'Ship a responsive multi-page site with forms from a one-page spec.' },
  { code: 'M06', title: 'Git & GitHub',
    outcome: 'Version-control every project; branch, merge, recover a mistake, fix the common permission errors.' },
  { code: 'M07', title: 'AI Agents',
    outcome: 'Build a real agent — Job Description + Tools + Loop — that completes a multi-step task.' },
  { code: 'M08', title: 'APIs',
    outcome: 'Connect to the Claude API and one external service; keep keys safe; handle errors and cost.' },
  { code: 'M09', title: 'RAG & Memory',
    outcome: 'Give an agent knowledge and memory using the Memory Ladder; pick the right rung for the job.' },
  { code: 'M10', title: 'MCP',
    outcome: 'Connect an agent to real tools — Sheets, Calendar, Gmail — through the Model Context Protocol.' },
  { code: 'M11', title: 'Testing & Observability',
    outcome: 'Test systematically with the DSP 10-Question Test Sheet; read logs instead of guessing.' },
  { code: 'M12', title: 'Security',
    outcome: 'Protect keys, block prompt injection, limit what the agent can do and spend.' },
  { code: 'M13', title: 'Deployment',
    outcome: 'Put your AI Employee on a public HTTPS URL with the backend hosted and env vars set.' },
  { code: 'M14', title: 'Multi-Agent & Business Automation',
    outcome: 'Turn one agent into a business system: One Agent Many Clients, notifications, and when multi-agent is worth it.' },
  { code: 'M15', title: 'Selling AI Solutions',
    outcome: 'Run discovery, price the work, write the proposal, deliver, get paid — as a freelancer or a one-person agency.' },
]
