import { redirect } from 'next/navigation'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'
import { modules } from '@/lib/mastery/course'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Students — admin', robots: { index: false } }

const hhmm = (s: number) => `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`
const day = (d?: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—')

export default async function StudentsPage() {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user?.email) redirect('/app/login')
  const admin = supabaseAdmin()
  const { data: isAdmin } = await admin.from('mastery_admins').select('email').eq('email', user.email.toLowerCase()).maybeSingle()
  if (!isAdmin) redirect('/app')

  const { data: profiles } = await admin.from('mastery_profiles')
    .select('id, email, full_name, status, enrolled_at').order('enrolled_at', { ascending: false })
  const { data: views } = await admin.from('mastery_views').select('user_id, lesson_file, opens, seconds, duration, last_at')
  const { data: progress } = await admin.from('mastery_progress').select('user_id, lesson_file')

  const coreOf = new Map<string, string>()   // lesson file -> module id
  modules.forEach((m) => m.lessons.forEach((l) => coreOf.set(l.file, m.id)))
  const totalLessons = coreOf.size

  const rows = (profiles ?? []).map((p) => {
    const v = (views ?? []).filter((x) => x.user_id === p.id)
    const marked = (progress ?? []).filter((x) => x.user_id === p.id)
    const watched = v.reduce((n, x) => n + (x.seconds ?? 0), 0)
    const perModule = new Map<string, { opened: number; watched: number }>()
    v.forEach((x) => {
      const mid = coreOf.get(x.lesson_file); if (!mid) return
      const cur = perModule.get(mid) ?? { opened: 0, watched: 0 }
      perModule.set(mid, { opened: cur.opened + 1, watched: cur.watched + (x.seconds ?? 0) })
    })
    const lastAt = v.map((x) => x.last_at).sort().pop() ?? null
    return { p, opened: v.length, watched, marked: marked.length, perModule, lastAt }
  })

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Admin</div>
        <h1>Students — what they actually watched</h1>
        <p className="md">&quot;Marked&quot; is what the student ticked themselves. <b>Opened</b> and <b>watched</b> come from the video player and cannot be set by the student — use those when someone asks for a refund.</p>
      </div>

      {rows.length === 0 && <div className="panel"><p className="muted">No students yet.</p></div>}

      {rows.map(({ p, opened, watched, marked, perModule, lastAt }) => (
        <div className="panel" key={p.id}>
          <h2 style={{ marginBottom: 2 }}>{p.full_name || p.email}</h2>
          <p className="muted">{p.email} · {p.status} · enrolled {day(p.enrolled_at)} · last activity {day(lastAt)}</p>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', margin: '14px 0' }}>
            <div><div className="by" style={{ fontSize: 22 }}>{opened}/{totalLessons}</div><div className="muted" style={{ fontSize: 13 }}>lessons opened</div></div>
            <div><div className="by" style={{ fontSize: 22 }}>{hhmm(watched)}</div><div className="muted" style={{ fontSize: 13 }}>video actually watched</div></div>
            <div><div className="by" style={{ fontSize: 22 }}>{marked}</div><div className="muted" style={{ fontSize: 13 }}>marked complete (self-reported)</div></div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {modules.map((m) => {
              const d = perModule.get(m.id)
              const on = Boolean(d?.opened)
              return (
                <span key={m.id} title={d ? `${d.opened} lesson(s) opened · ${hhmm(d.watched)} watched` : 'never opened'}
                  style={{ fontFamily: 'var(--mono)', fontSize: 12, padding: '4px 8px', borderRadius: 6,
                    border: '1px solid var(--line)', background: on ? 'rgba(212,175,55,.16)' : 'transparent',
                    color: on ? 'var(--gold)' : 'var(--muted)' }}>
                  {m.id}{d ? ` ${Math.round(d.watched / 60)}m` : ''}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
