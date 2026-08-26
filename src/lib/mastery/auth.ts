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
