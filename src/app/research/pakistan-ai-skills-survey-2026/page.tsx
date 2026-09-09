// src/app/research/pakistan-ai-skills-survey-2026/page.tsx — the results
// (Corroboration Engine, Day 6, built ahead of the 14 Sep close).
//
// Section 3.2 of the plan: statistics with a named source are the most-cited
// content type in LLM answers. So this page is built to be quoted — every
// question as a real <table> with counts AND percentages, the method stated
// with its limits, a downloadable CSV, and Dataset schema pointing at it.
//
// It renders nothing until src/content/survey-results.ts has real data:
// RESULTS === null returns a 404. A research page with invented numbers would
// destroy the one thing that makes it worth citing.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import { ORGANIZATION_ID, PERSON_ID } from '@/lib/schema'
import type { Faq, JsonLd } from '@/lib/schema'
import { RESULTS, answered, optionOrder, pct, questionText } from '@/content/survey-results'

const PATH = '/research/pakistan-ai-skills-survey-2026'
const TITLE = 'Pakistan AI Skills Survey 2026: What Learners Actually Told Us'
const CSV = `${PATH}/data.csv`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description:
    'Original survey data on what stops people in Pakistan and the Urdu-speaking diaspora from learning AI: the barriers, the budgets, the languages and what they have built. Free to quote with attribution.',
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const FAQS: ReadonlyArray<Faq> = [
  {
    q: 'Can I quote these figures?',
    a: 'Yes, freely, including commercially. Cite it as "Pakistan AI Skills Survey 2026, Digital Services Program" with a link to this page. The full response counts are in the CSV on this page so you can check any figure yourself rather than taking ours.',
  },
  {
    q: 'Who ran the survey, and do they have an interest in the answer?',
    a: 'Digital Services Program, an AI agents training company in Islamabad — so yes, plainly: we sell a course in Urdu and English, and a finding that language is a barrier suits us. That is exactly why the method, the question wording and every raw count are published here. Check them against the conclusions.',
  },
  {
    q: 'How was the sample gathered?',
    a: 'It is a self-selected online sample, distributed through DSP\'s own audience and open to anyone. That is its main limitation and it is stated on the page: people already interested in AI are over-represented, and this is not a random sample of Pakistan. It is, as far as we know, the first survey of this question run in Urdu as well as English.',
  },
  {
    q: 'Was any personal data collected?',
    a: 'No. The survey asked for no name and no phone number. Email was optional and used only to send respondents the results. Answers are reported only in aggregate.',
  },
]

