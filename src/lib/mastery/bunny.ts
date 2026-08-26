import { createHash } from 'node:crypto'

const LIB = process.env.BUNNY_STREAM_LIBRARY_ID
const TOKEN_KEY = process.env.BUNNY_STREAM_TOKEN_KEY

/** Signed embed URL for Bunny Stream with "Embed view token authentication" enabled.
 *  token = SHA256(token_key + video_id + expires) — valid for `ttlSeconds`. Server-only. */
export function signedEmbedUrl(videoId: string, ttlSeconds = 6 * 60 * 60): string | null {
  if (!LIB || !TOKEN_KEY) return null // env not configured (e.g. build without secrets) — callers hide the player
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds
  const token = createHash('sha256').update(TOKEN_KEY + videoId + expires).digest('hex')
  const q = new URLSearchParams({ token, expires: String(expires), autoplay: 'false', preload: 'true', responsive: 'true' })
  return `https://iframe.mediadelivery.net/embed/${LIB}/${videoId}?${q}`
}
