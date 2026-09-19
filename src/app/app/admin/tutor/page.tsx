import { redirect } from 'next/navigation'
import { requireStudent, isAdminUser } from '@/lib/mastery/auth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { moduleFor } from '@/lib/mastery/course'

export const metadata = { title: 'Tutor activity', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

/** What students actually ask Ustad, and where it had to give up.
 *  This is the re-record list: the lessons with the most handoffs are the confusing ones. */
export default async function AdminTutorPage() {
  const { user } = await requireStudent()
  if (!(await isAdminUser(user.email))) redirect('/app')

  const admin = supabaseAdmin()
  const since = new Date(Date.now() - 30 * 864e5).toISOString()
  const [{ data: msgs }, { data: profiles }] = await Promise.all([
    admin.from('mastery_tutor_messages')
      .select('role, content, module_id, lesson_file, answered, model, input_tokens, output_tokens, created_at, user_id')
      .gte('created_at', since).order('created_at', { ascending: false }).limit(500),
    admin.from('mastery_profiles').select('id, full_name, email'),
  ])

  const rows = msgs ?? []
  const who = new Map((profiles ?? []).map((p) => [p.id, p.full_name || p.email]))
  const asked = rows.filter((r) => r.role === 'user')
  const answers = rows.filter((r) => r.role === 'assistant')
  const handoffs = answers.filter((r) => r.answered === false)

  // Rough spend: Haiku and Sonnet blended, input+output. Enough to know if the cap needs moving.
  const tokens = answers.reduce((n, r) => n + (r.input_tokens ?? 0) + (r.output_tokens ?? 0), 0)

  const byModule = new Map<string, { asked: number; stuck: number }>()
  for (const r of answers) {
    const k = r.module_id ?? '—'
    const e = byModule.get(k) ?? { asked: 0, stuck: 0 }
    e.asked++; if (r.answered === false) e.stuck++
    byModule.set(k, e)
  }
  const ranked = [...byModule.entries()].sort((a, b) => b[1].stuck - a[1].stuck || b[1].asked - a[1].asked)

  return (
    <>
      <div className="panel">
        <h1>Tutor activity</h1>
        <p className="muted" style={{ marginTop: 6 }}>Last 30 days · {asked.length} questions from {new Set(asked.map((r) => r.user_id)).size} students · {handoffs.length} sent to the weekend session · {(tokens / 1000).toFixed(0)}k tokens</p>
      </div>

      <div className="panel">
        <h2>Where students get stuck</h2>
        <p className="muted">Modules with the most handoffs are the ones worth re-recording or adding a lesson to.</p>
        <div style={{ marginTop: 14 }}>
          {ranked.map(([mid, e]) => (
            <div key={mid} className="lesson">
              <div>
                <div className="n">{mid === '—' ? 'Asked from the dashboard' : `${mid} · ${moduleFor(mid)?.title ?? ''}`}</div>
                <div className="m">{e.asked} question{e.asked === 1 ? '' : 's'}</div>
              </div>
              <span className="m">{e.stuck} handoff{e.stuck === 1 ? '' : 's'}</span>
              <span className="tick">{e.asked ? Math.round((1 - e.stuck / e.asked) * 100) : 0}% answered</span>
            </div>
          ))}
          {ranked.length === 0 && <p className="note">No questions yet.</p>}
        </div>
      </div>

      <div className="panel">
        <h2>Latest questions</h2>
        <div style={{ marginTop: 10 }}>
          {asked.slice(0, 60).map((r, i) => (
            <div key={i} className="lesson" style={{ gridTemplateColumns: '1fr auto' }}>
              <div>
                <div className="n" style={{ fontWeight: 500 }}>{r.content.slice(0, 220)}{r.content.length > 220 ? '…' : ''}</div>
                <div className="m">{who.get(r.user_id) ?? 'student'} · {r.module_id ?? 'dashboard'}{r.lesson_file ? ` · ${r.lesson_file.slice(0, 7)}` : ''}</div>
              </div>
              <span className="m">{new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            </div>
          ))}
          {asked.length === 0 && <p className="note">Nothing yet — it goes live the moment students start asking.</p>}
        </div>
      </div>
    </>
  )
}
