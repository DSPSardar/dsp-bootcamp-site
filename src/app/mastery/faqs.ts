// src/app/mastery/faqs.ts — the /mastery FAQ, as data.
//
// This array feeds the FAQPage node in ./schema.ts and MUST mirror the
// visible <section id="faq"> in ./page.tsx word for word (schema may only
// describe what a visitor can read). `npm run test:schema` diffs the
// two, so edit both together. Answers are plain text: no links, no markup
// (the graph is JSON-LD, not HTML) — put a link near the FAQ, not in it.
export type Faq = { q: string; a: string }

export const MASTERY_FAQS: readonly Faq[] = [
  { q: 'I have never coded. Can I really do this?',
    a: 'Yes. That is the audience this was built for. You describe what you want and Claude Code writes the code. Your job is to plan, direct, test and ship — which is what the program teaches. If you can write a clear WhatsApp message, you can write a Job Description.' },
  { q: 'How much time does it take?',
    a: 'About an hour a day for 30 days, or four sessions a week for eight weeks. Each module is one to three lectures plus a build. Lifetime access means you can go slower — the only thing that doesn\'t work is stopping.' },
  { q: 'Windows or Mac?',
    a: 'Both. Setup guides for each are in Module 3, including the fixes for the common Windows issues we\'ve solved with hundreds of students.' },
  { q: 'Is $100 really all I pay?',
    a: '$100 covers the entire program, lifetime. You will need a Claude account to build with during the modules — Module 3 walks you through setup and the free-tier route, and paid Claude plans start at $20/month if you choose to upgrade. GitHub and Vercel are free for what this program uses. No other purchase is required to finish.' },
  { q: 'What does "one year of free support" mean?',
    a: 'You\'re in the DSP group from day one, and questions there are answered within one working day. On top of that there\'s a live session every weekend — bring your build, we debug your errors on the call, and every session is recorded. Support runs for a full year.' },
  { q: 'Is it in Urdu or English?',
    a: 'Lectures are taught in an Urdu–English mix, the way DSP teaches live. All templates, slides and downloads are in English. Subtitles are provided.' },
  { q: 'Can I pay from Pakistan?',
    a: 'Yes — bank transfer, JazzCash or Easypaisa. Go to the enrol page, send the payment, upload the screenshot with your email, and we send your sign-in link once it\'s verified — usually within a few hours.' },
  { q: 'Do I get a recognised certificate?',
    a: 'Two kinds. The DSP Master certificate has a public verification page showing the live agent you built — that is proof of work, not attendance. Separately, Module 3 walks you through Claude Academy, the free training run by Anthropic — the US company that builds Claude — so you finish holding three of their course completion badges with your name on them — Claude 101, Claude Code 101 and Introduction to Claude Cowork. Those are issued by Anthropic, not by DSP. Neither is a university accreditation; what employers and clients actually check is the working agent behind the link.' },
  { q: 'Refunds?',
    a: 'Seven days, no questions. Start Module 1; if it isn\'t for you, email us and we refund in full.' },
  // ── Added Sept 2026 (Tier A spec §8): the fan-out sub-queries ──
  { q: 'Is this the right AI agent course for beginners, or should I start with Python?',
    a: 'You don\'t need Python. Module 4 (Vibe Coding) teaches you to direct Claude Code: you plan a feature, describe it, read and test the code it writes, commit, and move to the next one. You learn to read code long before you ever write it by hand — and most students never need to.' },
  { q: 'Which tools does the course use?',
    a: 'Claude, Claude Code, ChatGPT and Gemini (set up in Module 3), GitHub and Vercel (Modules 6 and 13), MCP servers (Module 10) and a vector store for RAG (Module 9). Everything runs on a free tier or costs under $20 a month; the only paid upgrade anyone chooses is a Claude plan.' },
  { q: 'How is this different from the DSP live bootcamp?',
    a: 'Same curriculum, same café AI Employee. The DSP Agentic Lab bootcamp was the live, cohort-based version and closed in August 2026 after six batches; these lectures were recorded in those cohorts. Mastery is the self-paced version: recorded lectures you start any day, plus a live weekend support session and the DSP group for a year.' },
  { q: 'Can I build an agent for my own business instead of the café?',
    a: 'Yes. The café agent is the guided build — every module adds one capability to it so you are never guessing what to do next. Your capstone is your own agent for your own use case, built with the same method, and it is reviewed by the DSP team before the certificate is issued.' },
  { q: 'What jobs or income can this lead to?',
    a: 'Three routes we see most: freelance agent builds for local businesses, monthly automation retainers, or an AI Employee running inside your own business. Phase 4 includes the discovery sheet, pricing calculator, proposal and contract templates DSP uses with its own clients. Results depend on the work you put in; nothing here is a promise of income.' },
  { q: 'Do I need a powerful laptop?',
    a: 'No. Any Windows or Mac machine from roughly the last six years with 8 GB of RAM is enough. Claude Code runs in a terminal, the model runs in Anthropic\'s cloud, and your agent is hosted on Vercel — the heavy work never happens on your machine.' },
]
