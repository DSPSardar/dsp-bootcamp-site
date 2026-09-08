// src/app/learn-ai-agents-pakistan/page.tsx — Guide 4 (Corroboration Engine, Day 3).
//
// The roadmap page for the "how to learn AI agents in Pakistan / where do I
// start" queries. Six stages, each with what you do, what you need and how
// you know you are done, emitted as a HowTo so an answer engine can quote the
// steps in order. The tool-cost table is APPROXIMATE by design (marked so on
// the page and in the row data) — vendor prices change; the point is the
// order of magnitude, not the invoice. The free-vs-paid section is honest
// about what the free path costs in time.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/learn-ai-agents-pakistan'
const TITLE = 'How to Learn AI Agents in Pakistan (2026): A 6-Stage Roadmap'
const DESCRIPTION =
  'A six-stage roadmap for learning to build AI agents from Pakistan without a coding background: understand what an AI employee is, learn prompting and Claude, build a first agent with Claude Code, add memory and tools, deploy to a live URL, and deliver to a paying client. With approximate tool costs and a free-vs-paid path.'
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  'You learn AI agents in Pakistan the same way DSP has taught hundreds of students to: understand what an AI employee is, learn prompting and Claude, build a first agent with Claude Code, give it memory and tools, deploy it to a live URL, then sell or deliver it to one client. Six stages, no Python required, on a laptop and a Claude account.'

type Stage = {
  n: number
  name: string
  goal: string
  do: string
  need: string
  done: string
  href?: string
  hrefLabel?: string
}

const STAGES: Stage[] = [
  {
    n: 1,
    name: 'Understand what an AI employee is',
    goal: 'Know the difference between a chatbot, an agent and an AI employee before you build anything.',
    do: 'Read one clear definition, then pick one repeatable task in a business you know — a shop, a clinic, a tuition centre — and write down what goes in and what should come out. Run it through the Agent Idea Filter.',
    need: 'A notebook. Nothing to install.',
    done: 'You can explain, in one Urdu sentence, what your agent will do for whom, and you have one idea that passes the filter.',
    href: '/what-is-an-ai-employee',
    hrefLabel: 'What is an AI employee?',
  },
  {
    n: 2,
    name: 'Learn prompting and Claude basics',
    goal: 'Write instructions an AI will follow reliably, and set up the tools you will build with.',
    do: 'Create a Claude account, work through Anthropic\'s free Claude Academy courses, and write your agent\'s job description with the 7-Part JD. Test it against three real messages, including one rude or confused one.',
    need: 'A Claude account (free tier is enough to start), GitHub and Vercel accounts (free).',
    done: 'A job description that produces the right reply to all three test messages, and your first Anthropic badge.',
    href: '/frameworks/7-part-job-description',
    hrefLabel: 'The 7-Part Job Description',
  },
  {
    n: 3,
    name: 'Build your first agent with Claude Code',
    goal: 'Get a working agent running on your own laptop without writing the code yourself.',
    do: 'Install Claude Code, describe one feature at a time — PLAN → BUILD ONE FEATURE → TEST → COMMIT → NEXT — and let it write the code. Start with a page where your agent answers questions from its job description.',
    need: 'A laptop (Windows or Mac), Claude Code, a Claude plan that includes it.',
    done: 'Your agent takes a message in the browser on your laptop and answers in character, and the project is in a GitHub repo.',
  },
  {
    n: 4,
    name: 'Add memory and tools',
    goal: 'Turn a talker into a worker: it knows your business facts and can act.',
    do: 'Give the agent a knowledge base (prices, hours, policies) using the right rung of the Memory Ladder, then connect one real tool — a Google Sheet, a calendar, an email — through MCP or an API. Test with the DSP 10-Question Test Sheet.',
    need: 'A Claude API key, one Google account, an afternoon.',
    done: 'The agent answers five questions correctly from your knowledge base and completes one real action — a row in a sheet, a booking, an email.',
    href: '/frameworks/memory-ladder',
    hrefLabel: 'The Memory Ladder',
  },
  {
    n: 5,
    name: 'Deploy to a live URL',
    goal: 'Make it run when your laptop is closed, on an address anyone can open.',
    do: 'Push to GitHub, deploy to Vercel, set the environment variables, protect the keys, and limit what the agent can spend. Connect WhatsApp or embed it on a website.',
    need: 'Vercel (free tier), a domain if you want one, and — for WhatsApp — a Meta business account.',
    done: 'A public HTTPS URL that a stranger can use, and a security checklist you have actually gone through.',
  },
  {
    n: 6,
    name: 'Sell or deliver it to a client',
    goal: 'Get one real business using it and paying for it.',
    do: 'Run a discovery call with one business you know, price the setup and a monthly fee, write a one-page proposal, deliver, and get paid. Then make the same agent serve a second client from the same deployment.',
    need: 'One warm contact, a proposal template, a bank or JazzCash account.',
    done: 'Money received for an agent that is live for someone else.',
    href: mastery.url,
    hrefLabel: 'How Mastery teaches selling (Modules 14–16)',
  },
]

