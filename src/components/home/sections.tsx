// Static (server-rendered) sections of the Agentic Lab bootcamp page.
// The live bootcamp was sunset on 2026-08-30 — this page is an evergreen
// explainer of what the Lab was and what it taught. The only CTA on the
// page points to /mastery (see Hero); do not add enrolment CTAs back.
import Link from 'next/link'
import Image from 'next/image'
import { CheckIcon } from './icons'
import { bootcamp, mastery, site } from '@/config/site'

/* ============ HERO: what the Lab was ============ */
export function Hero() {
  return (
    <section className="hero-dark" id="top">
      <div className="stars" aria-hidden="true"></div>
      <div className="wrap">
        <span className="hero-pill"><span className="dot" aria-hidden="true"></span> DSP Agentic Lab · ran live through August 2026</span>
        <h1>The Agentic Lab: our live 7-day <em>AI agents bootcamp</em>.</h1>
        <p className="sub">
          For six batches, the Agentic Lab took complete beginners from zero to a deployed AI agent in
          one week: five live Zoom classes, a guided build day, and a Day 7 showcase — taught in English
          and Urdu, no coding required. This page explains what the Lab was and what it taught.
        </p>
        <p className="sub" style={{ marginTop: '.9rem' }}>
          <strong>
            DSP now teaches this material as{' '}
            <Link href="/mastery">the {mastery.priceDisplay} self-paced version of this program</Link>
          </strong>{' '}
          — DSP AI Agent Mastery: 15 modules, recorded lectures, lifetime access.
        </p>
        <div className="hero-ctas">
          <Link className="btn btn-primary" href="/mastery">Explore DSP AI Agent Mastery →</Link>
        </div>
      </div>
    </section>
  )
}

/* ============ FACT STRIP ============ */
export function FactStrip() {
  return (
    <div className="stats" aria-label="The Agentic Lab at a glance">
      <div className="wrap">
        <ul>
          <li><strong>{bootcamp.studentsTrained}</strong><span>Students Trained</span></li>
          <li><strong>{bootcamp.batchesCompleted}</strong><span>Batches Completed</span></li>
          <li><strong>{bootcamp.liveClasses}</strong><span>Live Classes a Week</span></li>
          <li><strong>{bootcamp.certificates}</strong><span>Certificates</span></li>
        </ul>
      </div>
    </div>
  )
}

