// src/app/sardar/seo.ts — search-facing strings for /sardar, shared by the
// page's `metadata`, the JSON-LD in ./schema.ts and the sitemap (a page.tsx
// may only export Next's reserved fields, and schema.ts must not import the
// page).
import { site } from '@/config/site'

export const SEO_TITLE = 'SARDAR — a 3D voice AI Employee you can talk to | DSP'
export const SEO_DESCRIPTION =
  'Talk to SARDAR, a voice AI Employee built on DSP Agent Hub. Watch it triage leads, draft a LinkedIn post and follow up, then learn to build your own in DSP AI Agent Mastery or get one for your business.'

export const CANONICAL = `${site.url}/sardar`
export const OG_IMAGE = '/sardar/og.png'

/** Bump when the visible page changes — feeds the sitemap `lastModified` and
 *  the WebPage node's `dateModified`. Fixed by hand, not derived from git.
 *    2026-09-24 · first publish (steps 1–6 of the SARDAR build) */
export const PAGE_LAST_MODIFIED = '2026-09-24'
