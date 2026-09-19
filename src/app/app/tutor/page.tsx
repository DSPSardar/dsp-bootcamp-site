import { requireStudent } from '@/lib/mastery/auth'
import { DAILY_CAP } from '@/lib/mastery/tutor'
import Ustad from '@/components/mastery/Ustad'

export const metadata = { title: 'Ustad — your AI tutor', robots: { index: false, follow: false } }

const karachiDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(new Date())

type Msg = { role: 'user' | 'assistant'; content: string }

/** The full-page tutor. Past conversations are read with the student's own session,
 *  so RLS decides what they can see — no thread-ownership check needed here. */
export default async function TutorPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams
  const { sb, user } = await requireStudent()

  const [{ data: threads }, { data: usage }] = await Promise.all([
    sb.from('mastery_tutor_threads').select('id, title, last_at').order('last_at', { ascending: false }).limit(15),
    sb.from('mastery_tutor_usage').select('messages').eq('user_id', user.id).eq('day', karachiDay()).maybeSingle(),
  ])

  let initial: Msg[] = []
  if (t) {
    const { data: rows } = await sb.from('mastery_tutor_messages').select('role, content').eq('thread_id', t).order('id')
    initial = (rows ?? []) as Msg[]
  }
  const left = Math.max(0, DAILY_CAP - (usage?.messages ?? 0))

  return (
    <>
      <div className="panel">
        <h1>Ustad</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Your AI tutor — awake whenever you are. Ask in English, Urdu or Roman Urdu. It knows all 16 modules
          and sends you back to the exact lesson. {left} of {DAILY_CAP} questions left today.
        </p>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <Ustad variant="page" initial={initial} initialThreadId={t ?? null} />
      </div>

      {threads && threads.length > 0 && (
        <div className="panel">
          <h2>Earlier questions</h2>
          <div className="dl">
            {threads.map((th) => (
              <a key={th.id} href={`/app/tutor?t=${th.id}`} style={{ opacity: th.id === t ? 1 : 0.85 }}>
                {th.title ?? 'Conversation'}
                <span className="muted" style={{ display: 'block', fontSize: 12, marginTop: 3 }}>
                  {new Date(th.last_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </a>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 12 }}><a href="/app/tutor">+ Start a new question</a></p>
        </div>
      )}
    </>
  )
}
