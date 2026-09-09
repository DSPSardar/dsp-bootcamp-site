import { NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'

/** Admin suspends or restores a student's dashboard access.
 *  Suspending only flips mastery_profiles.status — the account, its progress and its
 *  watch history are all left intact, so reactivating puts the student back exactly
 *  where they were. /app/layout.tsx redirects anyone whose status is not 'active',
 *  so this takes effect on their next page load.
 *
 *  Use it for duplicate seats (one student who enrolled twice under two emails) and
 *  for refunds. It is not a delete — nothing here removes data. */
export async function POST(req: Request) {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const admin = supabaseAdmin()
  const { data: isAdmin } = await admin.from('mastery_admins').select('email').eq('email', user.email.toLowerCase()).maybeSingle()
  if (!isAdmin) return NextResponse.json({ error: 'not an admin' }, { status: 403 })

  const { userId, action } = await req.json().catch(() => ({}))
  if (action !== 'suspend' && action !== 'reactivate') return NextResponse.json({ error: 'unknown action' }, { status: 400 })

  const { data: profile } = await admin.from('mastery_profiles').select('id, email, status').eq('id', userId).maybeSingle()
  if (!profile) return NextResponse.json({ error: 'student not found' }, { status: 404 })

  // Never let an admin be suspended — that includes locking yourself out of this page.
  if (action === 'suspend') {
    const { data: targetIsAdmin } = await admin.from('mastery_admins').select('email').eq('email', profile.email.toLowerCase()).maybeSingle()
    if (targetIsAdmin) return NextResponse.json({ error: 'that account is an admin — suspend it from Supabase if you really mean to' }, { status: 400 })
  }

  const status = action === 'suspend' ? 'suspended' : 'active'
  const { error } = await admin.from('mastery_profiles').update({ status }).eq('id', profile.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true, status, email: profile.email })
}
