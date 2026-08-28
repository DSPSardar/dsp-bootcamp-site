import { NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'

/** Admin approves/rejects a PKR enrolment request. Returns credentials on approval so the admin can
 *  send them by WhatsApp — never dependent on email delivery. */
export async function POST(req: Request) {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'not signed in' }, { status: 401 })
  const admin = supabaseAdmin()
  const { data: isAdmin } = await admin.from('mastery_admins').select('email').eq('email', user.email.toLowerCase()).maybeSingle()
  if (!isAdmin) return NextResponse.json({ error: 'not an admin' }, { status: 403 })

  const { id, action, note } = await req.json().catch(() => ({}))
  const { data: r } = await admin.from('mastery_enrol_requests').select('*').eq('id', id).single()
  if (!r) return NextResponse.json({ error: 'request not found' }, { status: 404 })

  // Re-issue access for a student whose password was lost or never delivered.
  if (action === 'resend') {
    const gen = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; let x = ''; for (let i = 0; i < 12; i++) x += a[Math.floor(Math.random() * a.length)]; return x }
    const pw = gen()
    const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 })
    const u = list?.users.find((x) => x.email?.toLowerCase() === r.email.toLowerCase())
    if (!u) return NextResponse.json({ error: 'no account for that email — approve first' }, { status: 404 })
    const { error } = await admin.auth.admin.updateUserById(u.id, { password: pw, email_confirm: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, status: 'approved', email: r.email, phone: r.phone, full_name: r.full_name,
      temp_password: pw, email_sent: false, login_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.digitalservicesprogram.com'}/app/login` })
  }

  if (action === 'reject') {
    await admin.from('mastery_enrol_requests').update({ status: 'rejected', admin_note: note || null, reviewed_at: new Date().toISOString() }).eq('id', id)
    return NextResponse.json({ ok: true, status: 'rejected' })
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalservicesprogram.com'
  const res = await fetch(`${site}/api/mastery/enrol`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-mastery-secret': process.env.MASTERY_ENROL_SECRET! },
    body: JSON.stringify({ email: r.email, full_name: r.full_name, phone: r.phone, source: 'pkr', fee: 28000, currency: 'PKR' }),
  })
  const out = await res.json().catch(() => ({}))
  if (!res.ok) {
    await admin.from('mastery_enrol_requests').update({ admin_note: `enrol failed: ${out.error || res.status}` }).eq('id', id)
    return NextResponse.json({ error: out.error || `enrol API ${res.status}` }, { status: 500 })
  }
  await admin.from('mastery_enrol_requests').update({ status: 'approved', admin_note: note || (out.temp_password ? 'access created — password sent by WhatsApp' : 'access created'), reviewed_at: new Date().toISOString() }).eq('id', id)
  return NextResponse.json({ ok: true, status: 'approved', email: r.email, phone: r.phone, full_name: r.full_name, temp_password: out.temp_password, email_sent: out.email_sent, login_url: out.login_url })
}
