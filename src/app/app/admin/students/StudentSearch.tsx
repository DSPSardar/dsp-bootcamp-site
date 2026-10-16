'use client'
import { useState } from 'react'

// Filters the student cards on the admin page by email or name — pure client side, no reload.
function applyFilter(q: string): number {
  const needle = q.trim().toLowerCase()
  let n = 0
  document.querySelectorAll<HTMLElement>('[data-student]').forEach((el) => {
    const hit = !needle || (el.dataset.student ?? '').includes(needle)
    el.style.display = hit ? '' : 'none'
    if (hit) n++
  })
  return n
}

export default function StudentSearch({ total }: { total: number }) {
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(total)
  const update = (value: string) => { setQ(value); setShown(applyFilter(value)) }

  return (
    <div className="panel" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <input
        type="search"
        value={q}
        onChange={(e) => update(e.target.value)}
        placeholder="Search by email or name…"
        autoFocus
        aria-label="Search students"
        style={{ flex: '1 1 280px', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--line)',
          background: 'transparent', color: 'inherit', fontSize: 16 }}
      />
      <span className="muted" style={{ fontSize: 13 }}>{shown} of {total} students</span>
      {q && <button type="button" className="muted" onClick={() => update('')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>clear</button>}
    </div>
  )
}
