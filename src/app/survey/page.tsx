// src/app/survey/page.tsx — the Pakistan AI Skills Survey 2026 (Corroboration
// Engine, Day 6).
//
// Section 3.2 of the plan calls original research the single most citable
// asset DSP can publish, and this is the collection end of it. It lives on the
// site rather than in a Google Form on purpose: the traffic stays on the
// domain, the page is one short URL for Facebook and WhatsApp, and responses
// land in the Google Sheet the lead route already writes to.
//
// Results publish at /research/pakistan-ai-skills-survey-2026 once there is
// real data — that page stays unbuilt until then rather than shipping empty.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { founder, site } from '@/config/site'
import { ORGANIZATION_ID, SCHEMA_CONTEXT, breadcrumbLd } from '@/lib/schema'
import SurveyForm from './SurveyForm'
import '@/app/guides.css'

const PATH = '/survey'
const TITLE = 'Pakistan AI Skills Survey 2026'
const DESCRIPTION =
  'Ten questions, in Urdu and English, on what actually stops people in Pakistan and the Urdu-speaking diaspora from learning AI. Anonymous — no name, no phone. Results published free for anyone to quote.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} — take the survey | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'website', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

export default function SurveyPage() {
  const ld = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebPage',
    '@id': `${site.url}${PATH}#webpage`,
    url: `${site.url}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: ['en', 'ur'],
    publisher: { '@id': ORGANIZATION_ID },
  }

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: TITLE, path: PATH }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <article className="page-guide">
        <header className="hero-dark guide-hero">
          <div className="wrap">
            <p className="eyebrow">Original research · Open until 14 September 2026</p>
            <h1>{TITLE}</h1>
            <p className="byline">
              Run by <Link href={founder.path} rel="author">{founder.name}</Link> · {site.shortName}, Islamabad · Ten questions, about three minutes
            </p>
          </div>
        </header>

        <section className="guide-body">
          <div className="wrap">
            <div className="answer" id="answer">
              <p className="kicker">Why this exists</p>
              <p>
                Almost every study of who is learning AI is written in English, about English speakers. Nobody has
                asked the obvious question about this part of the world: what actually stops a person in Pakistan —
                or a Pakistani in Dubai, Riyadh, Manchester or Toronto — from learning to build with AI? Ten
                questions. No name, no phone number. We publish every number, including the ones that do not
                flatter us, free for anyone to quote.
              </p>
            </div>

            <p>
              It takes about three minutes. Answer in whichever language you think in — each question is written in
              both. Only two answers are required: where you live, and what has stopped you. Skip anything else you
              would rather not answer.
            </p>

            <SurveyForm />

            <section className="guide-urdu" id="urdu" aria-label="Urdu summary">
              <p className="kicker">اردو میں</p>
              <p lang="ur" dir="rtl">
                یہ سروے اُس سوال کے بارے میں ہے جو آج تک کسی نے ٹھیک سے پوچھا ہی نہیں: پاکستان میں — یا دبئی، ریاض،
                مانچسٹر اور ٹورنٹو میں رہنے والے پاکستانیوں کے لیے — AI سیکھنے میں اصل رکاوٹ کیا ہے؟ انگریزی؟ کوڈنگ؟
                فیس؟ وقت؟ یا صرف یہ کہ کسی نے آپ کی زبان میں سمجھایا ہی نہیں؟
              </p>
              <p lang="ur" dir="rtl">
                دس سوال، تقریباً تین منٹ۔ نہ نام پوچھا جا رہا ہے، نہ فون نمبر۔ ہر سوال اردو اور انگریزی دونوں میں لکھا
                ہے — جس زبان میں آپ سوچتے ہیں، اُسی میں جواب دیجیے۔ صرف دو جواب ضروری ہیں: آپ کہاں رہتے ہیں، اور کیا
                رکاوٹ بنی۔
              </p>
              <p lang="ur" dir="rtl">
                نتائج ہم مفت شائع کریں گے تاکہ کوئی بھی — صحافی، ادارہ، استاد — انہیں استعمال کر سکے۔ آپ کا ایک جواب
                اُس تصویر کا حصہ بنے گا جو ابھی تک کہیں موجود نہیں۔
              </p>
            </section>

            <p className="note">
              Anonymous: we do not ask for your name or phone number, and email is optional and used only to send you
              the results. Answers are counted together, never published individually. Results will appear at{' '}
              <code>{site.url}/research/pakistan-ai-skills-survey-2026</code>.
            </p>
          </div>
        </section>
      </article>
    </SiteShell>
  )
}
