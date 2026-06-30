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

  const name = String((body as Record<string, string>).name ?? '').slice(0, 200)
  const phone = String((body as Record<string, string>).phone ?? '').slice(0, 30)
  const background = String((body as Record<string, string>).background ?? '').slice(0, 100)

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: 'name and phone required' }, { status: 400 })
  }

  const leadData = { name, phone, background }

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
        subject: `New bootcamp lead: ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nBackground: ${background ?? 'not specified'}\nTime: ${new Date().toISOString()}`,
      })
    } catch (err) {
      // Email failure must never fail the response
      console.error('[DSP lead] email failed', err)
    }
  }

  return NextResponse.json({ ok: true })
}
