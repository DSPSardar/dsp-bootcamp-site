// src/app/frameworks/agent-idea-filter/page.tsx — Framework page (Day 3).
//
// DSP's five-question test an idea passes before anyone builds it, as
// taught in Module 1 and used on every agency discovery call. The five
// questions and the 1–5 scoring are the ones on the Agent Idea Filter
// worksheet students download in Module 1: repeatable? clear input and
// output? saves real time or makes real money? safe to automate? doable
// with Claude + tools? DefinedTerm + HowTo schema; the worksheet in a <pre>.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/frameworks/agent-idea-filter'
const TITLE = 'The Agent Idea Filter: 5 Questions to Ask Before You Build an AI Agent'
const DESCRIPTION =
  'The Agent Idea Filter is DSP\'s five-question test for an AI agent idea — is it repeatable, is the input and output clear, does it save real time or make real money, is it safe to automate, is it doable with Claude and tools — scored 1–5 each. How to score, what passes, what fails, and the worksheet.'
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const DEFINITION =
  'The Agent Idea Filter is DSP\'s five-question test for deciding whether an AI agent idea is worth building: is the task repeatable, is its input and output clear, does it save real time or make real money, is it safe to automate, and is it doable with Claude and tools — each scored 1 to 5, with an average of 4 or more meaning build it.'

const ANSWER =
  `${DEFINITION} Most "I could automate this" ideas fail on the second question: they are three ideas mixed together.`

const TERM_ID = `${site.url}${PATH}#term`

const QUESTIONS = [
  {
    n: '1',
    q: 'Is it repeatable?',
    what: 'Does the task happen more than once — every day, every week, every time a customer does something? A one-off job is not worth an agent; you would spend longer building it than doing it. The best ideas are the ones someone is bored of.',
    low: '1 = happens once',
    high: '5 = happens every day',
  },
  {
    n: '2',
    q: 'Is the input and output clear?',
    what: 'Can you say, in one sentence, what goes in — a message, a form, a question — and what comes out — an answer, a booking, an order in the kitchen? If you cannot, it is not one idea yet; it is two or three mixed together. Split it and score the pieces separately.',
    low: '1 = vague: "help with marketing"',
    high: '5 = "customer sends an order → agent confirms the total and emails the kitchen"',
  },
  {
    n: '3',
    q: 'Does it save real time or make real money?',
    what: 'Would a real person be relieved if this stopped landing on their desk? Would a business pay for it? This is the question that separates a project from a product — and it is the one to ask a client on the discovery call, in exactly these words.',
    low: '1 = nice to have',
    high: '5 = someone is doing this by hand for hours every week, right now',
  },
  {
    n: '4',
    q: 'Is it safe to automate?',
    what: 'Nothing in the task needs a human judgement that carries legal, medical, financial or safety risk if the AI gets it wrong. Reminders, bookings, orders and FAQs are safe; diagnoses, contracts and large payments are not agent-only work. Safe also means reversible: if the agent errs, can a human undo it?',
    low: '1 = a high-stakes judgement call',
    high: '5 = low risk, reversible if wrong',
  },
  {
    n: '5',
    q: 'Is it doable with Claude and tools?',
    what: 'Can you name the tools it would need — send an email, check a calendar, read a spreadsheet, look up a menu? If the tools exist or can be built, it is doable with what the course teaches. If it needs robotics, real-time video or something nobody has an API for, park it.',
    low: '1 = needs something exotic',
    high: '5 = text in, tool calls, text out',
  },
]

const PASS = [
  'A café agent that takes WhatsApp orders and confirms the total — the course\'s own project.',
  'A tutor\'s agent that answers "when is my next class?" and reschedules from a calendar.',
  'A clinic\'s agent that qualifies a lead, books a slot and sends a reminder.',
  'A freelancer\'s agent that drafts a proposal from a client\'s brief.',
]

const FAIL = [
  { idea: '"An agent that manages my whole business"', why: 'not one clear input and output — it is ten ideas.' },
  { idea: '"An agent that gives legal advice"', why: 'safety score too low for agent-only work.' },
  { idea: '"An agent for one event next month"', why: 'not repeatable enough to be worth building.' },
  { idea: '"An agent that does my marketing"', why: 'vague in and out; split into "write three post drafts from this product page" and score that instead.' },
]

