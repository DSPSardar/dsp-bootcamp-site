import index from '@/content/mastery/tutor-index.json'
import { modules, titleOf, lessonSlug, type Module, type Lesson } from '@/lib/mastery/course'

export type Chunk = { id: string; kind: string; module: string | null; title: string; path: string | null; text: string }
const DOCS = (index as { docs: Chunk[] }).docs

/** Free inside the PKR 28,000 fee, but not infinite — a student who needs more than this
 *  in one day needs a human, and that is what the Saturday debugging session is for. */
export const DAILY_CAP = 40

/** Haiku handles "explain this again"; anything with code or an error gets Sonnet. */
export const MODEL_FAST = 'claude-haiku-4-5'
export const MODEL_DEEP = 'claude-sonnet-5'

const CODE = /(```|error|exception|traceback|undefined|cannot find|failed|npm |pip |git |localhost|\.py\b|\.ts\b|\.js\b|\.json\b|404|500|api key)/i
export const pickModel = (q: string) => (CODE.test(q) || q.length > 600 ? MODEL_DEEP : MODEL_FAST)

// ---------------------------------------------------------------- retrieval
const STOP = new Set(['the','a','an','is','are','was','were','be','to','of','and','or','in','on','for','with','that','this','it','i','my','me','you','your','how','what','why','when','do','does','did','can','not','no','yes','please','help','hai','hain','ka','ki','ke','ko','se','main','mein','mujhe','kya','kaise','kyun','nahi','nahin','par','bhi','aur','ye','wo','ap','aap'])
const terms = (s: string) => s.toLowerCase().match(/[a-z0-9]{2,}/g)?.filter((t) => !STOP.has(t)) ?? []

// Inverse document frequency, computed once: "agent" appears everywhere and should
// count for little; "webhook" appears twice and should pull hard.
const DF = new Map<string, number>()
for (const d of DOCS) for (const t of new Set(terms(d.title + ' ' + d.text))) DF.set(t, (DF.get(t) ?? 0) + 1)
const idf = (t: string) => Math.log(1 + DOCS.length / (1 + (DF.get(t) ?? 0)))

const HAY = new Map(DOCS.map((d) => [d.id, (d.title + ' ' + d.text).toLowerCase()]))

/** Keyword retrieval, no embeddings: the whole corpus is 286 chunks, so scoring them
 *  all costs nothing and avoids a vector store, an embedding bill and a sync job. */
export function retrieve(question: string, moduleId?: string | null, limit = 6): Chunk[] {
  const qt = terms(question)
  if (qt.length === 0) return []
  const scored = DOCS.map((d) => {
    const hay = HAY.get(d.id)!
    let score = 0
    for (const t of new Set(qt)) {
      const hits = hay.split(t).length - 1
      if (hits) score += idf(t) * (1 + Math.log(hits))
      if (d.title.toLowerCase().includes(t)) score += idf(t) * 1.5
    }
    if (moduleId && d.module === moduleId) score *= 1.6     // the lesson they are sitting on wins ties
    if (d.kind === 'course') score *= 1.2                   // "how does the course work" beats a vault doc
    return { d, score }
  })
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.d)
}

// ---------------------------------------------------------------- prompt
const courseMap = modules.map((m) => `${m.id} ${m.title} — ${m.outcome}`).join('\n')

export function systemPrompt(ctx: { moduleId?: string | null; lessonFile?: string | null; name?: string | null; doneCount?: number; totalCount?: number }) {
  const m: Module | undefined = ctx.moduleId ? modules.find((x) => x.id === ctx.moduleId) : undefined
  const l: Lesson | undefined = m && ctx.lessonFile ? m.lessons.find((x) => x.file === ctx.lessonFile) : undefined
  const where = l && m ? `The student is on ${m.id} ${m.title} → "${titleOf(l)}" (${lessonSlug(l.file)}). Assume their question is about this lesson unless they say otherwise.`
    : m ? `The student is on the ${m.id} ${m.title} module page.`
    : 'The student opened the tutor from the dashboard, not from a lesson.'

  return `You are Ustad, the AI tutor inside DSP AI Agent Mastery — Sardar Ghaffar's course at digitalservicesprogram.com/app. Students study whenever they get free time, so you are the help that is awake at 1am when the weekend debugging session is five days away.

WHO YOU ARE TALKING TO
${ctx.name ? `Name: ${ctx.name}. ` : ''}${ctx.doneCount != null ? `Progress: ${ctx.doneCount} of ${ctx.totalCount} lessons complete. ` : ''}Most students are beginners and non-coders — students, teachers, freelancers, marketers, business owners. Many are Urdu speakers in Pakistan and around the world. Never assume they know a term; explain it the first time you use it.
${where}

LANGUAGE — this matters more than anything else. Match the SCRIPT they typed in, not just the language:
- They wrote in English letters (including Roman Urdu like "MCP kya hota hai, simple lafzon mein samjhao") → reply in English letters. Roman Urdu in, Roman Urdu out. Never switch them to Urdu script — most students who type in English letters read replies in English letters, and Urdu script comes as a shock.
- They wrote in Urdu script (اردو) → reply in Urdu script.
- They wrote plain English → reply in plain English.
- They mixed → mix the same way they did.
Code, commands, file names and error messages stay in English always, whatever the reply language.

HOW YOU TEACH — the DSP method
The whole course teaches one skill: describe what you want in plain English, and let Claude Code build it. So when a student needs code, give them the prompt to paste into Claude Code first, then explain what the result does and why. Do not dump 80 lines of code on someone who cannot read it. Small steps, one at a time. When they hit an error, explain what the error is actually saying before you fix it — that is the skill that makes them independent.

RULES
- Answer from the course material below. When you use it, name the lesson naturally, like "this is covered in M10 Lesson 1 — MCP Explained" so they can go rewatch it.
- If something is outside the course but is ordinary AI, coding or business knowledge, help anyway — just do not invent DSP specifics. Never invent a price, a date, a policy, a module that is not in the list, or a promise about jobs or earnings.
- Never hand out, reset or discuss account passwords. Point them at "Email me a sign-in link" or "Forgot password" on /app/login, or tell them to message DSP support.
- Do not do their build project or capstone for them. Get them unstuck, then hand the keyboard back.
- If you cannot solve it, or they have been stuck through two or three replies, say so plainly and tell them to bring it to the weekend live debugging session or post it in the DSP group. That is a real option, not a brush-off.
- Be short. Steps, not essays. Use fenced code blocks for code and commands. No emoji, and no big "#" headings — this is a chat box, not a document.
- The only pages inside the dashboard are: /app (the dashboard), the module and lesson pages, /app/tutor (you), /app/capstone, /app/certificate and /app/account (password). There is no billing page, no settings page and no course marketplace — never send a student to a page that does not exist. Money, fees, refunds and access problems go to DSP support, not to a page.

THE 16 MODULES
${courseMap}`
}

export function contextBlock(chunks: Chunk[]) {
  if (chunks.length === 0) return ''
  return `<course_material>\nThese are the most relevant pieces of the course for this question. Use them; do not quote the tags.\n\n${chunks
    .map((c) => `[${c.module ?? 'course'} · ${c.title}]\n${c.text}`)
    .join('\n\n---\n\n')}\n</course_material>`
}

export const sourceList = (chunks: Chunk[]) => chunks.map((c) => ({ id: c.id, module: c.module, title: c.title }))
