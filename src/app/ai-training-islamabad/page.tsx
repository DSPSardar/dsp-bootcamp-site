// src/app/ai-training-islamabad/page.tsx — Guide 3 (Corroboration Engine, Day 3).
//
// The page the "AI training / AI course in Islamabad" queries retrieve. Same
// rules as Guide 1: fair to competitors, every fact read from that
// provider's own site on FACTS_VERIFIED, and NEVER a fee a provider does
// not publish — the table says "not published" instead. DSP's row comes
// from src/config/site.ts so it can never disagree with /mastery.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq } from '@/lib/schema'

const PATH = '/ai-training-islamabad'
const TITLE = 'AI Training in Islamabad (2026): 11 Options Compared'
const DESCRIPTION =
  'Eleven AI training options in Islamabad — Adan Institute, PIM, NUST SEECS, NUST × atomcamp, COMSATS, NAVTTC, PIAIC, Corvit, PNY Trainings, Islamabad.ai and AI Season — compared on fee, length, format and language beside DSP AI Agent Mastery, with who each is best for. Facts verified September 2026.'
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'
const FACTS_VERIFIED = '8 September 2026'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  `Islamabad has more AI training than any city in Pakistan except Lahore: free government-funded batches (NAVTTC, PIAIC), university short courses (NUST, COMSATS), private institutes in I-9, F-8 and Blue Area (Adan, PIM, Corvit, PNY), and online courses you can take from home (AI Season, DSP AI Agent Mastery). The table below compares eleven of them, beside DSP's own course, on ${FACTS_VERIFIED} facts.`

type Row = {
  name: string
  where: string
  fee: string
  length: string
  format: string
  language: string
  teaches: string
  dsp?: boolean
}

const NP = 'Not published'

const ROWS: Row[] = [
  {
    name: 'DSP AI Agent Mastery',
    where: `Digital Services Program, F-10 Markaz (online course)`,
    fee: `${mastery.priceDisplay} one-time (${mastery.pkr.price}), lifetime access`,
    length: `Self-paced — about an hour a day for 30 days, or eight weeks part-time`,
    format: `Recorded lectures (${mastery.modules} modules) + ${mastery.supportMonths} months of group support and a weekend live debugging call`,
    language: 'Urdu and English',
    teaches: 'Building, deploying and selling AI agents with Claude and Claude Code — one AI Employee from an empty folder to a live URL, no coding background',
    dsp: true,
  },
  {
    name: 'AI & Machine Learning course',
    where: 'Adan Institute of Technology, I-9/3',
    fee: 'PKR 40,000 (paid batch); a free NAVTTC-funded 12-week batch also runs',
    length: '10 weeks (paid) · 12 weeks (NAVTTC batch)',
    format: 'On-site in I-9 or online',
    language: 'English and Urdu',
    teaches: 'Machine learning, neural networks, TensorFlow/PyTorch, generative AI, MLOps — basic Python expected',
  },
  {
    name: 'Artificial Intelligence certificate course',
    where: 'Pakistan Institute of Management (PIM), Islamabad',
    fee: 'PKR 51,000',
    length: '3 months',
    format: 'Evening classes, on campus',
    language: 'English',
    teaches: 'AI concepts, machine learning and applied AI for managers and professionals',
  },
  {
    name: 'AI short courses',
    where: 'NUST SEECS, H-12',
    fee: NP,
    length: 'Varies by course',
    format: 'Weekend, on campus',
    language: 'English',
    teaches: 'University-taught AI, machine learning and data science fundamentals',
  },
  {
    name: 'Data Science & AI bootcamp',
    where: 'NUST × atomcamp',
    fee: 'PKR 75,000, or 3 instalments of PKR 30,000',
    length: 'Multi-month bootcamp',
    format: 'Live online classes with a NUST certificate',
    language: 'English',
    teaches: 'Python, data analysis, machine learning and AI projects',
  },
  {
    name: 'AI and data science short courses',
    where: 'COMSATS University, Park Road',
    fee: NP,
    length: 'Varies by course',
    format: 'On campus',
    language: 'English',
    teaches: 'Academic AI and data-science modules run by the university',
  },
  {
    name: 'NAVTTC AI / high-tech courses',
    where: 'Multiple partner institutes across Islamabad (Prime Minister\'s youth skills programme)',
    fee: 'Free, with a monthly stipend',
    length: '3 months',
    format: 'On-site, full-time; admission by NTS test; ages 18–35',
    language: 'Urdu and English',
    teaches: 'AI, machine learning and related high-tech skills at the partner institute\'s level',
  },
  {
    name: 'Cloud Native & Agentic AI programme',
    where: 'PIAIC (Presidential Initiative), Islamabad centre',
    fee: 'Free enrolment (a nominal quarterly fee may apply — check piaic.org)',
    length: '5 quarters',
    format: 'Weekend on-site classes in large cohorts',
    language: 'English',
    teaches: 'Python, cloud and agentic AI over five quarters',
  },
  {
    name: 'AI and data science certifications',
    where: 'Corvit Systems, Islamabad',
    fee: NP,
    length: 'Varies by course',
    format: 'On-site classroom, some online',
    language: 'English and Urdu',
    teaches: 'Vendor-track IT certifications with AI and data-science courses',
  },
  {
    name: 'AI and generative AI courses',
    where: 'PNY Trainings, Islamabad campus',
    fee: NP,
    length: 'Varies by course',
    format: 'On-site and online',
    language: 'Urdu and English',
    teaches: 'Generative AI tools, prompt engineering and AI for freelancers',
  },
  {
    name: 'AI training',
    where: 'Islamabad.ai',
    fee: NP,
    length: NP,
    format: 'On-site and online',
    language: 'English',
    teaches: 'Applied AI courses for professionals',
  },
  {
    name: 'AI Agents Bootcamp',
    where: 'AI Season (online, joinable from Islamabad)',
    fee: 'PKR 3,000 early-bird, then PKR 4,500',
    length: '6 weeks',
    format: 'Live online sessions with recordings',
    language: 'Urdu explanations, English code',
    teaches: 'Five Python agents — RAG, tool use, LangGraph, conversational, voice',
  },
]