const FAQS: Faq[] = [
  {
    q: 'What score does an idea need to pass the Agent Idea Filter?',
    a: 'An average of 4 or more across the five questions — 20 out of 25. An idea can score 5 on four questions and 1 on safety and still be the wrong build; read the low scores, not just the total.',
  },
  {
    q: 'Why score five ideas instead of one?',
    a: 'Because the first idea is rarely the best one, and scoring five side by side shows you why. Module 1 asks for five ideas through the filter and one chosen — with the user it serves named specifically and what "done" looks like written down.',
  },
  {
    q: 'What is the most common reason ideas fail?',
    a: 'Question 2. "Help with customer service" or "manage my inbox" are bundles of tasks with different inputs and outputs. Split the bundle, and one of the pieces usually scores 5 on its own.',
  },
  {
    q: 'Can I use the filter with a client?',
    a: 'That is where DSP uses it most. On a discovery call the five questions become the agenda: what happens repeatedly, what goes in and comes out, what it costs them now, what must stay with a human, and which of their systems the agent needs. The scores tell you what to quote, and what to decline.',
  },
  {
    q: 'Does a low safety score mean never build it?',
    a: 'It means not agent-only. A high-stakes task can still be assisted — the agent drafts, a human approves — which is a different, safer idea with a different score. Rewrite the idea with the human step in it and score again.',
  },
  {
    q: 'Where is this taught?',
    a: `Module 1 of ${mastery.name} (AI Foundations), where you put five ideas through the filter and choose the one you will build for the rest of the course. The worksheet is one of the module's downloads.`,
  },
]

const URDU = [
  'ایجنٹ آئیڈیا فلٹر DSP کا پانچ سوالوں کا ٹیسٹ ہے جو کوئی بھی AI ایجنٹ بنانے سے پہلے دیا جاتا ہے: کیا یہ کام بار بار ہوتا ہے؟ کیا اس کا ان پٹ اور آؤٹ پٹ ایک جملے میں واضح ہے؟ کیا یہ حقیقی وقت بچاتا یا پیسہ کماتا ہے؟ کیا اسے خودکار بنانا محفوظ ہے؟ اور کیا یہ Claude اور ٹولز سے ممکن ہے؟ ہر سوال پر 1 سے 5 نمبر — اوسط 4 یا زیادہ ہو تو بنائیں۔',
  `زیادہ تر آئیڈیاز دوسرے سوال پر ناکام ہوتے ہیں: "میرا سارا کاروبار سنبھالے" ایک آئیڈیا نہیں، دس ہیں۔ اسے توڑیں، اور ایک ٹکڑا اکثر خود پانچ نمبر لے جاتا ہے۔ یہ ${mastery.name} کے ماڈیول 1 میں سکھایا جاتا ہے، جہاں آپ پانچ آئیڈیاز فلٹر سے گزارتے ہیں اور ایک چنتے ہیں — ${founder.name} کے ساتھ، اردو اور انگریزی میں۔`,
]

const definedTermLd: JsonLd = {
  '@type': 'DefinedTerm',
  '@id': TERM_ID,
  name: 'The Agent Idea Filter',
  alternateName: ['DSP Agent Idea Filter', 'Idea Filter'],
  description: DEFINITION,
  url: `${site.url}${PATH}`,
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'DSP AI agent frameworks', url: `${site.url}${founder.path}` },
}

const howToLd: JsonLd = {
  '@type': 'HowTo',
  '@id': `${site.url}${PATH}#howto`,
  name: 'How to test an AI agent idea with the Agent Idea Filter',
  description: 'Write five ideas in one line each, score each on the five questions from 1 to 5, and build the one that averages 4 or more with a named user and a written success condition.',
  inLanguage: ['en', 'ur'],
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Write five ideas, one line each', text: 'Each as "who sends what in → what comes out". If an idea will not fit one line, it is more than one idea.', url: `${site.url}${PATH}#worksheet` },
    ...QUESTIONS.map((q, i) => ({
      '@type': 'HowToStep',
      position: i + 2,
      name: `Score: ${q.q}`,
      text: `${q.what} ${q.low}; ${q.high}.`,
      url: `${site.url}${PATH}#q-${q.n}`,
    })),
    { '@type': 'HowToStep', position: 7, name: 'Choose the idea that averages 4 or more', text: 'Read the low scores before the total. Then write who it serves — one named person or one type of customer — and what "done" looks like: the exact output when it succeeds.', url: `${site.url}${PATH}#worksheet` },
  ],
}