type Cost = { item: string; free: string; paid: string; note: string }

/** Approximate USD, September 2026. Vendor prices change — treat as order of
 *  magnitude, never as a quote. */
const COSTS: Cost[] = [
  { item: 'Claude (chat)', free: 'Free tier', paid: '~$20/month (Pro)', note: 'Free is enough for stages 1–2; Pro or above includes Claude Code' },
  { item: 'Claude Code', free: '—', paid: 'Included in Pro/Max plans; or pay-as-you-go API usage, typically ~$5–30/month while learning', note: 'Usage-based — depends on how much you build' },
  { item: 'Claude API (your deployed agent)', free: '—', paid: '~$1–10/month for a small agent', note: 'Scales with messages; stage 5 includes capping what the agent can spend' },
  { item: 'Hosting (Vercel)', free: 'Free tier', paid: '~$20/month (Pro) only if you outgrow free', note: 'Free tier covers a student project and most first clients' },
  { item: 'Domain', free: '.vercel.app subdomain', paid: '~$10–15/year', note: 'Optional until a client wants their own name' },
  { item: 'WhatsApp Business API', free: 'Free to set up; free service-conversation window', paid: '~$0.01–0.05 per business-initiated message in Pakistan', note: 'Meta pricing; changes often — check the current rate card' },
  { item: 'GitHub', free: 'Free', paid: '—', note: 'Everything you need is on the free plan' },
]

const FAQS: Faq[] = [
  {
    q: 'Do I need to learn Python to build AI agents?',
    a: 'Not on this roadmap. With Claude Code you describe the agent in plain English and it writes and runs the code; your job is to plan, test and fix. Python is the right path if you want to become a developer, and courses like AI Season and Panaversity teach it — but it is not a prerequisite for shipping an agent.',
  },
  {
    q: 'How long does it take to learn AI agents from zero?',
    a: 'Working about an hour a day, most DSP students reach a deployed agent (stage 5) in four to eight weeks, and a first paying client (stage 6) within three months. The free path takes longer because you spend time finding and sequencing material instead of building.',
  },
  {
    q: 'Can I learn AI agents in Pakistan for free?',
    a: 'Yes, partly. Anthropic\'s Claude Academy, GitHub and Vercel are free, and Claude\'s free tier covers the first two stages. Stage 3 onwards needs Claude Code, which requires a paid Claude plan or API credit — roughly $20 a month. Structured teaching in Urdu is what you pay for; the tools themselves are cheap.',
  },
  {
    q: 'What laptop do I need?',
    a: 'Any Windows or Mac laptop from the last five or six years with 8 GB of RAM. The AI runs on Anthropic\'s servers, not your machine. A stable internet connection matters more than the processor.',
  },
  {
    q: 'How do I pay for Claude from Pakistan?',
    a: 'Claude accepts international debit and credit cards; many Pakistani bank cards work once international transactions are enabled. Students without a working card usually use a family member\'s card or a virtual card service. DSP\'s own course fee is payable by bank transfer, JazzCash or Easypaisa.',
  },
  {
    q: 'What can I earn building AI agents in Pakistan?',
    a: 'Local businesses pay a setup fee and a monthly fee for an agent that answers customers or takes bookings; DSP\'s own agency publishes its USD prices on its pricing page as a reference. Overseas clients pay in dollars. The roadmap\'s sixth stage is designed so your first client is one business you already know.',
  },
]

