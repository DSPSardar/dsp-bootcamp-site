// src/app/mastery/schema.ts — the JSON-LD @graph for /mastery.
//
// One <script type="application/ld+json"> on the page carries every entity,
// and the entities point at each other by @id (JSON-LD linking) instead of
// repeating themselves: the Course's provider is *the* Organization node, its
// instructor is *the* Person node, the WebPage is part of *the* WebSite and
// authored by *the* Person.
//
// Node list (owner instruction, SEO pass Step 3, 2026-09-02; extended by the
// Tier A on-page spec, 2026-09-05):
//   Organization · WebSite · WebPage · Person · Course (+ CourseInstance,
//   Offer, Syllabus×15, EducationalOccupationalCredential) · FAQPage.
// VideoObject nodes were specified "only with a real title, thumbnail and
// upload date". The welcome video's node is GATED on exactly that: it is
// emitted only once `mastery.welcomePoster` (the thumbnail) is set — its
// title is the player's, and its upload date and length come from the Bunny
// metadata in course.json. The student-story embeds have no poster and no
// node. The page's BreadcrumbList stays in its own sitewide-convention
// script, outside this graph.
//
// Facts come from src/config/site.ts; FAQ and syllabus text come from the
// page's own copy via ./faqs.ts and ./curriculum.ts (mirrored, and checked by
// `npm run test:schema`). Nothing here may say something the visitor cannot
// read on the page; no aggregateRating / review — there is no rating data
// (Tier A spec §11: not until real reviews are visible on the page).
import { site, mastery } from '@/config/site'
import { welcomeVideoId } from '@/lib/mastery/course'
import { ORGANIZATION_ID, ORG_IMAGE_URL, PERSON_ID, SCHEMA_CONTEXT, cofounderNode, faqPageNode, organizationNode, personNode, ref, type JsonLd } from '@/lib/schema'
import { MASTERY_CURRICULUM } from './curriculum'
import { MASTERY_FAQS } from './faqs'
import { CANONICAL, COURSE_DESCRIPTION, PAGE_LAST_MODIFIED, SEO_DESCRIPTION, SEO_TITLE } from './seo'

/* ── Node ids ──────────────────────────────────────────────────────────── */
export const WEBSITE_ID = `${site.url}/#website`
export { PERSON_ID }
export const WEBPAGE_ID = `${CANONICAL}#webpage`
export const COURSE_ID = `${CANONICAL}#course`
export const INSTANCE_ID = `${CANONICAL}#instance`
export const OFFER_ID = `${CANONICAL}#offer`
export const FAQ_ID = `${CANONICAL}#faq`
export const WELCOME_VIDEO_ID = `${CANONICAL}#welcome-video`

/* ── WebSite and this WebPage ─────────────────────────────────────────── */
const website: JsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: site.name,
  url: site.url,
  publisher: ref(ORGANIZATION_ID),
}

// inLanguage lists both because the page carries an Urdu paragraph and the
// lectures it describes are Urdu–English; dateModified is the same constant
// the sitemap and the visible "Last updated" byline use.
const webpage: JsonLd = {
  '@type': 'WebPage',
  '@id': WEBPAGE_ID,
  url: CANONICAL,
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  inLanguage: ['en', 'ur'],
  dateModified: PAGE_LAST_MODIFIED,
  isPartOf: ref(WEBSITE_ID),
  about: ref(COURSE_ID),
  mainEntity: ref(COURSE_ID),
  author: ref(PERSON_ID),
  publisher: ref(ORGANIZATION_ID),
  primaryImageOfPage: ORG_IMAGE_URL,
  // Set below, once the video node's gate is known.
}

