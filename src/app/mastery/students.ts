// src/app/mastery/students.ts — real student builds shown on /mastery, as data.
//
// Every entry is a student who appears ON CAMERA in the video that sits
// beside their card (the same recordings are lessons inside Module 15).
// Rules, from the Tier A spec §7: only real builds, and a name only with the
// student's consent — otherwise "DSP student". `built` and `line` may say
// nothing the student does not say on camera; do not add a stack, a URL or
// a number that has not been verified with them. To add a card: get consent,
// upload the video to Bunny, and append an entry.
export type StudentBuild = {
  /** Bunny video GUID — the card embeds /api/video/<guid>. */
  guid: string
  name: string
  where: string
  /** What they built or earned, in a few words (card label). */
  built: string
  /** Their story in one sentence, as told on camera. */
  line: string
  /** 9:16 recording. */
  portrait?: boolean
}

export const STUDENT_BUILDS: readonly StudentBuild[] = [
  { guid: '7e642dff-ebb7-48a5-9da5-e94190716a56', name: 'Mohsin', where: 'United Kingdom',
    built: 'First website + AI agent, deployed live',
    line: 'A finance professional with no software background. He built his first website and AI agent in the program and deployed it live.' },
  { guid: '2c5ac1cf-9643-4265-9c0a-72af532a84a9', name: 'DSP student', where: 'Pakistan',
    built: 'PKR 60,000 of paid AI work',
    line: 'Earned PKR 60,000 from AI work before he had even finished the bootcamp.' },
  { guid: 'e50847ea-7fa4-4e26-ae72-1273fec6ae33', name: 'DSP student', where: 'Agentic Master Class',
    built: 'Agents, automation and prompt engineering, applied at work',
    line: 'Came for practical skills — AI agents, automation and prompt engineering — and says the training changed how she works.', portrait: true },
]
