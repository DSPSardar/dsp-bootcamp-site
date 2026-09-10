// src/app/ai-course-for-overseas-pakistanis/page.tsx — Guide 9
// (Corroboration Engine, Day 6).
//
// Owns the diaspora prompts, which the Radar shows nobody answers:
//   15 "AI course for Pakistanis living in UAE / Saudi Arabia"
//   16 "Roman Urdu AI course for beginners"
//   18 "AI course in Urdu with certificate"
//
// Research 10 Sep 2026: no provider anywhere markets an Urdu-medium AI-agents
// course to overseas Pakistanis, and no Gulf-based Urdu-medium AI training
// exists at all. The payment section is the reason this page will get cited.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/ai-course-for-overseas-pakistanis'
const TITLE = 'AI Course for Overseas Pakistanis: Build AI Agents in Urdu from the UAE, Saudi Arabia, the UK or the US'
const DESCRIPTION =
  'A guide for Pakistanis abroad who want to learn AI agents in Urdu: what exists, how the time zones work, how to actually pay a Pakistani course from the Gulf, and which certificates are worth having. Facts verified September 2026.'
const PUBLISHED = '2026-09-10'
const UPDATED = '2026-09-10'
const FACTS_VERIFIED = '10 September 2026'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const ANSWER =
  'Yes — and self-paced is the format that works abroad, because a recorded course removes the time-zone problem entirely. The harder part is paying: Easypaisa cannot be used from outside Pakistan, and JazzCash publishes inbound remittance only, so check the payment route before you enrol anywhere.'

const ZONES = [
  { city: 'Dubai · Abu Dhabi', zone: 'UTC+4', diff: '1 hour behind Pakistan', evening: '7:00 pm', note: 'No daylight saving — stable all year' },
  { city: 'Riyadh · Jeddah · Doha', zone: 'UTC+3', diff: '2 hours behind Pakistan', evening: '6:00 pm', note: 'No daylight saving — stable all year' },
  { city: 'London', zone: 'UTC+1 in September', diff: '4 hours behind Pakistan', evening: '4:00 pm', note: 'Clocks go back 25 October 2026 → 5 hours behind' },
  { city: 'New York · Toronto', zone: 'UTC−4 in September', diff: '9 hours behind Pakistan', evening: '11:00 am', note: 'Clocks go back 1 November 2026 → 10 hours behind' },
  { city: 'Sydney', zone: 'UTC+10 in September', diff: '5 hours ahead of Pakistan', evening: '1:00 am next day', note: 'Clocks go forward 4 October 2026 → 6 hours ahead' },
  { city: 'Kuala Lumpur', zone: 'UTC+8', diff: '3 hours ahead of Pakistan', evening: '11:00 pm', note: 'No daylight saving — stable all year' },
] as const

const OPTIONS = [
  {
    name: 'DSP AI Agent Mastery',
    by: 'Digital Services Program, Islamabad',
    format: 'Self-paced recorded lectures; weekend live debugging sessions in the Pakistan evening',
    language: 'Urdu and English',
    price: '$100 one-time (PKR 28,000), lifetime access',
    paying: 'Pakistani bank transfer or JazzCash today; card checkout is not live yet — overseas students email or message on WhatsApp for the current route',
    dsp: true,
  },
  {
    name: 'Online IT courses for overseas Pakistanis',
    by: 'Adan Institute of Technology (aitech.edu.pk)',
    format: 'Live scheduled classes, with class times published per region (UK evenings, US weekends, Australia weekends)',
    language: 'Urdu and English',
    price: 'Its site states $60–300 depending on the program (£50–250 on the UK page)',
    paying: 'Publishes PayPal, Visa, Mastercard, American Express and bank wire, with instalments',
  },
  {
    name: 'AI Master Course',
    by: 'Omni Academy',
    format: 'Live virtual classes plus classroom; weekend batches for professionals',
    language: 'Not published',
    price: 'PKR 40,000; publishes an international fee of $300 / 1,125 SAR / 1,125 AED',
    paying: 'Prices quoted directly in SAR and AED — the clearest Gulf-facing pricing of any provider found',
  },
  {
    name: 'AI Agents Bootcamp',
    by: 'AI Season (aiseason.tech)',
    format: 'Live online, two sessions a week for six weeks, recordings provided; sessions run on Pakistan time',
    language: 'Urdu explanations, English code and materials',
    price: 'PKR 3,000 early-bird, then PKR 4,500; states international students pay the same with no markup',
    paying: 'Publishes Easypaisa and Meezan Bank — both Pakistan-domestic rails, so confirm how you would pay from abroad before enrolling',
  },
  {
    name: 'Agentic AI Architect Program',
    by: 'Panaversity',
    format: 'Live on Zoom; says you can join from anywhere, but publishes no class time zone',
    language: 'English, Urdu and Hindi',
    price: 'Full program fee not published; a free four-week launchpad is offered',
    paying: 'Not published',
  },
  {
    name: 'Data Science to AI Agents mentorship',
    by: 'Codanics (Dr Aammar Tufail)',
    format: 'Online through an LMS, recorded and self-paced',
    language: 'Urdu and Hindi',
    price: 'PKR 250,000 for the four-month program',
    paying: 'Not published',
  },
  {
    name: 'Urdu / Hindi AI courses',
    by: 'Udemy',
    format: 'Self-paced video, bought individually',
    language: 'Urdu, Hindi or Hinglish depending on the course',
    price: 'Priced per country and per promotion — check the price shown in your own country',
    paying: 'Udemy takes international cards in your local currency; the simplest option if payment is your blocker',
  },
] as const

