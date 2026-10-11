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
import { founder, mastery, waLink } from '@/config/site'
import type { Faq } from '@/lib/schema'

const PATH = '/ai-agent-course-in-urdu'
const TITLE = 'AI Agents Course in Urdu: Learn Online from Anywhere'
const SEO_TITLE = 'AI Agents Course in Urdu | Online AI Course | DSP'
const DESCRIPTION =
  'Online AI course in Urdu and English: build AI agents without prior coding. Self-paced lessons for learners worldwide. See curriculum, fees and support.'
const PUBLISHED = '2026-09-06'
const UPDATED = '2026-10-12'

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: SEO_TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  `Yes. ${mastery.name} is an online AI agents course in Urdu and English for learners worldwide: ${mastery.modules} recorded modules where the explanations are in Urdu, the tools and code stay in English, and you build one real AI Employee from an empty folder to a live URL without a coding background. ${mastery.priceDisplay} one-time (${mastery.pkr.price}), lifetime access, ${mastery.supportMonths} months of support.`

const FAQS: Faq[] = [
  {
    q: 'Is this an online AI course in Urdu that I can take from any country?',
    a: `${mastery.name} is online and self-paced. You can study the recorded Urdu–English lessons from your own country, without travelling to Pakistan. Weekend live debugging sessions run on Pakistan time; confirm the current schedule and your payment option with DSP before enrolling.`,
  },
  {
    q: 'Is this a general AI course or an AI agents course?',
    a: 'The course starts with AI and agent foundations, then focuses on building an AI Employee with Claude Code, tools and memory, testing it and deploying it. It is for people who want to build agents; it is not a Python or machine-learning degree program.',
  },
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
    a: 'Yes. Recorded lessons are self-paced, so you choose when to study. Weekend live debugging sessions run on Pakistan time; confirm the current schedule and convert it to your local time before enrolling. DSP\'s students come from Saudi Arabia, the UAE, the UK, the US, Canada, Australia and Malaysia as well as Pakistan. Payment is by bank transfer, JazzCash or Easypaisa from Pakistan; overseas students ask on WhatsApp for the current option.',
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
  `یہ آن لائن AI ایجنٹس کورس اردو سمجھنے والے سیکھنے والوں کے لیے ہے، چاہے آپ کسی بھی ملک میں رہتے ہوں۔ ریکارڈڈ اسباق اپنے مقامی وقت کے مطابق دیکھیں۔ پاکستان سے باہر سے داخلہ لینے سے پہلے DSP سے اپنے ملک کے لیے ادائیگی کا طریقہ اور لائیو سپورٹ کا موجودہ وقت معلوم کریں۔`,
  `فیس ${mastery.priceDisplay} یعنی ${mastery.pkr.price} یک مشت ہے، تاحیات رسائی کے ساتھ۔ آخر میں آپ کے پاس ایک حقیقی AI Employee لائیو ویب سائٹ پر چل رہا ہوتا ہے، DSP ماسٹر سرٹیفکیٹ جس کے ویریفکیشن پیج پر آپ کا ایجنٹ نظر آتا ہے، اور Anthropic (Claude Academy) کے تین بیجز آپ کے اپنے نام سے۔ استاد ${founder.name} ہیں، جو 2002 سے ٹیکنالوجی پڑھا رہے ہیں اور گوگل اور Anthropic سے تصدیق شدہ AI ٹرینر ہیں۔`,
]

export default function AiAgentCourseInUrduPage() {
  return (
    <Guide
      path={PATH}
      course
      title={TITLE}
      crumb="AI Agents Course in Urdu"
      eyebrow="Online · Self-paced · Urdu + English · Learners worldwide"
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
      <h2>An online AI course in Urdu for learners worldwide</h2>
      <p>
        Study from your own country, at your own pace. The recorded lessons teach you to build AI agents, with spoken explanations in Urdu and tools, prompts and learning materials in English. You do not need to travel to Islamabad or attend a classroom.
      </p>
      <p>
        The course begins with AI foundations and moves into a guided café ordering AI Employee, followed by your own capstone agent. If you want to build a working agent without prior coding experience, check the <Link href="/mastery/curriculum">module-by-module curriculum</Link> and the <Link href={`${mastery.url}#students`}>student project stories</Link> before choosing it.
      </p>

      <h2>Preview the Urdu teaching style before choosing it</h2>
      <p>
        Watch the <Link href={`${mastery.url}#welcome`}>seven-minute course walkthrough</Link> to hear the Urdu–English teaching style and see how the lessons work. Then read the <Link href="/mastery/curriculum">full AI agent curriculum</Link> to check the projects, tools and outcomes against what you want to learn.
      </p>
      <p>
        Starting from zero? Follow the <Link href="/learn-ai-agents-pakistan">step-by-step beginner roadmap for learning AI agents</Link>. If you are comparing programs, use the <Link href="/best-ai-courses-in-pakistan">AI course comparison</Link> to weigh coding prerequisites, language and support.
      </p>

      <h2>Why the language of instruction decides who gets to learn AI</h2>
      <p>
        If you understand a technical explanation more easily in Urdu, an English-only lesson can add an extra hurdle. Shop owners, freelancers, teachers and students may be comfortable reading an English tool menu while preferring Urdu explanations of context windows, memory and tool calls. Preview a lesson to decide whether DSP’s Urdu–English teaching style works for you.
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
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
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
        <li><strong>Urdu-speaking learners worldwide:</strong> including learners in India, the Gulf, the UK, the US, Canada, Australia and elsewhere. Recorded lessons fit your local schedule; live support runs on Pakistan time. Confirm enrollment and payment arrangements from your country before paying.</li>
        <li><strong>Non-coders:</strong> nobody is asked to write Python. If you can describe what you want in a WhatsApp message, you can describe it to Claude Code.</li>
        <li><strong>Not for you if:</strong> you specifically want to become a Python developer — a live Python cohort (below) is the better route.</li>
      </ul>

      <h2>Other Urdu and Hindi options, compared fairly</h2>
      <p>These are the other courses an Urdu speaker will find. Facts are from each provider&apos;s own site, 5 September 2026.</p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
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

      <h2>Fees, support and joining from outside Pakistan</h2>
      <p>
        Tuition is {mastery.priceDisplay} one-time, with lifetime course access and {mastery.supportMonths} months of group support. The Pakistan payment price is {mastery.pkr.price}. Review the <Link href={mastery.url}>current course offer and running-cost explanation</Link>: subscriptions, API usage and hosting can be separate from tuition.
      </p>
      <p>
        If you live outside Pakistan, <a href={waLink('I want to join the online AI agents course in Urdu from outside Pakistan. Please confirm the payment option and current weekend support schedule for my country.')}>ask DSP about international enrollment</a> before sending payment. Tell the team your country and time zone so you can confirm a workable payment route and the current live-support schedule.
      </p>

      <h2>How to start learning AI agents in Urdu</h2>
      <ol>
        <li>Watch the seven-minute tour on the <Link href={mastery.url}>course page</Link> — it is in the same Urdu–English mix as the lectures, so you will know in seven minutes whether the language works for you.</li>
        <li>In Pakistan, follow the <Link href="/mastery/enrol">enrollment instructions</Link>. Outside Pakistan, confirm your payment option with DSP first. Your sign-in link arrives by email after payment is verified.</li>
        <li>Do an hour a day. Module 1 is understanding; Module 4 is the first thing you build; Module 13 is the first thing you deploy.</li>
        <li>Bring whatever breaks to the weekend debugging call.</li>
      </ol>
    </Guide>
  )
}
