// src/app/what-is-an-ai-employee/page.tsx — Guide 6 (Corroboration Engine, Day 3).
//
// The definition page. "AI employee" is the term DSP uses for what it builds
// (the agency) and what it teaches students to build (Mastery), so this page
// is the one both divisions point at when the phrase needs explaining. A
// 40-word definition in a .definition block, emitted as a DefinedTerm; the
// four parts; the named examples DSP actually runs (Zara, Adam, Maya, Emma —
// every claim about them rephrases copy already published on /ai-employees,
// from site.ts `agency`) plus the café project every student builds; and a
// chatbot / agent / AI employee comparison.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { agency, founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/what-is-an-ai-employee'
const TITLE = 'What Is an AI Employee? Definition, the 4 Parts, and 5 Real Examples'
const DESCRIPTION =
  'An AI employee is an AI agent given a specific job in a business — a job description, memory of the business, tools to act, and a channel customers already use — that works around the clock and hands off to a human when needed. The definition, the four parts, five examples, and how it differs from a chatbot or a plain agent.'
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

/** The 40-word definition — the sentence an answer engine lifts. Rendered
 *  verbatim in the .definition block and as the DefinedTerm description. */
const DEFINITION =
  'An AI employee is an AI agent given one specific job in a business: a written job description, memory of that business\'s facts, tools to take real actions, and a channel customers already use — working around the clock and handing off to a human when needed.'

const ANSWER =
  `${DEFINITION} The term is DSP's; the four parts are what separate an AI employee from a chatbot that only talks.`

const TERM_ID = `${site.url}${PATH}#term`

const PARTS = [
  {
    n: '1',
    name: 'A job description',
    what: 'One role, one goal, one audience, written down — who it is, what success means, how it speaks, what it must never do, and what to do when it is out of its depth. At DSP this is written with the 7-Part Job Description. Without it an agent is a general-purpose assistant; with it, it is an employee.',
    href: '/frameworks/7-part-job-description',
    label: 'The 7-Part Job Description',
  },
  {
    n: '2',
    name: 'Memory of the business',
    what: 'Prices, hours, policies, the menu, the answers to the fifty questions customers actually ask — and, for a returning customer, who they are and what they ordered last time. Which kind of memory it needs is decided with the Memory Ladder; most AI employees need a knowledge base and a per-customer record.',
    href: '/frameworks/memory-ladder',
    label: 'The Memory Ladder',
  },
  {
    n: '3',
    name: 'Tools to act',
    what: 'A chatbot answers; an employee does. Booking a slot in the calendar, adding a row to the order sheet, sending the confirmation email, checking stock — real actions in the systems the business already uses, connected through APIs or MCP, with limits on what the agent may do and spend.',
  },
  {
    n: '4',
    name: 'A channel customers already use',
    what: 'WhatsApp, a phone line, a website chat, email. The employee lives where the customers are, not on a new app they have to download. In Pakistan and the Gulf that is overwhelmingly WhatsApp; for restaurants in the US and UK it is the phone.',
  },
]

const EXAMPLES = agency.employees.map((e) => ({
  name: e.name,
  role: e.role,
  what: e.hubLine,
  bestFor: e.bestFor,
  href: `/ai-employees/${e.id}`,
}))

