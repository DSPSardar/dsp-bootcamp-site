import { signedEmbedUrl } from '@/lib/mastery/bunny'

/** Server component: renders the Bunny Stream player with a short-lived signed token.
 *  Only ever render this for an authenticated student — the URL is what grants playback. */
export default function BunnyPlayer({ videoId, title }: { videoId: string; title: string }) {
  const src = signedEmbedUrl(videoId)
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', background: '#0A1730', borderRadius: 14, overflow: 'hidden' }}>
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
