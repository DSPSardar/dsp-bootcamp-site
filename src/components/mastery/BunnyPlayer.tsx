import { signedEmbedUrl } from '@/lib/mastery/bunny'

/** Server component: renders the Bunny Stream player with a short-lived signed token.
 *  Only ever render this for an authenticated student — the URL is what grants playback. */
export default function BunnyPlayer({ videoId, title, aspect }: { videoId: string; title: string; aspect?: number | null }) {
  const src = signedEmbedUrl(videoId)
  if (!src) return null
  // Most lessons are 16:9, but a few clips from the channel are near-square. Match the source
  // shape so the player doesn't wrap them in thick black bars, and cap the width when it's tall.
  const ratio = aspect && aspect > 0.2 && aspect < 4 ? aspect : 16 / 9
  const pad = `${(100 / ratio).toFixed(3)}%`
  const maxW = ratio < 1.4 ? `${Math.round(ratio * 560)}px` : undefined
  return (
    <div style={{ position: 'relative', paddingTop: pad, maxWidth: maxW, margin: maxW ? '0 auto' : undefined, background: '#0A1730', borderRadius: 14, overflow: 'hidden' }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