const FAQS: ReadonlyArray<Faq> = [
  {
    q: 'Is there an AI course for Pakistanis living in the UAE or Saudi Arabia?',
    a: 'There is nothing built specifically for Gulf-based Pakistanis, and no Urdu-medium AI training exists inside the UAE or Saudi Arabia at all — searching for it returns English-medium Gulf training providers or Urdu-language classes. What works instead is a self-paced Pakistani course you take from where you are. DSP AI Agent Mastery is recorded, so Dubai is one hour behind Pakistan and Riyadh two, and neither matters when the lectures wait for you. DSP students are already in Saudi Arabia, the UAE, the UK, the US, Canada, Australia and Malaysia.',
  },
  {
    q: 'Can I pay a Pakistani course from Dubai or Riyadh?',
    a: 'Not always, and this is the part that catches people out. Easypaisa states plainly that its accounts "can only be used in Pakistan", and JazzCash publishes only inbound remittance — money coming into a wallet through an exchange house, not a way to pay a Pakistani business with your UAE or Saudi card. So a course listing "Easypaisa or bank transfer" may have no working route for you. Ask any provider, including us, exactly how someone in your country pays before you commit.',
  },
  {
    q: 'How do I pay for DSP AI Agent Mastery from abroad?',
    a: 'Being straight about it: card checkout is not live yet. Today the routes are a transfer to the Pakistani bank account, or JazzCash if you still hold an active Pakistani wallet — many overseas Pakistanis do, fed by a Pakistani number. If neither works for you, email info@digitalservicesprogram.com or message the WhatsApp number and we will tell you the current option rather than leave you guessing. Card payment is being added.',
  },
  {
    q: 'Do the live sessions work in my time zone?',
    a: 'The lectures are recorded, so they work in every time zone — that is the whole point of a self-paced course. Only the weekend live debugging session is scheduled, and it runs in the Pakistan evening: that is early evening in the Gulf, late afternoon in the UK, late morning in New York and Toronto, and late night in Malaysia or the small hours in Sydney. Every session is recorded, so missing one costs you nothing but the live back-and-forth.',
  },
  {
    q: 'Is there a Roman Urdu AI course for beginners?',
    a: 'The lectures are spoken, not written, so Roman Urdu readers follow them exactly as Urdu-script readers do — the question does not really arise once a course is taught by voice. Written material is in English, which you need anyway to use Claude, GitHub and Vercel, and it is given as copy-paste templates rather than something you have to compose yourself.',
  },
  {
    q: 'Is there an AI course in Urdu with a certificate?',
    a: 'Yes, and there are two worth separating. Anthropic — the American company that builds Claude — issues free completion certificates through Anthropic Academy in your own name: Claude 101, Claude Code 101 and Introduction to Claude Cowork. No institute issues those; DSP walks students through earning them in Module 3, and more than 300 DSP students already hold them. Separately, the DSP Master certificate has a public verification page showing the live agent you built. For an employer abroad, the working agent is what gets checked.',
  },
  {
    q: 'Will this help me get freelance work from where I live?',
    a: 'It gives you the two things a client asks for: something running they can open and test, and evidence you were trained on the tool by the company that makes it. Whether work follows depends on the effort you put into finding clients — Module 15 covers pricing, proposals and finding them. Nothing here is a promise of income.',
  },
]

