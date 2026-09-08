// src/app/mastery/curriculum/page.tsx — Guide 5 (Corroboration Engine, Day 3).
//
// The full curriculum of DSP AI Agent Mastery on one citable page: every
// module × outcome × "you build", grouped by phase, plus the capstone — all
// read from ../curriculum.ts, the same data the /mastery Course schema
// mirrors and `test:schema` guards, so this page can never drift from the
// course page. Emits an ItemList of the modules. Lesson counts and minutes
// are deliberately NOT published (they change as lectures are re-cut).
// Rendered in the guide shell (SiteShell), not the /mastery page shell.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { MASTERY_CAPSTONE, MASTERY_CURRICULUM, MASTERY_PHASES } from '@/app/mastery/curriculum'
import { founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/mastery/curriculum'
const TITLE = `DSP AI Agent Mastery Curriculum: All ${mastery.modules} Modules, What You Learn and What You Build`
const DESCRIPTION =
  `The complete ${mastery.modules}-module curriculum of DSP AI Agent Mastery in five phases — foundations, builder, agent engineer, production, seller — with each module's outcome and the thing you build, plus the capstone that earns the certificate. Taught in Urdu and English by ${founder.name}.`
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const COURSE_ID = `${site.url}${mastery.url}#course`

const ANSWER =
  `${mastery.name} has ${mastery.modules} modules in five phases. Phase 0 (Modules 1–3) covers foundations, the 7-Part Job Description and tool setup; Phase 1 (4–6) vibe coding, websites and Git; Phase 2 (7–10) agents, APIs, RAG, memory and MCP; Phase 3 (11–13) testing, security and deployment; Phase 4 (14–16) multi-tenant systems, selling and AI search. A capstone earns the certificate.`

const FRAMEWORKS = [
  { module: 'M01', path: '/frameworks/agent-idea-filter', title: 'The Agent Idea Filter', what: 'the five questions an idea passes before anyone builds it' },
  { module: 'M02', path: '/frameworks/7-part-job-description', title: 'The 7-Part Job Description', what: 'how an agent\'s system prompt is written at DSP' },
  { module: 'M09', path: '/frameworks/memory-ladder', title: 'The Memory Ladder', what: 'which kind of memory an agent needs, and when' },
]

const FAQS: Faq[] = [
  {
    q: 'How many modules does DSP AI Agent Mastery have?',
    a: `Sixteen modules plus a capstone. They are grouped into five phases — Zero (foundations), Builder, Agent Engineer, Production and Seller — and open in order, one build at a time.`,
  },
  {
    q: 'Do I have to do the modules in order?',
    a: 'Yes, with one exception. Modules open in sequence because each build extends the previous one — the café AI Employee grows from a job description in Module 2 to a multi-tenant deployment in Module 14. Module 16, the AI Search Dominance Engine, is open from day one with no prerequisites.',
  },
  {
    q: 'What do I actually build across the course?',
    a: 'One AI Employee — a café ordering agent — from an empty folder to a live URL: its job description (M02), its website (M05), the agent loop (M07), an email or Sheets action (M08), a knowledge base and memory (M09), an MCP tool (M10), tests and a security checklist (M11–12), the public URL (M13) and a two-café multi-tenant version (M14). Then an original agent of your own for the capstone.',
  },
  {
    q: 'How long is each module?',
    a: 'Long enough to finish its build. DSP does not publish lesson counts or minutes because lectures are re-recorded and re-cut as tools change; the whole course is about 30 hours of lectures, designed as roughly an hour a day for 30 days or four sessions a week for eight weeks.',
  },
  {
    q: 'What earns the certificate?',
    a: 'The capstone: an original agent for a real use case — not the café project — built, tested, secured, deployed and pitched, submitted as a live URL, a repo, a three-minute demo and a one-page proposal, and reviewed by the DSP team. The certificate\'s verification page shows the live agent.',
  },
  {
    q: 'Is the curriculum the same as the old live bootcamp?',
    a: 'Same café AI Employee, same frameworks, same instructor — but the live DSP Agentic Lab (closed August 2026) covered the material in seven days of Zoom classes. Mastery is the self-paced, sixteen-module version with lifetime access and twelve months of group support.',
  },
]

const URDU = [
  `${mastery.name} میں ${mastery.modules} ماڈیول اور ایک کیپ سٹون ہے، پانچ مرحلوں میں: بنیادیں (ماڈیول 1 تا 3)، بلڈر (4 تا 6)، ایجنٹ انجینئر (7 تا 10)، پروڈکشن (11 تا 13) اور سیلر (14 تا 16)۔ ہر ماڈیول کے آخر میں آپ کچھ بناتے ہیں — جاب ڈسکرپشن، ویب سائٹ، ایجنٹ، میموری، ٹول، لائیو URL — اور وہی ایک AI ایمپلائی ہر ماڈیول کے ساتھ بڑھتا جاتا ہے۔`,
  `ماڈیول ترتیب سے کھلتے ہیں، ایک وقت میں ایک بلڈ۔ کوئی امتحان نہیں، کوئی گریڈ نہیں۔ کیپ سٹون میں آپ اپنا الگ ایجنٹ بناتے، ڈیپلائے کرتے اور پیش کرتے ہیں — اسی سے سرٹیفکیٹ ملتا ہے۔ فیس ${mastery.pkr.price} یک مشت، تاحیات رسائی۔ استاد ${founder.name} ہیں، اردو اور انگریزی میں۔`,
]

const itemListLd: JsonLd = {
  '@type': 'ItemList',
  '@id': `${site.url}${PATH}#modules`,
  name: `${mastery.name} — the ${mastery.modules} modules`,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: MASTERY_CURRICULUM.length,
  about: { '@id': COURSE_ID },
  itemListElement: MASTERY_CURRICULUM.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${m.code} ${m.title}`,
    description: m.outcome,
    url: `${site.url}${PATH}#${m.code.toLowerCase()}`,
  })),
}

