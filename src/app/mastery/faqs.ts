// src/app/mastery/faqs.ts — the /mastery FAQ, as data.
//
// This array feeds the FAQPage node in ./schema.ts and MUST mirror the
// visible <section id="faq"> in ./page.tsx word for word (schema may only
// describe what a visitor can read). `npm run test:mastery-schema` diffs the
// two, so edit both together.
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
]