const URDU = [
  'پاکستان میں AI ایجنٹ سیکھنے کے چھ مرحلے ہیں: پہلے سمجھیں کہ AI ایمپلائی کیا ہوتا ہے؛ پھر پرامپٹنگ اور Claude کی بنیادیں سیکھیں؛ پھر Claude Code کے ساتھ اپنا پہلا ایجنٹ بنائیں؛ اسے میموری اور ٹولز دیں؛ اسے لائیو URL پر ڈیپلائے کریں؛ اور آخر میں کسی ایک کاروبار کو بیچیں یا فراہم کریں۔ Python سیکھنے کی ضرورت نہیں — آپ سادہ انگریزی میں بتاتے ہیں، Claude Code کوڈ لکھتا ہے۔',
  `ٹولز سستے ہیں: Claude کا مفت ورژن پہلے دو مرحلوں کے لیے کافی ہے، GitHub اور Vercel مفت ہیں، اور تیسرے مرحلے سے Claude Code کے لیے تقریباً بیس ڈالر ماہانہ درکار ہوتا ہے۔ جو چیز آپ خریدتے ہیں وہ ترتیب اور رہنمائی ہے۔ ${mastery.name} یہی چھ مرحلے ${mastery.modules} ماڈیولز میں اردو اور انگریزی میں سکھاتا ہے — ${mastery.pkr.price} یک مشت، تاحیات رسائی۔ استاد ${founder.name} ہیں۔`,
]

const howToLd: JsonLd = {
  '@type': 'HowTo',
  '@id': `${site.url}${PATH}#howto`,
  name: 'How to learn AI agents in Pakistan',
  description: ANSWER,
  inLanguage: ['en', 'ur'],
  totalTime: 'P8W',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '20', description: 'Approximate monthly tool cost (Claude plan); other tools have free tiers' },
  tool: [
    { '@type': 'HowToTool', name: 'Claude' },
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'GitHub' },
    { '@type': 'HowToTool', name: 'Vercel' },
  ],
  step: STAGES.map((s) => ({
    '@type': 'HowToStep',
    position: s.n,
    name: `Stage ${s.n}: ${s.name}`,
    url: `${site.url}${PATH}#stage-${s.n}`,
    itemListElement: [
      { '@type': 'HowToDirection', text: s.do },
      { '@type': 'HowToTip', text: `Done when: ${s.done}` },
    ],
  })),
}

export default function LearnAiAgentsPakistanPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="How to Learn AI Agents in Pakistan"
      eyebrow="Guide · Roadmap · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[howToLd]}
      related={[
        { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?' },
        { path: '/mastery/curriculum', title: 'Mastery Curriculum: All 16 Modules' },
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026)' },
        { path: '/ai-training-islamabad', title: 'AI Training in Islamabad' },
      ]}
    >
      <h2>Why a roadmap, not a course list</h2>
      <p>
        Most people who want to learn AI agents in Pakistan do not fail for lack of material — YouTube has thousands of hours of it. They fail because the material is in the wrong order: a video about vector databases before they have ever written a job description, or a Python tutorial when they never needed Python. The six stages below are the order {founder.name} has taught since DSP&apos;s first live cohort, and the order the {mastery.shortName} modules follow. Do them in sequence, finish each one with the &quot;done when&quot; test, and you will not get stuck on the thing that stops most beginners: not knowing what to do next.
      </p>

      <h2>The six stages</h2>
      {STAGES.map((s) => (
        <section key={s.n} id={`stage-${s.n}`} aria-labelledby={`stage-${s.n}-h`}>
          <h3 id={`stage-${s.n}-h`}>Stage {s.n}: {s.name}</h3>
          <p><strong>Goal:</strong> {s.goal}</p>
          <p><strong>What you do:</strong> {s.do}</p>
          <p><strong>What you need:</strong> {s.need}</p>
          <p><strong>Done when:</strong> {s.done}{s.href && <> · <Link href={s.href}>{s.hrefLabel}</Link></>}</p>
        </section>
      ))}

      <h2>What the tools cost</h2>
      <p>
        <strong>All figures are approximate USD, as of September 2026,</strong> rounded to the order of magnitude and taken from each vendor&apos;s public pricing. They change; treat this as a budget, not a quote. The honest summary: the tools cost about the price of one restaurant meal a month, and nothing until stage 3.
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">Free option</th>
              <th scope="col">Paid (approx.)</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {COSTS.map((c) => (
              <tr key={c.item}>
                <td><strong>{c.item}</strong></td>
                <td>{c.free}</td>
                <td>{c.paid}</td>
                <td>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">Approximate. Claude pricing from anthropic.com, Vercel from vercel.com, WhatsApp from Meta&apos;s rate card — all checked September 2026 and all subject to change.</p>

      <h2>Free path or paid path?</h2>
      <p>Both work. They differ in what you spend — time or money — and in who helps when you are stuck.</p>
      <h3>The free path</h3>
      <ul>
        <li><strong>Stage 1–2:</strong> Anthropic&apos;s Claude Academy (free, with badges), DSP&apos;s blog and guide pages, Claude&apos;s free tier.</li>
        <li><strong>Stage 3–5:</strong> Anthropic&apos;s Claude Code documentation, Vercel&apos;s deployment guides, YouTube walkthroughs. You will still pay for a Claude plan or API credit from stage 3.</li>
        <li><strong>Stage 6:</strong> You are on your own — few free resources teach pricing, proposals and delivery.</li>
        <li><strong>Costs you:</strong> months of sequencing material yourself, and nobody to ask at 11 pm when the build breaks.</li>
        <li><strong>Best if:</strong> you have more time than money, read English documentation comfortably, and enjoy figuring things out alone.</li>
      </ul>
      <h3>The paid path</h3>
      <ul>
        <li><strong>A structured course</strong> puts the six stages in order with a project that grows through them, so every lecture is used the same week. <Link href={mastery.url}>{mastery.name}</Link> does this in Urdu and English for {mastery.priceDisplay} one-time ({mastery.pkr.price}) with {mastery.supportMonths} months of support; the other Pakistani options are compared in <Link href="/best-ai-courses-in-pakistan">Best AI Courses in Pakistan</Link>.</li>
        <li><strong>Costs you:</strong> the course fee plus the same tool costs as the free path.</li>
        <li><strong>Best if:</strong> you want to be building in week one, learn better in Urdu, or need someone to unblock you on a live call.</li>
      </ul>
      <p>
        Whichever path you take, the tools are identical and so is the end point: an agent on a live URL, doing a job for a real business. Nobody is checking which path you came by.
      </p>

      <h2>Mistakes that stop beginners in Pakistan</h2>
      <ol>
        <li><strong>Starting with Python.</strong> Six weeks of syntax before a single agent exists. Start with a job description instead.</li>
        <li><strong>Building for &quot;everyone&quot;.</strong> An agent for one shop you can name is buildable; an agent for &quot;all businesses&quot; is not.</li>
        <li><strong>Never deploying.</strong> A project that only runs on your laptop is a hobby. Stage 5 is where it becomes a product.</li>
        <li><strong>Waiting to be an expert before charging.</strong> Your first client is a business that has a problem now, not a judge of your code.</li>
      </ol>
    </Guide>
  )
}
