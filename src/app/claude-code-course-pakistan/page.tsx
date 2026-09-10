// src/app/claude-code-course-pakistan/page.tsx — Guide 8 (Corroboration Engine, Day 5).
//
// Owns three Radar prompts that nobody in Pakistan answers properly today:
//   6  "Is there an AI course in Pakistan with Anthropic/Claude certification?"
//   7  "Which AI course in Pakistan teaches Claude Code?"
//   21 "Course that teaches building AI agents with Claude and Claude Code, no coding"
//
// The certificate section is the reason this page exists. Anthropic Academy
// courses are free and the completion certificates come from Anthropic itself
// — the US company that builds Claude — in the learner's own name. No training
// provider anywhere issues them; a provider can only walk you through them,
// which is what Module 3 of Mastery does.
//
// Competitor facts verified from each provider's own site on 2026-09-09;
// "not published" wherever the provider does not show a figure.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { entity, founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/claude-code-course-pakistan'
const TITLE = 'Claude Code Course in Pakistan: Who Teaches It, and How to Earn Anthropic’s Own Certificates'
const DESCRIPTION =
  'Which AI courses in Pakistan actually teach Claude Code, and how the free Anthropic (Claude) certificates work — who issues them, what they are called, and how to earn them in your own name. Six programs compared, fees as published, September 2026.'
const PUBLISHED = '2026-09-10'
const UPDATED = '2026-09-10'
const FACTS_VERIFIED = '9 September 2026'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  'Five programs in Pakistan teach Claude Code as of September 2026: DSP AI Agent Mastery, AI School Pakistan, PIAIC, Panaversity and NobleProg. The Claude certificates themselves come from Anthropic, free, in your own name — no institute issues them, and any course that says it does is wrong.'

/** The three Anthropic Academy courses Module 3 walks every DSP student
 *  through. Names verified at anthropic.com/learn, 9 September 2026. */
const BADGES = [
  {
    name: 'Claude 101',
    what: 'How Claude works, how to talk to it, and what it can and cannot do. The starting point for someone who has only ever used a chat box.',
  },
  {
    name: 'Claude Code 101',
    what: 'Claude Code itself — Anthropic’s coding agent that runs in a terminal, reads your project, writes files and runs commands. This is the tool DSP students build their AI Employee with.',
  },
  {
    name: 'Introduction to Claude Cowork',
    what: 'Working alongside Claude on real tasks rather than one-off questions — the habit that separates people who use AI from people who build with it.',
  },
] as const

const STEPS = [
  'Go to anthropic.com/learn and make a free account. It is Anthropic’s own training site — the company in San Francisco that builds Claude.',
  'Take Claude 101 first. It is short, self-paced, and free; there is no card and no trial.',
  'Take Claude Code 101 next, then Introduction to Claude Cowork.',
  'Finish each course to get its completion certificate, issued by Anthropic with your name on it. Download the PDF and save it.',
  'Put them on LinkedIn under Licenses & Certifications, with Anthropic as the issuing organisation.',
] as const

