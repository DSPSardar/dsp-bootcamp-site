import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function VerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const { data: cert } = await supabaseAdmin().from('mastery_certificates').select('code, full_name, issued_at, mastery_capstones(live_url, repo_url)').eq('code', code.toUpperCase()).maybeSingle()
  if (!cert) notFound()
  const cap = Array.isArray(cert.mastery_capstones) ? cert.mastery_capstones[0] : cert.mastery_capstones
  return (
    <main style={{ maxWidth: 720, margin: '60px auto', padding: 24, fontFamily: 'system-ui', lineHeight: 1.6 }}>
      <p style={{ letterSpacing: '.14em', textTransform: 'uppercase', fontSize: 12, color: '#028090' }}>Digital Services Program · Verified certificate</p>
      <h1 style={{ fontSize: 32, margin: '8px 0' }}>DSP AI Agent Mastery — Master</h1>
      <p>Awarded to <b>{cert.full_name}</b> on {new Date(cert.issued_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
      <p>Certificate ID: <code>{cert.code}</code></p>
      {cap && <p>Capstone: <a href={cap.live_url}>{cap.live_url}</a> · <a href={cap.repo_url}>source</a></p>}
      <p style={{ color: '#666', fontSize: 14 }}>Issued on completion of 15 modules and a capstone project reviewed by the DSP team.</p>
    </main>
  )
}
