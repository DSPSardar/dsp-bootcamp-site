import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { postAsosEvent } from '@/lib/mastery/asos'

/** Enrolment API. Called by the admin approval screen, ASOS (on CLOSED_WON), or manually.
 *  POST { email, full_name?, phone?, source, fee?, currency? } with header x-mastery-secret.
 *
 *  Design rule: creating the account must NEVER depend on an email being delivered.
 *  1. Ensure the auth user exists (create with a generated password if new).
 *  2. Activate the profile for 12 months of support.
 *  3. Try to send a sign-in email; if the mailer refuses (rate limit etc.) that's fine —
 *     the caller gets the temporary password to pass on via WhatsApp. */
const genPassword = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < 12; i++) s += a[Math.floor(Math.random() * a.length)]; return s }

export async function POST(req: Request) {
  if (req.headers.get('x-mastery-secret') !== process.env.MASTERY_ENROL_SECRET) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const email = String(body.email || '').trim().toLowerCase()
  const { full_name, phone, source = 'manual', fee, currency } = body
  if (!email || !email.includes('@')) return NextResponse.json({ error: 'valid email required' }, { status: 400 })

  const admin = supabaseAdmin()
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalservicesprogram.com'

  // 1) find or create the auth user — no email involved
  let userId: string | undefined
  let tempPassword: string | null = null
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const existing = list?.users.find((u) => u.email?.toLowerCase() === email)
  if (existing) userId = existing.id
  else {
    tempPassword = genPassword()
    const { data: created, error } = await admin.auth.admin.createUser({ email, password: tempPassword, email_confirm: true, user_metadata: { full_name: full_name ?? null } })
    if (error || !created.user) return NextResponse.json({ error: error?.message || 'could not create user' }, { status: 500 })
    userId = created.user.id
  }

  // 2) activate the profile
  const now = new Date(); const until = new Date(now); until.setMonth(until.getMonth() + 12)
  const { error: pErr } = await admin.from('mastery_profiles').upsert({ id: userId, email, full_name: full_name ?? null, status: 'active', source, enrolled_at: now.toISOString(), support_until: until.toISOString() })
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 })

  // 3) best-effort sign-in email (may be rate-limited — never fails the enrolment)
  let emailSent = false
  try {
    const { error } = await admin.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: `${site}/auth/confirm` } })
    if (!error) {
      const { error: sendErr } = await admin.auth.signInWithOtp({ email, options: { emailRedirectTo: `${site}/auth/confirm` } })
      emailSent = !sendErr
    }
  } catch { /* ignore */ }

  if (source !== 'asos') void postAsosEvent('enrolled', email, { full_name: full_name ?? null, phone: phone ?? null, source, fee: fee ?? (source === 'pkr' ? 28000 : null), currency: currency ?? 'PKR' })

  return NextResponse.json({ ok: true, user_id: userId, support_until: until.toISOString(), email_sent: emailSent, temp_password: tempPassword, login_url: `${site}/app/login` })
}
