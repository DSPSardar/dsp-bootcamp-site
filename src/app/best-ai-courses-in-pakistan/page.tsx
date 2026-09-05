// src/app/best-ai-courses-in-pakistan/page.tsx — Guide 1 (Corroboration Engine).
//
// The comparison page the "best AI courses / institutes in Pakistan" queries
// retrieve. Fair to competitors on purpose: fairness is what gets a page
// cited. Every competitor fact below was read from that provider's own site
// on 2026-09-05 (see FACTS_VERIFIED) — update the row AND the date when a
// price changes, and never state a fee a provider does not publish.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq } from '@/lib/schema'

const PATH = '/best-ai-courses-in-pakistan'
const TITLE = 'Best AI Courses in Pakistan (2026): An Honest Comparison of 9 Programs'
const DESCRIPTION =
  'Nine AI and AI-agent courses in Pakistan compared on price, format, language, what you build and support — DSP AI Agent Mastery, AI Season, Aaghaz AI, Panaversity, NexSkill, Codanics, PIAIC, Adan Institute and Udemy — with who each is best for. Updated September 2026.'
const PUBLISHED = '2026-09-06'
const UPDATED = '2026-09-06'
const FACTS_VERIFIED = '5 September 2026'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  `There is no single best AI course in Pakistan — it depends on whether you want to write Python or build without code, learn live or self-paced, and pay PKR 3,000 or PKR 45,000. The nine programs below, compared on ${FACTS_VERIFIED} facts, cover every one of those choices; the table and the "best for" list tell you which fits.`

type Row = {
  name: string
  by: string
  price: string
  format: string
  language: string
  build: string
  credential: string
  dsp?: boolean
}

const ROWS: Row[] = [
  {
    name: 'DSP AI Agent Mastery',
    by: 'Digital Services Program, Islamabad',
    price: `${mastery.priceDisplay} one-time (${mastery.pkr.price}), lifetime access`,
    format: `Self-paced recorded lectures (${mastery.modules} modules, ${mastery.lectureHours} hours) + ${mastery.supportMonths} months of group support and a live debugging session every weekend`,
    language: 'Urdu and English',
    build: 'One AI Employee from an empty folder to a live URL, using Claude and Claude Code — no coding background required',
    credential: 'Three Anthropic (Claude Academy) course-completion badges + the DSP Master certificate, whose verification page shows the live agent you built',
    dsp: true,
  },
  {
    name: 'AI Agents Bootcamp',
    by: 'AI Season (online)',
    price: 'PKR 3,000 early-bird to 15 Sept 2026, then PKR 4,500',
    format: '6 weeks, 18 live online sessions with recordings; cohort 02 starts 1 Oct 2026',
    language: 'Urdu explanations, English code',
    build: 'Five Python agents: RAG Q&A, tool-using, LangGraph workflow, conversational, voice',
    credential: 'Not stated on the site; top 3 exam scorers refunded',
  },
  {
    name: 'AI in Hands',
    by: 'Aaghaz AI, Lahore',
    price: 'PKR 45,000 (instalments available)',
    format: '12 weeks, live in-person in Lahore or live online, 3–4 classes a week',
    language: 'English (Urdu-speaking instructors)',
    build: 'Practical AI tooling for non-programmers; no coding prerequisite',
    credential: 'Aaghaz AI certificate',
  },
  {
    name: 'Agentic AI Architect Program',
    by: 'Panaversity (online)',
    price: 'Not published on the homepage; a free 4-week "OpenClaw AI Launchpad" is offered',
    format: 'Live on Zoom, five courses across four levels (AI-101 → AI-451)',
    language: 'English, Urdu and Hindi',
    build: 'Python, OpenAI Agents SDK, Claude Code, MCP servers, FastAPI, Docker, Kubernetes',
    credential: '"Certified Agentic AI Architect"; prepares for Anthropic\'s Claude certification',
  },
  {
    name: 'Agentic AI Course',
    by: 'NexSkill — Lahore, Karachi, Islamabad',
    price: 'Not published online',
    format: '8 months, 64 two-hour lectures, online or on campus, weekday and weekend batches',
    language: 'English and Urdu',
    build: '11 modules from foundations to enterprise deployment; two virtual internships',
    credential: 'NAVTTC / PSDF / TEVTA-recognised institute',
  },
  {
    name: 'Python ka Chilla · Data Science to AI Agents Mentorship',
    by: 'Codanics (Dr Aammar Tufail), online',
    price: 'Python ka Chilla free; 4-month mentorship fee not published',
    format: 'Self-paced videos (80 days × 2 h) or a 4-month mentorship',
    language: 'Urdu and Hindi',
    build: 'Python, data science, then AI agents — intermediate to advanced',
    credential: 'Not stated on the site',
  },
  {
    name: 'Cloud Native & Agentic AI programme',
    by: 'PIAIC (Presidential Initiative), Karachi · Lahore · Islamabad · more',
    price: 'Nominal quarterly fee — check piaic.org for the current amount',
    format: 'Multi-quarter, weekend on-site classes in large cohorts',
    language: 'Urdu and English',
    build: 'Python, cloud and agentic AI over several quarters',
    credential: 'PIAIC certificate',
  },
  {
    name: 'AI & Machine Learning course',
    by: 'Adan Institute of Technology (AI Tech), Islamabad I-9',
    price: 'PKR 40,000',
    format: '10 weeks, on-site in Islamabad or online',
    language: 'English and Urdu',
    build: 'ML, neural networks, TensorFlow/PyTorch, generative AI, MLOps — basic Python required',
    credential: 'NAVTTC partner; Microsoft / Cisco certified partner',
  },
  {
    name: 'Urdu/Hindi AI courses on Udemy and YouTube',
    by: 'Various instructors',
    price: 'Free to roughly PKR 5,000',
    format: 'Self-paced videos, no live support',
    language: 'Urdu / Hindi',
    build: 'Varies — many cover n8n or ChatGPT prompting rather than deployed agents',
    credential: 'Udemy completion certificate at most',
  },
]

