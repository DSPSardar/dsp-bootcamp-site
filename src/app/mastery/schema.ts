// src/app/mastery/schema.ts — the JSON-LD @graph for /mastery.
//
// One <script type="application/ld+json"> on the page carries every entity,
// and the entities point at each other by @id (JSON-LD linking) instead of
// repeating themselves: the Course's provider is *the* Organization node, its
// instructor is *the* Person node, the WebPage is part of *the* WebSite.
//
// Node list (owner instruction, SEO pass Step 3, 2026-09-02):
//   Organization · WebSite · WebPage · Person · Course (+ CourseInstance,
//   Offer, Syllabus×15) · FAQPage.
// VideoObject nodes were specified "only with a real title, thumbnail and
// upload date" — the repo holds no thumbnail for any of the four embeds, so
// none is emitted (see the report / V2-PROGRESS). The page's BreadcrumbList
// stays in its own sitewide-convention script, outside this graph.
//
// Facts come from src/config/site.ts; FAQ and syllabus text come from the
// page's own copy via ./faqs.ts and ./curriculum.ts (mirrored, and checked by
// `npm run test:schema`). Nothing here may say something the visitor cannot
// read on the page; no aggregateRating / review — there is no rating data.
import { site, mastery } from '@/config/site'
import { ORGANIZATION_ID, SCHEMA_CONTEXT, faqPageNode, organizationNode, ref, type JsonLd } from '@/lib/schema'
import { MASTERY_CURRICULUM } from './curriculum'
import { MASTERY_FAQS } from './faqs'
import { CANONICAL, SEO_DESCRIPTION, SEO_TITLE } from './seo'

/* ── Node ids ──────────────────────────────────────────────────────────── */
export const WEBSITE_ID = `${site.url}/#website`
export const PERSON_ID = `${site.url}/#sardar-ghaffar`
export const WEBPAGE_ID = `${CANONICAL}#webpage`
export const COURSE_ID = `${CANONICAL}#course`
export const FAQ_ID = `${CANONICAL}#faq`

/* ── WebSite and this WebPage ─────────────────────────────────────────── */
const website: JsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: site.name,
  url: site.url,
  publisher: ref(ORGANIZATION_ID),
}

const webpage: JsonLd = {
  '@type': 'WebPage',
  '@id': WEBPAGE_ID,
  url: CANONICAL,
  name: SEO_TITLE,
  isPartOf: ref(WEBSITE_ID),
  about: ref(COURSE_ID),
  mainEntity: ref(COURSE_ID),
}

/* ── Person: the instructor ───────────────────────────────────────────── */
// Name and title are the owner's spec for this page and match the visible
// instructor section. NOTE: /about emits its own Person literal ("Sardar
// Abdul Ghaffar Khan", "Co-Founder & Lead Instructor") without an @id, so
// the two do not merge — align /about with PERSON_ID when that page is next
// touched.
const sardar: JsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Sardar Ghaffar',
  jobTitle: 'Founder & Lead Instructor',
  worksFor: ref(ORGANIZATION_ID),
  // The portrait rendered in the instructor section of page.tsx.
  image: `${site.url}/mastery/sardar.jpg`,
  knowsAbout: ['AI agents', 'Claude', 'Claude Code', 'prompt engineering', 'MCP'],
  description:
    '24 years of IT teaching in London, the UAE and Pakistan; Google-verified AI Agentic Trainer; Anthropic (Claude)-verified educator.',
}

/* ── Course: the product ──────────────────────────────────────────────── */
// Self-paced, so the single CourseInstance has a mode and a workload but no
// dates, location or seats — never add them (see the header of
// src/lib/schema.ts). `instructor` is set on both the Course and the
// CourseInstance on owner instruction; schema.org defines it only on
// CourseInstance, so a strict validator may note the former.
const course: JsonLd = {
  '@type': 'Course',
  '@id': COURSE_ID,
  name: mastery.name,
  description: SEO_DESCRIPTION,
  provider: ref(ORGANIZATION_ID),
  instructor: ref(PERSON_ID),
  inLanguage: ['ur', 'en'],
  educationalLevel: 'Beginner',
  teaches: [
    'what is an AI agent',
    'prompting & context engineering',
    'vibe coding with Claude Code',
    'websites',
    'Git & GitHub',
    'AI agents',
    'APIs',
    'RAG & memory',
    'MCP',
    'testing & observability',
    'security',
    'deployment',
    'multi-agent & business automation',
    'selling AI solutions',
  ],
  coursePrerequisites: 'None — no coding background needed',
  // One Syllabus per module, titled and described exactly as the visible
  // curriculum accordion (M01 … M15; the capstone is not a module).
  syllabusSections: MASTERY_CURRICULUM.map((m) => ({
    '@type': 'Syllabus',
    name: `${m.code} ${m.title}`,
    description: m.outcome,
  })),
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      // Total recorded-lecture workload — mastery.lectureHours is '30+'.
      courseWorkload: 'PT30H',
      courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Self-paced' },
      instructor: ref(PERSON_ID),
    },
  ],
  offers: {
    '@type': 'Offer',
    price: mastery.priceUsd,
    priceCurrency: 'USD',
    category: 'Paid',
    availability: 'https://schema.org/InStock',
    url: `${site.url}/mastery/enrol`,
  },
}

/* ── FAQPage: every visible Q/A, verbatim, markup-free ────────────────── */
const faq = faqPageNode(MASTERY_FAQS, { '@id': FAQ_ID })

/* ── The graph ────────────────────────────────────────────────────────── */
export const masteryGraph: JsonLd[] = [organizationNode(), website, webpage, sardar, course, faq]

/** What the page serialises: `JSON.stringify(masterySchema)`. */
export const masterySchema = { '@context': SCHEMA_CONTEXT, '@graph': masteryGraph }
