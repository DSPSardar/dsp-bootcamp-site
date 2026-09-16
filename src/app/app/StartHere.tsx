import course from '@/content/mastery/course.json'
import { signedEmbedUrl } from '@/lib/mastery/bunny'

type W = { file: string; title?: string; bunny?: { guid: string; status: string } }

/** "Start here" orientation video (00-W03) at the top of the student dashboard.
 *  Always shown open with the player visible. Server-only: the embed URL is signed here. */
export default function StartHere({ started }: { started: boolean }) {
  const w = (course.welcome as W[]).find((l) => l.file.startsWith('00-W03'))
  if (!w?.bunny || w.bunny.status !== 'ready') return null
  const src = signedEmbedUrl(w.bunny.guid)
  if (!src) return null
  return (
    <section className="panel" id="start-here">
      <div>
        <div className="eyebrow">Start here</div>
        <h2 style={{ margin: '6px 0 0' }}>{started ? 'How this course works' : 'Watch this first: how to do this course'} <span className="muted">· 7 min</span></h2>
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        How modules unlock, where your templates, prompts and slides are, and how to share your build. Watch it once before Module 1.
      </p>
      <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden', marginTop: 12 }}>
        <iframe
          src={src}
          title="How to do the DSP AI Agent Mastery course"
          loading="lazy"
          allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    </section>
  )
}