const FAQS: Faq[] = [
  {
    q: 'What is the cheapest AI course in Pakistan?',
    a: 'Free options exist (Codanics\' Python ka Chilla, Panaversity\'s 4-week launchpad, YouTube). Among paid programs the cheapest live course is AI Season at PKR 3,000–4,500 for six weeks; the cheapest lifetime-access course is DSP AI Agent Mastery at PKR 28,000 ($100) one-time.',
  },
  {
    q: 'Which AI course in Pakistan is best for someone who cannot code?',
    a: 'Pick a program that does not require Python. DSP AI Agent Mastery (build by describing the agent in English, Claude Code writes the code) and Aaghaz AI\'s AI in Hands are both designed for non-programmers. AI Season, Panaversity, Codanics and Adan Institute expect you to write or learn Python.',
  },
  {
    q: 'Is there an AI agents course taught in Urdu?',
    a: 'Yes. DSP AI Agent Mastery is taught in Urdu and English; AI Season explains in Urdu with English code; Panaversity runs Zoom classes in English, Urdu and Hindi; Codanics teaches in Urdu and Hindi. See our separate guide, AI Agent Course in Urdu.',
  },
  {
    q: 'Which AI institutes are in Islamabad?',
    a: 'Digital Services Program (F-10 Markaz; online course), Adan Institute of Technology (I-9/3; on-site and online), NexSkill\'s Islamabad campus, and PIAIC\'s Islamabad centre. Most Lahore and Karachi institutes also take online students from Islamabad.',
  },
  {
    q: 'How long does it take to learn to build AI agents?',
    a: 'The programs above range from 6 weeks (AI Season) to 8 months (NexSkill). DSP AI Agent Mastery is designed as about an hour a day for 30 days, or four sessions a week for eight weeks, to reach a deployed agent — with lifetime access to go slower.',
  },
  {
    q: 'Are the certificates from Pakistani AI courses recognised?',
    a: 'Institute certificates (Aaghaz, PIAIC, NexSkill, DSP) prove completion to employers who know the institute. Badges issued by the AI companies themselves carry further: DSP AI Agent Mastery walks you through Anthropic\'s free Claude Academy so you finish with three Anthropic course-completion badges, and Panaversity prepares students for Anthropic\'s Claude certification. A live, deployed project you can show usually matters more than either.',
  },
]

const URDU = [
  'پاکستان میں AI کورس چننے سے پہلے تین سوال طے کریں: کیا آپ Python سیکھنا چاہتے ہیں یا بغیر کوڈنگ کے AI ایجنٹ بنانا؟ لائیو کلاس چاہیے یا اپنی رفتار سے ریکارڈڈ لیکچر؟ اور بجٹ تین ہزار روپے ہے یا پینتالیس ہزار؟ اوپر دیے گئے نو پروگرام ان تینوں انتخابوں کو پورا کرتے ہیں۔',
  `جو لوگ کوڈنگ نہیں جانتے اور اردو میں سیکھنا چاہتے ہیں، ان کے لیے DSP AI Agent Mastery بنایا گیا ہے: ${mastery.modules} ماڈیول، اردو اور انگریزی میں، ایک حقیقی AI Employee خالی فولڈر سے لائیو ویب سائٹ تک، ${mastery.pkr.price} یک مشت، تاحیات رسائی اور ${mastery.supportMonths} مہینے سپورٹ۔`,
]

export default function BestAiCoursesInPakistanPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="Best AI Courses in Pakistan"
      eyebrow="Guide · Compared September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      related={[
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: mastery.url, title: mastery.name },
      ]}
    >
      <h2>How we compared them</h2>
      <p>
        <strong>Disclosure:</strong> this guide is written by {founder.name}, founder of {site.name}, whose course is in the table. Every fact about the other eight programs was read from that provider&apos;s own website on {FACTS_VERIFIED} and is quoted as published there; where a provider does not publish a fee, the table says so rather than guessing. Prices change — confirm before paying.
      </p>
      <p>We compared five things a student actually has to decide on:</p>
      <ol>
        <li><strong>Price</strong> — total cost, and whether access ends.</li>
        <li><strong>Format</strong> — live or self-paced; online, on-site or both; how long.</li>
        <li><strong>Language</strong> — what the explanations are in, not just the slides.</li>
        <li><strong>What you build</strong> — and whether you need Python first.</li>
        <li><strong>Credential and support</strong> — what you can show afterwards, and who helps when you are stuck.</li>
      </ol>

      <h2>The nine programs, side by side</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Program</th>
              <th scope="col">Price</th>
              <th scope="col">Format</th>
              <th scope="col">Language</th>
              <th scope="col">What you build</th>
              <th scope="col">Credential</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className={r.dsp ? 'is-dsp' : undefined}>
                <td><strong>{r.name}</strong><br /><span className="note">{r.by}</span></td>
                <td>{r.price}</td>
                <td>{r.format}</td>
                <td>{r.language}</td>
                <td>{r.build}</td>
                <td>{r.credential}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">Facts verified on each provider&apos;s website, {FACTS_VERIFIED}. &quot;Not published&quot; means the provider does not show the figure online.</p>

      <h2>Which one is best for you</h2>
      <ul>
        <li><strong>You cannot code and want a deployed AI agent, in Urdu, for a one-time fee:</strong> <Link href={mastery.url}>DSP AI Agent Mastery</Link>. Self-paced, lifetime access, weekend live debugging.</li>
        <li><strong>You want the cheapest live cohort and are happy to write Python:</strong> AI Season — PKR 3,000–4,500, six weeks, five agents built.</li>
        <li><strong>You want an in-person classroom in Lahore with no coding:</strong> Aaghaz AI&apos;s AI in Hands.</li>
        <li><strong>You want the deepest engineering track (SDKs, MCP, Docker, Kubernetes):</strong> Panaversity, or PIAIC if you prefer a government-backed, multi-quarter path.</li>
        <li><strong>You want a long diploma-style course with a recognised institute name and internships:</strong> NexSkill&apos;s 8-month Agentic AI course.</li>
        <li><strong>You already know some Python and want machine learning proper, in Islamabad:</strong> Adan Institute&apos;s 10-week AI &amp; ML course.</li>
        <li><strong>You want to learn data science first, in Urdu, for free:</strong> Codanics&apos; Python ka Chilla.</li>
        <li><strong>You only want to sample the topic:</strong> a free YouTube or Udemy series — then come back to one of the above when you want something deployed.</li>
      </ul>

      <h2>What the price does not tell you</h2>
      <p>
        Three things separate courses with similar fees. First, <strong>does access end?</strong> A six-week cohort is over in six weeks; a lifetime-access course lets you redo a module a year later when a tool changes. Second, <strong>who answers when you are stuck at 11 pm?</strong> Cohort programs answer during the cohort; look for a support window that outlasts the classes. Third, <strong>do you finish with something running?</strong> A certificate says you attended; a live URL says you can build. Ask every provider, including us, to show you student projects that are online right now.
      </p>

      <h2>Questions to ask any AI course before you pay</h2>
      <ol>
        <li>Will I need Python before day one, and if so, do you teach it?</li>
        <li>Are the explanations in Urdu, or only the slides?</li>
        <li>What exactly will I have built and deployed by the end — can I see a student&apos;s?</li>
        <li>What happens to my access and my support after the course ends?</li>
        <li>Who issues the certificate — the institute, or the AI company whose tools I learned?</li>
      </ol>
    </Guide>
  )
}
