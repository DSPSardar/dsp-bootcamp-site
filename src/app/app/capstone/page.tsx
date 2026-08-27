import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'
import { requireStudent, isAdminUser } from '@/lib/mastery/auth'
import { unlockState } from '@/lib/mastery/course'
import { postAsosEvent } from '@/lib/mastery/asos'

export default async function CapstonePage() {
  const { sb, user } = await requireStudent()
  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((rows ?? []).map((r) => r.lesson_file))
  if (!unlockState(done)['M15'].complete && !(await isAdminUser(user.email))) redirect('/app')
  const { data: subs } = await sb.from('mastery_capstones').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  const latest = subs?.[0]

  async function submit(fd: FormData) {
    'use server'
    const sb = await supabaseServer(); const { data: { user } } = await sb.auth.getUser(); if (!user) return
    await sb.from('mastery_capstones').insert({ user_id: user.id, live_url: String(fd.get('live_url')), repo_url: String(fd.get('repo_url')), video_url: String(fd.get('video_url') || ''), proposal_url: String(fd.get('proposal_url') || ''), notes: String(fd.get('notes') || '') })
    if (user.email) void postAsosEvent('capstone_submitted', user.email, { live_url: String(fd.get('live_url')) })
    revalidatePath('/app/capstone')
  }

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Capstone</div>
        <h1>Your own AI solution</h1>
        <p className="md">Build, test, secure, deploy and pitch an original agent — not the café AI Employee. The DSP team reviews it; if something needs fixing you'll get specific feedback and can resubmit any time.</p>
        {latest && <p className="note">Latest submission: <b>{latest.status.replace('_', ' ')}</b>{latest.feedback ? ` — ${latest.feedback}` : ''}</p>}
      </div>
      <div className="panel">
        <h2>Submit</h2>
        <form action={submit}>
          <label>Live URL (https)</label><input name="live_url" type="url" required placeholder="https://..." />
          <label>GitHub repo</label><input name="repo_url" type="url" required placeholder="https://github.com/..." />
          <label>3-minute demo video (YouTube/Drive link)</label><input name="video_url" type="url" placeholder="https://..." />
          <label>1-page proposal (Drive/PDF link)</label><input name="proposal_url" type="url" placeholder="https://..." />
          <label>Anything the reviewer should know</label><textarea name="notes" rows={4} />
          <button className="btn btn-gold" style={{ marginTop: 16 }} type="submit">Submit capstone</button>
        </form>
      </div>
    </>
  )
}
