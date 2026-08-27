import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'
import { requireStudent, isAdminUser } from '@/lib/mastery/auth'
import { moduleFor, unlockState, lessonTitle, lessonSlug } from '@/lib/mastery/course'
import BunnyPlayer from '@/components/mastery/BunnyPlayer'
import { postAsosEvent } from '@/lib/mastery/asos'
import { badges } from '@/lib/mastery/course'

export default async function LessonPage({ params }: { params: Promise<{ moduleId: string; lesson: string }> }) {
  const { moduleId, lesson } = await params
  const foundModule = moduleFor(moduleId); if (!foundModule) notFound()
  const m = foundModule
  const moduleId_ = m.id
  const found = m.lessons.find((x) => lessonSlug(x.file) === lesson); if (!found) notFound()
  const l = found
  const lessonFile = l.file
  const { sb, user } = await requireStudent()
  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((rows ?? []).map((r) => r.lesson_file))
  if (!unlockState(done, await isAdminUser(user.email))[m.id].unlocked) redirect('/app')
  const isDone = done.has(l.file)
  const idx = m.lessons.findIndex((x) => x.file === l.file)
  const nextL = m.lessons.slice(idx + 1).find((x) => x.bunny?.status === 'ready')

  async function toggle() {
    'use server'
    const sb = await supabaseServer()
    const { data: { user } } = await sb.auth.getUser(); if (!user) return
    const { data: ex } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id).eq('lesson_file', lessonFile).maybeSingle()
    if (ex) await sb.from('mastery_progress').delete().eq('user_id', user.id).eq('lesson_file', lessonFile)
    else {
      await sb.from('mastery_progress').insert({ user_id: user.id, lesson_file: lessonFile })
      // Did this complete the module / a phase? Tell ASOS so the WhatsApp nudge can fire.
      const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
      const st = unlockState(new Set((rows ?? []).map((r) => r.lesson_file)))
      if (st[moduleId_]?.complete && user.email) {
        void postAsosEvent('module_complete', user.email, { module: moduleId_ })
        const badge = badges.find((b) => b.after === moduleId_)
        if (badge) void postAsosEvent('badge_earned', user.email, { badge: badge.name, module: moduleId_ })
      }
    }
    revalidatePath('/app', 'layout')
  }

  return (
    <>
      <div className="panel">
        <a className="muted" href={`/app/m/${m.id}`}>← {m.id} · {m.title}</a>
        <h1 style={{ marginTop: 8 }}>{lessonTitle(l.file)}</h1>
        <p className="muted">{lessonSlug(l.file)} · {l.kind} · {l.minutes} min</p>
        <div style={{ marginTop: 18 }}>
          {l.bunny?.status === 'ready' ? <BunnyPlayer videoId={l.bunny.guid} title={lessonTitle(l.file)} aspect={(l.bunny as { aspect?: number }).aspect} /> : <p className="note">This lesson is being prepared and will appear here soon.</p>}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
          <form action={toggle} className="inline"><button className={`btn ${isDone ? 'btn-ghost' : 'btn-gold'}`} type="submit">{isDone ? '✓ Marked complete — undo' : 'Mark lesson complete'}</button></form>
          {nextL && <a className="btn btn-ghost" href={`/app/m/${m.id}/${lessonSlug(nextL.file)}`}>Next: {lessonTitle(nextL.file)} →</a>}
        </div>
      </div>
    </>
  )
}