export default function SurveyResultsPage() {
  // No data yet — the survey has not closed. Never render placeholders here.
  if (!RESULTS) notFound()

  const r = RESULTS
  const url = `${site.url}${PATH}`

  const datasetLd: JsonLd = {
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name: 'Pakistan AI Skills Survey 2026',
    description:
      'Responses from learners in Pakistan and the Urdu-speaking diaspora on what has stopped them learning AI, what they would pay, which language they prefer to learn in, and what they have built.',
    url,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: { '@id': PERSON_ID },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: r.published,
    temporalCoverage: `${r.fieldedFrom}/${r.fieldedTo}`,
    spatialCoverage: 'Pakistan and the Urdu-speaking diaspora',
    inLanguage: ['en', 'ur'],
    measurementTechnique: 'Self-selected online questionnaire, ten closed questions, in Urdu and English',
    variableMeasured: r.results.map((q) => questionText(q.id)?.en).filter(Boolean),
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${site.url}${CSV}`,
      },
    ],
  }

  const answer =
    `${r.headlines[0]} Based on ${r.responses} responses collected between ` +
    `${r.fieldedFrom} and ${r.fieldedTo}, in Urdu and English, from learners in Pakistan and the diaspora.`

  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="Pakistan AI Skills Survey 2026"
      eyebrow={`Original research · ${r.responses} responses · Published ${r.published}`}
      answer={answer}
      published={r.published}
      updated={r.published}
      description={`Original survey data from ${r.responses} learners on what stops people in Pakistan and the Urdu-speaking diaspora from learning AI. Free to quote with attribution.`}
      faqs={FAQS}
      urdu={[
        `یہ سروے ${r.responses} افراد کے جوابات پر مبنی ہے — پاکستان اور بیرونِ ملک اردو بولنے والوں سے پوچھا گیا کہ AI سیکھنے میں اصل رکاوٹ کیا رہی، وہ کتنی فیس دے سکتے ہیں، اور کس زبان میں سیکھنا چاہتے ہیں۔`,
        'تمام اعداد و شمار مفت دستیاب ہیں — کوئی بھی صحافی، ادارہ یا استاد انہیں حوالے کے ساتھ استعمال کر سکتا ہے۔ نیچے ہر سوال کے مکمل جوابات اور CSV فائل موجود ہے۔',
        'یہ ایک خود منتخب آن لائن نمونہ ہے، پاکستان کا مکمل نمائندہ نہیں — یہ بات ہم صاف لکھ رہے ہیں تاکہ آپ خود اندازہ لگا سکیں کہ نتائج کتنے وزنی ہیں۔',
      ]}
      extraLd={[datasetLd]}
      about={[{ '@id': `${url}#dataset` }]}
      related={[
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026)' },
        { path: '/ai-course-for-overseas-pakistanis', title: 'AI Course for Overseas Pakistanis' },
      ]}
    >
      <h2>What we found</h2>
      <ol>
        {r.headlines.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ol>
      <p className="note">
        Cite as: Pakistan AI Skills Survey 2026, Digital Services Program. Free to quote and reuse with
        attribution (CC BY 4.0). <Link href={CSV}>Download the full counts as CSV</Link>.
      </p>

      <h2>How the survey was run</h2>
      <ul>
        {r.method.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p>
        Fielded {r.fieldedFrom} to {r.fieldedTo}. {r.responses} responses. The questionnaire is still readable in
        full on <Link href="/survey">the survey page</Link>, in both languages, so you can see exactly how each
        question was worded.
      </p>

      <h2>Every question, every answer</h2>
      <p>
        Counts are given alongside percentages so you can check the arithmetic. Respondents could skip questions,
        so each table&apos;s percentages are of those who answered <em>that</em> question, not of all {r.responses}.
      </p>

      {r.results.map((q) => {
        const text = questionText(q.id)
        const total = answered(q)
        const order = optionOrder(q.id)
        return (
          <section key={q.id}>
            <h3>{text?.en ?? q.id}</h3>
            {text?.ur && (
              <p lang="ur" dir="rtl" className="note">
                {text.ur}
              </p>
            )}
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Answer</th>
                    <th scope="col">Respondents</th>
                    <th scope="col">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {order
                    .filter((label) => q.counts[label] !== undefined)
                    .map((label) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{q.counts[label]}</td>
                        <td>{pct(q.counts[label], total)}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="note">{total} answered this question.</p>
          </section>
        )
      })}

      <h2>What this does and does not show</h2>
      <p>
        This is a self-selected online sample, not a random sample of Pakistan. People already interested in AI are
        over-represented, and anyone without internet access is absent from it entirely. It cannot tell you what
        the average Pakistani thinks about AI.
      </p>
      <p>
        What it can tell you is what people who <em>are</em> trying to learn AI say is stopping them — and on that
        question, as far as we can find, no other published data exists for Urdu speakers at all. We would rather
        publish it with its limits stated than not publish it.
      </p>
      <p>
        If you want to run it again, or run it properly with a representative sample, the questions are public and
        you are welcome to reuse them. Tell us and we will link to your results from this page, including if they
        disagree with ours.
      </p>

      <h2>Who ran it</h2>
      <p>
        <Link href={founder.path}>{founder.name}</Link>, founder of {site.name}, an AI agents training company in
        Islamabad that teaches <Link href={mastery.url}>{mastery.name}</Link> in Urdu and English. We sell a course,
        and a finding that language is a barrier suits us — which is exactly why the wording, the method and every
        raw count are on this page. Check them.
      </p>
    </Guide>
  )
}