/* ── Person: the instructor ───────────────────────────────────────────── */
// The ONE Person node the whole site shares (src/lib/schema.ts personNode —
// name, title, description, portrait, credentials and sameAs all come from
// src/config/site.ts `founder`). The visible instructor section and byline
// on this page link to the same /sardar-ghaffar URL the node carries. The
// two credentials it lists are the ones /about and /sardar-ghaffar publish
// with public verification links — nothing a visitor cannot verify.
const sardar: JsonLd = personNode()

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
  alternateName: ['AI Agent Course for Beginners', 'Agentic AI Mastery Course', 'Vibe Coding with Claude Code Training'],
  courseCode: 'DSP-AIM-2026',
  // Fuller than the WebPage's meta description (GEO pass 2026-09-06); every
  // clause is on the page — the at-a-glance table (self-paced video, 30+
  // hours, 16 modules), the #build section (café ordering AI Employee,
  // multi-tenant, live URL) and the tools row.
  description: COURSE_DESCRIPTION,
  url: CANONICAL,
  image: ORG_IMAGE_URL,
  provider: ref(ORGANIZATION_ID),
  instructor: ref(PERSON_ID),
  inLanguage: ['ur', 'en'],
  educationalLevel: 'Beginner',
  // One entry per phase of the curriculum, in module order (GEO pass
  // 2026-09-06 — replaces the earlier raw topic list).
  teaches: [
    'AI Agents Architecture',
    'Claude Code and Vibe Coding',
    'Prompt Engineering and Context Engineering',
    'Model Context Protocol (MCP)',
    'Retrieval-Augmented Generation (RAG) and Agent Memory',
    'API Integration and Webhook Automation',
    'Git and GitHub Version Control',
    'Vercel Deployment and Environment Security',
    'Client Acquisition and Commercial AI Solutions',
  ],
  // Mirrors the FAQ ("Windows or Mac?", "Is $100 really all I pay?").
  coursePrerequisites: 'No prior coding required. A Windows or Mac computer and a free Claude account.',
  // Total recorded-lecture time — mastery.lectureHours is '30+'.
  timeRequired: 'PT30H',
  // Mirrors the FAQ ("Is there a certificate?"): the DSP Master certificate
  // (verifiable URL) plus the three Claude Academy badges Module 3 walks
  // through — issued by Anthropic, not by DSP.
  educationalCredentialAwarded: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'DSP Master Certificate',
      credentialCategory: 'Certificate',
      // Mirrors the FAQ: "a public verification page showing the live agent
      // you built — that is proof of work, not attendance."
      description: 'Verifiable proof-of-work certificate: its public verification page shows the live AI agent the student built and deployed.',
      recognizedBy: ref(ORGANIZATION_ID),
      url: CANONICAL,
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Claude 101 Badge',
      credentialCategory: 'Digital Badge',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Anthropic',
        url: 'https://www.anthropic.com',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Claude Code 101 Badge',
      credentialCategory: 'Digital Badge',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Anthropic',
        url: 'https://www.anthropic.com',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Introduction to Claude Cowork Badge',
      credentialCategory: 'Digital Badge',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Anthropic',
        url: 'https://www.anthropic.com',
      },
    },
  ],
  // One Syllabus per module, titled and described exactly as the visible
  // curriculum accordion (M01 … M16; the capstone is not a module).
  syllabusSections: MASTERY_CURRICULUM.map((m) => ({
    '@type': 'Syllabus',
    name: `${m.code} ${m.title}`,
    description: m.outcome,
  })),
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      '@id': INSTANCE_ID,
      courseMode: 'Online',
      // Total recorded-lecture workload — mastery.lectureHours is '30+'.
      courseWorkload: 'PT30H',
      courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Self-paced' },
      instructor: ref(PERSON_ID),
    },
  ],
  // The Offer's url is the landing page itself: /mastery/enrol is noindex,
  // so a parser following the offer must land on an indexable page.
  offers: {
    '@type': 'Offer',
    '@id': OFFER_ID,
    price: mastery.priceUsd.toFixed(2),
    priceCurrency: 'USD',
    category: 'Paid',
    availability: 'https://schema.org/InStock',
    url: CANONICAL,
  },
}

/* ── VideoObject: the welcome video — the same six-minute tour the hero
 *    button, the pricebox link and the #welcome section all point at ──── */
// Every field is a fact the page or the Bunny upload record already holds:
// name = the player's title, description = the #welcome section's copy,
// thumbnailUrl = the facade poster, uploadDate / duration = course.json's
// bunny.uploaded_at / length_sec (written by scripts/bunny-upload.mjs),
// embedUrl = the public signed-redirect route the page itself embeds.
// `null` (no node) until the poster exists — never a placeholder image.
const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${sec % 60}S`
const welcomeVideo: JsonLd | null =
  mastery.welcomePoster && welcomeVideoId?.status === 'ready' && welcomeVideoId.uploaded_at
    ? {
        '@type': 'VideoObject',
        '@id': WELCOME_VIDEO_ID,
        name: 'Welcome to DSP AI Agent Mastery',
        description:
          'A six-minute tour of the AI Employee that handles DSP\'s admissions, the content system behind 6 million views, and what the program looks like from the inside. Recorded by Sardar Ghaffar.',
        thumbnailUrl: `${site.url}${mastery.welcomePoster}`,
        uploadDate: welcomeVideoId.uploaded_at,
        ...(welcomeVideoId.length_sec ? { duration: isoDuration(welcomeVideoId.length_sec) } : {}),
        embedUrl: `${site.url}/api/video/${welcomeVideoId.guid}`,
        inLanguage: ['ur', 'en'],
        publisher: ref(ORGANIZATION_ID),
        about: ref(COURSE_ID),
      }
    : null

/* ── FAQPage: every visible Q/A, verbatim, markup-free ────────────────── */
const faq = faqPageNode(MASTERY_FAQS, { '@id': FAQ_ID })

/* ── The graph ────────────────────────────────────────────────────────── */
if (welcomeVideo) webpage.video = ref(WELCOME_VIDEO_ID)
// cofounderNode() is in the graph because the Organization's `founder` list
// references her @id and every reference must resolve (test:schema).
/* The Course entity, exported so query-shaped guide pages can emit it inline.
 * Google's AI Overviews assemble course answers from pages that DECLARE an
 * enrollable course; a guide that only carries `about: {'@id': ...#course}`
 * points at an entity defined on another URL and reads as commentary about a
 * course rather than an offer of one (diagnosed 2026-09-10: DSP ranked #3 for
 * "ai agents course in urdu" and was the only top result the AI Overview did
 * not cite). Same @id everywhere on purpose - one entity, described on several
 * pages, never a duplicate course. */
export const courseNode: JsonLd = course

export const masteryGraph: JsonLd[] = [organizationNode(), website, webpage, sardar, cofounderNode(), course, faq, ...(welcomeVideo ? [welcomeVideo] : [])]

/** What the page serialises: `JSON.stringify(masterySchema)`. */
export const masterySchema = { '@context': SCHEMA_CONTEXT, '@graph': masteryGraph }