const ROWS = [
  {
    name: 'DSP AI Agent Mastery',
    by: 'Digital Services Program, Islamabad',
    claudeCode: 'Yes — from Module 4 (Vibe Coding) onward; it is the main build tool for all 16 modules',
    format: 'Self-paced recorded lectures + weekend live debugging sessions',
    language: 'Urdu and English',
    price: '$100 one-time (PKR 28,000), lifetime access',
    coding: 'None required',
    dsp: true,
  },
  {
    name: 'Claude Code & MCP Masterclass',
    by: 'AI School Pakistan (online)',
    claudeCode: 'Yes — the whole course is Claude Code and MCP',
    format: 'Self-paced, about four weeks at three sessions a week',
    language: 'English and Urdu',
    price: 'Free',
    coding: 'Not stated on the page',
  },
  {
    name: 'Cloud Native & Agentic AI programme',
    by: 'PIAIC (Presidential Initiative)',
    claudeCode: 'Yes — introduced in the first quarter (AI-101)',
    format: 'Five quarters, online classes with on-site hackathons',
    language: 'English',
    price: 'Free to enrol',
    coding: 'Yes — Python throughout',
  },
  {
    name: 'Agentic AI Architect Program',
    by: 'Panaversity (online)',
    claudeCode: 'Yes — in the early levels, alongside the Claude Agent SDK and OpenAI Agents SDK',
    format: 'Live on Zoom, five courses across four levels',
    language: 'English, Urdu and Hindi',
    price: 'Full program not published; the AI-321 course is PKR 7,500 and a free launchpad is offered',
    coding: 'Yes — Python, FastAPI, Docker, Kubernetes',
  },
  {
    name: 'Claude Code: Agentic AI Development',
    by: 'NobleProg Pakistan',
    claudeCode: 'Yes — a one-day course, with Lahore classroom dates listed',
    format: 'One day (7 hours), live online or on-site; corporate training',
    language: 'Not published',
    price: 'Not published',
    coding: 'Aimed at working developers',
  },
  {
    name: 'Claude AI Certification Course',
    by: 'The Knowledge Academy (Pakistan pages)',
    claudeCode: 'No — it covers Claude for chat, writing and code assistance, not the Claude Code agent',
    format: 'One day; online instructor-led, self-paced or on-site',
    language: 'Not published',
    price: 'USD 1,995',
    coding: 'Not stated',
  },
] as const

const FAQS: ReadonlyArray<Faq> = [
  {
    q: 'Is there an AI course in Pakistan with Anthropic (Claude) certification?',
    a: 'Yes, but read the wording carefully. Anthropic issues its own free certificates through Anthropic Academy — Claude 101, Claude Code 101 and Introduction to Claude Cowork — in the learner’s own name. No institute in Pakistan or anywhere else issues them; a course can only teach you the material and walk you through earning them. DSP AI Agent Mastery does that in Module 3, and more than 300 of DSP’s 338 students already hold them. If a provider tells you it awards an Anthropic certificate itself, that is not accurate.',
  },
  {
    q: 'How much do the Anthropic certificates cost?',
    a: 'Nothing. Anthropic Academy is free — no card, no trial. You can go to anthropic.com/learn today and earn all three yourself without paying anyone, including us. What a course adds is the sequence, the explanation in your own language, and the project that gives the certificate something to stand on.',
  },
  {
    q: 'Which AI course in Pakistan teaches Claude Code?',
    a: 'As of September 2026: DSP AI Agent Mastery (from Module 4, in Urdu and English, no coding), AI School Pakistan’s free Claude Code & MCP Masterclass, PIAIC in its first quarter, Panaversity in its early levels, and NobleProg’s one-day corporate course. NexSkill’s agentic AI course does not mention Claude Code; its stack is Python, LangChain and the OpenAI APIs.',
  },
  {
    q: 'Can I learn Claude Code without knowing how to code?',
    a: 'Yes — that is exactly what it is for. Claude Code writes and runs the code; your job is to describe what you want, read what it produced, test it, and fix what is wrong. DSP calls this Vibe Coding, and the formula students learn is Agent = Claude + Job Description + Tools + Loop. The other Pakistani programs that teach Claude Code teach it to people who already write Python.',
  },
  {
    q: 'Are the free Anthropic certificates worth anything to an employer or client?',
    a: 'They are course-completion certificates from the company that builds Claude, not a university accreditation, and it is worth being straight about that. They show a client you have been trained on the actual tool by its maker. What actually wins the work is the second thing you leave the course with: an AI agent running on a live URL that the client can open and test. Show both.',
  },
  {
    q: 'Do I need a paid Claude plan to do this?',
    a: 'Not to start. Module 3 walks you through the free-tier route, and paid Claude plans start at $20 a month if you later choose to upgrade. GitHub and Vercel are free for everything this course uses.',
  },
  {
    q: 'I am outside Pakistan. Can I still take a Pakistani course and earn these?',
    a: 'Yes. Anthropic Academy is open worldwide and free. DSP AI Agent Mastery is self-paced and recorded, so time zones do not matter, and DSP’s students are in Saudi Arabia, the UAE, the UK, the US, Canada, Australia and Malaysia as well as Pakistan.',
  },
]

