// src/app/research/ai-search-dominance-engine/page.tsx — DSP's own
// AI-search visibility, measured on a fixed prompt set and published whole.
//
// The second original-research page on this site, and the harder one: the
// survey publishes data about other people, this publishes data about us,
// including the finding that a month of correct on-page work moved the
// retrieval layer by nothing. That is the point. There is a great deal of
// advice about ranking in answer engines and almost no public longitudinal
// data, because nobody publishes a series that makes their own work look
// ineffective — so the series itself is the citable asset, not the scores.
//
// Every number on this page comes from src/content/radar-results.ts, which
// is also what the CSV route serves, so the page and the download cannot
// disagree. No figure is estimated except the one wave marked full: false.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, site } from '@/config/site'
import { ORGANIZATION_ID, PERSON_ID } from '@/lib/schema'
import type { Faq, JsonLd } from '@/lib/schema'
import { FULL_WAVES, LATEST_WAVE, PEAK_WAVE, RADAR } from '@/content/radar-results'

const UPDATED = '2026-10-17'
const PATH = '/research/ai-search-dominance-engine'
const TITLE = `The AI Search Dominance Engine: ${RADAR.prompts.length} Prompts, ${RADAR.waves.length} Waves, Measured in Public`
const CSV = `${PATH}/data.csv`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description:
    `A month of longitudinal AI-search visibility data for one small company: ${RADAR.prompts.length} fixed prompts, ${RADAR.waves.length} dated waves of which ${FULL_WAVES.length} are scored runs, the rubric, the limits and every recorded #1 result so you can re-check it. Free to quote with attribution.`,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const FAQS: ReadonlyArray<Faq> = [
  {
    q: 'Can I quote these figures?',
    a: 'Yes, freely, including commercially. Cite it as "The AI Search Dominance Engine, Digital Services Program" with the wave date and a link to this page. Every wave total and every recorded result is in the CSV on this page, so you can check a figure rather than taking ours.',
  },
  {
    q: 'Why would a company publish data showing its own SEO work did not work?',
    a: 'Because the measurement is worth more than the claim. Almost every published case study in this field is one before-and-after screenshot from a party with an interest in the after. A dated series on a prompt set fixed before the first wave, including the waves where the number fell, is the only version of this that another practitioner can learn anything from — and the only version a judge or a journalist can check.',
  },
  {
    q: 'Does this measure ChatGPT, Gemini, Perplexity or Claude directly?',
    a: 'No, and that distinction matters. It measures the retrieval layer those engines draw from before they synthesise an answer. Their rendered answers vary by account, session, personalisation and model version, which makes them unusable as a time series by anyone who cannot control those variables. The honest name for what this number is, is retrievability.',
  },
  {
    q: 'What is the biggest weakness in the data?',
    a: 'The search tool resolves to a US locale, so the Pakistan and Islamabad prompts are very likely scored differently than they would be from Pakistan. After that: one sample per cell, so a single-wave move is noise. Both are stated on the page rather than buried, and a locale-controlled re-run is the thing we would most like someone else to do.',
  },
  {
    q: 'Can I re-run this prompt set myself?',
    a: 'Please do. All 30 prompts, the rubric and the method are on this page and in the CSV. If you run it in another locale, another language, or for another company, tell us and we will link your results from this page — including if they contradict ours. A second subject would be worth more to this dataset than another wave of the first one.',
  },
]

