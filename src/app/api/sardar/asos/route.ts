import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/mastery/auth'

/** /sardar Live Mode — a thin, read-only window onto DSP Agent Hub (ASOS).
 *
 *  GET /api/sardar/asos?path=<key>   forwards to ${ASOS_API_URL}/<upstream>
 *  GET /api/sardar/asos              { admin: boolean, configured: boolean }
 *
 *  Rules (brief, step 5):
 *  - Admins only: the same mastery_admins check that gates /app/admin.
 *    Everyone else gets 401/403 and never learns whether ASOS is configured.
 *  - Allow-listed GETs only. Nothing is written, no other path is reachable,
 *    and the visitor's query string is never forwarded upstream.
 *  - ASOS_API_KEY is read here and sent upstream; it never reaches the client. */
export const dynamic = 'force-dynamic'

// ASOS mounts every route under /api/v1, and the read-only key is
// allow-listed to exactly these GETs (ASOS README "Read-only API key",
// src/middleware/readApiKey.js). Anything else answers 403, and a path
// without the prefix answers 404 — which Live Mode surfaced as a 502.
// scripts/check-asos-paths.mjs pins the four resulting upstream URLs.
const ASOS_PATHS = {
  pipeline: 'api/v1/leads/pipeline',
  hot: 'api/v1/leads/hot',
  insights: 'api/v1/insights/sentiment',
  reports: 'api/v1/analytics/overview', // the route behind the /dsp-reports KPI tiles
} as const
type AsosPath = keyof typeof ASOS_PATHS

// The header readApiKey.js reads (`req.headers['x-api-key']`; Node lowercases
// incoming header names, so the canonical spelling is fine).
const ASOS_KEY_HEADER = 'X-API-Key'

async function currentAdmin(): Promise<'anon' | 'user' | 'admin'> {
  try {
    const sb = await supabaseServer()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return 'anon'
    return (await isAdminUser(user.email)) ? 'admin' : 'user'
  } catch {
    return 'anon' // Supabase unconfigured (e.g. a preview build) reads as signed out
  }
}

export async function GET(req: Request) {
  const who = await currentAdmin()
  const base = (process.env.ASOS_API_URL ?? '').replace(/\/+$/, '')
  // ASOS compares the key byte-for-byte (constant-time SHA-256 digests), so a
  // trailing newline pasted into the env var would read as a wrong key.
  const key = (process.env.ASOS_API_KEY ?? '').trim()
  const configured = base.length > 0 && key.length > 0
  const path = new URL(req.url).searchParams.get('path')

  if (!path) return NextResponse.json({ admin: who === 'admin', configured: who === 'admin' && configured }, { headers: { 'cache-control': 'no-store' } })
  if (who === 'anon') return NextResponse.json({ error: 'sign in required' }, { status: 401 })
  if (who !== 'admin') return NextResponse.json({ error: 'admins only' }, { status: 403 })
  if (!(path in ASOS_PATHS)) return NextResponse.json({ error: 'unknown path' }, { status: 404 })
  if (!configured) return NextResponse.json({ error: 'ASOS is not configured on this deployment' }, { status: 503 })

  const upstream = `${base}/${ASOS_PATHS[path as AsosPath]}`
  try {
    const res = await fetch(upstream, {
      method: 'GET',
      // Exactly what ASOS's readApiKey middleware reads: the raw key in
      // X-API-Key. No Authorization header (that is the JWT path the key
      // bypasses) and no "Bearer " prefix.
      headers: { accept: 'application/json', [ASOS_KEY_HEADER]: key },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    const text = await res.text()
    if (!res.ok) {
      if (res.status === 401) {
        // The key itself is never logged. ASOS answers 401 from readApiKey when
        // the presented key != ASOS_READ_API_KEY, when ASOS_READ_API_TENANT_ID
        // is unset upstream, or when the method is not GET.
        console.warn(
          `[sardar/asos] upstream 401 on ${ASOS_PATHS[path as AsosPath]} — sent header "${ASOS_KEY_HEADER}" ` +
          `(raw value from ASOS_API_KEY, ${key.length} chars, no Bearer prefix, no Authorization header); ` +
          `upstream said: ${text.slice(0, 200)}`,
        )
      } else {
        console.warn('[sardar/asos] upstream', path, res.status)
      }
      return NextResponse.json({ error: `ASOS answered ${res.status}` }, { status: 502 })
    }
    let data: unknown
    try { data = JSON.parse(text) } catch { return NextResponse.json({ error: 'ASOS did not return JSON' }, { status: 502 }) }
    return NextResponse.json({ path, fetchedAt: new Date().toISOString(), data }, { headers: { 'cache-control': 'no-store' } })
  } catch (err) {
    console.warn('[sardar/asos] unreachable', path, (err as Error)?.message)
    return NextResponse.json({ error: 'ASOS did not respond' }, { status: 504 })
  }
}
