import { agency, distribution } from '@/config/site'

// Homepage §06 — Attention → Engagement → Leads → Customers → Revenue.
// Every stage is a figure read off a named dashboard (src/config/site.ts
// `distribution`), shown with the platform's own metric name and period.
// Platforms are never summed; a stage with no verified figure is simply
// absent from the config and the row renders without it. The bars are a
// log-scale visual of the stage values, not a claim about conversion.
function logShare(value: number | string, max: number): number {
  const n = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.]/g, ''))
  if (!Number.isFinite(n) || n <= 0) return 0.08
  return Math.max(0.08, Math.log10(n) / Math.log10(max))
}

export default function DistributionEngine() {
  const max = Math.max(
    ...distribution.map((s) => (typeof s.exact === 'number' ? s.exact : Number(String(s.exact).replace(/[^\d.]/g, ''))))
  )
  return (
    <>
      <ol className="dist" data-reveal="" aria-label="DSP distribution engine, stage by stage">
        {distribution.map((s) => (
          <li key={s.id}>
            <span className="stage">{s.stage}</span>
            <span className="num">
              {s.display}
              <span className="sr-only"> (exactly {typeof s.exact === 'number' ? s.exact.toLocaleString('en-US') : s.exact})</span>
            </span>
            <span className="metric">{s.metric}</span>
            <span className="bar" aria-hidden="true"><i style={{ '--w': `${Math.round(logShare(s.exact, max) * 100)}%` } as React.CSSProperties}></i></span>
            <span className="src">{s.source}<br />{s.period}</span>
          </li>
        ))}
      </ol>
      <p className="dist-note">
        Each figure is read from the platform named under it, using that platform&apos;s own metric.
        Views are views, not people; periods differ by stage and are stated. Nothing is combined
        across platforms. Revenue: {agency.revenue.footnote}
      </p>
    </>
  )
}