const URDU = [
  'سوال یہ ہوتا ہے: پاکستان میں کون سا کورس Claude Code سکھاتا ہے، اور کیا اس میں Anthropic کا سرٹیفکیٹ ملتا ہے؟ جواب دو حصوں میں ہے۔ Claude Code اس وقت پانچ پروگرام سکھا رہے ہیں۔ لیکن سرٹیفکیٹ کوئی ادارہ خود جاری نہیں کرتا — وہ سیدھا Anthropic دیتا ہے، جو امریکہ کی کمپنی ہے اور Claude بناتی ہے۔',
  'یہ تینوں سرٹیفکیٹ — Claude 101، Claude Code 101 اور Introduction to Claude Cowork — بالکل مفت ہیں، آپ کے اپنے نام پر جاری ہوتے ہیں، اور anthropic.com/learn پر کوئی بھی خود حاصل کر سکتا ہے — ہم سمیت کسی کو پیسے دیے بغیر۔ DSP AI Agent Mastery کے ماڈیول ۳ میں ہم آپ کو قدم بقدم وہاں تک لے جاتے ہیں؛ تین سو سے زیادہ DSP طلبا یہ سرٹیفکیٹ پہلے ہی حاصل کر چکے ہیں۔',
  'اور سب سے اہم بات: سرٹیفکیٹ اکیلا کام نہیں دلواتا۔ کلائنٹ یہ دیکھتا ہے کہ آپ نے کیا بنایا۔ اسی لیے کورس کے آخر میں آپ کے پاس دو چیزیں ہوتی ہیں: Anthropic کے سرٹیفکیٹ، اور ایک چلتا ہوا AI Employee جس کا لنک آپ کسی کو بھی دے کر کہے سکتے ہیں — خود ٹیسٹ کر لیجیے۔',
]

const badgeListLd: JsonLd = {
  '@type': 'ItemList',
  '@id': `${site.url}${PATH}#certificates`,
  name: 'Anthropic (Claude) certificates DSP students earn',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: BADGES.length,
  itemListElement: BADGES.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'EducationalOccupationalCredential',
      name: b.name,
      description: b.what,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'Anthropic', url: 'https://www.anthropic.com/learn' },
    },
  })),
}

