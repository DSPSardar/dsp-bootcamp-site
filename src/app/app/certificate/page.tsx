import { supabaseServer } from '@/lib/supabase/server'
import { requireStudent } from '@/lib/mastery/auth'
import { modules, unlockState, badges } from '@/lib/mastery/course'

export default async function CertificatePage() {
  const { sb, user } = await requireStudent()
  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const state = unlockState(new Set((rows ?? []).map((r) => r.lesson_file)))
  const allDone = modules.every((m) => state[m.id].complete)
  const { data: cert } = await sb.from('mastery_certificates').select('code, issued_at, full_name').eq('user_id', user.id).maybeSingle()
  const earned = badges.filter((b) => state[b.after].complete)
  return (
    <div className="panel">
      <div className="eyebrow">Certificate</div>
      <h1>DSP AI Agent Mastery — Master</h1>
      {cert ? (
        <>
          <p className="md">Issued to <b>{cert.full_name}</b> on {new Date(cert.issued_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          <p className="md">Verification URL: <a href={`/verify/${cert.code}`}>digitalservicesprogram.com/verify/{cert.code}</a> — share this on LinkedIn.</p>
        </>
      ) : (
        <p className="md">{allDone ? 'All 15 modules complete. Your certificate is issued once the DSP team approves your capstone.' : 'Complete all 15 modules and an approved capstone to earn the certificate.'}</p>
      )}
      <div style={{ marginTop: 16 }}>{earned.map((b) => <span className="badge" key={b.name}>{b.name}</span>)}{earned.length === 0 && <span className="muted">Badges appear here as you finish each phase.</span>}</div>
    </div>
  )
}
