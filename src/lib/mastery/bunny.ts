import { createHash } from 'node:crypto'
import { welcomeVideoId } from '@/lib/mastery/course'

const LIB = process.env.BUNNY_STREAM_LIBRARY_ID
const TOKEN_KEY = process.env.BUNNY_STREAM_TOKEN_KEY

/** Whether the Bunny env vars are present — pages hide players when not
 *  (e.g. a build without secrets). Server-only. */
export const bunnyConfigured = Boolean(LIB && TOKEN_KEY)

/** Site-relative embed path of the public welcome video, or null when it is
 *  not ready or Bunny is not configured — the landing page hides the player
 *  in that case. */
export const welcomeEmbedPath =
  welcomeVideoId?.status === 'ready' && bunnyConfigured ? `/api/video/${welcomeVideoId.guid}` : null

/** Signed embed URL for Bunny Stream with "Embed view token authentication" enabled.
 *  token = SHA256(token_key + video_id + expires) — valid for `ttlSeconds`. Server-only:
 *  TOKEN_KEY must never reach the client, so only server components and route
 *  handlers may import this module. */
export function signedEmbedUrl(
  videoId: string,
  ttlSeconds = 6 * 60 * 60,
  opts: { preload?: boolean } = {}
): string | null {
  if (!LIB || !TOKEN_KEY) return null // env not configured (e.g. build without secrets) — callers hide the player
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds
  const token = createHash('sha256').update(TOKEN_KEY + videoId + expires).digest('hex')
  // `preload` defaults to true for lesson players (students expect instant
  // start); the public marketing embeds pass false so a landing-page visit
  // fetches no video data until play. Never autoplay.
  const q = new URLSearchParams({
    token,
    expires: String(expires),
    autoplay: 'false',
    preload: String(opts.preload ?? true),
    responsive: 'true',
  })
  return `https://iframe.mediadelivery.net/embed/${LIB}/${videoId}?${q}`
}

/** The only videos /api/video may sign for anonymous visitors: the public
 *  marketing embeds on /mastery. Everything else (lesson videos) is signed
 *  per-request inside the authenticated /app pages and must NOT be added
 *  here — this allowlist is what stops the route from becoming an open
 *  signing oracle for the paid course content.
 *  Keep in sync with the GUIDs used in src/app/mastery/page.tsx. */
const PUBLIC_EMBED_GUIDS = new Set(
  [
    welcomeVideoId?.status === 'ready' ? welcomeVideoId.guid : null,
    '7e642dff-ebb7-48a5-9da5-e94190716a56', // student story — Mohsin, UK
    '2c5ac1cf-9643-4265-9c0a-72af532a84a9', // student story — Pakistan
    'e50847ea-7fa4-4e26-ae72-1273fec6ae33', // student story — Agentic Master Class
    '629c74ef-9842-4102-bd70-50c6b9a17137', // Anthropic badges — Mirza Talha Hussain
  ].filter((g): g is string => Boolean(g))
)

export function isPublicEmbed(videoId: string): boolean {
  return PUBLIC_EMBED_GUIDS.has(videoId)
}
