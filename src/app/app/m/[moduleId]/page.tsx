import { notFound, redirect } from 'next/navigation'
import { requireStudent, isAdminUser } from '@/lib/mastery/auth'
import { moduleFor, unlockState, lessonTitle, lessonSlug } from '@/lib/mastery/course'

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const m = moduleFor(moduleId); if (!m) notFound()
  const { sb, user } = await requireStudent()
  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((rows ?? []).map((r) => r.lesson_file))
  const s = unlockState(done, await isAdminUser(user.email))[m.id]
  if (!s.unlocked) redirect('/app')

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Phase {m.phase} · {m.phase_name}</div>
        <h1>{m.id} · {m.title}</h1>
        <p className="md" style={{ marginTop: 8 }}><b>Outcome:</b> {m.outcome}</p>
        <div className="progress"><i style={{ width: `${s.total ? Math.round((s.doneCount / s.total) * 100) : 0}%` }} /></div>
        <p className="muted">{s.doneCount}/{s.total} core lessons complete</p>
      </div>
      <div className="panel">
        <h2>Lessons</h2>
        {m.lessons.map((l) => {
          const ready = l.bunny?.status === 'ready'
          return (
            <div className="lesson" key={l.file}>
              <div><div className="k">{lessonSlug(l.file)} · {l.kind}</div><div className="n"><a href={`/app/m/${m.id}/${lessonSlug(l.file)}`}>{lessonTitle(l.file)}</a>{!ready && <span className="muted"> — video coming soon</span>}</div></div>
              <span className="m">{l.minutes} min</span>
              <span className="tick">{done.has(l.file) ? '✓ done' : ''}</span>
            </div>
          )
        })}
      </div>
      <div className="panel">
        <h2>Build project</h2>
        <p className="md">{m.build_project}</p>
        <p className="note">Share a screenshot or link in the DSP group when it works. Then mark the lessons complete — the next module opens automatically.</p>
      </div>
      <div className="panel">
        <h2>Downloads</h2>
        <div className="dl">
          {(m.vault_files ?? []).map((f) => <a key={f} href={`/app/m/${m.id}/doc?f=${encodeURIComponent(f)}`}>{f.replace(/\.md$/, '').replace(/-/g, ' ')}</a>)}
        </div>
      </div>
    </>
  )
}
