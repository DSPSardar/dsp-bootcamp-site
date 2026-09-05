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
import { ORGANIZATION_ID, ORG_IMAGE_URL, SCHEMA_CONTEXT, faqPageNode, organizationNode, ref, type JsonLd } from '@/lib/schema'
import { MASTERY_CURRICULUM } from './curriculum'
import { MASTERY_FAQS } from './faqs'
import { CANONICAL, PAGE_LAST_MODIFIED, SEO_DESCRIPTION, SEO_TITLE } from './seo'

/* ── Node ids ──────────────────────────────────────────────────────────── */
export const WEBSITE_ID = `${site.url}/#website`
export const PERSON_ID = `${site.url}/#sardar-ghaffar`
export const WEBPAGE_ID = `${CANONICAL}#webpage`
export const COURSE_ID = `${CANONICAL}#course`
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
// Name and title are the owner's spec for this page and match the visible
// instructor section; `url` is the byline link. The two credentials are the
// ones /about publishes with public verification links — nothing is listed
// here that a visitor cannot verify there. NOTE: /about emits its own Person
// literal ("Sardar Abdul Ghaffar Khan", "Co-Founder & Lead Instructor")
// without an @id, so the two do not merge — align /about with PERSON_ID
// when that page is next touched.
const sardar: JsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Sardar Ghaffar',
  jobTitle: 'Founder & Lead Instructor',
  url: `${site.url}/about`,
  worksFor: ref(ORGANIZATION_ID),
  // The portrait rendered in the instructor section of page.tsx.
  image: `${site.url}/mastery/sardar.jpg`,
  knowsAbout: ['AI agents', 'Claude', 'Claude Code', 'prompt engineering', 'context engineering', 'MCP', 'RAG', 'business automation'],
  description:
    '24 years of IT teaching in London, the UAE and Pakistan; Google-verified AI Agentic Trainer; Anthropic (Claude)-verified educator.',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Gemini Certified Educator (Google for Education, valid 2025–2028)',
      url: 'https://www.credential.net/aae3459a-b0b9-463e-86cd-da7806e00e5d',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google/Kaggle AI Agents Intensive — Vibe Coding Course certification (2026)',
      url: 'https://www.kaggle.com/certification/badges/abdulghaffarkhan804/108',
    },
  ],
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
  url: CANONICAL,
  image: ORG_IMAGE_URL,
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
  // Mirrors the FAQ ("Windows or Mac?", "Is $100 really all I pay?").
  coursePrerequisites: 'No coding background required. A Windows or Mac computer and a free Claude account.',
  // Total recorded-lecture time — mastery.lectureHours is '30+'.
  timeRequired: 'PT30H',
  educationalCredentialAwarded: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'DSP AI Agent Master certificate (verifiable URL)',
      credentialCategory: 'certificate',
    },
  ],
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
export const masteryGraph: JsonLd[] = [organizationNode(), website, webpage, sardar, course, faq, ...(welcomeVideo ? [welcomeVideo] : [])]

/** What the page serialises: `JSON.stringify(masterySchema)`. */
export const masterySchema = { '@context': SCHEMA_CONTEXT, '@graph': masteryGraph }
