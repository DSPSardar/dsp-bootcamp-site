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
// There are deliberately NO builders for live cohorts: no batches exist
// (bootcamp sunset 2026-08-30, see CLAUDE.md locked facts). The one
// CourseInstance on the site — the self-paced instance on /mastery, added on
// owner instruction 2026-09-02 — carries no startDate, endDate, location or
// seat count and must never gain them: a dated CourseInstance or Schedule
// would advertise cohorts that cannot be bought.
import { site, socials } from '@/config/site'

export type JsonLd = Record<string, unknown>

export const SCHEMA_CONTEXT = 'https://schema.org'

/** Stable @id of DSP as an entity. Every Organization mention on the site
 *  (the root layout's, the /mastery graph's) carries this id, so a parser
 *  merges them into one organisation instead of seeing two on the same page. */
export const ORGANIZATION_ID = `${site.url}/#organization`

/** The logo every Organization mention points at.
 *  ⚠ public/logo.webp is currently a 1×1 placeholder (42 bytes) and
 *  src/app/favicon.ico is the framework default — the repo holds no real
 *  logo raster. Replace the file at this path with the actual mark (≥112×112,
 *  PNG/WebP/SVG) and every schema on the site picks it up. */
export const LOGO_URL = `${site.url}/logo.webp`

/** A JSON-LD reference to another node in the same document. */
export const ref = (id: string): { '@id': string } => ({ '@id': id })

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
    telephone: site.telephone,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'PK' },
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

/** Seconds → ISO 8601 duration ("PT5M51S"), the format VideoObject wants. */
export function isoDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.round(totalSeconds % 60)
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s || (!h && !m) ? `${s}S` : ''}`
}

/** VideoObject node for a public marketing embed.
 *
 *  Only emitted for videos we hold real facts about: `uploadDate` and
 *  `duration` come from the Bunny metadata in course.json (written by
 *  scripts/bunny-upload.mjs), never from a guess — a VideoObject with an
 *  invented date is worse than none. Returns null when there is no upload
 *  date; callers skip the node.
 *
 *  `embedUrl` points at /api/video/[videoId], the same signed-redirect route
 *  the on-page iframe uses. Note that robots.ts disallows /api/, so this
 *  schema describes the video for parsers but does not by itself make the
 *  video crawlable — see V2-PROGRESS notes before changing that.
 *  `publisher` is a reference to the sitewide Organization node. */
export function videoObjectNode(v: {
  id?: string
  name: string
  description: string
  guid: string
  uploadDate?: string
  durationSeconds?: number
  thumbnailUrl: string
  extra?: JsonLd
}): JsonLd | null {
  if (!v.uploadDate) return null
  return {
    '@type': 'VideoObject',
    ...(v.id ? { '@id': v.id } : {}),
    name: v.name,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    uploadDate: v.uploadDate,
    ...(v.durationSeconds ? { duration: isoDuration(v.durationSeconds) } : {}),
    embedUrl: `${site.url}/api/video/${v.guid}`,
    contentUrl: `${site.url}/api/video/${v.guid}`,
    publisher: ref(ORGANIZATION_ID),
    isFamilyFriendly: true,
    inLanguage: 'en',
    ...(v.extra ?? {}),
  }
}
