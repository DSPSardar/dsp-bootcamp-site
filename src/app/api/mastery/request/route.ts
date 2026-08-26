import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

/** Public enrolment request: student submits details + payment proof. Stored pending; an admin approves it in /app/admin. */
export async function POST(req: Request) {
  const form = await req.formData()
  const full_name = String(form.get('full_name') || '').trim()
  const email = String(form.get('email') || '').trim().toLowerCase()
  const phone = String(form.get('phone') || '').trim()
  const country = String(form.get('country') || '').trim()
  const amount_note = String(form.get('amount_note') || '').trim()
  const proof = form.get('proof') as File | null

  if (!full_name || !email || !email.includes('@')) return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 })
  if (!proof || proof.size === 0) return NextResponse.json({ error: 'Please attach a payment screenshot.' }, { status: 400 })
  if (proof.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Screenshot must be under 8 MB.' }, { status: 400 })

  const admin = supabaseAdmin()
  const ext = (proof.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${Date.now()}-${email.replace(/[^a-z0-9]/g, '')}.${ext}`
  const up = await admin.storage.from('mastery-proofs').upload(path, proof, { contentType: proof.type || 'image/png', upsert: false })
  if (up.error) return NextResponse.json({ error: 'Could not upload the screenshot. Please try again.' }, { status: 500 })

  const { error } = await admin.from('mastery_enrol_requests').insert({ full_name, email, phone, country, amount_note, proof_path: path })
  if (error) return NextResponse.json({ error: 'Could not save your request. Please try again.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
