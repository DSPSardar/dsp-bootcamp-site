// JSON-LD for /sardar: one @graph — WebPage · SoftwareApplication · the
// sitewide Organization and its two founder Person nodes (same @ids as the
// root layout's, so parsers merge them and every founder ref resolves) ·
// BreadcrumbList. No ratings and no download counts: nothing here that the
// page cannot show (owner ruling 18 Sep 2026 on sourced facts).
// 25 Sep: + Service (the paid build behind the free demo — provider merged
// into the sitewide Organization @id, areaServed Islamabad/Pakistan/Worldwide)
// and FAQPage. The Offer's prices are the published /pricing figures and are
// printed in the visible ANSWER on the page, so the same rule still holds.
import { site, agency } from '@/config/site'
import { ORGANIZATION_ID, SCHEMA_CONTEXT, breadcrumbNode, cofounderNode, faqPageNode, organizationNode, personNode, ref, type JsonLd } from '@/lib/schema'
import { SARDAR_FAQS } from './faq'
import { ANSWER, CANONICAL, OG_IMAGE, PAGE_LAST_MODIFIED, SEO_TITLE } from './seo'

const WEBPAGE_ID = `${CANONICAL}#webpage`
const APP_ID = `${CANONICAL}#app`
const SERVICE_ID = `${CANONICAL}#service`
const FAQ_ID = `${CANONICAL}#faq`
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
        description: ANSWER,
        inLanguage: 'en',
        dateModified: PAGE_LAST_MODIFIED,
        isPartOf: { '@type': 'WebSite', url: site.url, name: site.name },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${site.url}${OG_IMAGE}`, width: 1200, height: 630 },
        about: [ref(APP_ID), ref(SERVICE_ID)],
        mainEntity: ref(FAQ_ID),
        breadcrumb: ref(BREADCRUMB_ID),
        publisher: ref(ORGANIZATION_ID),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': APP_ID,
        name: 'SARDAR',
        alternateName: 'SARDAR voice AI Employee',
        description: ANSWER,
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
      // The commercial side of the same page: the demo above is free, the
      // build is the service. provider carries the sitewide Organization @id
      // so parsers merge it instead of seeing a second company, and
      // areaServed names the geography the buyer queries name (the page had
      // none before). Prices are the published ones from /pricing.
      {
        '@type': 'Service',
        '@id': SERVICE_ID,
        serviceType: 'Voice AI Employee (AI receptionist and phone/WhatsApp agent) build, deployment and supervision',
        name: 'DSP voice AI Employees',
        description: ANSWER,
        url: CANONICAL,
        provider: ref(ORGANIZATION_ID),
        areaServed: [
          { '@type': 'City', name: 'Islamabad' },
          { '@type': 'Country', name: 'Pakistan' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        availableLanguage: ['en', 'ur'],
        isRelatedTo: ref(APP_ID),
        offers: {
          '@type': 'Offer',
          name: 'Voice AI Employee packages',
          description: 'Setup from $500 one-time, then from $199/month. Cancel anytime.',
          price: agency.pricing.tiers[0].monthlyUsd,
          priceCurrency: 'USD',
          url: `${site.url}/pricing`,
        },
      },
      // Mirrors the <details> list at the foot of the page, word for word.
      faqPageNode(SARDAR_FAQS, { '@id': FAQ_ID, inLanguage: 'en', about: ref(SERVICE_ID), isPartOf: ref(WEBPAGE_ID) }),
      breadcrumbNode([{ name: 'SARDAR', path: '/sardar' }], BREADCRUMB_ID),
    ],
  }
}
