// src/app/ai-agent-course-in-urdu/page.tsx — Guide 2 (Corroboration Engine).
//
// The page for the "AI agent course in Urdu / learn AI in Urdu" queries —
// DSP's moat: Urdu-speaking learners worldwide (Pakistan and the diaspora in
// the Gulf, UK, US, Canada, Australia), most of whom are shut out of
// English-only AI courses. Answer-first, a curriculum table mirrored from the
// /mastery curriculum data, a fair comparison of the other Urdu/Hindi
// options (facts from their sites, 2026-09-05), FAQ, and a substantial Urdu
// section — the Urdu block is the content the Urdu queries match, not a
// translation garnish.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { MASTERY_CURRICULUM } from '@/app/mastery/curriculum'
import { founder, mastery } from '@/config/site'
import type { Faq } from '@/lib/schema'

const PATH = '/ai-agent-course-in-urdu'
const TITLE = 'AI Agent Course in Urdu: Learn to Build AI Agents in Your Own Language (2026)'
const DESCRIPTION =
  `Yes, there is an AI agent course taught in Urdu: DSP AI Agent Mastery — ${mastery.modules} modules explained in Urdu and English, one real AI Employee built from zero to a live URL, no coding background, ${mastery.priceDisplay} one-time. Plus the other Urdu and Hindi options compared.`
const PUBLISHED = '2026-09-06'
const UPDATED = '2026-09-06'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  `Yes. ${mastery.name} is an AI agent course taught in Urdu and English: ${mastery.modules} recorded modules where the explanations are in Urdu, the tools and code stay in English, and you build one real AI Employee from an empty folder to a live URL without a coding background. ${mastery.priceDisplay} one-time (${mastery.pkr.price}), lifetime access, ${mastery.supportMonths} months of support.`

const FAQS: Faq[] = [
  {
    q: 'Is the whole course in Urdu, or only some lectures?',
    a: 'Every lecture is taught in an Urdu–English mix, the way DSP has always taught live: the explanation, the reasoning and the mistakes are in Urdu; the tool names, code and prompts stay in English because that is what the tools understand. Slides, templates and downloads are in English, and subtitles are provided.',
  },
  {
    q: 'I understand Urdu but read Roman Urdu more easily. Does that matter?',
    a: 'No. The lectures are spoken, so Roman Urdu readers follow them exactly as Urdu-script readers do. Written material is in English, which every student needs anyway to use Claude, GitHub and Vercel.',
  },
  {
    q: 'Do I need to know coding or Python?',
    a: 'No. DSP teaches Vibe Coding: you describe the agent in plain English, Claude Code writes and runs the code, and you learn to plan, test and fix. Python courses (AI Season, Panaversity, Codanics) are a different path for people who want to write code themselves.',
  },
  {
    q: 'I live outside Pakistan — in Saudi Arabia, the UAE, the UK or the US. Can I join?',
    a: 'Yes. The course is self-paced and recorded, so time zones do not matter, and the weekend live debugging sessions are scheduled for Pakistan evening, which suits the Gulf and Europe. DSP\'s students come from Saudi Arabia, the UAE, the UK, the US, Canada, Australia and Malaysia as well as Pakistan. Payment is by bank transfer, JazzCash or Easypaisa from Pakistan; overseas students ask on WhatsApp for the current option.',
  },
  {
    q: 'What will I actually be able to do at the end?',
    a: 'Ship an AI Employee — an agent with a job description, tools and a loop — to a live URL, connect it to WhatsApp or a website, and sell or use it. The final module is about finding clients and pricing the work.',
  },
  {
    q: 'Is there a certificate?',
    a: 'Two kinds: the DSP Master certificate, whose verification page shows the live agent you built, and three Anthropic (Claude Academy) course-completion badges — Claude 101, Claude Code 101 and Introduction to Claude Cowork — earned in Module 3 with your own name on them.',
  },
]

