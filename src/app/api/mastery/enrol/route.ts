import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { postAsosEvent } from '@/lib/mastery/asos'

/** Enrolment webhook. Called by ASOS (on CLOSED_WON + fee recorded), by the card checkout provider, or manually.
 *  POST { email, full_name?, source } with header  x-mastery-secret: MASTERY_ENROL_SECRET
 *  Invites the user (magic-link email) if new, then activates their profile for 12 months of support. */
export async function POST(req: Request) {
  if (req.headers.get('x-mastery-secret') !== process.env.MASTERY_ENROL_SECRET) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { email, full_name, phone, source = 'manual', fee, currency } = await req.json().catch(() => ({}))
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })
  const admin = supabaseAdmin()
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalservicesprogram.com'

  let userId: string | undefined
  const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${site}/auth/callback?next=/app` })
  if (invited?.user) userId = invited.user.id
  else if (invErr) {
    const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 })
    userId = list?.users.find((u) => u.email?.toLowerCase() === String(email).toLowerCase())?.id
    if (!userId) return NextResponse.json({ error: invErr.message }, { status: 500 })
  }
  const now = new Date(); const until = new Date(now); until.setMonth(until.getMonth() + 12)
  const { error } = await admin.from('mastery_profiles').upsert({ id: userId, email, full_name: full_name ?? null, status: 'active', source, enrolled_at: now.toISOString(), support_until: until.toISOString() })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  // Tell the CRM — unless the CRM is the one that enrolled them (it already has the paid lead).
  if (source !== 'asos') void postAsosEvent('enrolled', email, { full_name: full_name ?? null, phone: phone ?? null, source, fee: fee ?? (source === 'pkr' ? 28000 : null), currency: currency ?? 'PKR' })
  return NextResponse.json({ ok: true, user_id: userId, support_until: until.toISOString() })
}
