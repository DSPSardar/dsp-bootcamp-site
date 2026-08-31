/** Fire-and-forget events from the course dashboard to ASOS (the DSP CRM).
 *  ASOS turns these into lead activities and WhatsApp nudges. Never throws; no-ops if unconfigured. */
export type AsosEvent = 'enrolled' | 'module_complete' | 'badge_earned' | 'capstone_submitted' | 'capstone_approved' | 'inactive'

/** Returns true only if ASOS actually accepted the event. Existing callers use
 *  `void postAsosEvent(...)` and are unaffected; the admin re-sync screen awaits it,
 *  because "nothing happened silently" is exactly the failure it exists to repair. */
export async function postAsosEvent(event: AsosEvent, email: string, data: Record<string, unknown> = {}): Promise<boolean> {
  const url = process.env.ASOS_EVENTS_URL, secret = process.env.ASOS_EVENTS_SECRET
  if (!url || !secret || !email) { console.warn('[asos] not configured — event dropped', event); return false }
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-mastery-secret': secret },
      body: JSON.stringify({ event, email, data }), signal: AbortSignal.timeout(8000) })
    if (!res.ok) console.warn('[asos] event rejected', event, res.status, await res.text().catch(() => ''))
    return res.ok
  } catch (err) { console.warn('[asos] event not delivered', event, (err as Error)?.message); return false }
}