export default function RadarPage() {
  const url = `${site.url}${PATH}`
  const first = RADAR.waves[0]
  // Derived, never hardcoded: the first wave that scored zero, and how many
  // consecutive zeros the series currently ends on. Naming a wave in prose
  // through LATEST_WAVE would silently re-point at the next wave to land.
  const firstZero = FULL_WAVES.find((w) => w.total === 0)
  const trailingZeros = [...FULL_WAVES].reverse().findIndex((w) => w.total !== 0)
  const zeroRun = trailingZeros === -1 ? FULL_WAVES.length : trailingZeros

  const datasetLd: JsonLd = {
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name: `The AI Search Dominance Engine: AI-search visibility of one company, ${RADAR.prompts.length} prompts, ${RADAR.waves.length} waves`,
    description:
      `Longitudinal measurement of one company’s visibility in the retrieval layer that AI answer engines draw from: ${RADAR.prompts.length} prompts fixed before the first wave, scored 0–3, ${RADAR.waves.length} dated waves, with the #1 result recorded per published observation.`,
    url,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: { '@id': PERSON_ID },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: '2026-10-05',
    dateModified: LATEST_WAVE.date,
    temporalCoverage: `${first.date}/${LATEST_WAVE.date}`,
    spatialCoverage: 'Pakistan, and the global Urdu-speaking diaspora',
    inLanguage: ['en', 'ur'],
    measurementTechnique:
      'A fixed set of 30 natural-language prompts run once per wave through web search, each scored 0–3 on the position of the best-placed property controlled by the subject, by scorers not told what result was expected',
    variableMeasured: [
      'Position of the subject’s best-placed property per prompt (0–3)',
      'Wave total out of 90',
      'The #1 result per observed prompt',
    ],
    keywords: ['AI search', 'generative engine optimization', 'LLM SEO', 'retrievability', 'Pakistan', 'answer engines'],
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${site.url}${CSV}`,
      },
    ],
  }

  const answer =
    `Across ${FULL_WAVES.length} scored waves on ${RADAR.prompts.length} prompts fixed on ${first.date}, ` +
    `DSP's visibility in the retrieval layer AI answer engines draw from ranged from ${PEAK_WAVE.total} to ` +
    `${LATEST_WAVE.total} out of ${RADAR.maxScore}, and in ${FULL_WAVES.length} scored waves ` +
    `digitalservicesprogram.com has not once appeared for a non-brand prompt. The series now ends on ` +
    `${zeroRun} consecutive waves of zero, the last of them published whole: 30 prompts, 30 recorded #1 results, no DSP property in any of them. ` +
    `Every wave, rubric, limit and recorded result is published here.`

  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="AI Search Dominance Engine"
      eyebrow={`Original research · ${FULL_WAVES.length} scored waves · Latest ${LATEST_WAVE.date}`}
      answer={answer}
      published="2026-10-05"
      updated={UPDATED}
      description={`A month of longitudinal AI-search visibility data for one small company: ${RADAR.prompts.length} fixed prompts, ${RADAR.waves.length} dated waves of which ${FULL_WAVES.length} are scored runs, the rubric, the stated limits, and every recorded #1 result so a stranger can re-check it.`}
      faqs={FAQS}
      urdu={[
        `یہ صفحہ DSP کی اپنی پیمائش ہے — ${RADAR.prompts.length} مقررہ سوالات، ${FULL_WAVES.length} مرتبہ جانچ، اور نتیجہ یہ کہ AI سرچ انجنوں میں ہماری کمپنی کی موجودگی ${PEAK_WAVE.total} سے ${LATEST_WAVE.total} کے درمیان رہی، ${RADAR.maxScore} میں سے۔`,
        'ہم نے وہ نتائج بھی شائع کیے ہیں جو ہمارے خلاف جاتے ہیں — ایک مہینے کی تکنیکی SEO محنت کے بعد بھی ہماری ویب سائٹ کسی غیر برانڈ سوال پر نہیں آئی۔ یہی بات اس ڈیٹا کو قابلِ اعتبار بناتی ہے۔',
        'تمام سوالات، طریقہ کار، حدود اور CSV فائل نیچے موجود ہیں۔ کوئی بھی خود جانچ سکتا ہے، اور حوالے کے ساتھ آزادانہ استعمال کر سکتا ہے۔',
      ]}
      extraLd={[datasetLd]}
      about={[{ '@id': `${url}#dataset` }]}
      related={[
        { path: '/research/pakistan-ai-skills-survey-2026', title: 'Pakistan AI Skills Survey 2026' },
        { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?' },
        { path: '/about', title: 'About Digital Services Program' },
      ]}
    >
      <h2>What the series shows</h2>
      <p>
        {RADAR.waves.length} dated rows, {first.date} to {LATEST_WAVE.date} — {FULL_WAVES.length} of them scored runs and the
        first a sampled baseline. Each scored wave is the sum of {RADAR.prompts.length} prompts
        scored 0&ndash;3, so {RADAR.maxScore} is the ceiling. The band was always flat and close to the floor; on{' '}
        {firstZero?.date} it reached the floor, and it has stayed there for {zeroRun} consecutive scored waves.
        In the most recent one all {RADAR.prompts.length} prompts scored 0 and all {RADAR.prompts.length} #1
        results were recorded, so the whole wave is in the table below rather than a fragment of it.
      </p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Score</th>
              <th scope="col">Kind</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {RADAR.waves.map((w) => (
              <tr key={w.id}>
                <td>{w.date}</td>
                <td>
                  {w.total} / {RADAR.maxScore}
                </td>
                <td>{w.full ? 'Scored run' : 'Sampled baseline'}</td>
                <td>{w.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        Cite as: The AI Search Dominance Engine, Digital Services Program, wave of {LATEST_WAVE.date}. Free to
        quote and reuse with attribution (CC BY 4.0). <Link href={CSV}>Download every wave and observation as CSV</Link>.
      </p>

      <h2>Ten things the data says</h2>

      <h3>1. A month of correct on-page work moved the retrieval layer by nothing</h3>
      <p>
        Across every wave, <strong>digitalservicesprogram.com has never once appeared for a non-brand prompt.</strong>{' '}
        Not at the peak of {PEAK_WAVE.total}, not at {LATEST_WAVE.total}. Every point the series has ever scored came
        from a third-party property DSP controls, or from its own brand name.
      </p>
      <p>
        The clearest test of that arrived on {firstZero?.date}. In the week before it, two pages were rebuilt
        specifically to answer the prompt that retrieves them &mdash; the question put as the page&apos;s own first
        FAQ, verbatim, with the answer above it. Both prompts scored 0 in the wave that followed, and that wave
        was the first zero of the series. Both were still 0 in the wave of {LATEST_WAVE.date}, six and a half
        weeks into the campaign.
      </p>
      <p>
        One off-series sighting exists and belongs here rather than in a footnote: on 6 October{' '}
        <code>/ai-training-islamabad</code> appeared at position four on{' '}
        {RADAR.prompts.find((p) => p.id === 11)?.en} &mdash; the only time the domain has been seen on a non-brand
        prompt. It was gone the next day. That was one sample in a five-prompt spot-check, which makes it a
        sighting and not a position; its own #1 result was not retained, which is why it is stated here in prose
        and not published as a row.
      </p>
      <p>
        Over the same weeks the site shipped and verified: one Organization and one Person entity with shared
        identifiers across every page, answer-first definition blocks reused verbatim as structured-data
        descriptions, FAQ arrays rendering the same text visibly and machine-readably, an explicit AI-crawler
        allowlist, per-URL sitemap dates wired to a content-change constant, and a blog consolidation with
        redirects. None of that is wrong. The finding is that it is a <em>floor</em>, not a lever &mdash; a site with
        no third-party corroboration does not get retrieved however clean its markup is.
      </p>

      <h3>2. On buyer queries the results are not competitors, they are directories</h3>
      <p>
        On {RADAR.prompts.find((p) => p.id === 9)?.en} (5 October) the entire top three was DesignRush, GoodFirms
        and TechBehemoths, with no company&apos;s own website until fourth. On a related phrasing measured on 3 October outside
        the fixed prompt set &mdash; which company builds AI employees in Pakistan &mdash; nine of nine results were
        directories and no company&apos;s own site appeared at all. No Pakistani AI company in this measurement ranks for its own category on the strength of
        its own site.
      </p>
      <p>
        The practical consequence: for this class of query the achievable goal is not outranking the directory. It
        is being the top-listed company inside it.
      </p>
      <p>
        Amended on {LATEST_WAVE.date}: the wall is not a wall, it is churn, and it moves between prompts. On
        8, 9 and 10 October the same prompt 9 returned <strong>no directory at all</strong> &mdash; a training
        company at #1 and one blog network holding four of the nine slots. On 10 October the directories had moved
        to {RADAR.prompts.find((p) => p.id === 12)?.en}, which returned six of nine. So the set rotates faster than
        any one page can be optimised against, and the conclusion stands for a different reason than it was first
        written: being listed inside the directories is a defence precisely because you cannot predict which prompt
        they will own next week.
      </p>

      <h3>3. A third-party profile spikes, then decays if nobody maintains it</h3>
      <p>
        <code>github.com/DSPSardar</code> was the #1 result for {RADAR.prompts.find((p) => p.id === 11)?.en} through
        seven consecutive verifications in September. By 3 October it was gone from that result set, and gone again
        on the 4th and 5th. The profile&apos;s text had not been edited since before DSP changed its own positioning
        on 15 September &mdash; so the highest-retrieval property the company owned was publishing a description the
        company itself had stopped using.
      </p>
      <p>
        A directory listing on the same brand query behaved differently: it took #1 within 48 hours of being
        claimed, lost #1 within about a day, and then held second place on both 4 and 5 October. The pattern that
        fits both is a freshness spike settling to whatever corroboration supports it. One profile is a spike; a set
        of mutually-corroborating profiles is a floor; <strong>an unmaintained profile decays.</strong>
      </p>

      <h3>4. The brand query is lost to name collisions, five distinct kinds of them</h3>
      <p>
        {RADAR.prompts.find((p) => p.id === 28)?.en} is the prompt DSP should win most easily. It has never scored
        above 1, and on {LATEST_WAVE.date} it scored 0: not one DSP-controlled property in the result set, on DSP&apos;s
        own name. On
        5 October the set ran: a differently-owned company with a near-identical name at #1, a directory profile at
        #2, an unrelated encyclopedia article at #3, a generic industry-term explainer at #4, and
        digitalservicesprogram.com at #5 &mdash; its best position yet on that phrasing, and still a 1, because no
        owned property is top three.
      </p>
      <p>Five collision classes are now measured on that single query:</p>
      <ol>
        <li>A differently-owned company with a near-identical name</li>
        <li>
          <strong>DSP = Deputy Superintendent of Police</strong>, the dominant Pakistani reading of the acronym, which
          took two of the ten slots
        </li>
        <li>Government &ldquo;digital services programme&rdquo; initiatives in other countries</li>
        <li>&ldquo;Digital service provider&rdquo; as a generic industry term</li>
        <li>DSPy and demand-side platforms in the wider technology sense</li>
      </ol>
      <p>
        A name that collides five ways is not one an engine can resolve by consensus. Disambiguation has to be
        published as content &mdash; the identifiers that are uniquely yours, stated where a machine and a human can
        both read them. <Link href="/about">DSP&apos;s own answer to that is on its about page.</Link>
      </p>

      <h3>5. The paid placement we refused is ranking</h3>
      <p>
        A Pakistani technology outlet offers a bylined &ldquo;best AI academy&rdquo; piece as a commercial placement.
        DSP refused it, on the grounds that paying for a superlative is buying a citation rather than earning one.
        On 3 October that article ranked third on{' '}
        {RADAR.prompts.find((p) => p.id === 3)?.en.replace(/\?$/, '')} &mdash; a prompt DSP scores 0 on.
      </p>
      <p>
        That is the honest cost of the refusal and it belongs in the data rather than out of it. The defensible
        position is not that paid placements fail in the short run. It is that a citation you bought is a citation
        anyone can later discover you bought.
      </p>

      <h3>6. A directory&apos;s category page gated on the service tag, not on reputation</h3>
      <p>
        Tested with a control group rather than guessed at, on 23&ndash;24 September and outside the fixed prompt
        set. On one directory&apos;s artificial-intelligence category page for Pakistan, four listed companies were
        sampled: all four had no reviews at all, and one listed AI as
        a fifth of its business behind a much larger mobile practice. DSP&apos;s listing, whose service was tagged
        &ldquo;AI Development&rdquo; rather than &ldquo;Artificial Intelligence&rdquo;, did not appear on it.
      </p>
      <p>
        The gate was the tag string, not reputation. The generalisable practice is to sample the marginal listings
        on a category page and compare their fields with yours before changing anything.
      </p>

      <h3>7. On some prompts the engine discards the country word, so a country page cannot win them</h3>
      <p>
        Measured on 11 October, inside the fixed set. {RADAR.prompts.find((p) => p.id === 7)?.en} returned nine
        results and <strong>not one Pakistani provider</strong> &mdash; the set was international course platforms,
        and the word &ldquo;Pakistan&rdquo; in the prompt had no visible effect on it.{' '}
        {RADAR.prompts.find((p) => p.id === 19)?.en} behaved the same way: nine international course roundups.
      </p>
      <p>
        This is a different failure from the directory wall and it has a different remedy. A directory query can be
        entered by being listed. A query whose geographic qualifier the engine drops cannot be won with a
        country-specific page at all, however well built, because no page of that shape is in the candidate set. The
        prompt has to be treated as a global query and competed for on the global phrasing, or left alone and the
        effort moved to a prompt where the qualifier survives. Other prompts in this set that name Pakistan or
        Islamabad do return Pakistani providers, so the qualifier is honoured on some phrasings and dropped on
        others &mdash; which is testable per prompt before any page is built for it, and was not tested before this
        one was.
      </p>

      <h3>8. On several prompts nothing is defending the result set, and DSP still is not in it</h3>
      <p>
        Finding 2 is about losing to directories and finding 7 about losing to a dropped country word. Both are
        losing to something. A third group of prompts is stranger, and it was measured across three spot-checks on
        12&ndash;14 October &mdash; every row below is in the observations table, with its #1 result, so each one can
        be re-checked.
      </p>
      <p>
        {RADAR.prompts.find((p) => p.id === 22)?.en} was led by a Salvadoran personal-finance site, which held the
        first two slots &mdash; one of them a raw <code>?p=</code> permalink &mdash; while a university sandbox
        subdomain held two more with other people&rsquo;s reposted articles.{' '}
        {RADAR.prompts.find((p) => p.id === 20)?.en} returned a single storefront in seven of nine slots.{' '}
        {RADAR.prompts.find((p) => p.id === 27)?.en} returned the same vendor help article on three different
        hostnames and the same recruitment-blog article twice.{' '}
        {RADAR.prompts.find((p) => p.id === 5)?.en} returned a <code>wp-json</code> API endpoint, and most of the
        rest of that set answered for India. The Urdu prompts have, throughout, returned two freelance gigs their own
        seller has marked &ldquo;on hold&rdquo;.
      </p>
      <p>
        <strong>DSP has a page written for four of those five questions</strong> &mdash; a blog post on vibe coding,
        the Mastery page carrying this prompt&rsquo;s exact words, the 7-part job description framework, and a
        published pricing page &mdash; and scored 0 on all four. The reading that follows is not that these result
        sets are competitive and DSP came second. Nothing is defending them. A better answer exists and is simply not
        in the candidate set, which is finding 1 arrived at from the opposite direction: the gate on these prompts is
        retrievability, not competition. It is also the reason the remaining work is corroboration rather than more
        pages &mdash; a ninth page answers a question that was already answered on a page nothing links to.
      </p>

      <h3>9. On the clearest buyer query the winning set is third-party profiles, not websites</h3>
      <p>
        Finding 2 said the buyer results are directories. {RADAR.prompts.find((p) => p.id === 26)?.en}, measured on
        15 and 16 October, is the sharpest instance of it and the one with the least ambiguity about what to do.{' '}
        <strong>Seven of the ten results are third-party profiles of companies</strong> &mdash; a Clutch profile at
        #1, a startup-directory entry, two LinkedIn company profiles, a jobs-board company page and two freelance
        marketplace gigs. <strong>Exactly one company&rsquo;s own website appears in the set at all.</strong>
      </p>
      <p>
        DSP has two pages written for that query and scored 0 on both readings. It is listed in none of those
        directories. Of the ten findings on this page this is the only one whose remedy is not a judgement call: the
        result set names the properties that win it, four of them accept a free listing, and the next wave either
        shows the listing retrieved or it does not. That is also what makes it a usable test of finding 1 &mdash; it
        is corroboration with no content work attached to it.
      </p>

      <h3>10. The retrieval layer is neither rewarding canonical hygiene nor punishing its absence</h3>
      <p>
        This one came out of publishing a whole wave rather than a fragment, and it is the most uncomfortable thing
        in the dataset. Across the 30 result sets of the {LATEST_WAVE.date} wave,{' '}
        <strong>22 carried two or more URLs resolving to the same page</strong>: a raw <code>?p=</code> permalink
        beside its own slug, <code>/amp/</code> copies, translated locale paths of one article, a paginated listing
        counted four times, capitalisation variants of one path. On four of the thirty &mdash; prompts 9, 15, 16 and
        17 &mdash; the <em>identical</em> URL came back twice in one set. On{' '}
        {RADAR.prompts.find((p) => p.id === 19)?.en} a single DataCamp article held six of the ten slots as locale
        paths, four of them titled in a language other than the one asked for. The #1 result on{' '}
        {RADAR.prompts.find((p) => p.id === 18)?.en} is a university faculty CV in PDF form whose URL contains
        literal spaces.
      </p>
      <p>
        Every one of those is a defect that a technical SEO audit of this site would flag and that this site does
        not have: one canonical per page, no duplicate paths, no locale forks, no parameter twins. The site is the
        opposite of all of it, and it is in none of the sets. <strong>So canonical hygiene is not what is being
        selected for here.</strong> It is worth doing because it is cheap and because it prevents other problems,
        but a series of waves says plainly that it is not the thing standing between this site and the candidate
        set. The limit on this finding is stated above and matters: only the #1 result is published per row, so the
        duplicate counts cannot be recomputed from the CSV. They were recorded from the ranked lists at scoring
        time.
      </p>

      <h2>How a wave is scored</h2>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table>
          <thead>
            <tr>
              <th scope="col">Score</th>
              <th scope="col">Condition</th>
            </tr>
          </thead>
          <tbody>
            {RADAR.rubric.map((r) => (
              <tr key={r.score}>
                <td>{r.score}</td>
                <td>{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
        {RADAR.method.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      <h2>All {RADAR.prompts.length} prompts</h2>
      <p>
        Fixed on {RADAR.promptsFixedOn} and never edited since &mdash; including the four now known to be read by
        engines as a different question than intended, which are kept in the set, scored anyway, and flagged below.
        Changing a prompt because it embarrasses you is exactly what would stop the series being evidence.
      </p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prompt</th>
              <th scope="col">Category</th>
              <th scope="col">Known intent drift</th>
            </tr>
          </thead>
          <tbody>
            {RADAR.prompts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.en}</td>
                <td>{p.category}</td>
                <td>{p.drift ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Recorded observations</h2>
      <p>
        Per-prompt rows were kept from 2026-10-03 onward, plus the individual observations recorded before that.
        The #1 result is included on every row, which is what makes these re-checkable rather than merely
        reportable.
      </p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">#</th>
              <th scope="col">Prompt</th>
              <th scope="col">Score</th>
              <th scope="col">#1 result</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {RADAR.observations.map((o) => (
              <tr key={`${o.promptId}-${o.date}`}>
                <td>{o.date}</td>
                <td>{o.promptId}</td>
                <td>{RADAR.prompts.find((p) => p.id === o.promptId)?.en}</td>
                <td>{o.score}</td>
                <td>{o.top}</td>
                <td>{o.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What this does and does not show</h2>
      <ul>
        {RADAR.limits.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p>
        What it can tell you is how one small company&apos;s retrievability behaved, week by week, while it did the
        on-page work everyone recommends &mdash; and which of its own actions moved the number and which did not. As
        far as we can find, no comparable dated series is published by anyone. We would rather publish it with its
        weaknesses stated than not publish it.
      </p>

      <h2>Who ran it, and what they get out of it</h2>
      <p>
        <Link href={founder.path}>{founder.name}</Link>, founder of {site.name}, an AI Employee company in
        Islamabad that builds AI Employees for businesses and teaches people to build them. So the interest is
        plain: DSP sells both, and a page demonstrating rigour about search is a page that flatters DSP.
      </p>
      <p>
        Which is the reason the prompt set was fixed before the first measurement, the scorers are not told what
        answer is wanted, the #1 results are recorded, and the strongest finding in the whole series is that a month
        of DSP&apos;s own work achieved nothing measurable. Check the method against the conclusions, and check the
        conclusions against the CSV.
      </p>
      <p className="note">
        Corrections and contradicting measurements are welcome and will be published on this page. The next wave is
        scored weekly.
      </p>
    </Guide>
  )
}
