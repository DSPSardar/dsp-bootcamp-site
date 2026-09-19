import { NextResponse } from 'next/server'
import { supabaseServer, supabaseAdmin } from '@/lib/supabase/server'
import { modules, unlockState } from '@/lib/mastery/course'
import { DAILY_CAP, pickModel, retrieve, systemPrompt, contextBlock, sourceList } from '@/lib/mastery/tutor'

export const runtime = 'nodejs'
export const maxDuration = 60

/** The student's day, not the server's — the cap should reset at midnight where they live. */
const karachiDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(new Date())

type Msg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: Request) {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const admin = supabaseAdmin()
  const { data: profile } = await admin.from('mastery_profiles').select('status, full_name').eq('id', user.id).single()
  if (profile?.status !== 'active') return NextResponse.json({ error: 'not enrolled' }, { status: 403 })

  const body = await req.json().catch(() => ({}))
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 4000) : ''
  const moduleId: string | null = typeof body.moduleId === 'string' ? body.moduleId : null
  const lessonFile: string | null = typeof body.lessonFile === 'string' ? body.lessonFile : null
  if (!question) return NextResponse.json({ error: 'question required' }, { status: 400 })
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'tutor is not configured yet' }, { status: 503 })

  // Count the message BEFORE the model runs, atomically, so open tabs cannot race past the cap.
  const day = karachiDay()
  const { data: used, error: capErr } = await admin.rpc('mastery_tutor_take', { p_user: user.id, p_day: day, p_cap: DAILY_CAP })
  if (capErr) return NextResponse.json({ error: capErr.message }, { status: 500 })
  if (used === -1) return NextResponse.json({
    error: `You have used all ${DAILY_CAP} tutor questions for today — it resets at midnight. For anything urgent, bring it to the weekend live debugging session or post it in the DSP group.`,
  }, { status: 429 })

  // Thread: continue the one they are in, or open a new one titled with this question.
  let threadId: string | null = typeof body.threadId === 'string' ? body.threadId : null
  let history: Msg[] = []
  if (threadId) {
    const { data: rows } = await admin.from('mastery_tutor_messages')
      .select('role, content').eq('thread_id', threadId).eq('user_id', user.id).order('id', { ascending: false }).limit(10)
    history = (rows ?? []).reverse() as Msg[]
    if (history.length === 0) threadId = null            // not theirs, or gone — start fresh
  }
  if (!threadId) {
    const { data: t, error } = await admin.from('mastery_tutor_threads')
      .insert({ user_id: user.id, title: question.slice(0, 120), module_id: moduleId, lesson_file: lessonFile })
      .select('id').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    threadId = t.id
  }

  // Progress goes into the prompt so "what should I do next" has a real answer.
  const { data: prog } = await admin.from('mastery_progress').select('lesson_file').eq('user_id', user.id)
  const done = new Set((prog ?? []).map((r) => r.lesson_file))
  const state = unlockState(done)
  const totalCount = modules.reduce((n, m) => n + state[m.id].total, 0)
  const doneCount = modules.reduce((n, m) => n + state[m.id].doneCount, 0)

  const chunks = retrieve(question, moduleId)
  const model = pickModel(question)
  const messages = [
    ...history,
    { role: 'user' as const, content: [contextBlock(chunks), question].filter(Boolean).join('\n\n') },
  ]

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model, max_tokens: 1600, stream: true,
      system: systemPrompt({ moduleId, lessonFile, name: profile?.full_name, doneCount, totalCount }),
      messages,
    }),
  })

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '')
    console.error('[tutor] anthropic', upstream.status, detail.slice(0, 400))
    return NextResponse.json({ error: 'The tutor could not answer just now. Try again in a moment.' }, { status: 502 })
  }

  // Pass the text through as it arrives — a student watching a blank box for 20 seconds
  // assumes it is broken. The row is written once the stream closes.
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const reader = upstream.body.getReader()
  let answer = ''
  let inTok = 0
  let outTok = 0
  let buffer = ''

  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read()
      if (done) {
        controller.close()
        void persist()
        return
      }
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        try {
          const ev = JSON.parse(line.slice(6))
          if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
            answer += ev.delta.text
            controller.enqueue(encoder.encode(ev.delta.text))
          } else if (ev.type === 'message_start') inTok = ev.message?.usage?.input_tokens ?? 0
          else if (ev.type === 'message_delta') outTok = ev.usage?.output_tokens ?? outTok
        } catch { /* keep-alive and partial frames */ }
      }
    },
    cancel() { void reader.cancel(); void persist() },
  })

  async function persist() {
    if (!answer) return
    // Did Ustad hand off? Worth knowing per lesson — it is the list of what to re-record.
    const answered = !/debugging session|DSP group|cannot help|can't help/i.test(answer.slice(-400))
    await admin.from('mastery_tutor_messages').insert([
      { thread_id: threadId, user_id: user!.id, role: 'user', content: question, module_id: moduleId, lesson_file: lessonFile },
      { thread_id: threadId, user_id: user!.id, role: 'assistant', content: answer, module_id: moduleId, lesson_file: lessonFile,
        sources: sourceList(chunks), model, input_tokens: inTok, output_tokens: outTok, answered },
    ])
    await admin.from('mastery_tutor_threads').update({ last_at: new Date().toISOString() }).eq('id', threadId)
    await admin.rpc('mastery_tutor_spend', { p_user: user!.id, p_day: day, p_in: inTok, p_out: outTok })
  }

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-thread-id': threadId!,
      'x-tutor-left': String(Math.max(0, DAILY_CAP - (used as number))),
    },
  })
}
