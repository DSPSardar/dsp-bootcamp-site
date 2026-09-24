// Live Mode client helpers. The proxy (src/app/api/sardar/asos/route.ts)
// decides who may read and what; this file only asks it and shapes the
// answer into a chart + a sentence. ASOS response shapes are read
// tolerantly (see toChart) so a field rename upstream degrades to a
// key/value list rather than an empty stage.
import type { Chart, ChartItem } from './demo'

export type LivePath = 'pipeline' | 'hot' | 'insights' | 'reports'

/** Which ASOS read each chip maps to. "How do I build you?" has no data
 *  behind it, so it stays canned in both modes. */
export const CHIP_LIVE_PATH: Record<string, LivePath | null> = {
  leads: 'pipeline',
  followup: 'hot',
  linkedin: 'insights',
  earnings: 'reports',
  build: null,
}

export type LiveResult = { chart: Chart; text: string; fetchedAt: string }

/** Ask the proxy whether this visitor may use Live Mode. Only called when a
 *  Supabase session cookie is present, so anonymous visits cost nothing. */
export async function probeLive(): Promise<{ admin: boolean; configured: boolean }> {
  try {
    const r = await fetch('/api/sardar/asos', { credentials: 'same-origin', cache: 'no-store' })
    if (!r.ok) return { admin: false, configured: false }
    return (await r.json()) as { admin: boolean; configured: boolean }
  } catch { return { admin: false, configured: false } }
}

export function hasSessionCookie(): boolean {
  try { return /(^|;\s*)sb-[^=]+-auth-token/.test(document.cookie) } catch { return false }
}

export async function fetchLive(path: LivePath, signal?: AbortSignal): Promise<LiveResult> {
  const r = await fetch(`/api/sardar/asos?path=${path}`, { credentials: 'same-origin', cache: 'no-store', signal })
  const body = (await r.json().catch(() => ({}))) as { error?: string; data?: unknown; fetchedAt?: string }
  if (!r.ok) throw new Error(body.error || `Live data unavailable (${r.status})`)
  const chart = toChart(path, body.data)
  return { chart, text: describe(path, chart), fetchedAt: body.fetchedAt ?? new Date().toISOString() }
}

const TITLES: Record<LivePath, string> = {
  pipeline: 'Lead pipeline, by stage',
  hot: 'Hot leads',
  insights: 'AI Insights',
  reports: 'DSP report summary',
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const label = (s: string) => s.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, (c) => c.toUpperCase())

/** Shape whatever ASOS returned into ≤ 6 bars or ring segments. */
export function toChart(path: LivePath, data: unknown): Chart {
  const items: ChartItem[] = []
  const obj = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>
  const root = (obj.data && typeof obj.data === 'object' ? obj.data : obj) as Record<string, unknown>

  // 1) an array of {stage|name|label|source, count|total|value|leads}
  const arr = Array.isArray(root) ? root : (['stages', 'pipeline', 'items', 'leads', 'sources', 'rows'].map((k) => root[k]).find(Array.isArray) as unknown[] | undefined)
  if (arr) {
    if (path === 'hot' && arr.every((x) => x && typeof x === 'object' && !isNum((x as Record<string, unknown>).count))) {
      // a list of hot leads: chart is "how many", grouped by whatever status-like key they carry
      const counts = new Map<string, number>()
      for (const x of arr as Record<string, unknown>[]) {
        const k = String(x.stage ?? x.status ?? x.temperature ?? 'Hot')
        counts.set(k, (counts.get(k) ?? 0) + 1)
      }
      for (const [k, v] of counts) items.push({ label: label(k), value: v })
    } else {
      for (const x of arr as Record<string, unknown>[]) {
        if (!x || typeof x !== 'object') continue
        const name = x.stage ?? x.name ?? x.label ?? x.source ?? x.title ?? x.key
        const val = [x.count, x.total, x.value, x.leads, x.amount, x.score].find(isNum)
        if (name !== undefined && val !== undefined) items.push({ label: label(String(name)), value: val })
      }
    }
  }
  // 2) a flat object of numeric fields
  if (items.length === 0) {
    for (const [k, v] of Object.entries(root)) if (isNum(v)) items.push({ label: label(k), value: v })
  }
  // 3) a nested object one level down (e.g. { summary: {...} })
  if (items.length === 0) {
    for (const v of Object.values(root)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        for (const [k, n] of Object.entries(v as Record<string, unknown>)) if (isNum(n)) items.push({ label: label(k), value: n })
        if (items.length) break
      }
    }
  }
  const top = items.sort((a, b) => b.value - a.value).slice(0, 6)
  return { type: path === 'insights' ? 'ring' : 'bars', title: TITLES[path], unit: path === 'reports' ? '' : 'count', items: top.length ? top : [{ label: 'No data', value: 0 }] }
}

function describe(path: LivePath, chart: Chart): string {
  const items = chart.items.filter((i) => i.label !== 'No data')
  if (items.length === 0) return `Live from DSP Agent Hub: nothing to show for ${TITLES[path].toLowerCase()} yet.`
  const total = items.reduce((n, i) => n + i.value, 0)
  const lead = items[0]
  switch (path) {
    case 'pipeline': return `Live from DSP Agent Hub: ${total.toLocaleString()} leads across ${items.length} stages. The biggest stage is ${lead.label} with ${lead.value.toLocaleString()}.`
    case 'hot': return `Live from DSP Agent Hub: ${total.toLocaleString()} hot leads right now. ${lead.label}: ${lead.value.toLocaleString()}. I will follow up on each one in order.`
    case 'insights': return `Live from DSP Agent Hub AI Insights: ${items.map((i) => `${i.label} ${i.value.toLocaleString()}`).join(', ')}.`
    case 'reports': return `Live from the DSP report summary: ${items.map((i) => `${i.label} ${i.value.toLocaleString()}`).join(', ')}.`
  }
}
