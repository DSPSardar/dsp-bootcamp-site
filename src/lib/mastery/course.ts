import course from '@/content/mastery/course.json'

export type Lesson = { file: string; kind: 'core' | 'supplement'; order: string; minutes: number; youtube_id?: string | null; bunny?: { guid: string; status: string } }
export type Module = { id: string; title: string; phase: string; phase_name: string; outcome: string; build_project: string; downloads: string[]; vault_files?: string[]; slides?: { file: string; title: string; type: string; bytes: number }[]; slides_zip?: string | null; badge_after?: string | null; lessons: Lesson[] }

export const modules = course.modules as unknown as Module[]
export const phases = course.phases as { id: string; name: string }[]
export const courseMeta = { name: course.course, project: course.project, formula: course.formula }

export const lessonTitle = (file: string) => file.replace(/\.(mp4|mov|m4v)$/i, '').replace(/^(M\d\d-[LS]\d\d|00-W\d\d|V)_/, '').replace(/_[A-Za-z0-9_-]{11}(_v\d+)?(_[A-Z-]+)?$/, '').replace(/-/g, ' ')
export const lessonSlug = (file: string) => file.slice(0, 7)  // "M07-L01"
export const moduleFor = (id: string) => modules.find((m) => m.id === id)
export const coreLessons = (m: Module) => m.lessons.filter((l) => l.kind === 'core')

/** Progression rule: module N opens when every core lesson of module N-1 is marked complete. No tests, no grades. */
export function unlockState(done: Set<string>, unlockAll = false) {
  const state: Record<string, { unlocked: boolean; complete: boolean; doneCount: number; total: number }> = {}
  let prevComplete = true
  for (const m of modules) {
    const core = coreLessons(m)
    const doneCount = core.filter((l) => done.has(l.file)).length
    const complete = core.length > 0 && doneCount === core.length
    state[m.id] = { unlocked: unlockAll || prevComplete, complete, doneCount, total: core.length }
    prevComplete = complete
  }
  return state
}

export const badges = [
  { after: 'M06', name: 'Builder' }, { after: 'M10', name: 'Agent Engineer' }, { after: 'M13', name: 'Production-Ready' }, { after: 'M15', name: 'AI Solutions Seller' },
]

/** Bunny metadata carried on a welcome lesson. `uploaded_at` / `length_sec`
 *  are written by scripts/bunny-upload.mjs (they would feed a VideoObject
 *  schema once a real thumbnail exists — see src/lib/schema.ts). */
export type WelcomeBunny = { guid: string; status: string; uploaded_at?: string; length_sec?: number }

/** Bunny GUID of the public welcome video (00-W01) — used on the landing page and the free page. */
export const welcomeVideoId = (course.welcome as { file: string; bunny?: WelcomeBunny }[]).find((l) => l.file.startsWith('00-W01'))?.bunny