const FAQS: Faq[] = [
  {
    q: 'Is there free AI training in Islamabad?',
    a: 'Yes. NAVTTC runs free three-month AI courses at partner institutes in Islamabad with a monthly stipend, open to ages 18–35 after an NTS test; Adan Institute in I-9 hosts one of those free 12-week batches. PIAIC enrolment is free. Both are competitive and run on fixed intakes, so apply when the batch opens.',
  },
  {
    q: 'Which AI course in Islamabad is best for a complete beginner?',
    a: 'It depends on what you want to end with. If you want to build and deploy AI agents without learning Python, DSP AI Agent Mastery is designed for that and is taught in Urdu. If you want machine learning proper and are willing to learn Python, Adan Institute or NUST × atomcamp. If you want a management-level understanding, PIM.',
  },
  {
    q: 'How much does AI training cost in Islamabad?',
    a: 'From free (NAVTTC, PIAIC) to PKR 75,000 (NUST × atomcamp). Published fees in between: AI Season PKR 3,000–4,500, DSP AI Agent Mastery PKR 28,000 ($100) one-time with lifetime access, Adan Institute PKR 40,000, PIM PKR 51,000. NUST SEECS, COMSATS, Corvit, PNY and Islamabad.ai do not publish fees online — ask them directly.',
  },
  {
    q: 'Which institute in Islamabad teaches AI in Urdu?',
    a: 'DSP AI Agent Mastery is taught in an Urdu–English mix. Adan Institute, PNY Trainings, Corvit and the NAVTTC batches teach in English and Urdu. The university courses (NUST, COMSATS, PIM) are in English.',
  },
  {
    q: 'Do I need a computer science degree for AI training in Islamabad?',
    a: 'No course in the table requires one. NAVTTC and PIAIC ask for a matric or intermediate certificate and an entry test; Adan Institute expects basic Python; DSP AI Agent Mastery, PIM and PNY take complete beginners.',
  },
  {
    q: 'Can I do AI training online from Islamabad instead of attending in person?',
    a: 'Yes. DSP AI Agent Mastery and AI Season are fully online; Adan Institute, NUST × atomcamp, Corvit and PNY offer online options. NAVTTC and PIAIC are on-site.',
  },
]

const URDU = [
  `اسلام آباد میں AI سیکھنے کے گیارہ راستے ہیں: NAVTTC اور PIAIC کے مفت پروگرام، NUST اور COMSATS کے یونیورسٹی کورسز، I-9 اور بلیو ایریا کے پرائیویٹ انسٹیٹیوٹ (Adan، PIM، Corvit، PNY)، اور آن لائن کورس جو آپ گھر بیٹھے کر سکتے ہیں۔ فیس مفت سے لے کر پچھتر ہزار روپے تک ہے۔ جو ادارہ فیس شائع نہیں کرتا، جدول میں اس کے سامنے "Not published" لکھا ہے — ہم اندازہ نہیں لگاتے۔`,
  `اگر آپ کوڈنگ نہیں جانتے اور اردو میں AI ایجنٹ بنانا، لائیو کرنا اور بیچنا سیکھنا چاہتے ہیں تو ${mastery.name} اسی کے لیے ہے: ${mastery.modules} ماڈیول، ${mastery.pkr.price} یک مشت، تاحیات رسائی، ${mastery.supportMonths} مہینے سپورٹ، اور ہر ہفتے کے آخر میں لائیو ڈیبگنگ سیشن۔ استاد ${founder.name} ہیں، جو ${site.city} ہی سے پڑھاتے ہیں۔`,
]