export default function MasteryCurriculumPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="Curriculum"
      parents={[{ name: mastery.shortName, path: mastery.url }]}
      eyebrow="Guide · The full syllabus · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[itemListLd]}
      related={[
        { path: mastery.url, title: `${mastery.name} — pricing and enrolment` },
        { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu' },
        { path: '/learn-ai-agents-pakistan', title: 'How to Learn AI Agents in Pakistan' },
        { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?' },
      ]}
    >
      <h2>How the curriculum is built</h2>
      <p>
        One project, sixteen modules. You build a single AI Employee — a café ordering agent — and it grows with every module: an idea in Module 1, a job description in Module 2, a website in Module 5, an agent in Module 7, memory in Module 9, tools in Module 10, a public URL in Module 13, two cafés from one deployment in Module 14. Modules 15 and 16 teach you to sell it. The capstone is your own agent, for a real use case, and it earns the certificate.
      </p>
      <p>
        Modules open in order, one build at a time. There are no tests and no grades: you watch, you build, you move on. The table below is the same curriculum the <Link href={mastery.url}>course page</Link> shows and the same one its Course schema carries; this page exists so the whole syllabus can be read — and cited — in one place.
      </p>

      {MASTERY_PHASES.map((ph) => {
        const mods = MASTERY_CURRICULUM.filter((m) => m.phase === ph.id)
        const rows = ph.id === '4' ? [...mods, MASTERY_CAPSTONE] : mods
        return (
          <section key={ph.id} id={`phase-${ph.id}`} aria-labelledby={`phase-${ph.id}-h`}>
            <h2 id={`phase-${ph.id}-h`}>{ph.name} <span className="note">({ph.span})</span></h2>
            <div className="table-scroll wide">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Module</th>
                    <th scope="col">Outcome — what you can do afterwards</th>
                    <th scope="col">You build</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <tr key={m.code} id={m.code.toLowerCase()} className={m.code === 'CAP' ? 'is-dsp' : undefined}>
                      <td><strong>{m.code}</strong><br />{m.title}</td>
                      <td>{m.outcome}</td>
                      <td>{m.build}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}

      <h2>The frameworks the modules teach</h2>
      <p>Three of the modules are built around a named DSP framework. Each has its own page, written so you can use it before you enrol:</p>
      <ul>
        {FRAMEWORKS.map((f) => (
          <li key={f.path}><strong>{f.module}</strong> · <Link href={f.path}>{f.title}</Link> — {f.what}.</li>
        ))}
      </ul>

      <h2>What comes with the modules</h2>
      <ul>
        <li><strong>Downloads per module</strong> — templates, checklists and worksheets (the 7-Part JD template, the Agent Idea Filter worksheet, the Memory Ladder diagram, the 10-Question Test Sheet, the security checklist, the Client Acquisition Kit).</li>
        <li><strong>{mastery.supportMonths} months of group support</strong> and a live debugging call every weekend, where you bring what broke.</li>
        <li><strong>Three Anthropic (Claude Academy) badges</strong> — Claude 101, Claude Code 101 and Introduction to Claude Cowork — earned in Module 3 under your own name.</li>
        <li><strong>The DSP Master certificate</strong> after the capstone, with a verification page that shows your live agent.</li>
        <li><strong>{mastery.access} access</strong> — redo a module when a tool changes; re-recordings are included.</li>
      </ul>
      <p className="note">Pricing ({mastery.priceDisplay} one-time / {mastery.pkr.price}), payment options and the enrolment steps are on the <Link href={mastery.url}>{mastery.shortName} page</Link>.</p>
    </Guide>
  )
}