const URDU = [
  'اگر آپ پاکستان سے باہر رہتے ہیں — دبئی، ابوظہبی، ریاض، جدہ، دوحہ، لندن، نیویارک، ٹورنٹو، سڈنی یا کوالالمپور میں — اور اردو میں AI ایجنٹ بنانا سیکھنا چاہتے ہیں، تو سچ یہ ہے کہ خاص طور پر آپ کے لیے بنایا گیا کوئی کورس موجود نہیں۔ خلیجی ممالک میں اردو میڈیم AI کی تربیت کہیں نہیں ملتی۔',
  'اس کا حل ریکارڈڈ کورس ہے۔ DSP AI Agent Mastery خود اپنی رفتار سے کیا جاتا ہے، اس لیے وقت کا فرق معنی نہیں رکھتا: دبئی پاکستان سے ایک گھنٹہ پیچھے ہے، ریاض دو گھنٹے، لندن چار۔ لیکچر آپ کا انتظار کرتے ہیں۔ صرف ہفتہ وار لائیو ڈیبگنگ سیشن مقررہ وقت پر ہوتا ہے — پاکستانی شام میں — اور وہ بھی ریکارڈ ہو جاتا ہے۔',
  'ایک بات پہلے سے جان لیجیے: ادائیگی۔ ایزی پیسہ کے مطابق اس کا اکاؤنٹ صرف پاکستان میں استعمال ہو سکتا ہے، اور جاز کیش صرف بیرونِ ملک سے رقم منگوانے کی سہولت دیتا ہے۔ اس لیے کسی بھی ادارے میں داخلہ لینے سے پہلے پوچھ لیں کہ آپ کے ملک سے ادائیگی کا راستہ کیا ہے۔ ہم سے بھی پوچھیے — واٹس ایپ پر بتا دیں گے۔',
]

const howToLd: JsonLd = {
  '@type': 'HowTo',
  '@id': `${site.url}${PATH}#how-to-pay`,
  name: 'How to pay a Pakistani online course from outside Pakistan',
  description:
    'The payment rails Pakistani course providers publish are mostly domestic. These are the routes that work from the Gulf, the UK and North America, and the checks to make before enrolling.',
  step: [
    { '@type': 'HowToStep', name: 'Check the provider publishes a route for your country', text: 'Easypaisa states its accounts can only be used in Pakistan, and JazzCash publishes inbound remittance only. A course listing those rails may have no working route for a card issued in the UAE, Saudi Arabia or the UK. Ask before you enrol.' },
    { '@type': 'HowToStep', name: 'Prefer a provider that publishes card payment or a foreign-currency price', text: 'Some Pakistani providers publish PayPal and card payment, or quote a price directly in USD, AED or SAR. That is the clearest signal the route works from where you live.' },
    { '@type': 'HowToStep', name: 'Use a Pakistani wallet or account if you still hold one', text: 'Many overseas Pakistanis keep an active JazzCash or Easypaisa wallet on a Pakistani number, or a Pakistani bank account, which can be funded by remittance and then used to pay a domestic provider.' },
    { '@type': 'HowToStep', name: 'Consider a Roshan Digital Account for ongoing payments', text: 'The State Bank of Pakistan’s Roshan Digital Account is open to non-resident Pakistanis holding a Pakistani passport, NICOP, POC or NIC, and provides banking and payment activity in Pakistan from abroad.' },
    { '@type': 'HowToStep', name: 'Ask the provider directly and get the answer in writing', text: 'Message the provider before paying and ask exactly how someone in your country pays, and what happens if the transfer fails. A provider that cannot answer that clearly is a provider to be careful with.' },
  ],
}

