// JSON-LD for /sardar: one @graph — WebPage · SoftwareApplication · the
// sitewide Organization and its two founder Person nodes (same @ids as the
// root layout's, so parsers merge them and every founder ref resolves) ·
// BreadcrumbList. No ratings, prices or download counts: nothing
// here that the page cannot show (owner ruling 18 Sep 2026 on sourced facts).
import { site, agency, mastery } from '@/config/site'
import { ORGANIZATION_ID, SCHEMA_CONTEXT, breadcrumbNode, cofounderNode, organizationNode, personNode, ref, type JsonLd } from '@/lib/schema'
import { CANONICAL, OG_IMAGE, PAGE_LAST_MODIFIED, SEO_DESCRIPTION, SEO_TITLE } from './seo'

const WEBPAGE_ID = `${CANONICAL}#webpage`
const APP_ID = `${CANONICAL}#app`
const BREADCRUMB_ID = `${CANONICAL}#breadcrumb`

export function sardarSchema(): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    '@graph': [
      organizationNode(),
      personNode(),
      cofounderNode(),
      {
        '@type': 'WebPage',
        '@id': WEBPAGE_ID,
        url: CANONICAL,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        inLanguage: 'en',
        dateModified: PAGE_LAST_MODIFIED,
        isPartOf: { '@type': 'WebSite', url: site.url, name: site.name },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${site.url}${OG_IMAGE}`, width: 1200, height: 630 },
        about: ref(APP_ID),
        breadcrumb: ref(BREADCRUMB_ID),
        publisher: ref(ORGANIZATION_ID),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': APP_ID,
        name: 'SARDAR',
        alternateName: 'SARDAR voice AI Employee',
        description:
          `A browser-based voice AI Employee demo by ${site.name}: a 3D avatar that answers sales questions by voice or text, ` +
          `built on ${agency.hubName} (${agency.hubProduct}) and taught step by step in ${mastery.name}.`,
        url: CANONICAL,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Conversational AI demo',
        operatingSystem: 'Web browser',
        browserRequirements: 'Requires JavaScript; WebGL for the 3D avatar, microphone optional',
        featureList: [
          'Voice conversation in English, Urdu and Roman Urdu',
          'Live transcript',
          'Scripted demo of lead triage, follow-up and content drafting',
          '3D avatar with lip-sync',
        ],
        image: `${site.url}${OG_IMAGE}`,
        isBasedOn: { '@type': 'SoftwareApplication', name: agency.hubName, url: agency.hubUrl },
        provider: ref(ORGANIZATION_ID),
        author: ref(ORGANIZATION_ID),
        inLanguage: ['en', 'ur'],
        isAccessibleForFree: true,
      },
      breadcrumbNode([{ name: 'SARDAR', path: '/sardar' }], BREADCRUMB_ID),
    ],
  }
}