const FAQS: Faq[] = [
  {
    q: 'What is the difference between an AI employee and a chatbot?',
    a: 'A chatbot answers questions from a script or a model and stops there. An AI employee has a job description, memory of the business, tools to act — book, order, email, update a sheet — and works on a channel customers already use. The test: can it complete a task end to end without a human, and does it know when to hand off?',
  },
  {
    q: 'Is an AI employee the same as an AI agent?',
    a: 'An AI employee is an AI agent with a job. Every AI employee is an agent (it plans, uses tools, loops until done); not every agent is an employee — a research agent that browses the web for you is an agent but has no business role, memory of a business, or customer channel.',
  },
  {
    q: 'Can an AI employee replace a human employee?',
    a: 'It replaces a set of repetitive tasks, not a person. The AI employees DSP builds answer the same fifty questions, take orders, qualify leads and book appointments — the work that lands on a human at 11 pm — and hand anything sensitive or unusual to the team with the full conversation attached.',
  },
  {
    q: 'What does an AI employee cost?',
    a: `Two costs: building it, and running it. DSP's agency publishes its USD setup and monthly prices on its pricing page. Running costs are the AI model's usage, hosting and the channel (for example, WhatsApp's per-message fees) — small for a single business, and covered in the deployment stage of the course.`,
  },
  {
    q: 'Can I build an AI employee myself without coding?',
    a: `Yes. That is what ${mastery.name} teaches: you write the job description in plain English, Claude Code writes the code, and you build one AI employee — a café ordering agent — from an empty folder to a live URL across ${mastery.modules} modules, then your own.`,
  },
  {
    q: 'Who coined the term "AI employee"?',
    a: 'Several companies use the phrase. At DSP it has the specific meaning defined above — the four parts — and it is the name of both the agency\'s products (Zara, Adam, Maya, Emma) and the project every Mastery student ships.',
  },
]

const URDU = [
  'AI ایمپلائی ایک ایسا AI ایجنٹ ہے جسے کسی کاروبار میں ایک مخصوص نوکری دی گئی ہو: ایک لکھی ہوئی جاب ڈسکرپشن، کاروبار کی معلومات کی میموری، عمل کرنے کے لیے ٹولز، اور وہ چینل جو گاہک پہلے سے استعمال کرتے ہیں — جیسے واٹس ایپ یا فون۔ یہ چوبیس گھنٹے کام کرتا ہے اور جہاں انسان کی ضرورت ہو، معاملہ انسان کو دے دیتا ہے۔',
  `چیٹ بوٹ صرف جواب دیتا ہے؛ AI ایمپلائی کام مکمل کرتا ہے — آرڈر لیتا ہے، بکنگ کرتا ہے، ای میل بھیجتا ہے۔ DSP کے اپنے AI ایمپلائیز — زارا، آدم، مایا اور ایما — یہی کرتے ہیں، اور ${mastery.name} میں ہر طالب علم ایک کیفے کا AI ایمپلائی خود بناتا ہے، خالی فولڈر سے لائیو URL تک، اردو اور انگریزی میں، ${founder.name} کے ساتھ۔`,
]

const definedTermLd: JsonLd = {
  '@type': 'DefinedTerm',
  '@id': TERM_ID,
  name: 'AI employee',
  alternateName: ['AI Employee', 'AI worker'],
  description: DEFINITION,
  url: `${site.url}${PATH}`,
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'DSP AI agent vocabulary', url: `${site.url}${PATH}` },
}

