import { redirect } from 'next/navigation'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'
import DecideButtons from './DecideButtons'
import StudentSearch from './students/StudentSearch'

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
  const { data } = await admin.from('mastery_enrol_requests').select('*').order('created_at', { ascending: false }).limit(1000)
  const rows = (data ?? []) as Req[]
  // One batched call for every proof link: the list is no longer capped at the newest 100.
  const paths = rows.map((r) => r.proof_path).filter((x): x is string => Boolean(x))
  const { data: links } = paths.length ? await admin.storage.from('mastery-proofs').createSignedUrls(paths, 3600) : { data: [] }
  const byPath = new Map((links ?? []).map((x) => [x.path, x.signedUrl] as const))
  const signed = rows.map((r) => (r.proof_path ? byPath.get(r.proof_path) ?? null : null))

  return (
    <>
      <div className="panel">
        <div className="eyebrow">Admin</div>
        <h1>Enrolment requests</h1>
        <p className="muted">Approving sends the student a sign-in email and starts their one month of supervised support.</p>
      </div>
      {rows.length === 0 && <div className="panel"><p className="muted">No requests yet.</p></div>}
      {rows.length > 0 && <StudentSearch total={rows.length} noun="requests" />}
      {rows.map((r, i) => (
        <div className="panel" key={r.id} data-student={`${r.email} ${r.full_name ?? ''} ${r.phone ?? ''}`.toLowerCase()}>
          <h2 style={{ marginBottom: 4 }}>{r.full_name} <span className="muted" style={{ fontSize: 14 }}>· {r.status}</span></h2>
          <p className="muted">{r.email}{r.phone ? ` · ${r.phone}` : ''}{r.country ? ` · ${r.country}` : ''} · {new Date(r.created_at).toLocaleString('en-GB')}</p>
          {r.amount_note && <p className="md">Says: {r.amount_note}</p>}
          {signed[i] && <p><a className="btn btn-ghost btn-sm" href={signed[i]!} target="_blank" rel="noreferrer">View payment proof</a></p>}
          {r.admin_note && <p className="note">{r.admin_note}</p>}
          {r.status === 'pending' && <DecideButtons id={r.id} />}
          {r.status === 'approved' && <DecideButtons id={r.id} approved />}
        </div>
      ))}
    </>
  )
}
