// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Helper to append to Google Sheet via Apps Script
async function appendToGoogleSheet(data: Record<string, string>) {
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!sheetsWebhookUrl) {
    console.warn('[DSP lead] GOOGLE_SHEETS_WEBHOOK_URL not configured')
    return
  }

  try {
    const response = await fetch(sheetsWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error('[DSP lead] Google Sheets append failed:', response.status, await response.text())
    }
  } catch (err) {
    console.error('[DSP lead] Google Sheets error', err)
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
  const name = String(b.name ?? '').slice(0, 200)
  const phone = String(b.phone ?? '').slice(0, 30)
  const background = String(b.background ?? '').slice(0, 100)
  // Optional fields — used by the FDE application form and lead attribution
  const email = String(b.email ?? '').slice(0, 200)
  const type = String(b.type ?? 'bootcamp_lead').slice(0, 50)
  const why = String(b.why ?? '').slice(0, 2000)
  const intent = String(b.intent ?? '').slice(0, 50)
  const source = String(b.source ?? '').slice(0, 200)

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: 'name and phone required' }, { status: 400 })
  }

  const leadData = { name, phone, background, email, type, why, intent, source }

  // console.log is visible in Vercel → Logs (ephemeral).
  // For durable records, configure RESEND_API_KEY + LEAD_EMAIL (email below)
  // alt: store in Vercel KV/Postgres or a Google Sheet
  console.log('[DSP lead]', { ...leadData, ts: new Date().toISOString() })

  // Append to Google Sheets (async, non-blocking)
  appendToGoogleSheet(leadData).catch(() => {})

  const apiKey = process.env.RESEND_API_KEY
  const leadEmail = process.env.LEAD_EMAIL

  if (apiKey && leadEmail) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'DSP Leads <leads@digitalservicesprogram.com>',
        to: leadEmail,
        subject:
          type === 'fde_application'
            ? `New FDE application: ${name}`
            : `New bootcamp lead: ${name}`,
        text: [
          `Type: ${type}`,
          `Name: ${name}`,
          `Phone: ${phone}`,
          email && `Email: ${email}`,
          `Background: ${background || 'not specified'}`,
          why && `Why FDE: ${why}`,
          `Time: ${new Date().toISOString()}`,
        ]
          .filter(Boolean)
          .join('\n'),
      })
    } catch (err) {
      // Email failure must never fail the response
      console.error('[DSP lead] email failed', err)
    }
  }

  return NextResponse.json({ ok: true })
}
