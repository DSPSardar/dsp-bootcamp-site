// src/components/site/Mentions.tsx — "Listed on", the independent
// third-party listings that describe DSP (Corroboration Engine, Day 8).
//
// Renders nothing when the registry is empty, so it is safe to mount on a
// page before any listing exists. Entries come from `mentions` in
// src/config/site.ts, which is the single place the rules live: independent
// pages only, never a paid placement, verified before it is added.
import { mentions } from '@/config/site'

export default function Mentions({ dark = false }: { dark?: boolean }) {
  if (mentions.length === 0) return null
  return (
    <div className={dark ? 'card dark' : 'card'} style={{ marginTop: '1.2rem' }}>
      <p className="kicker">Listed on</p>
      <ul className="check-list" style={{ marginTop: 0 }}>
        {mentions.map((m) => (
          <li key={m.url}>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              style={dark ? { color: '#fff' } : undefined}
            >
              {m.source} — {m.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
