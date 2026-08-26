import { supabaseServer } from '@/lib/supabase/server'
import { requireStudent } from '@/lib/mastery/auth'
import { modules, unlockState, badges, courseMeta } from '@/lib/mastery/course'

export default async function Dashboard() {
  const { sb, user } = await requireStudent()
  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((rows ?? []).map((r) => r.lesson_file))
  const state = unlockState(done)
  const total = modules.reduce((n, m) => n + state[m.id].total, 0)
  const doneN = modules.reduce((n, m) => n + state[m.id].doneCount, 0)
  const next = modules.find((m) => state[m.id].unlocked && !state[m.id].complete) ?? null
  const earned = badges.filter((b) => state[b.after].complete)

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Your journey</div>
        <h1>{doneN === 0 ? 'Start with Module 1, Lesson 1.' : next ? `Next up: ${next.id} · ${next.title}` : 'All modules complete — go build your capstone.'}</h1>
        <div className="progress"><i style={{ width: `${total ? Math.round((doneN / total) * 100) : 0}%` }} /></div>
        <p className="muted">{doneN} of {total} core lessons complete. {courseMeta.formula}</p>
        {next && <a className="btn btn-gold" style={{ marginTop: 16 }} href={`/app/m/${next.id}`}>Open {next.id}</a>}
        {earned.length > 0 && <div style={{ marginTop: 18 }}>{earned.map((b) => <span className="badge" key={b.name}>{b.name}</span>)}</div>}
      </div>
      <div className="panel">
        <h2>How this works</h2>
        <p className="md">Watch the lessons. Build the project — every module has a template and copy-paste prompts in its downloads. Share a screenshot in the DSP group. Mark each lesson complete and the next module opens. No tests. No grades. One build at a time.</p>
      </div>
    </>
  )
}
