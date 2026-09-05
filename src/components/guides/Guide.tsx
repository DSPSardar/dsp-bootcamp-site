// src/components/guides/Guide.tsx — the shell every query-shaped guide uses.
//
// Corroboration Engine (2026-09-06). Answer engines quote pages that (1) put
// the query in the title, (2) open with a 40–60-word direct answer, (3) carry
// a dated byline by a named person, (4) use real tables and lists, and (5)
// end with FAQ. This component fixes that skeleton so each guide is content
// only, and emits the matching JSON-LD: Article (author → the ONE founder
// Person @id, publisher → the ONE Organization @id), FAQPage mirroring the
// visible <details> verbatim, and the sitewide BreadcrumbList convention.
// The Urdu block is real content (lang="ur", dir="rtl") for the audience the
// Urdu queries come from — never decoration. Facts about DSP come from
// src/config/site.ts; the guide's own content is the page's responsibility.
import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { WhatsAppIcon } from '@/components/home/icons'
import { founder, mastery, site, waLink } from '@/config/site'
import { ORGANIZATION_ID, PERSON_ID, SCHEMA_CONTEXT, breadcrumbLd, faqPageNode, ref, type Faq } from '@/lib/schema'
import '@/app/guides.css'

export type GuideProps = {
  /** Site-relative path, e.g. '/best-ai-courses-in-pakistan'. */
  path: string
  /** Visible H1 — should contain the query verbatim. */
  title: string
  /** Short label for the breadcrumb. */
  crumb: string
  /** One-line eyebrow above the H1, e.g. 'Guide · Updated September 2026'. */
  eyebrow: string
  /** The 40–60-word direct answer, rendered first and marked as such. */
  answer: string
  /** ISO dates. */
  published: string
  updated: string
  /** Meta description / Article description. */
  description: string
  /** Body sections. */
  children: ReactNode
  /** FAQ — rendered verbatim as <details> AND emitted as FAQPage. */
  faqs: ReadonlyArray<Faq>
  /** Urdu summary paragraph(s). */
  urdu: ReadonlyArray<string>
  /** Optional: related guides to link at the end. */
  related?: ReadonlyArray<{ path: string; title: string }>
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Guide({ path, title, crumb, eyebrow, answer, published, updated, description, children, faqs, urdu, related = [] }: GuideProps) {
  const url = `${site.url}${path}`
  const articleLd = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: published,
    dateModified: updated,
    inLanguage: ['en', 'ur'],
    author: ref(PERSON_ID),
    publisher: ref(ORGANIZATION_ID),
    image: `${site.url}/og-card.png`,
    about: [{ '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }],
  }
  const faqLd = { '@context': SCHEMA_CONTEXT, ...faqPageNode(faqs, { '@id': `${url}#faq` }) }

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: crumb, path }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="page-guide">
        <header className="hero-dark guide-hero">
          <div className="wrap">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="byline">
              By <Link href={founder.path} rel="author">{founder.name}</Link> · {founder.jobTitle}, {site.shortName} ·{' '}
              Published <time dateTime={published}>{fmt(published)}</time> · Updated <time dateTime={updated}>{fmt(updated)}</time>
            </p>
          </div>
        </header>

        <section className="guide-body">
          <div className="wrap">
            <div className="answer" id="answer">
              <p className="kicker">Short answer</p>
              <p>{answer}</p>
            </div>

            {children}

            <section className="guide-faq" id="faq" aria-labelledby="faq-h">
              <h2 id="faq-h">Frequently asked questions</h2>
              {faqs.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </section>

            <section className="guide-urdu" id="urdu" aria-label="Urdu summary">
              <p className="kicker">اردو خلاصہ</p>
              {urdu.map((p, i) => (
                <p lang="ur" dir="rtl" key={i}>{p}</p>
              ))}
            </section>

            <div className="guide-cta">
              <h2>Ready to build your first AI agent?</h2>
              <p>{mastery.name}: {mastery.modules} modules in Urdu and English, one real AI Employee from zero to a live URL, {mastery.priceDisplay} one-time, lifetime access.</p>
              <div className="hero-ctas">
                <Link className="btn btn-primary" href={mastery.url}>See the course</Link>
                <a className="btn btn-gold" href={waLink(`Hi DSP, I read "${title}".`)}><WhatsAppIcon /> Ask on WhatsApp</a>
              </div>
            </div>

            {related.length > 0 && (
              <nav className="guide-related" aria-label="Related guides">
                <h2>Related guides</h2>
                <ul>
                  {related.map((r) => (
                    <li key={r.path}><Link href={r.path}>{r.title}</Link></li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>
      </article>
    </SiteShell>
  )
}
