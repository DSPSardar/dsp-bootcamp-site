import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Enrolments — admin', robots: { index: false } }

type Req = { id: string; full_name: string; email: string; phone: string | null; country: string | null; amount_note: string | null; proof_path: string | null; status: string; created_at: string; admin_note: string | null }

async function requireAdmin() {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user?.email) redirect('/app/login')
  const { data } = await supabaseAdmin().from('mastery_admins').select('email').eq('email', user.email.toLowerCase()).maybeSingle()
  if (!data) redirect('/app')
  return user.email
}

export default async function AdminPage() {
  await requireAdmin()
  const admin = supabaseAdmin()
  const { data } = await admin.from('mastery_enrol_requests').select('*').order('created_at', { ascending: false }).limit(100)
  const rows = (data ?? []) as Req[]
  const signed = await Promise.all(rows.map(async (r) => (r.proof_path ? (await admin.storage.from('mastery-proofs').createSignedUrl(r.proof_path, 3600)).data?.signedUrl ?? null : null)))

  async function decide(fd: FormData) {
    'use server'
    await requireAdmin()
    const id = String(fd.get('id')); const action = String(fd.get('action')); const note = String(fd.get('admin_note') || '')
    const admin = supabaseAdmin()
    const { data: r } = await admin.from('mastery_enrol_requests').select('*').eq('id', id).single()
    if (!r) return
    if (action === 'approve') {
      const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalservicesprogram.com'
      const res = await fetch(`${site}/api/mastery/enrol`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-mastery-secret': process.env.MASTERY_ENROL_SECRET! },
        body: JSON.stringify({ email: r.email, full_name: r.full_name, phone: r.phone, source: 'pkr', fee: 28000, currency: 'PKR' }),
      })
      if (!res.ok) { await admin.from('mastery_enrol_requests').update({ admin_note: `enrol API failed: ${res.status}` }).eq('id', id); revalidatePath('/app/admin'); return }
    }
    await admin.from('mastery_enrol_requests').update({ status: action === 'approve' ? 'approved' : 'rejected', admin_note: note || null, reviewed_at: new Date().toISOString() }).eq('id', id)
    revalidatePath('/app/admin')
  }

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Admin</div>
        <h1>Enrolment requests</h1>
        <p className="muted">Approving sends the student a sign-in email and starts their 12 months of support.</p>
      </div>
      {rows.length === 0 && <div className="panel"><p className="muted">No requests yet.</p></div>}
      {rows.map((r, i) => (
        <div className="panel" key={r.id}>
          <h2 style={{ marginBottom: 4 }}>{r.full_name} <span className="muted" style={{ fontSize: 14 }}>· {r.status}</span></h2>
          <p className="muted">{r.email}{r.phone ? ` · ${r.phone}` : ''}{r.country ? ` · ${r.country}` : ''} · {new Date(r.created_at).toLocaleString('en-GB')}</p>
          {r.amount_note && <p className="md">Says: {r.amount_note}</p>}
          {signed[i] && <p><a className="btn btn-ghost btn-sm" href={signed[i]!} target="_blank" rel="noreferrer">View payment proof</a></p>}
          {r.admin_note && <p className="note">{r.admin_note}</p>}
          {r.status === 'pending' && (
            <form action={decide} style={{ marginTop: 12 }}>
              <input type="hidden" name="id" value={r.id} />
              <label htmlFor={`n${r.id}`}>Note (optional)</label>
              <input id={`n${r.id}`} name="admin_note" placeholder="e.g. paid via JazzCash, verified" />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="btn btn-gold" name="action" value="approve" type="submit">Approve &amp; send access</button>
                <button className="btn btn-ghost" name="action" value="reject" type="submit">Reject</button>
              </div>
            </form>
          )}
        </div>
      ))}
    </>
  )
}