export default function WhatIsAnAiEmployeePage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="What Is an AI Employee?"
      eyebrow="Guide · Definition · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[definedTermLd]}
      about={[{ '@id': TERM_ID }, { '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }]}
      related={[
        { path: '/learn-ai-agents-pakistan', title: 'How to Learn AI Agents in Pakistan' },
        { path: '/ai-employees', title: 'The AI Employees DSP builds — Zara, Adam, Maya, Emma' },
        { path: '/mastery/curriculum', title: 'Mastery Curriculum: All 16 Modules' },
      ]}
    >
      <div className="definition" id="definition">
        <p className="kicker">Definition</p>
        <p><strong>AI employee</strong> (noun) — {DEFINITION}</p>
      </div>

      <h2>The four parts of an AI employee</h2>
      <p>Take any one away and you have something else: no job description and it is a general assistant; no memory and it invents your prices; no tools and it is a chatbot; no channel and nobody uses it.</p>
      <dl>
        {PARTS.map((p) => (
          <div key={p.n}>
            <dt><span className="n">PART {p.n}</span>{p.name}</dt>
            <dd>{p.what}{p.href && <> <Link href={p.href}>{p.label} →</Link></>}</dd>
          </div>
        ))}
      </dl>

      <h2>Five real examples</h2>
      <p>Four are AI employees {site.shortName}&apos;s agency builds and runs for businesses; the fifth is the one every {mastery.shortName} student builds. Each has all four parts.</p>
      <div className="table-scroll wide">
        <table>
          <thead>
            <tr>
              <th scope="col">AI employee</th>
              <th scope="col">Job</th>
              <th scope="col">What it does</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((e) => (
              <tr key={e.name}>
                <td><strong><Link href={e.href}>{e.name}</Link></strong></td>
                <td>{e.role}</td>
                <td>{e.what}</td>
                <td>{e.bestFor}</td>
              </tr>
            ))}
            <tr className="is-dsp">
              <td><strong>The café ordering agent</strong><br /><span className="note">Built by every Mastery student</span></td>
              <td>AI Order-Taking Employee (WhatsApp / web)</td>
              <td>Takes a full order from the menu with sizes and quantities, confirms the total, sends the order to the kitchen by email or a Google Sheet, remembers a returning customer, and serves two cafés from one deployment.</td>
              <td>Learning: it is the project that grows through all {mastery.modules} modules, from an empty folder to a live URL.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Chatbot vs AI agent vs AI employee</h2>
      <div className="table-scroll wide">
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Chatbot</th>
              <th scope="col">AI agent</th>
              <th scope="col">AI employee</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">What it does</th><td>Answers questions</td><td>Plans, uses tools and loops until a task is done</td><td>Does one job in one business, end to end</td></tr>
            <tr><th scope="row">Instructions</th><td>A script or a general prompt</td><td>A goal for this task</td><td>A standing job description: role, goal, audience, tone, steps, rules, examples</td></tr>
            <tr><th scope="row">Memory</th><td>This conversation only</td><td>This task only</td><td>The business&apos;s facts, and each customer across visits</td></tr>
            <tr><th scope="row">Tools</th><td>None, or a search box</td><td>Whatever the task needs</td><td>The business&apos;s own systems: calendar, orders, email, CRM — with limits</td></tr>
            <tr><th scope="row">Channel</th><td>A widget on a website</td><td>A developer&apos;s terminal or app</td><td>Where customers already are: WhatsApp, phone, email, web chat</td></tr>
            <tr><th scope="row">Hand-off</th><td>&quot;Please contact support&quot;</td><td>Stops or asks the user</td><td>Escalates to a named human with the full conversation attached</td></tr>
            <tr><th scope="row">Runs</th><td>When someone opens the widget</td><td>When someone starts it</td><td>24/7, on a live URL, after a human has tested and approved it</td></tr>
            <tr><th scope="row">Example</th><td>A FAQ bot on a bank website</td><td>A research agent that browses and summarises</td><td>Zara answering a WhatsApp lead at 11 pm and following up until they decide</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How an AI employee gets built</h2>
      <p>The same way at DSP&apos;s agency and in the course, in three steps a business owner can follow:</p>
      <ol>
        <li><strong>Discover.</strong> Map the job: the services, the price list, the FAQs, the hours, the rules — and exactly which questions must go to a human.</li>
        <li><strong>Build.</strong> Write the job description, load the business&apos;s facts, connect the tools, and test against a written acceptance sheet — DSP uses a 10-point sheet — including rude, confused and off-topic messages.</li>
        <li><strong>Go live.</strong> The owner tests it on their own number or line; when they approve, it starts working. Every conversation and outcome is logged, and it escalates when it should.</li>
      </ol>
      <p>
        If you want one built for you, the agency&apos;s employees are on the <Link href="/ai-employees">AI Employees page</Link> with published prices. If you want to build your own — or build them for clients — the six-stage path is in <Link href="/learn-ai-agents-pakistan">How to Learn AI Agents in Pakistan</Link>, and <Link href={mastery.url}>{mastery.name}</Link> teaches it in Urdu and English.
      </p>
    </Guide>
  )
}