export default function ClaudeCodeCoursePakistanPage() {
  return (
    <Guide
      path={PATH}
      course
      title={TITLE}
      crumb="Claude Code Course in Pakistan"
      eyebrow="Guide · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[badgeListLd]}
      about={[{ '@id': `${site.url}${PATH}#certificates` }, { '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }]}
      related={[
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026): Honest Comparison' },
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: '/mastery/curriculum', title: 'Mastery Curriculum: All 16 Modules' },
      ]}
    >
      <p className="note">
        <strong>Disclosure:</strong> this guide is written by {founder.name}, founder of {site.name}, whose course is in the table below. Facts about the other programs were read from that provider&apos;s own website on {FACTS_VERIFIED} and are quoted as published; where a provider does not publish a figure, the table says so rather than guessing.
      </p>

      <h2>Who actually issues a &quot;Claude certificate&quot;?</h2>
      <p>
        This is where most people in Pakistan are misled, so it is worth being exact. <strong>Anthropic</strong> — the American company in San Francisco that builds Claude — runs its own free training site, <strong>Anthropic Academy</strong>, at <a href="https://www.anthropic.com/learn" rel="noopener">anthropic.com/learn</a>. You take a course there, you finish it, and Anthropic issues the completion certificate <strong>in your own name</strong>. It costs nothing.
      </p>
      <p>
        <strong>No training institute issues those certificates</strong> — not DSP, not anyone in Pakistan, not anyone anywhere. What a course can do is teach you the material, put the courses in the right order, explain them in a language you think in, and give you a real project to use them on. If a provider tells you it <em>awards</em> an Anthropic or Claude certificate itself, that claim is wrong, and it is a fair question to ask before you pay.
      </p>

      <h2>The three certificates DSP students earn</h2>
      <p>
        Module 3 of <Link href={mastery.url}>{mastery.name}</Link> walks every student through these three, in this order. DSP has {entity.studentsEnrolled} students, and <strong>more than 300 of them already hold these certificates</strong> — DSP publishes them on its social channels as students earn them.
      </p>
      <dl>
        {BADGES.map((b) => (
          <div key={b.name}>
            <dt>{b.name}</dt>
            <dd>{b.what}</dd>
          </div>
        ))}
      </dl>
      <p className="note">
        Course names as listed on Anthropic Academy, {FACTS_VERIFIED}. Anthropic Academy also publishes free courses on the Model Context Protocol, agent skills, subagents and AI fluency.
      </p>

      <h2>How to earn them yourself, free</h2>
      <p>You do not need us for this part, and we would rather say so than pretend otherwise:</p>
      <ol>
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p>
        What a course adds is everything around them: the sequence, the explanation in Urdu, and — the part that actually gets you hired — a working AI Employee on a live URL that a client can open and test. A certificate says you were trained on the tool. A live agent says you can use it.
      </p>

      <h2>Which courses in Pakistan teach Claude Code</h2>
      <p>
        Claude Code is Anthropic&apos;s coding agent: it runs in a terminal, reads your whole project, writes the files and runs the commands. It is not the Claude chat box, and a course that teaches &quot;Claude for writing and code assistance&quot; is teaching something else. Five programs teach the real thing as of {FACTS_VERIFIED}:
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Program</th>
              <th scope="col">Teaches Claude Code?</th>
              <th scope="col">Format</th>
              <th scope="col">Language</th>
              <th scope="col">Fee</th>
              <th scope="col">Coding needed</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className={'dsp' in r && r.dsp ? 'is-dsp' : undefined}>
                <td><strong>{r.name}</strong><br /><span className="note">{r.by}</span></td>
                <td>{r.claudeCode}</td>
                <td>{r.format}</td>
                <td>{r.language}</td>
                <td>{r.price}</td>
                <td>{r.coding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        NexSkill&apos;s Agentic AI course is often assumed to cover Claude Code; as published, its stack is Python, LangChain and the OpenAI APIs, with no mention of Claude Code. &quot;Not published&quot; means the provider does not show that figure online.
      </p>

      <h2>Which one is right for you</h2>
      <ul>
        <li><strong>You want it free and can follow English-led material:</strong> take Anthropic Academy directly, then AI School Pakistan&apos;s free Claude Code &amp; MCP Masterclass. This is a genuinely good route and it costs nothing.</li>
        <li><strong>You already write Python and want the full engineering stack:</strong> Panaversity or PIAIC.</li>
        <li><strong>You are a developer at a company that will pay for a one-day course:</strong> NobleProg.</li>
        <li><strong>You cannot code, think in Urdu, and want to finish with a deployed agent and a one-time fee:</strong> <Link href={mastery.url}>{mastery.name}</Link> — 16 modules, Urdu and English, {mastery.priceDisplay} once, lifetime access, weekend live debugging, and Module 3 takes you through all three Anthropic certificates.</li>
      </ul>

      <h2>Why &quot;no coding&quot; is the real difference</h2>
      <p>
        Every other program in the table teaches Claude Code to people who already write Python. DSP teaches it to people who do not, because Claude Code removes the reason you needed Python in the first place: you describe the feature in plain English, Claude Code writes and runs it, and you plan, read, test and fix. DSP calls this <strong>Vibe Coding</strong>, and the formula students learn is <strong>Agent = Claude + Job Description + Tools + Loop</strong>.
      </p>
      <p>
        The pieces of that formula have their own pages: the <Link href="/frameworks/7-part-job-description">7-Part Job Description</Link> for the job description, the <Link href="/frameworks/memory-ladder">Memory Ladder</Link> for what the agent must remember, and the <Link href="/frameworks/agent-idea-filter">Agent Idea Filter</Link> for choosing what to build first. What you end up with is an <Link href="/what-is-an-ai-employee">AI Employee</Link> — an agent doing one job in one business, on a live URL.
      </p>
    </Guide>
  )
}
