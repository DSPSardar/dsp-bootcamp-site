import { supabaseAdmin } from '@/lib/supabase/server'
import { modules, unlockState, badges } from '@/lib/mastery/course'
import { postAsosEvent } from '@/lib/mastery/asos'

export const WATCH_THRESHOLD = 0.8

const lessonByFile = new Map(modules.flatMap((m) => m.lessons.map((l) => [l.file, { module: m.id, lesson: l }] as const)))

/** Length to measure against: the player's reported duration, else Bunny's, else the catalogue minutes. */
export function lessonLength(file: string, reported?: number | null) {
  if (reported && reported > 0) return reported
  const hit = lessonByFile.get(file)
  const bunny = hit?.lesson.bunny as { length_sec?: number } | undefined
  return bunny?.length_sec || (hit?.lesson.minutes ?? 0) * 60
}

/** Marks every lesson the student has watched past the threshold as complete, so modules
 *  unlock without a click. Idempotent; safe to call on every page load. Returns the files
 *  newly marked. Runs with the service role so it works from the view API and from pages. */
export async function autoCompleteWatched(userId: string, email?: string | null): Promise<string[]> {
  const admin = supabaseAdmin()
  const [{ data: views }, { data: prog }] = await Promise.all([
    admin.from('mastery_views').select('lesson_file, seconds, duration').eq('user_id', userId),
    admin.from('mastery_progress').select('lesson_file').eq('user_id', userId),
  ])
  const done = new Set((prog ?? []).map((r) => r.lesson_file))
  const newly = (views ?? [])
    .filter((v) => !done.has(v.lesson_file) && lessonByFile.has(v.lesson_file))
    .filter((v) => { const len = lessonLength(v.lesson_file, v.duration); return len > 0 && (v.seconds ?? 0) / len >= WATCH_THRESHOLD })
    .map((v) => v.lesson_file)
  if (newly.length === 0) return []

  const { error } = await admin.from('mastery_progress').upsert(newly.map((lesson_file) => ({ user_id: userId, lesson_file })), { onConflict: 'user_id,lesson_file', ignoreDuplicates: true })
  if (error) { console.warn('[progress] auto-complete failed', error.message); return [] }

  // Same CRM nudges the manual button fires, once per module that just completed.
  if (email) {
    const before = unlockState(done)
    newly.forEach((f) => done.add(f))
    const after = unlockState(done)
    for (const m of modules) {
      if (after[m.id].complete && !before[m.id].complete) {
        void postAsosEvent('module_complete', email, { module: m.id })
        const badge = badges.find((b) => b.after === m.id)
        if (badge) void postAsosEvent('badge_earned', email, { badge: badge.name, module: m.id })
      }
    }
  }
  return newly
}