export default function AiTrainingIslamabadPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="AI Training in Islamabad"
      eyebrow="Guide · Compared September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      related={[
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026)' },
        { path: '/learn-ai-agents-pakistan', title: 'How to Learn AI Agents in Pakistan' },
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: mastery.url, title: mastery.name },
      ]}
    >
      <h2>How we compared them</h2>
      <p>
        <strong>Disclosure:</strong> this guide is written by {founder.name}, founder of {site.name}, which is based in {site.city} and whose course is in the table. Every fact about the other providers was read from that provider&apos;s own website or public notice on {FACTS_VERIFIED} and is quoted as published there. Where a provider does not publish a fee or length, the table says <em>not published</em> — we never guess a price on someone else&apos;s behalf. Fees and intakes change; confirm before paying.
      </p>
      <p>We compared what a student in Islamabad actually has to decide on:</p>
      <ol>
        <li><strong>Fee</strong> — and whether it is one-time, per quarter, or free with conditions.</li>
        <li><strong>Length and format</strong> — full-time on-site, weekend classes, live online or self-paced.</li>
        <li><strong>Language</strong> — what the teaching is in, not the slides.</li>
        <li><strong>What it teaches</strong> — machine learning and Python, or building agents with AI tools; and whether you finish with something running.</li>
      </ol>

      <h2>Eleven AI training options in Islamabad — and ours — side by side</h2>
      <div className="table-scroll wide">
        <table>
          <thead>
            <tr>
              <th scope="col">Program</th>
              <th scope="col">Fee</th>
              <th scope="col">Length</th>
              <th scope="col">Format</th>
              <th scope="col">Language</th>
              <th scope="col">What it teaches</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name + r.where} className={r.dsp ? 'is-dsp' : undefined}>
                <td><strong>{r.name}</strong><br /><span className="note">{r.where}</span></td>
                <td>{r.fee}</td>
                <td>{r.length}</td>
                <td>{r.format}</td>
                <td>{r.language}</td>
                <td>{r.teaches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">Facts verified {FACTS_VERIFIED}. &quot;Not published&quot; means the provider does not show the figure online; contact them for the current fee.</p>

      <h2>Which one is best for you</h2>
      <ul>
        <li><strong>You want a free, funded course and can attend full-time:</strong> NAVTTC (three months, stipend, ages 18–35, NTS test) — Adan Institute in I-9 is one of the partner venues.</li>
        <li><strong>You want a free, long, weekend programme with a government name:</strong> PIAIC&apos;s five-quarter Cloud Native &amp; Agentic AI track.</li>
        <li><strong>You cannot code and want a deployed AI agent, taught in Urdu, for a one-time fee:</strong> <Link href={mastery.url}>DSP AI Agent Mastery</Link> — self-paced, lifetime access, weekend live debugging.</li>
        <li><strong>You know some Python and want machine learning proper, in a classroom:</strong> Adan Institute&apos;s 10-week course in I-9.</li>
        <li><strong>You want a university certificate:</strong> NUST SEECS short courses (weekend) or the NUST × atomcamp bootcamp (online, PKR 75,000); COMSATS for its own short courses.</li>
        <li><strong>You are a manager who needs to understand AI rather than build it:</strong> PIM&apos;s three-month evening certificate.</li>
        <li><strong>You want the cheapest live cohort and are happy to write Python:</strong> AI Season online — PKR 3,000–4,500 for six weeks.</li>
        <li><strong>You want vendor-style IT certifications alongside AI:</strong> Corvit.</li>
        <li><strong>You want generative-AI tools for freelancing, in Urdu:</strong> PNY Trainings.</li>
      </ul>

      <h2>On-site or online: what actually matters in Islamabad</h2>
      <p>
        Traffic decides more than syllabus does. A weekend class in H-12 is a two-hour round trip from Bahria Town or Rawalpindi; a full-time NAVTTC batch means three months without other work. Before you choose a campus, add up the hours you will spend travelling and ask whether a live-online or self-paced course would give you that time back. The reverse is also true: if you know you will not study alone, a fixed classroom timetable is worth the commute.
      </p>
      <p>
        Second, ask what you will have at the end. A machine-learning course ends with notebooks and a certificate; an agent-building course should end with something running on a public URL that a client can try. Ask every provider — including us — to show you a student project that is online right now.
      </p>

      <h2>Questions to ask before you pay</h2>
      <ol>
        <li>Is the fee one-time, per quarter, or per module — and what does it not include?</li>
        <li>Will I need Python before day one, and if so, do you teach it?</li>
        <li>Is the teaching in Urdu, English, or a mix?</li>
        <li>What will I have built and deployed by the end — can I see a student&apos;s?</li>
        <li>What happens to my access and support when the batch ends?</li>
      </ol>
    </Guide>
  )
}
