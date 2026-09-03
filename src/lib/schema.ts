// src/lib/schema.ts — typed JSON-LD builders (blueprint §10).
// Shared/structural schema goes through these builders; pages render the
// result in a <script type="application/ld+json"> tag. Page-unique schemas
// with no second consumer (Service on the agency pages, Product on
// /agents/restaurant-ai, Person on /about, BlogPosting on posts) stay as
// typed object literals in their pages. /mastery composes its nodes into one
// @graph in src/app/mastery/schema.ts.
//
// Two flavours of builder: `*Node()` returns a bare node for use inside a
// @graph (no @context), `*Ld()` wraps one for a standalone script.
//
// There is no VideoObject builder: the rule for the /mastery embeds is a real
// title, thumbnail AND upload date per video or no node at all, and the repo
// holds no thumbnail for any of them (see V2-PROGRESS, SEO pass Step 3). If
// that changes, the builder removed in this pass is in git history.
//
// There are deliberately NO builders for live cohorts: no batches exist
// (bootcamp sunset 2026-08-30, see CLAUDE.md locked facts). The one
// CourseInstance on the site — the self-paced instance on /mastery, added on
// owner instruction 2026-09-02 — carries no startDate, endDate, location or
// seat count and must never gain them: a dated CourseInstance or Schedule
// would advertise cohorts that cannot be bought.
//
// There is deliberately NO LocalBusiness builder either. DSP's pages carry no
// local intent; a second business entity would only dilute the Organization
// node. Google's "missing streetAddress / postalCode" warning (audit
// 2026-09-03) is on the Organization's PostalAddress and is fixed there.
import { site, socials } from '@/config/site'

export type JsonLd = Record<string, unknown>

export const SCHEMA_CONTEXT = 'https://schema.org'

/** Stable @id of DSP as an entity. Every Organization mention on the site
 *  (the root layout's, the /mastery graph's) carries this id, so a parser
 *  merges them into one organisation instead of seeing two on the same page. */
export const ORGANIZATION_ID = `${site.url}/#organization`

/** The logo every Organization mention points at: public/logo.webp, the
 *  real 512×512 mark (replaced 2026-09-03; a PNG twin sits beside it). */
export const LOGO_URL = `${site.url}/logo.webp`

/** Representative image for the Organization — the evergreen 1200×630
 *  share card at public/og-card.png (replaced 2026-09-03). */
export const ORG_IMAGE_URL = `${site.url}/og-card.png`

/** A JSON-LD reference to another node in the same document. */
export const ref = (id: string): { '@id': string } => ({ '@id': id })

/** Full PostalAddress from the single source of truth in site.ts. */
export function postalAddressNode(): JsonLd {
  return {
    '@type': 'PostalAddress',
    streetAddress: site.address.streetAddress,
    addressLocality: site.address.addressLocality,
    addressRegion: site.address.addressRegion,
    postalCode: site.address.postalCode,
    addressCountry: site.address.addressCountry,
  }
}

/** Sitewide Organization node — exactly the identity fields; the root layout
 *  adds slogan/email on top via organizationLd(). */
export function organizationNode(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: LOGO_URL,
    image: ORG_IMAGE_URL,
    telephone: site.telephone,
    address: postalAddressNode(),
    parentOrganization: { '@type': 'Organization', name: site.parentCompany },
    sameAs: Object.values(socials),
  }
}

/** Sitewide Organization — rendered once, in the root layout. */
export function organizationLd(): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    ...organizationNode(),
    slogan: site.tagline,
    email: site.email,
  }
}

export type Crumb = { name: string; path: string }

/** BreadcrumbList node. Home is prepended automatically; paths are
    site-relative (e.g. '/pricing'). Pass `id` to make it referenceable. */
export function breadcrumbNode(trail: ReadonlyArray<Crumb>, id?: string): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      ...trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${site.url}${crumb.path}`,
      })),
    ],
  }
}

export function breadcrumbLd(trail: ReadonlyArray<Crumb>): JsonLd {
  return { '@context': SCHEMA_CONTEXT, ...breadcrumbNode(trail) }
}

export type Faq = { q: string; a: string }

/** FAQPage node from visible Q&A pairs — the caller must keep the array in
    sync with the FAQ rendered on the page (schema must mirror visible
    content). `extra` lets a graph add @id / about / isPartOf links. */
export function faqPageNode(faqs: ReadonlyArray<Faq>, extra: JsonLd = {}): JsonLd {
  return {
    '@type': 'FAQPage',
    ...extra,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function faqPageLd(faqs: ReadonlyArray<Faq>): JsonLd {
  return { '@context': SCHEMA_CONTEXT, ...faqPageNode(faqs) }
}
