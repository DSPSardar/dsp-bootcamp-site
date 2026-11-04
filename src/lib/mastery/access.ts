import type { SupabaseClient } from '@supabase/supabase-js'
import { hasFullAccess } from '@/lib/mastery/course'
import { isAdminUser } from '@/lib/mastery/auth'

/** Rule (Sardar, 4 Nov 2026): once a student has been enrolled this many days, every module
 *  opens — the in-order gate only applies during their first days on the course. */
export const OPEN_ALL_AFTER_DAYS = 10

export function enrolledLongEnough(enrolledAt?: string | null, createdAt?: string | null, now = Date.now()) {
  const since = enrolledAt ?? createdAt
  if (!since) return false
  const t = new Date(since).getTime()
  return Number.isFinite(t) && now - t >= OPEN_ALL_AFTER_DAYS * 86_400_000
}

/** True when the order gate should be switched off for this user: admin, hand-opened email,
 *  or enrolled at least OPEN_ALL_AFTER_DAYS ago. */
export async function unlockAllFor(sb: SupabaseClient, user: { id: string; email?: string | null }) {
  if (hasFullAccess(user.email) || (await isAdminUser(user.email))) return true
  const { data } = await sb.from('mastery_profiles').select('enrolled_at, created_at').eq('id', user.id).maybeSingle()
  return enrolledLongEnough(data?.enrolled_at, data?.created_at)
}
