import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

/** Every /app page except /app/login must have a signed-in user.
 *  Without this guard the page throws (500) instead of sending them to sign in. */
export async function requireStudent() {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/app/login')
  return { sb, user }
}

/** True when this email is in mastery_admins. Admins can open any module without completing the previous one. */
export async function isAdminUser(email?: string | null): Promise<boolean> {
  if (!email) return false
  const { supabaseAdmin } = await import('@/lib/supabase/server')
  const { data } = await supabaseAdmin().from('mastery_admins').select('email').eq('email', email.toLowerCase()).maybeSingle()
  return Boolean(data)
}
