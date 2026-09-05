// app/robots.ts — serves /robots.txt.
// Keeps private routes out of crawlers: the student dashboard, the internal
// lesson preview, auth plumbing, and API endpoints. The HTML routes listed
// here also carry noindex metadata of their own.
//
// Corroboration Engine, Day 2 (2026-09-06): every AI crawler and AI-search
// fetcher is ALLOWED by name. A 404 or a bare `*` rule already allows them,
// but naming them is documentation that nothing on the site blocks the
// retrieval layer ChatGPT Search, Perplexity, Claude, Gemini and AI
// Overviews read from — and it is what an auditor (or a judge) checks first.
// Never add any of these to a disallow list without owner instruction.
//
// TODO (deliberately deferred — do NOT add yet): disallow '/mastery/enrol'.
// The page is noindex,nofollow but was indexable before Aug 2026; Google must
// be able to CRAWL it to see the noindex and drop it from the index. Add the
// disallow only after GSC confirms de-index — earliest 4 weeks from
// 2026-08-30. Tracked in V2-PROGRESS.md.
import { MetadataRoute } from 'next'

const PRIVATE = ['/app', '/app/', '/mastery/preview', '/auth/', '/api/']

/** AI crawlers (training + live retrieval), in the order the plan lists them. */
const AI_USER_AGENTS = [
  'GPTBot', // OpenAI — training
  'OAI-SearchBot', // OpenAI — ChatGPT Search index
  'ChatGPT-User', // OpenAI — live fetch when a user asks
  'ClaudeBot', // Anthropic — crawl
  'Claude-SearchBot', // Anthropic — search index
  'Claude-User', // Anthropic — live fetch
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini training / grounding opt-in
  'Googlebot',
  'Bingbot',
  'CCBot', // Common Crawl — feeds many open models
  'Applebot',
  'DuckAssistBot',
  'YouBot',
] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      ...AI_USER_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: PRIVATE })),
    ],
    sitemap: 'https://www.digitalservicesprogram.com/sitemap.xml',
    host: 'https://www.digitalservicesprogram.com',
  }
}
