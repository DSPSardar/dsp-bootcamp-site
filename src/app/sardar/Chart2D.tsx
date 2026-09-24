'use client'
import type { Chart } from './demo'
import { DEMO_BADGE } from './demo'

// SVG chart for the transcript panel. Step 3 adds the Three.js version on
// the stage; this stays as the accessible, no-WebGL reading of the same data.
export default function Chart2D({ chart, badge = DEMO_BADGE }: { chart: Chart; badge?: string | null }) {
  const max = Math.max(1, ...chart.items.map((i) => i.value))
  return (
    <div className="chart" aria-label={`${chart.title}: ${chart.items.map((i) => `${i.label} ${i.value} ${chart.unit}`).join(', ')}`}>
      <div className="t"><b>{chart.title}</b>{badge && <small>{badge}</small>}</div>
      {chart.type === 'bars' ? <Bars chart={chart} max={max} /> : <Ring chart={chart} max={max} />}
    </div>
  )
}

function Bars({ chart, max }: { chart: Chart; max: number }) {
  const n = chart.items.length, W = 320, H = 120, pad = 8, gap = 14
  const bw = (W - pad * 2 - gap * (n - 1)) / n
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="presentation">
      {chart.items.map((it, i) => {
        const h = Math.max(4, (it.value / max) * 80)
        const x = pad + i * (bw + gap)
        return (
          <g key={it.label}>
            <rect className="bar" x={x} y={96 - h} width={bw} height={h} rx="3" style={{ transformBox: 'fill-box' }} />
            <text className="v" x={x + bw / 2} y={92 - h} textAnchor="middle">{it.value}</text>
            <text x={x + bw / 2} y={112} textAnchor="middle">{it.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Ring({ chart, max }: { chart: Chart; max: number }) {
  // Each item is one arc segment of the ring; value/max sets its fill.
  const r = 44, C = 2 * Math.PI * r, n = chart.items.length, seg = C / n, gapLen = 4
  return (
    <svg viewBox="0 0 320 120" role="presentation">
      <g transform="translate(60 60) rotate(-90)">
        {chart.items.map((it, i) => {
          const len = Math.max(0, seg - gapLen), on = (it.value / max) * len
          return (
            <g key={it.label}>
              <circle className="arc off" r={r} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-i * seg} />
              <circle className="arc" r={r} strokeDasharray={`${on} ${C - on}`} strokeDashoffset={-i * seg} style={{ ['--len' as string]: `${C}` }} />
            </g>
          )
        })}
      </g>
      {chart.items.map((it, i) => (
        <g key={it.label} transform={`translate(130 ${22 + i * 24})`}>
          <rect width="10" height="10" rx="2" fill="#3FE0F5" fillOpacity={0.25 + 0.75 * (it.value / max)} />
          <text className="v" x="18" y="9">{it.label}</text>
          <text x="180" y="9" textAnchor="end">{it.value}{chart.unit === '%' ? '%' : ''}</text>
        </g>
      ))}
    </svg>
  )
}
