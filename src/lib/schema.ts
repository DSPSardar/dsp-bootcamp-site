// src/lib/schema.ts — typed JSON-LD builders (blueprint §10).
// Shared/structural schema goes through these builders; pages render the
// result in a <script type="application/ld+json"> tag. Page-unique schemas
// with no second consumer (Service on the agency pages, Product on
// /agents/restaurant-ai, BlogPosting on posts) stay as typed object literals
// in their pages. /mastery composes its nodes into one @graph in
// src/app/mastery/schema.ts. The founder and co-founder are NOT page-unique:
// personNode() / cofounderNode() below are the only Person nodes on the site
// (Entity Lock, 2026-09-06) and every page references them by @id.
//
// Two flavours of builder: `*Node()` returns a bare node for use inside a
// @graph (no @context), `*Ld()` wraps one for a standalone script.
//
// There is no VideoObject builder: the rule for the /mastery embeds is a real
// title, thumbnail AND upload date per video or no node at all. The one
// video that meets it once a poster exists — the welcome tour — is built as
// a gated node in src/app/mastery/schema.ts (emitted only while
// mastery.welcomePoster is set); the student-story embeds have no poster
// and no node.
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
import { cofounder, entity, founder, site, socials } from '@/config/site'

export type JsonLd = Record<string, unknown>

export const SCHEMA_CONTEXT = 'https://schema.org'

/** Stable @id of DSP as an entity. Every Organization mention on the site
 *  (the root layout's, the /mastery graph's) carries this id, so a parser
 *  merges them into one organisation instead of seeing two on the same page. */
export const ORGANIZATION_ID = `${site.url}/#organization`

/** Stable @id of the founder. Every Person mention of him — the root layout,
 *  /about, /sardar-ghaffar, the /mastery graph, every BlogPosting author —
 *  carries this id, so parsers see ONE person, not a different one per page
 *  (Entity Lock, 2026-09-06; before it /about and /mastery emitted two
 *  unlinked Person literals under two different names). */
export const PERSON_ID = `${site.url}/#sardar-ghaffar`

/** Stable @id of the co-founder. */
export const COFOUNDER_ID = `${site.url}/#sundus-khan`

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

/** Sitewide Organization node — the identity fields plus the entity facts
 *  from site.ts (`entity`): legal name, the disambiguating description,
 *  founder, languages, areas served. `foundingDate` is emitted only when the
 *  owner has set it. The root layout adds slogan/email via entityGraphLd(). */
// Typed as both: DSP is an Organization (the agency) and an
// EducationalOrganization (the Course provider) — one node, two types, so
// Course rich results and GEO parsers both recognise it (GEO pass
// 2026-09-06). Every page reuses this builder, so the pair is sitewide.
export function organizationNode(): JsonLd {
  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: [site.shortName, entity.legalName],
    legalName: entity.legalName,
    description: entity.description,
    url: site.url,
    logo: LOGO_URL,
    image: ORG_IMAGE_URL,
    telephone: site.telephone,
    email: site.email,
    address: postalAddressNode(),
    ...(entity.foundingDate ? { foundingDate: entity.foundingDate } : {}),
    numberOfStudents: entity.studentsEnrolled,
    founder: [ref(PERSON_ID), ref(COFOUNDER_ID)],
    knowsLanguage: [...entity.knowsLanguage],
    areaServed: [...entity.areaServed],
    parentOrganization: { '@type': 'Organization', name: site.parentCompany },
    sameAs: Object.values(socials),
  }
}

/** The founder as ONE Person node. `extra` lets a page add page-specific
 *  fields (the /mastery graph adds nothing it cannot show; /sardar-ghaffar
 *  adds mainEntityOfPage). Name, title, description, image, credentials and
 *  sameAs all come from site.ts so every mention is identical. */
export function personNode(extra: JsonLd = {}): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: founder.name,
    alternateName: [founder.alternateName, ...founder.alsoKnownAs],
    jobTitle: founder.jobTitle,
    description: founder.description,
    url: `${site.url}${founder.path}`,
    image: `${site.url}${founder.image}`,
    worksFor: ref(ORGANIZATION_ID),
    knowsAbout: [...founder.knowsAbout],
    knowsLanguage: [...entity.knowsLanguage],
    hasCredential: founder.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      url: c.url,
    })),
    sameAs: [founder.linkedin, founder.udemy, socials.youtube, socials.github, ...founder.credentials.map((c) => c.url)],
    ...extra,
  }
}

/** The co-founder as one Person node (first name + surname only, no photo —
 *  owner ruling Aug 2026 on the leadership card). */
export function cofounderNode(): JsonLd {
  return {
    '@type': 'Person',
    '@id': COFOUNDER_ID,
    name: cofounder.name,
    jobTitle: cofounder.jobTitle,
    description: cofounder.description,
    url: `${site.url}/about`,
    worksFor: ref(ORGANIZATION_ID),
    knowsAbout: ['AI agents', 'AI training', 'Curriculum design', 'Psychology', 'Learner engagement'],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Certified AI Trainer' },
      { '@type': 'EducationalOccupationalCredential', name: 'Gold Medallist, Psychology' },
    ],
  }
}

/** Sitewide Organization — kept for callers that want a single node. */
export function organizationLd(): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    ...organizationNode(),
    slogan: site.tagline,
  }
}

/** The sitewide entity graph rendered once, in the root layout: the
 *  Organization, its founder and co-founder, linked by @id. Pages that emit
 *  their own graph (/mastery) reuse the same nodes via organizationNode() /
 *  personNode(), so a parser merges everything into one entity set. */
export function entityGraphLd(): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    '@graph': [{ ...organizationNode(), slogan: site.tagline }, personNode(), cofounderNode()],
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
