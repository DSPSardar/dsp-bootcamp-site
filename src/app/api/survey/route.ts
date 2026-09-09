// src/app/api/survey/route.ts — receives Pakistan AI Skills Survey 2026
// responses (Corroboration Engine, Day 6).
//
// Deliberately anonymous: no name, no phone, and email only if the respondent
// asks for the results. Answers go to the same Apps Script webhook the lead
// route uses (GOOGLE_SHEETS_WEBHOOK_URL) tagged type 'survey_response'.
//
// Every answer is validated against ALLOWED — the same data the visible form
// is built from — so a posted value the form never offered is dropped rather
// than stored, and the sheet stays clean enough to count without tidying.
import { NextRequest, NextResponse } from 'next/server'
import { ALLOWED } from '@/app/survey/questions'

async function appendToGoogleSheet(data: Record<string, string>) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhook) {
    console.warn('[DSP survey] GOOGLE_SHEETS_WEBHOOK_URL not configured')
    return
  }
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
    })
    if (!res.ok) console.error('[DSP survey] sheet append failed:', res.status, await res.text())
  } catch (err) {
    console.error('[DSP survey] sheet error', err)
  }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Record<string, string>
  const answers: Record<string, string> = {}
  for (const [field, allowed] of Object.entries(ALLOWED)) {
    const value = String(b[field] ?? '')
    if (allowed.includes(value)) answers[field] = value
  }

  // The two questions that decide whether a response is worth counting.
  if (!answers.country || !answers.blocker) {
    return NextResponse.json({ ok: false, error: 'country and blocker required' }, { status: 400 })
  }

  // Optional, and only because they asked to be sent the results.
  const email = String(b.email ?? '').slice(0, 200)
  const comment = String(b.comment ?? '').slice(0, 500)

  appendToGoogleSheet({ ...answers, email, comment, type: 'survey_response' }).catch(() => {})

  return NextResponse.json({ ok: true })
}
