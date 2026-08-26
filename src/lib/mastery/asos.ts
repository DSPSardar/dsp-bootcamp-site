/** Fire-and-forget events from the course dashboard to ASOS (the DSP CRM).
 *  ASOS turns these into lead activities and WhatsApp nudges. Never throws; no-ops if unconfigured. */
export type AsosEvent = 'enrolled' | 'module_complete' | 'badge_earned' | 'capstone_submitted' | 'capstone_approved' | 'inactive'

export async function postAsosEvent(event: AsosEvent, email: string, data: Record<string, unknown> = {}): Promise<void> {
  const url = process.env.ASOS_EVENTS_URL, secret = process.env.ASOS_EVENTS_SECRET
  if (!url || !secret || !email) return
  try {
    await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-mastery-secret': secret },
      body: JSON.stringify({ event, email, data }), signal: AbortSignal.timeout(8000) })
  } catch (err) { console.warn('[asos] event not delivered', event, (err as Error)?.message) }
}
