import { NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'
import { autoCompleteWatched } from '@/lib/mastery/progress'

/** Records what a student actually watched. Called when a lesson opens and every ~20s of playback.
 *  Server-side only: the student's browser can't write a higher number than it reports, and we keep
 *  the furthest position reached, so scrubbing to the end doesn't count as watching. */
export async function POST(req: Request) {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const { lesson, seconds, duration, opened } = await req.json().catch(() => ({}))
  if (typeof lesson !== 'string' || !lesson) return NextResponse.json({ error: 'lesson required' }, { status: 400 })

  const admin = supabaseAdmin()
  const { data: prev } = await admin.from('mastery_views').select('opens, seconds, duration')
    .eq('user_id', user.id).eq('lesson_file', lesson).maybeSingle()

  const sec = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0
  const row = {
    user_id: user.id,
    lesson_file: lesson,
    opens: (prev?.opens ?? 0) + (opened ? 1 : 0),
    seconds: Math.max(prev?.seconds ?? 0, sec),        // furthest point reached, never decreases
    duration: Number.isFinite(duration) && duration > 0 ? Math.floor(duration) : prev?.duration ?? null,
    last_at: new Date().toISOString(),
  }
  const { error } = await admin.from('mastery_views').upsert(row, { onConflict: 'user_id,lesson_file' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  // Crossed the threshold? Mark it complete now so the next module unlocks without a click.
  const completed = await autoCompleteWatched(user.id, user.email)
  return NextResponse.json({ ok: true, completed })
}