const OTHERS = [
  { name: 'AI Season — AI Agents Bootcamp', lang: 'Urdu explanations, English code', format: '6-week live online cohort, Python', price: 'PKR 3,000–4,500', fit: 'You want to write Python and learn live with a group' },
  { name: 'Panaversity — Agentic AI Architect', lang: 'Zoom classes in English, Urdu and Hindi', format: 'Live, five courses, Python + SDKs + cloud', price: 'Not published; free 4-week launchpad', fit: 'You want the full engineering stack' },
  { name: 'Codanics — Python ka Chilla / mentorship', lang: 'Urdu and Hindi', format: 'Self-paced videos or 4-month mentorship, Python', price: 'Free / not published', fit: 'You want data science first' },
  { name: 'Udemy: "AI Agents Advanced in Hindi/Urdu (n8n)" and similar', lang: 'Hindi / Urdu', format: 'Self-paced videos, no support', price: 'Under PKR 5,000', fit: 'You want to try n8n automations cheaply' },
  { name: 'YouTube Urdu channels', lang: 'Urdu', format: 'Free videos, no structure or support', price: 'Free', fit: 'You want to sample the topic before committing' },
]

const URDU = [
  `جی ہاں، AI ایجنٹ کا کورس اردو میں موجود ہے۔ ${mastery.name} میں ${mastery.modules} ماڈیول ہیں جن کی وضاحت اردو میں ہوتی ہے اور ٹولز، کوڈ اور پرامپٹ انگریزی میں رہتے ہیں کیونکہ ٹولز انگریزی ہی سمجھتے ہیں۔ آپ کو کوڈنگ آنے کی ضرورت نہیں: آپ سادہ انگریزی میں بتاتے ہیں کہ ایجنٹ کیا کرے، Claude Code کوڈ لکھتا ہے، اور آپ منصوبہ بنانا، ٹیسٹ کرنا اور غلطی ٹھیک کرنا سیکھتے ہیں۔ اسے DSP میں Vibe Coding کہتے ہیں۔`,
  `کورس ریکارڈڈ اور اپنی رفتار سے ہے، اس لیے سعودی عرب، امارات، برطانیہ، امریکہ، کینیڈا یا آسٹریلیا میں رہنے والے پاکستانی بھی اسی طرح سیکھتے ہیں جیسے لاہور یا اسلام آباد میں۔ ہر ہفتے کے آخر میں لائیو ڈیبگنگ سیشن ہوتا ہے جس میں آپ اپنا پروجیکٹ لاتے ہیں اور غلطیاں کال پر ٹھیک ہوتی ہیں، اور ${mastery.supportMonths} مہینے DSP گروپ میں سپورٹ ملتی ہے۔`,
  `فیس ${mastery.priceDisplay} یعنی ${mastery.pkr.price} یک مشت ہے، تاحیات رسائی کے ساتھ۔ آخر میں آپ کے پاس ایک حقیقی AI Employee لائیو ویب سائٹ پر چل رہا ہوتا ہے، DSP ماسٹر سرٹیفکیٹ جس کے ویریفکیشن پیج پر آپ کا ایجنٹ نظر آتا ہے، اور Anthropic (Claude Academy) کے تین بیجز آپ کے اپنے نام سے۔ استاد ${founder.name} ہیں، جو 2002 سے ٹیکنالوجی پڑھا رہے ہیں اور گوگل اور Anthropic سے تصدیق شدہ AI ٹرینر ہیں۔`,
]

export default function AiAgentCourseInUrduPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="AI Agent Course in Urdu"
      eyebrow="Guide · Urdu + English · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      related={[
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026)' },
        { path: mastery.url, title: mastery.name },
        { path: founder.path, title: `About the instructor, ${founder.name}` },
      ]}
    >
      <h2>Why the language of instruction decides who gets to learn AI</h2>
      <p>
        Almost every serious AI-agent course is taught in English, and most of the people who would benefit most from building agents — shop owners, freelancers, teachers, overseas workers, students outside the big-city universities — think in Urdu. They can read a tool&apos;s menu in English; they cannot follow an hour of fast technical English about context windows and tool calls. The result is that the same people who are told AI will change their work are the ones locked out of learning it.
      </p>
      <p>
        {founder.name} has taught technology since 2002 in London, the UAE and Pakistan, and every DSP class has always been taught the same way: <strong>explain in Urdu, work in English</strong>. That is the method {mastery.name} is recorded in.
      </p>

      <h2>What &quot;Urdu and English&quot; means in practice</h2>
      <ul>
        <li><strong>Spoken explanation in Urdu.</strong> Why an agent needs a job description, what memory is for, why a build broke — all in Urdu, in the plain speech of a live class, not a translated script.</li>
        <li><strong>Tools, code and prompts in English.</strong> Claude, Claude Code, GitHub and Vercel work in English, and your future clients&apos; briefs will be in English. You learn to write those, with the Urdu explanation beside them.</li>
        <li><strong>English slides and downloads, with subtitles.</strong> Every module ships its slides, templates and checklists in English so what you keep is reusable in any job.</li>
        <li><strong>Support in whichever you prefer.</strong> The DSP group and the weekend debugging calls run in Urdu and English, as the room wants.</li>
      </ul>

      <h2>The curriculum: {MASTERY_CURRICULUM.length} modules, one project</h2>
      <p>You build one AI Employee and it grows with every module — from an idea, to a job description, to a website, to an agent with tools and memory, to a deployed product you can sell.</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Title</th>
              <th scope="col">What you can do afterwards</th>
            </tr>
          </thead>
          <tbody>
            {MASTERY_CURRICULUM.map((m) => (
              <tr key={m.code}>
                <td><strong>{m.code}</strong></td>
                <td>{m.title}</td>
                <td>{m.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">Full details, pricing and the enrolment steps are on the <Link href={mastery.url}>{mastery.shortName} page</Link>.</p>

      <h2>Who this course is for</h2>
      <ul>
        <li><strong>In Pakistan:</strong> students, teachers, freelancers, marketers, shop and clinic owners who want to build rather than only use AI.</li>
        <li><strong>Overseas Pakistanis:</strong> in Saudi Arabia, the UAE, Qatar, the UK, the US, Canada, Australia and Malaysia — recorded lectures mean the time zone is yours; weekend live sessions fall in the Gulf and European evening.</li>
        <li><strong>Non-coders:</strong> nobody is asked to write Python. If you can describe what you want in a WhatsApp message, you can describe it to Claude Code.</li>
        <li><strong>Not for you if:</strong> you specifically want to become a Python developer — a live Python cohort (below) is the better route.</li>
      </ul>

      <h2>Other Urdu and Hindi options, compared fairly</h2>
      <p>These are the other courses an Urdu speaker will find. Facts are from each provider&apos;s own site, 5 September 2026.</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Language</th>
              <th scope="col">Format</th>
              <th scope="col">Price</th>
              <th scope="col">Best if</th>
            </tr>
          </thead>
          <tbody>
            <tr className="is-dsp">
              <td><strong>{mastery.name}</strong></td>
              <td>Urdu explanation, English tools</td>
              <td>Self-paced, {mastery.modules} modules, no coding; weekend live debugging</td>
              <td>{mastery.priceDisplay} / {mastery.pkr.price} one-time, lifetime</td>
              <td>You want a deployed agent without learning Python</td>
            </tr>
            {OTHERS.map((o) => (
              <tr key={o.name}>
                <td><strong>{o.name}</strong></td>
                <td>{o.lang}</td>
                <td>{o.format}</td>
                <td>{o.price}</td>
                <td>{o.fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to start this week</h2>
      <ol>
        <li>Watch the six-minute tour on the <Link href={mastery.url}>course page</Link> — it is in the same Urdu–English mix as the lectures, so you will know in six minutes whether the language works for you.</li>
        <li>Enrol on the enrol page (bank transfer, JazzCash or Easypaisa), upload the screenshot, and your sign-in link arrives by email once it is verified — usually within a few hours.</li>
        <li>Do an hour a day. Module 1 is understanding; Module 4 is the first thing you build; Module 13 is the first thing you deploy.</li>
        <li>Bring whatever breaks to the weekend debugging call.</li>
      </ol>
    </Guide>
  )
}