export default function AgentIdeaFilterPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="The Agent Idea Filter"
      parents={[{ name: 'DSP frameworks', path: `${founder.path}#frameworks` }]}
      eyebrow="Framework · Module 1 · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[definedTermLd, howToLd]}
      about={[{ '@id': TERM_ID }, { '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }]}
      related={[
        { path: '/frameworks/7-part-job-description', title: 'The 7-Part Job Description' },
        { path: '/frameworks/memory-ladder', title: 'The Memory Ladder' },
        { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?' },
        { path: '/learn-ai-agents-pakistan', title: 'How to Learn AI Agents in Pakistan' },
      ]}
    >
      <div className="definition" id="definition">
        <p className="kicker">Definition</p>
        <p><strong>The Agent Idea Filter</strong> (noun) — {DEFINITION}</p>
      </div>

      <h2>Why filter before you build</h2>
      <p>
        The most expensive mistake in this field is not a bug; it is a month spent building an agent nobody needed. Students arrive with &quot;an agent that runs my business&quot;, clients arrive with &quot;we want AI&quot;, and both are sincere and both are unbuildable as stated. The filter is the half-hour that turns either into something a person can build and someone will use. {founder.name} uses it in the first module of every course and on every agency discovery call, in the same five questions, because the questions are the same whether the builder is a student or a company.
      </p>

      <h2>The five questions</h2>
      <p>Score each from 1 to 5. Write the score down — the point is to compare ideas, not to feel good about one.</p>
      <dl>
        {QUESTIONS.map((q) => (
          <div key={q.n} id={`q-${q.n}`}>
            <dt><span className="n">Q{q.n}</span>{q.q}</dt>
            <dd>{q.what} <span className="note">{q.low} · {q.high}.</span></dd>
          </div>
        ))}
      </dl>

      <h2>Scoring</h2>
      <ul>
        <li><strong>Average 4 or more (20+ out of 25):</strong> build it.</li>
        <li><strong>Average 3 to 4:</strong> usually one question is dragging it down. Rewrite the idea to fix that question — narrow the input and output, add a human approval step for safety — and score again.</li>
        <li><strong>Below 3:</strong> park it. Not wrong, just not yet.</li>
        <li><strong>Any 1 on safety:</strong> not agent-only work, whatever the total. Redesign so a human approves the risky step.</li>
      </ul>

      <h2 id="worksheet">The worksheet</h2>
      <p>Five ideas in, one out. Copy it, fill it, keep it — the rejected ideas are next year&apos;s.</p>
      <pre>{`AGENT IDEA FILTER — score 1 (low) to 5 (high)

#  Idea (one line: who sends what in → what comes out)   Rep  I/O  $$  Safe  Doable  Total
1  ________________________________________________     __   __   __   __    __     __
2  ________________________________________________     __   __   __   __    __     __
3  ________________________________________________     __   __   __   __    __     __
4  ________________________________________________     __   __   __   __    __     __
5  ________________________________________________     __   __   __   __    __     __

Chosen idea:        ______________________________________________
Who does it serve?  (one person or one type of customer — named, not "everyone")
                    ______________________________________________
What does "done"    (the exact output the agent produces when it succeeds)
look like?          ______________________________________________`}</pre>

      <h2>Ideas that pass</h2>
      <ul>
        {PASS.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <h2>Ideas that fail — and why</h2>
      <ul>
        {FAIL.map((f) => <li key={f.idea}><strong>{f.idea}</strong> — {f.why}</li>)}
      </ul>

      <h2>After the filter</h2>
      <p>
        A chosen idea with a named user and a written success condition is the first line of its <Link href="/frameworks/7-part-job-description">7-Part Job Description</Link>: the Role and the Goal are already decided. The &quot;doable with tools&quot; answer becomes the Steps. The safety answer becomes the Rules and the escalation line. That is why the filter is Module 1 and the job description is Module 2 of <Link href="/mastery/curriculum">{mastery.shortName}</Link>: one feeds the other, and the agent you build for the rest of the course is the one that passed.
      </p>
    </Guide>
  )
}
