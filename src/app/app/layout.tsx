import { redirect } from 'next/navigation'
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { supabaseServer } from '@/lib/supabase/server'
import { modules, phases, unlockState } from '@/lib/mastery/course'
import '../mastery/mastery.css'
import './app.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-display' })
const bodyFont = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata = { title: 'DSP AI Agent Mastery — Dashboard', robots: { index: false, follow: false } }

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  const fonts = `page-mastery app ${display.variable} ${bodyFont.variable} ${mono.variable}`

  if (!user) return <div className={fonts}>{children}</div>  // /app/login renders here

  const { data: profile } = await sb.from('mastery_profiles').select('status, full_name').eq('id', user.id).single()
  const { data: adminRow } = await sb.from('mastery_admins').select('email').eq('email', (user.email ?? '').toLowerCase()).maybeSingle()
  const isAdmin = Boolean(adminRow)
  if (profile?.status !== 'active') redirect('/app/login?pending=1')

  const { data: rows } = await sb.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((rows ?? []).map((r) => r.lesson_file))
  const state = unlockState(done, isAdmin)
  const totalCore = modules.reduce((n, m) => n + state[m.id].total, 0)
  const doneCore = modules.reduce((n, m) => n + state[m.id].doneCount, 0)

  return (
    <div className={fonts}>
      <header className="topbar"><div className="wrap">
        <a className="logo" href="/app">DSP <span>·</span> AI Agent Mastery</a>
        <span className="who">{profile?.full_name ?? user.email} · {doneCore}/{totalCore} lessons · <a href="/app/logout">sign out</a></span>
      </div></header>
      <main><div className="wrap grid">
        <nav className="side">
          {phases.map((p) => (
            <div key={p.id}>
              <div className="ph">Phase {p.id} · {p.name}</div>
              {modules.filter((m) => m.phase === p.id).map((m) => {
                const s = state[m.id]
                return (
                  <a key={m.id} href={`/app/m/${m.id}`} className={`mod ${s.unlocked ? '' : 'locked'} ${s.complete ? 'done' : ''}`}>
                    <span className="id">{m.id}</span><span className="t">{m.title}</span>
                    <span className="c">{s.complete ? '✓' : `${s.doneCount}/${s.total}`}</span>
                  </a>
                )
              })}
            </div>
          ))}
          <div className="ph">Finish</div>
          <a href="/app/capstone" className={`mod ${state['M15'].complete ? '' : 'locked'}`}><span className="id">CAP</span><span className="t">Capstone</span><span className="c">→</span></a>
          <a href="/app/certificate" className="mod"><span className="id">CERT</span><span className="t">Certificate</span><span className="c">→</span></a>
          <a href="/app/account" className="mod"><span className="id">ACC</span><span className="t">Password</span><span className="c">→</span></a>
          {isAdmin && <a href="/app/admin" className="mod"><span className="id">ADM</span><span className="t">Enrolments</span><span className="c">→</span></a>}
        </nav>
        <section>{children}</section>
      </div></main>
    </div>
  )
}