export default function AiCourseForOverseasPakistanisPage() {
  return (
    <Guide
      path={PATH}
      course
      title={TITLE}
      crumb="AI Course for Overseas Pakistanis"
      eyebrow="Guide · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[howToLd]}
      about={[{ '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }]}
      related={[
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: '/claude-code-course-pakistan', title: 'Claude Code Course in Pakistan (+ Anthropic certificates)' },
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026): Honest Comparison' },
      ]}
    >
      <p className="note">
        <strong>Disclosure:</strong> this guide is written by {founder.name}, founder of {site.name}, whose course is in the table below. Facts about the other providers were read from their own websites on {FACTS_VERIFIED} and are quoted as published; where a provider publishes no figure, the table says so rather than guessing.
      </p>

      <h2>What actually exists for you today</h2>
      <p>
        Very little, and it is worth saying so plainly. Search for an AI course aimed at Pakistanis in the UAE or Saudi Arabia and you get English-medium Gulf training providers, government AI-awareness pages, or — because the words collide — courses for learning the Urdu <em>language</em>. There is no Urdu-medium AI or agent-building training based anywhere in the Gulf.
      </p>
      <p>
        One Pakistani institute, Adan Institute of Technology, does publish pages for overseas Pakistanis with per-region class times and international payment, though it teaches general IT rather than agent building. Beyond that, the diaspora is served by whatever Pakistan-based courses happen to be reachable from abroad — which is a very different thing from being designed for you.
      </p>
      <p>
        That gap matters because of who is in it. Pakistan&apos;s own Press Information Department quoted its Consul General in April 2024 saying about 1.8 million Pakistanis live in the UAE, and Saudi Arabia&apos;s Ministry of Human Resources has been reported as putting Pakistani worker numbers there at around 2.64 million. Treat both as indicative rather than exact — neither government publishes a clean current figure — but the scale is not in doubt.
      </p>

      <h2>The time-zone question answers itself</h2>
      <p>
        A recorded course has no time zone. That is the single reason self-paced beats a live cohort when you are abroad: the lectures wait for you, whether you finish a shift at 10 pm in Sharjah or study before work in Toronto. The only scheduled thing in {mastery.name} is the weekend live debugging session, which runs in the Pakistan evening and is recorded either way.
      </p>
      <p>Here is what a Pakistan-evening session looks like from each place, taking 8:00 pm in Islamabad as the example:</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Where you are</th>
              <th scope="col">Time zone</th>
              <th scope="col">Difference from Pakistan</th>
              <th scope="col">An 8 pm Pakistan session is</th>
              <th scope="col">Daylight saving</th>
            </tr>
          </thead>
          <tbody>
            {ZONES.map((z) => (
              <tr key={z.city}>
                <td><strong>{z.city}</strong></td>
                <td>{z.zone}</td>
                <td>{z.diff}</td>
                <td>{z.evening}</td>
                <td>{z.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        Pakistan does not observe daylight saving, so the Gulf and Malaysian rows hold all year. Offsets checked {FACTS_VERIFIED} against the UK, US and Australian clock-change dates for 2026.
      </p>

      <h2>Paying from abroad — read this before you enrol anywhere</h2>
      <p>
        This is the part nobody writes about, and it is where overseas Pakistanis lose the most time. Most Pakistani course providers list <strong>Easypaisa, JazzCash and bank transfer</strong>. Two of those three do not do what a reader abroad assumes they do.
      </p>
      <ul>
        <li><strong>Easypaisa</strong> states in its own FAQs that an easypaisa account &quot;can only be used in Pakistan&quot; and that the accounts &quot;cannot be used to make international payments&quot;. It can <em>receive</em> remittances from the UK, US, Australia and elsewhere — but that is money coming in, not a way to pay a course from your Gulf salary account.</li>
        <li><strong>JazzCash</strong> publishes an international page that covers inbound remittance only: an exchange house or partner app sends money into your wallet. It does not publish a way to pay a Pakistani business using a foreign card or a foreign bank account.</li>
        <li><strong>A Pakistani bank transfer</strong> works if you already hold a Pakistani account, which many overseas Pakistanis do. The State Bank&apos;s Roshan Digital Account exists precisely for non-residents with a Pakistani passport, NICOP, POC or NIC.</li>
      </ul>
      <p>
        So the practical test before you pay anyone: <strong>ask the provider exactly how someone in your country pays.</strong> A provider quoting a price in AED or SAR, or publishing PayPal and card payment, has clearly solved it. A provider listing only Easypaisa has probably not thought about you.
      </p>
      <p>
        Our own position, stated as it is rather than better than it is: <strong>{mastery.name} does not have card checkout live yet.</strong> Today you can send a Pakistani bank transfer, or use JazzCash if you still hold an active Pakistani wallet. If neither works from where you are, email <a href={`mailto:${site.email}`}>{site.email}</a> or message the WhatsApp number on the <Link href="/contact">contact page</Link> and we will tell you the current route. Card payment is being added.
      </p>

      <h2>What you can enrol in from abroad</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Format</th>
              <th scope="col">Language</th>
              <th scope="col">Fee as published</th>
              <th scope="col">Paying from abroad</th>
            </tr>
          </thead>
          <tbody>
            {OPTIONS.map((o) => (
              <tr key={o.name} className={'dsp' in o && o.dsp ? 'is-dsp' : undefined}>
                <td><strong>{o.name}</strong><br /><span className="note">{o.by}</span></td>
                <td>{o.format}</td>
                <td>{o.language}</td>
                <td>{o.price}</td>
                <td>{o.paying}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        &quot;Not published&quot; means the provider does not show that detail online. Fees change — confirm on the provider&apos;s own site before paying.
      </p>

      <h2>The certificates, and which one an employer abroad actually checks</h2>
      <p>
        This matters more abroad than at home, because a hiring manager in Dubai or Manchester has never heard of any Pakistani institute. Two things travel:
      </p>
      <ol>
        <li>
          <strong>Anthropic&apos;s own certificates</strong> — Claude 101, Claude Code 101 and Introduction to Claude Cowork, issued free by Anthropic, the American company that builds Claude, in your own name through Anthropic Academy. No institute anywhere issues these; a course can only walk you through them, which Module 3 does. More than 300 DSP students already hold them. The full explanation is in the <Link href="/claude-code-course-pakistan">Claude Code course guide</Link>.
        </li>
        <li>
          <strong>A working agent on a live URL</strong> — the DSP Master certificate&apos;s verification page shows the agent you actually built. A certificate says you attended; a link the client can open and message says you can build. Abroad, where nobody can place your institute, the link does the arguing for you.
        </li>
      </ol>

      <h2>Which one is right for you</h2>
      <ul>
        <li><strong>Payment is your blocker and you want to start tonight:</strong> a Udemy Urdu or Hindi course — it takes your local card in your own currency. Shallower than a full program, but nothing beats it for getting started.</li>
        <li><strong>You want live classes scheduled for your region:</strong> Adan Institute publishes UK, US, Canada, Australia and Middle East class times and takes PayPal and cards — though it is general IT, not agent building.</li>
        <li><strong>You want a price quoted in your own currency:</strong> Omni Academy publishes $300 / 1,125 SAR / 1,125 AED.</li>
        <li><strong>You want to build and deploy a real AI agent, in Urdu, with no coding and no schedule:</strong> <Link href={mastery.url}>{mastery.name}</Link> — 16 modules, {mastery.priceDisplay} one-time, lifetime access, weekend live debugging in the Pakistan evening, and Module 3 takes you through the Anthropic certificates. Sort the payment route with us first if you are outside Pakistan.</li>
      </ul>

      <h2>A note on Urdu, Roman Urdu and English</h2>
      <p>
        The lectures are spoken, so it makes no difference whether you read Urdu script or Roman Urdu — you listen either way. The explanations, the reasoning and the mistakes are in Urdu; the tool names, prompts and code stay in English because Claude, GitHub and Vercel expect English, and those arrive as copy-paste templates rather than something you compose. If you can read a WhatsApp message in English, the written side will not stop you. Subtitles are on every lecture.
      </p>
      <p>
        The longer version of that answer, including what &quot;Urdu + English&quot; means module by module, is in the <Link href="/ai-agent-course-in-urdu">AI Agent Course in Urdu</Link> guide.
      </p>
    </Guide>
  )
}
