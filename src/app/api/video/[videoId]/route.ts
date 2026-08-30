import { NextResponse } from 'next/server'
import { isPublicEmbed, signedEmbedUrl } from '@/lib/mastery/bunny'

// Per-request signing for the PUBLIC marketing embeds on /mastery.
// The page is statically cached, so it can't bake fresh tokens itself;
// its iframes point here instead, and each request 307s to a short-lived
// signed mediadelivery URL. The signing key stays server-side (bunny.ts).
// Only allowlisted GUIDs are signed — lesson videos are signed inside the
// authenticated /app pages and must never be signable from this route.
export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params
  if (!isPublicEmbed(videoId)) return new NextResponse('Not found', { status: 404 })
  const url = signedEmbedUrl(videoId)
  if (!url) return new NextResponse('Video service not configured', { status: 503 })
  return NextResponse.redirect(url, {
    status: 307,
    headers: { 'Cache-Control': 'private, no-store' },
  })
}
