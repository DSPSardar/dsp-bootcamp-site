import { notFound } from 'next/navigation'
import BunnyPlayer from '@/components/mastery/BunnyPlayer'
import course from '@/content/mastery/course.json'

export const dynamic = 'force-dynamic'
export const metadata = { robots: { index: false, follow: false } }

type Lesson = { file: string; minutes: number; kind: string; bunny?: { guid: string; status: string } }

/** Internal preview of uploaded lessons. Gated by ?key=MASTERY_PREVIEW_KEY until the student dashboard exists. */
export default async function MasteryPreview({ searchParams }: { searchParams: Promise<{ key?: string; v?: string }> }) {
  const { key, v } = await searchParams
  if (!process.env.MASTERY_PREVIEW_KEY || key !== process.env.MASTERY_PREVIEW_KEY) notFound()
  const lessons = (course.modules as { id: string; title: string; lessons: Lesson[] }[]).flatMap((m) =>
    m.lessons.filter((l) => l.bunny?.status === 'ready').map((l) => ({ ...l, module: `${m.id} · ${m.title}` })),
  )
  const current = lessons.find((l) => l.bunny?.guid === v) ?? lessons[0]
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 24, fontFamily: 'system-ui', background: '#0E2A47', color: '#F5F1E6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 22 }}>Mastery — lesson preview ({lessons.length} ready)</h1>
      {current ? (
        <>
          <p style={{ opacity: 0.7 }}>{current.module} — {current.file}</p>
          <BunnyPlayer videoId={current.bunny!.guid} title={current.file} />
        </>
      ) : (
        <p>No lessons encoded yet.</p>
      )}
      <ul style={{ marginTop: 24, lineHeight: 1.9 }}>
        {lessons.map((l) => (
          <li key={l.bunny!.guid}><a style={{ color: '#E08D66' }} href={`?key=${key}&v=${l.bunny!.guid}`}>{l.module} — {l.file} ({l.minutes} min)</a></li>
        ))}
      </ul>
    </main>
  )
}
