// src/lib/schema.ts — typed JSON-LD builders (blueprint §10).
// Shared/structural schema goes through these builders; pages render the
// result in a <script type="application/ld+json"> tag. Page-unique schemas
// with no second consumer (Service on the agency pages, Product on
// /agents/restaurant-ai, Person on /about, BlogPosting on posts) stay as
// typed object literals in their pages.
//
// There are deliberately NO CourseInstance or Schedule builders and none
// may be added: no live batches exist (bootcamp sunset 2026-08-30, see
// CLAUDE.md locked facts) and emitting them would advertise cohorts that
// cannot be bought.
import { site, socials, mastery } from '@/config/site'

type JsonLd = Record<string, unknown>

/** Sitewide Organization — rendered once, in the root layout. */
export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    url: site.url,
    logo: `${site.url}/logo.webp`,
    email: site.email,
    telephone: '+92-342-0580864',
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'PK' },
    sameAs: Object.values(socials),
  }
}

/** BreadcrumbList. Home is prepended automatically; paths are site-relative
    (e.g. '/pricing'). */
export function breadcrumbLd(trail: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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

/** FAQPage from visible Q&A pairs — the caller must keep the array in sync
    with the FAQ rendered on the page (schema must mirror visible content). */
export function faqPageLd(faqs: Array<{ q: string; a: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Course + Offer for DSP AI Agent Mastery — the only educational product.
    Self-paced: no hasCourseInstance, no Schedule, ever. */
export function masteryCourseLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: mastery.name,
    description: `Self-paced AI agent development program: ${mastery.modules} modules, ${mastery.lectureHours} hours of recorded lectures, lifetime access, ${mastery.supportMonths} months of group support. Taught in an Urdu–English mix with English materials.`,
    url: `${site.url}${mastery.url}`,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    inLanguage: ['en', 'ur'],
    offers: {
      '@type': 'Offer',
      price: mastery.priceUsd,
      priceCurrency: 'USD',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      url: `${site.url}${mastery.url}`,
    },
  }
}