/* ============ THE SHIFT ============ */
export function ShiftSection() {
  return (
    <section id="shift">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">The shift</p>
          <h2>From chatting to acting.</h2>
          <p>Most people have used a chatbot. Very few can direct an agent. That gap is what the Lab trained people for.</p>
        </div>
        <div className="grid-3">
          <div className="card">
            <p className="kicker">Where most people are</p>
            <h3>Chatbot</h3>
            <p>Replies to prompts. Forgets everything when the chat closes. Takes no action in the real world.</p>
          </div>
          <div className="card dark">
            <p className="kicker">What students built</p>
            <h3>AI Agent</h3>
            <p>Plans a goal, uses tools, remembers context, and acts — it does the work, not just the talking.</p>
          </div>
          <div className="card">
            <p className="kicker">Where this is going</p>
            <h3>Agentic Fleet</h3>
            <p>Teams of agents passing work to each other, running real business workflows end to end.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ WHAT STUDENTS BUILT ============ */
const PERSONAS = [
  { role: 'Marketer', text: 'A lead-qualifier agent that filters serious buyers from time-wasters on WhatsApp — automatically.' },
  { role: 'Teacher', text: 'A student-helper agent that answers course questions and shares schedules, 24/7.' },
  { role: 'Shop / Business Owner', text: 'An order-taking agent that answers prices, hours, and bookings while you sleep.' },
  { role: 'Freelancer', text: 'A client-intake agent that collects requirements and budgets before your first call.' },
]

export function PersonaSection() {
  return (
    <section className="personas" id="personas">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">The projects</p>
          <h2>What students built</h2>
          <p>Every student built an agent for their OWN work. Here&apos;s what past students chose:</p>
        </div>
        <div className="grid-4">
          {PERSONAS.map((p) => (
            <div className="card" key={p.role}>
              <p className="kicker">{p.role}</p>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ THE 7-DAY CURRICULUM ============ */
const DAYS: { d: string; title: React.ReactNode; desc: string; outcome: string; when: string; live: boolean; gold?: boolean }[] = [
  { d: 'Day 1 · Mon', title: <>From Idea to Agent</>, desc: 'What makes an AI agent different from a chatbot — and the DSP formula behind every agent: Claude + Job Description + Tools + Loop. Students picked one real problem from their own business or work and built their first working agent that night, live.', outcome: 'Students left with: their agent v0, answering its first real questions.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 2 · Tue', title: <>The Job Description</>, desc: 'An agent is only as good as its instructions. The Lab taught the DSP 7-Part Job Description — the exact way to tell Claude its role, goal, audience, tone, steps, rules, and examples. Prompt engineering, taught in plain English.', outcome: 'Students left with: a professional agent that speaks like a trained employee.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 3 · Wed', title: <>Knowledge &amp; Memory</>, desc: 'The night each agent learned its owner\'s business — prices, policies, answers. The Memory Ladder (Brain, Backpack, Notebook), how to stop an agent from inventing wrong answers, and the one rule that makes it say "I don\'t know" instead of guessing.', outcome: 'Students left with: an agent that answers from real business facts.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 4 · Thu', title: <>Tools &amp; Claude Code</>, desc: 'The big night. Tools give an agent hands — calendars, email, WhatsApp. Then, using Vibe Coding, students described a web page in plain English and watched Claude build it. No syntax. No code. Plain English as the programming language.', outcome: 'Students left with: their agent inside a real, branded web interface.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 5 · Fri', title: <>Test, Secure, Ship</>, desc: 'Before real users arrived, each agent was attacked on purpose: the DSP 10-Question Test Sheet, how strangers try to trick AI agents (prompt injection), and the security rules that stop them. Then the weekend deployment mission.', outcome: 'Students left with: a tested, secured agent — cleared for launch.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 6 · Sat', title: <>Build &amp; Deploy (Capstone)</>, desc: 'Students worked independently with support on WhatsApp all day, plus a live 9 PM help clinic. By that night, each agent was deployed on the internet with a live URL — and three real people had used it.', outcome: 'Students left with: a LIVE agent anyone in the world could open.', when: 'Guided · flexible', live: false },
  { d: 'Day 7 · Sun', title: <>Showcase &amp; Certificates</>, desc: 'The night it all paid off. Each student demoed their live agent on Zoom — 2 minutes, their story, their build, their link — passed the assessment rubric, received their certificates, and left with a portfolio project to show any client or employer.', outcome: 'Students left with: a deployed AI agent, 4 certificates, and proof they built it.', when: 'Live showcase', live: true, gold: true },
]

export function WeekSchedule() {
  return (
    <section className="week" id="week">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">The curriculum</p>
          <h2>One week. Five live classes. One shipped agent.</h2>
          <p>Live classes ran Monday to Friday, 9:00–10:00 PM PKT on Zoom. The weekend was where students built and showed their work.</p>
        </div>

        {DAYS.map((day) => (
          <div className={day.gold ? 'day-row gold' : 'day-row'} key={day.d}>
            <span className="d">{day.d}</span>
            <div>
              <h3>{day.title}</h3>
              <p>{day.desc}</p>
              <p className="outcome">&ldquo;{day.outcome}&rdquo;</p>
            </div>
            <span className={day.live ? 'when live' : 'when'}>{day.when}</span>
          </div>
        ))}

        <p className="schedule-teaser">Single agents were just the beginning — graduates went on to multi-agent systems, teams of AI agents working together, in the DSP alumni community.</p>

        {/* The syllabus-download block was removed at the sunset — the PDF
            it served advertised the fee and weekly batches (and a private
            phone number) for the retired program. */}
      </div>
    </section>
  )
}

/* ============ INSTRUCTOR ============ */
export function InstructorSection() {
  return (
    <section className="band-dark" id="instructor">
      <div className="wrap split">
        <div className="inst-video">
          <video
            controls
            preload="metadata"
            playsInline
            poster="/instructor-poster.jpg"
            aria-label="Sardar Abdul Ghaffar Khan explains the 7-day AI Agents Bootcamp — 3 minutes 54 seconds"
          >
            <source src="/instructor-intro.mp4" type="video/mp4" />
            {/* TODO: add captions for accessibility (WCAG 1.2.2):
                <track kind="captions" src="/instructor-intro.en.vtt" srcLang="en" label="English" /> */}
            Your browser does not support video. <a href="/instructor-intro.mp4">Download the intro video</a>.
          </video>
          <p className="inst-video-cap">Sardar Abdul Ghaffar Khan walks through the bootcamp — 3 min 54 sec</p>
        </div>
        <div>
          <p className="eyebrow">The instructor</p>
          <h2>Not a course library. A teacher.</h2>
          <p><strong>Sardar Abdul Ghaffar Khan</strong> has spent 24 years in the IT industry and has taught in London, the UAE, and Pakistan. A Google-certified AI trainer, he taught every session of the Lab himself — live, every night, answering questions in English and Urdu. Press play and let him explain the program directly.</p>
          <p className="inst-stack">24 years in IT · Google-certified AI trainer · taught in 🇬🇧 🇦🇪 🇵🇰 · builder of <a href="https://getaisales.com">getaisales.com</a></p>
          <ul className="cred-list">
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8z" /></svg> 24 years in the IT industry across three countries</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg> Google-certified AI Agentic Trainer</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg> Every class taught live by the instructor — no pre-recorded stand-ins</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4l6 6-9 9H5v-6z" /><path d="M12 6l6 6" /></svg> Builds in public: the demo agent below was built live using this exact method</li>
          </ul>
          <div style={{ display: 'flex', gap: '.9rem', flexWrap: 'wrap' }}>
            <a
              className="inst-badge"
              href="https://www.credential.net/aae3459a-b0b9-463e-86cd-da7806e00e5d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/gemini-certified-educator-badge.png" alt="Gemini Certified Educator badge issued by Google for Education" width={64} height={64} />
              <span>
                <strong>Gemini Certified Educator</strong>
                <span className="inst-badge-meta">Issued by Google for Education · valid to Oct 2028</span>
                <span className="inst-badge-verify">Verify credential ↗</span>
              </span>
            </a>
            <a
              className="inst-badge"
              href="https://www.kaggle.com/certification/badges/abdulghaffarkhan804/108"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external Kaggle SVG badge, served as-is */}
              <img src="/kaggle-vibecoding-agents-badge.svg" alt="Google/Kaggle 5-Day AI Agents: Intensive Vibe Coding Course certification badge" width={64} height={64} />
              <span>
                <strong>Google/Kaggle: 5-Day AI Agents</strong>
                <span className="inst-badge-meta">Certified by Google — 5-Day AI Agents: Intensive Vibe Coding Course, 2026</span>
                <span className="inst-badge-verify">Verify credential ↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ DEMO PROJECT + STUDENT WORK ============ */
export function ProjectsSection() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Proof, not promises</p>
          <h2>See the method working — live, right now.</h2>
          <p>Try the agent the instructor built with the same 7-day method students followed.</p>
        </div>
        <div className="split">
          <div className="card">
            <span className="built-by">Built live by the instructor</span>
            <h3 style={{ fontSize: '1.4rem' }}>DSP Travel Agent</h3>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.4rem' }}>Four specialised agents — orchestrator, researcher, planner, writer — planning real trips together, deployed on a public URL.</p>
            <ul className="check-list" style={{ margin: '1.1rem 0 1.4rem' }}>
              <li><CheckIcon /> 4-agent orchestration, working end to end</li>
              <li><CheckIcon /> Live deployment — public URL, custom domain</li>
              <li><CheckIcon /> Zero hand-written code — built entirely by vibe coding</li>
            </ul>
            <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <a className="btn btn-primary btn-sm" href="https://travel.digitalservicesprogram.com">Try the live demo</a>
              <a className="btn btn-ghost btn-sm" href="https://github.com/DSPSardar/travel-agent">View the code</a>
            </div>
          </div>
          <div>
            <p className="kicker">The students&apos; versions</p>
            <h3 style={{ fontSize: '1.5rem', margin: '.4rem 0 .8rem' }}>On Day 7, every student demoed their own.</h3>
            <p style={{ color: 'var(--navy-soft)' }}>Every student planned, tooled, and deployed a working agent, then presented it live to the cohort. Their projects — sales agents, finance trackers, SEO auditors, whatever fit their work — left the bootcamp deployed and demonstrable.</p>
          </div>
        </div>

        {/* Verified testimonials — quotes pulled directly from real TikTok
            videos via TikTok's public oEmbed API, not authored by hand.
            Abdul Hadi's and Muhammad Usman's videos share the exact same
            caption text as Riffat's (DSP's standard caption on these
            posts), so it is NOT duplicated here as a fake distinct quote —
            their cards link straight to their videos instead.
            Add more cards here as additional verified names + video links
            come in; do not fill empty slots with invented names/quotes.
            Riffat's quote is truncated for layout — the full text lives in
            her TikTok caption, linked via "Read more".
            Hussain's card is a Facebook Reel behind Facebook's logged-out
            login wall — his caption couldn't be independently read, so no
            quote is attributed to him; card text is DSP-authored description
            only, per the same no-invented-quotes rule as above. */}
        <p className="testi-cap" style={{ marginTop: '2.4rem' }}>From the earlier Master Class cohorts — same instructor, same live-teaching method, later sharpened into the 7-day format.</p>
        <div className="stu-grid" style={{ marginTop: '1rem' }}>
          <div className="stu-card">
            <CheckIcon />
            <p className="quote">Grade 9, and already shipping multiple agents. Hussain built several AI agents after our bootcamp — watch his story on Facebook.</p>
            <p className="who">Hussain · Grade 9 student · <a href="https://www.facebook.com/reel/2416896862167908" target="_blank" rel="noopener noreferrer">Watch his story on Facebook</a></p>
          </div>
          <div className="stu-card">
            <CheckIcon />
            <p className="quote">I am extremely grateful to be part of the AI Agentic Master Class under the Digital Services Program, taught by Sardar Abdul Ghaffar Khan… <a href="https://www.tiktok.com/@digitalservicesprogram/video/7652245609784560903" target="_blank" rel="noopener noreferrer">Read more</a></p>
            <p className="who">Riffat · Saudi Arabia · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7652245609784560903" target="_blank" rel="noopener noreferrer">Watch her testimonial on TikTok</a></p>
          </div>
          <div className="stu-card">
            <CheckIcon />
            <p className="quote">Verified student review from the AI Agentic Master Class — watch his full testimonial on TikTok.</p>
            <p className="who">Abdul Hadi · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7652246560511741191" target="_blank" rel="noopener noreferrer">Watch his testimonial on TikTok</a></p>
          </div>
          <div className="stu-card">
            <CheckIcon />
            <p className="quote">Verified student review from the AI Agentic Master Class — watch his full testimonial on TikTok.</p>
            <p className="who">Muhammad Usman · UK · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7654094650680020231" target="_blank" rel="noopener noreferrer">Watch his testimonial on TikTok</a></p>
          </div>
        </div>

        {/* Verifiable proof: send visitors to the real videos */}
        <div className="proof-strip">
          <div>
            <h3>Don&apos;t take our word for it — watch the June 2026 batch.</h3>
            <p>Real students, on camera, showing what they built. All testimonials live on our public channels.</p>
          </div>
          <ul className="proof-links">
            <li><a href="https://www.youtube.com/@DigitalServicesProgram">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12s0-4-.5-5.8c-.3-1-1-1.7-2-2C17.7 4 12 4 12 4s-5.7 0-7.5.2c-1 .3-1.7 1-2 2C2 8 2 12 2 12s0 4 .5 5.8c.3 1 1 1.7 2 2 1.8.2 7.5.2 7.5.2s5.7 0 7.5-.2c1-.3 1.7-1 2-2C22 16 22 12 22 12z" /><path d="M10 9l5 3-5 3V9z" /></svg>
              YouTube</a></li>
            <li><a href="https://www.tiktok.com/@digitalservicesprogram">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.4 2.6 2 4.4 4.5 4.7v3c-1.7 0-3.2-.5-4.5-1.4v6.2A6.5 6.5 0 1 1 8.5 9v3.2A3.3 3.3 0 1 0 12 15.5V3h3z" /></svg>
              TikTok</a></li>
            <li><a href="https://www.facebook.com/DigitalServicesProgram/">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z" /></svg>
              Facebook</a></li>
            <li><a href="https://www.instagram.com/digitalservicesprogram/">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>
              Instagram</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ============ CERTIFICATES ============ */
const SEAL_PATH = 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14.5L7 22l5-3 5 3-1.5-7.5'

export function CertificatesSection() {
  return (
    <section className="certs" id="certificates">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Certificates</p>
          <h2>Students finished the week with four certificates.</h2>
          <p>During the bootcamp students completed three of Anthropic&apos;s official Claude courses — guided live by DSP — and earned each course&apos;s certificate of completion. Presenting the final project earned the fourth, from DSP.</p>
        </div>
        <div className="cert-grid">
          <div className="cert-card">
            <span className="seal" aria-hidden="true"><svg className="ic" viewBox="0 0 24 24"><path d={SEAL_PATH} /></svg></span>
            <h3>Claude Fundamentals</h3>
            <p>Anthropic&apos;s official course certificate — completed during Days 1–2, guided by DSP.</p>
          </div>
          <div className="cert-card">
            <span className="seal" aria-hidden="true"><svg className="ic" viewBox="0 0 24 24"><path d={SEAL_PATH} /></svg></span>
            <h3>Claude Cowork</h3>
            <p>Anthropic&apos;s official course certificate — completed during Days 3–4, guided by DSP.</p>
          </div>
          <div className="cert-card">
            <span className="seal" aria-hidden="true"><svg className="ic" viewBox="0 0 24 24"><path d={SEAL_PATH} /></svg></span>
            <h3>Claude Code</h3>
            <p>Anthropic&apos;s official course certificate — completed during Day 5, guided by DSP.</p>
          </div>
          <div className="cert-card dsp">
            <span className="seal" aria-hidden="true"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></span>
            <h3>DSP Bootcamp Certificate</h3>
            <p>Awarded by DSP after students presented their working agent at the Day 7 showcase.</p>
          </div>
        </div>
        <p className="cert-honesty">The three Claude certificates are issued by Anthropic on completing its official courses; DSP guided students through them live as part of the bootcamp. DSP is an independent training organisation and is not affiliated with or endorsed by Anthropic.</p>
      </div>
    </section>
  )
}

/* ============ POLICIES ============ */
export function PoliciesSection() {
  return (
    <section className="policies" id="policies">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-head">
          <p className="eyebrow">The fine print</p>
          <h2>Policies, in plain language.</h2>
        </div>
        {/* The refund policy and enrolment terms were removed at the
            sunset (2026-08-30) — they governed live-batch enrolment, which
            no longer exists. Privacy and the company/Anthropic disclaimers
            remain: they still apply. */}
        <details>
          <summary>Privacy policy</summary>
          <div className="policy-body">
            <p>Digital Services Program (DSP) collects the details you submit through this site — your name, WhatsApp number, and background — solely to respond to your enquiry and manage your enrolment. We do not sell your data, and we do not share it with third parties except the service providers needed to run our program (e.g. messaging and payment services).</p>
            <p>This site uses analytics to understand how visitors use it. You can request a copy or deletion of your data at any time by writing to <a href="mailto:info@digitalservicesprogram.com">info@digitalservicesprogram.com</a>.</p>
          </div>
        </details>
        <details>
          <summary>Terms of service</summary>
          <div className="policy-body">
            <p>Course materials and class replays are provided for students&apos; personal use and may not be redistributed or resold. Certificates were issued on meeting each certificate&apos;s completion requirements.</p>
            <p>Digital Services Program is a SECP-registered company based in Islamabad, Pakistan. Anthropic certificates are issued by Anthropic on completion of its official courses; DSP is an independent organisation and is not affiliated with or endorsed by Anthropic.</p>
          </div>
        </details>
      </div>
    </section>
  )
}

/* ============ FOOTER ============ */
export function HomeFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="foot-brand"><span className="brand-mark" aria-hidden="true">D</span> Digital Services Program</p>
            <p>AI agents training for Pakistan — taught in English and Urdu by a real instructor.</p>
            <address style={{ marginTop: '.9rem', fontStyle: 'normal' }}>{site.addressLine}<br />
              <a href="mailto:info@digitalservicesprogram.com">info@digitalservicesprogram.com</a><br />
              <a href="tel:+923420580864">+92 342 0580864</a> (call &amp; WhatsApp)</address>
          </div>
          <div>
            <h3>The Agentic Lab</h3>
            <ul>
              <li><a href="#week">The 7-day curriculum</a></li>
              <li><a href="#certificates">Certificates</a></li>
              <li><a href="#instructor">Instructor</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><Link href="/mastery">DSP AI Agent Mastery</Link></li>
            </ul>
          </div>
          <div>
            <h3>DSP</h3>
            <ul>
              <li><Link href="/channelops">ChannelOps</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="#policies">Refund policy</a></li>
              <li><a href="#policies">Privacy policy</a></li>
              <li><a href="#policies">Terms of service</a></li>
              <li><a href="https://www.youtube.com/@DigitalServicesProgram">YouTube</a></li>
              <li><a href="https://www.tiktok.com/@digitalservicesprogram">TikTok</a></li>
              <li><a href="https://www.facebook.com/DigitalServicesProgram/">Facebook</a></li>
              <li><a href="https://www.instagram.com/digitalservicesprogram/">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/digitalservicesprogram">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-legal">
          <span>© 2026 Digital Services Program · SECP-registered company</span>
        </div>
      </div>
    </footer>
  )
}
