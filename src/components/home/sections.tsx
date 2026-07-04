// Static (server-rendered) sections of the homepage, ported 1:1 from index.html.
import Link from 'next/link'
import ConsoleClock from './ConsoleClock'
import SyllabusButton from './SyllabusButton'
import LeadForm from './LeadForm'
import { WhatsAppIcon, CheckIcon } from './icons'

/* ============ HERO: the 9 PM class ============ */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="stars" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div>
          <span className="cohort-pill"><span className="dot" aria-hidden="true"></span> New batch every Monday · Next: Mon 6 July 2026 · 30 seats</span>
          <h1>Build your first AI agent in <em>7 days</em> — live, at 9&nbsp;PM, in plain English.</h1>
          <p className="hero-facts">PKR 10,000 all-inclusive · 5 live classes · 4 certificates · Day-1 money-back guarantee</p>
          <p className="sub">Five live Zoom classes, Monday to Friday, 9:00–10:00 PM Pakistan time. No coding. You&apos;ll plan, build, and deploy a working AI agent — and present it live on Day 7.</p>
          <p className="urdu-line" lang="ur">سیکھیں آج، بنائیں کل — اے آئی آپ کی زبان سمجھتی ہے۔</p>
          <div className="fee-flag">
            <span className="amt">Everything included</span>
            <span className="lbl">one simple fee · all 4 certificates · no hidden costs</span>
          </div>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20Monday%27s%20batch">
              <WhatsAppIcon />
              Reserve my seat on WhatsApp
            </a>
            <a className="btn btn-ghost-light" href="#week">See the 7-day schedule</a>
          </div>
          <p className="cta-guarantee">Attend Day 1. If it&apos;s not for you, full refund — no questions asked.</p>
          <p className="hero-note">Not sure yet? Watch our students&apos; video reviews below — real names, public TikTok links.</p>
          <p className="hero-note">Prefer to talk? Call <a href="tel:+923118122222">+92 311 8122222</a> · Classes in English + Urdu</p>
        </div>

        <div className="console" role="img" aria-label="Tonight's class console showing the live session at 9 PM Pakistan time and the agent pipeline the cohort will build: idea, job description, knowledge, tools, ship.">
          <div className="console-bar">
            <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span>dsp — tonight&apos;s class</span>
          </div>
          <div className="console-body">
            <div className="console-time">
              <ConsoleClock />
              <span className="tz">PKT · LIVE ON ZOOM</span>
            </div>
            <div className="console-line"><span className="tag">idea</span> pick one real problem to solve <span className="ok">done</span></div>
            <div className="console-line"><span className="tag">job desc</span> role, goal, tone, rules <span className="ok">done</span></div>
            <div className="console-line"><span className="tag">knowledge</span> teach it your business facts <span className="ok">done</span></div>
            <div className="console-line"><span className="tag">tools</span> calendars, email, WhatsApp <span className="ok">done</span></div>
            <div className="console-line"><span className="tag">ship</span> <span className="cursor">shipping your agent</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ FACT STRIP ============ */
export function FactStrip() {
  return (
    <div className="facts" aria-label="Bootcamp at a glance">
      <div className="wrap">
        <ul>
          <li><strong>5</strong><span>Live Classes</span></li>
          <li><strong>7</strong><span>Days to Deployed</span></li>
          <li><strong>30</strong><span>Seats per Batch</span></li>
          <li><strong>4</strong><span>Certificates</span></li>
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
          <p>Most people have used a chatbot. Very few can direct an agent. That gap is the opportunity this bootcamp trains you for.</p>
        </div>
        <div className="shift-grid">
          <div className="shift-card">
            <p className="stage">Where most people are</p>
            <h3>Chatbot</h3>
            <p>Replies to prompts. Forgets everything when the chat closes. Takes no action in the real world.</p>
          </div>
          <div className="shift-card hot">
            <p className="stage">What you&apos;ll build</p>
            <h3>AI Agent</h3>
            <p>Plans a goal, uses tools, remembers context, and acts — it does the work, not just the talking.</p>
          </div>
          <div className="shift-card">
            <p className="stage">Where this is going</p>
            <h3>Agentic Fleet</h3>
            <p>Teams of agents passing work to each other, running real business workflows end to end.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ WHAT WILL YOU BUILD? ============ */
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
          <p className="eyebrow">Your project</p>
          <h2>What will YOU build?</h2>
          <p>Every student builds an agent for their OWN work. Here&apos;s what past students chose:</p>
        </div>
        <div className="persona-grid">
          {PERSONAS.map((p) => (
            <div className="persona-card" key={p.role}>
              <p className="role">{p.role}</p>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 7-DAY SCHEDULE ============ */
const DAYS: { d: string; title: React.ReactNode; desc: string; outcome: string; when: string; live: boolean; gold?: boolean }[] = [
  { d: 'Day 1 · Mon', title: <>From Idea to Agent</>, desc: 'What makes an AI agent different from a chatbot — and the DSP formula behind every agent: Claude + Job Description + Tools + Loop. You pick one real problem from your own business or work, and build your first working agent tonight, live with us.', outcome: 'You walk away with: your agent v0, answering its first real questions.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 2 · Tue', title: <>The Job Description</>, desc: "An agent is only as good as its instructions. You'll learn the DSP 7-Part Job Description — the exact way to tell Claude its role, goal, audience, tone, steps, rules, and examples. This is prompt engineering, taught in plain English.", outcome: 'You walk away with: a professional agent that speaks like a trained employee.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 3 · Wed', title: <>Knowledge &amp; Memory</>, desc: 'Tonight your agent learns YOUR business — your prices, your policies, your answers. You\'ll learn the Memory Ladder (Brain, Backpack, Notebook), how to stop your agent from inventing wrong answers, and the one rule that makes it say "I don\'t know" instead of guessing.', outcome: 'You walk away with: an agent that answers from your real business facts.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 4 · Thu', title: <>Tools &amp; Claude Code</>, desc: "The big night. Tools give your agent hands — calendars, email, WhatsApp. Then, using Vibe Coding, you'll describe a web page in plain English and watch Claude build it. No syntax. No code. Your English is the programming language.", outcome: 'You walk away with: your agent inside a real, branded web interface.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 5 · Fri', title: <>Test, Secure, Ship</>, desc: "Before real users arrive, we attack your agent on purpose. You'll run the DSP 10-Question Test Sheet, learn how strangers try to trick AI agents (prompt injection), and install the security rules that stop them. Then you get your weekend deployment mission.", outcome: 'You walk away with: a tested, secured agent — cleared for launch.', when: 'Live · 9–10 PM', live: true },
  { d: 'Day 6 · Sat', title: <>Build &amp; Deploy (Capstone)</>, desc: 'You work independently with our support on WhatsApp all day, plus a live 9 PM help clinic. By tonight, your agent is deployed on the internet with a live URL — and three real people have used it.', outcome: 'You walk away with: a LIVE agent anyone in the world can open.', when: 'Guided · flexible', live: false },
  { d: 'Day 7 · Sun', title: <>Showcase &amp; Certificates</>, desc: "The night it all pays off. You demo your live agent on Zoom — 2 minutes, your story, your build, your link. You'll pass the assessment rubric, receive your certificates, and leave with a portfolio project you can show any client or employer.", outcome: 'You walk away with: a deployed AI agent, 4 certificates, and proof you built it.', when: 'Live showcase', live: true, gold: true },
]

export function WeekSchedule() {
  return (
    <section className="week" id="week">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Schedule</p>
          <h2>One week. Five live classes. One shipped agent.</h2>
          <p>Live classes run Monday to Friday, 9:00–10:00 PM PKT on Zoom. The weekend is where you build and show your work.</p>
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

        <p className="schedule-teaser">And after the bootcamp? Single agents are just the beginning. Graduates learn about multi-agent systems — teams of AI agents working together — in our advanced track and alumni community.</p>

        <div className="syllabus-cta">
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true" style={{ width: 32, height: 32, color: 'var(--teal)' }}><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v6h6M9 13h6M9 17h6" /></svg>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h3>Get the full syllabus (PDF)</h3>
            <p>Daily objectives, projects, and deliverables — sent to your WhatsApp.</p>
          </div>
          <SyllabusButton />
        </div>
      </div>
    </section>
  )
}

/* ============ COMPARISON ============ */
export function CompareSection() {
  return (
    <section id="compare">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Why DSP</p>
          <h2>Compare before you commit.</h2>
        </div>
        <div className="compare">
          <table>
            <thead>
              <tr><th scope="col">What you get</th><th scope="col">DSP Bootcamp</th><th scope="col">Typical online bootcamp</th></tr>
            </thead>
            <tbody>
              <tr><td>Coding prerequisites</td><td><span className="tick">None — plain English</span></td><td className="cross">Usually required</td></tr>
              <tr><td>Format</td><td>5 live Zoom classes, 9–10 PM PKT</td><td>Self-paced videos</td></tr>
              <tr><td>Certificates</td><td>4 — three from Anthropic&apos;s official courses + DSP</td><td>1 platform certificate</td></tr>
              <tr><td>Final project</td><td><span className="tick">Built, deployed &amp; presented live</span></td><td className="cross">Rare</td></tr>
              <tr><td>Internship pathway</td><td><span className="tick">Yes — top students, 1 month</span></td><td className="cross">No</td></tr>
              <tr><td>Language</td><td>English + Urdu, your timezone</td><td>English only</td></tr>
              <tr><td>Fee</td><td><strong>One-time fee — everything included</strong></td><td>PKR 40,000–150,000+</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ============ INSTRUCTOR ============ */
export function InstructorSection() {
  return (
    <section className="instructor" id="instructor">
      <div className="wrap inst-grid">
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
          <p className="inst-video-cap">Sardar Abdul Ghaffar Khan walks you through the bootcamp — 3 min 54 sec</p>
        </div>
        <div>
          <p className="eyebrow">Your instructor</p>
          <h2>You&apos;re not buying a course. You&apos;re buying a teacher.</h2>
          <p><strong>Sardar Abdul Ghaffar Khan</strong> has spent 24 years in the IT industry and has taught in London, the UAE, and Pakistan. A Google-certified AI trainer, he teaches every session of this bootcamp himself — live, every night, answering your questions in English and Urdu. Press play and let him explain the course to you directly.</p>
          <p className="inst-stack">24 years in IT · Google-certified AI trainer · taught in 🇬🇧 🇦🇪 🇵🇰 · builder of <a href="https://getaisales.com">getaisales.com</a></p>
          <ul className="cred-list">
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8z" /></svg> 24 years in the IT industry across three countries</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg> Google-certified AI Agentic Trainer</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg> Every class taught live by the instructor — no pre-recorded stand-ins</li>
            <li><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4l6 6-9 9H5v-6z" /><path d="M12 6l6 6" /></svg> Builds in public: the demo agent below was built live using this exact method</li>
          </ul>
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
          <p>Before you pay a rupee, try the agent your instructor built with the same 7-day method you&apos;ll follow.</p>
        </div>
        <div className="demo-grid">
          <div className="demo-card">
            <span className="built-by">Built live by your instructor</span>
            <h3 style={{ fontSize: '1.4rem' }}>DSP Travel Agent</h3>
            <p style={{ color: 'var(--ink-soft)', marginTop: '.4rem' }}>Four specialised agents — orchestrator, researcher, planner, writer — planning real trips together, deployed on a public URL.</p>
            <ul>
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
            <p className="kicker">Your version of this</p>
            <h3 style={{ fontSize: '1.5rem', margin: '.4rem 0 .8rem' }}>On Day 7, you demo your own.</h3>
            <p style={{ color: 'var(--ink-soft)' }}>Every student plans, tools, and deploys a working agent, then presents it live to the cohort. Your project — a sales agent, a finance tracker, an SEO auditor, whatever fits your work — leaves the bootcamp deployed and demonstrable.</p>
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
            her TikTok caption, linked via "Read more". */}
        <p className="testi-cap" style={{ marginTop: '2.4rem' }}>From our earlier Master Class cohorts — same instructor, same live-teaching method, now sharpened into this 7-day format.</p>
        <div className="stu-grid" style={{ marginTop: '1rem' }}>
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
          <h2>Finish the week with four certificates.</h2>
          <p>During the bootcamp you complete three of Anthropic&apos;s official Claude courses — guided live by DSP — and earn each course&apos;s certificate of completion. Present your final project and DSP awards the fourth.</p>
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
            <p>Awarded by DSP after you present your working agent at the Day 7 showcase.</p>
          </div>
        </div>
        <p className="cert-honesty">The three Claude certificates are issued by Anthropic on completing its official courses; DSP guides you through them live as part of the bootcamp. DSP is an independent training organisation and is not affiliated with or endorsed by Anthropic. {/* Add: <a href="/certificates">See sample certificates →</a> once images are ready */}</p>
      </div>
    </section>
  )
}

/* ============ PRICING ============ */
export function PricingSection() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Fee</p>
          <h2>One fee. Nothing hidden.</h2>
        </div>
        <div className="price-card">
          <p className="big">PKR 10,000 <small>one-time</small></p>
          <p className="per">A new batch starts every Monday · Next: Mon 6 July 2026 · 30 seats</p>
          <ul className="includes">
            <li><CheckIcon /> 5 live Zoom classes (Mon–Fri, 9–10 PM PKT)</li>
            <li><CheckIcon /> Guided build day + Day 7 live showcase</li>
            <li><CheckIcon /> All 4 certificates — 3 Anthropic + 1 DSP</li>
            <li><CheckIcon /> Session replays for your cohort</li>
            <li><CheckIcon /> Cohort WhatsApp group with instructor support</li>
            <li><CheckIcon /> Internship pathway for top students (1 month)</li>
          </ul>
          <a className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20reserve%20my%20seat%20for%20Monday%27s%20batch">Reserve my seat</a>
          <p className="guarantee"><strong>Day-1 guarantee:</strong> attend the first live class. If it&apos;s not for you, message us before Day 2 and we refund the full fee.</p>
        </div>
      </div>
    </section>
  )
}

/* ============ JOIN ============ */
export function JoinSection() {
  return (
    <section className="join" id="join">
      <div className="wrap join-grid">
        <div className="join-side">
          <p className="eyebrow">Admissions</p>
          <h2>Reserve your seat for Monday.</h2>
          <p>A fresh batch starts every Monday, 9 PM PKT. Fill in your details and we&apos;ll open WhatsApp with everything pre-filled — a real person (helped by one of our own AI agents, the same kind you&apos;ll learn to build) replies within the hour, 9 AM – 11 PM PKT.</p>
          <ul>
            <li><CheckIcon /> 30 seats per cohort — small enough for every question to get answered</li>
            <li><CheckIcon /> Free 15-minute intro call before you pay, if you want one</li>
            <li><CheckIcon /> Day-1 money-back guarantee</li>
          </ul>
        </div>
        <LeadForm />
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
        <details>
          <summary>Refund policy</summary>
          <div className="policy-body">
            <p><strong>Day-1 guarantee.</strong> Attend the first live class of your cohort. If you decide the bootcamp is not for you, send us a WhatsApp message before the Day 2 class begins and we will refund your full fee within 7 working days, to the same payment method.</p>
            <p>After Day 2 begins, fees are non-refundable, because seats are limited and your seat could have gone to another student. If you cannot attend your cohort, you may transfer your seat to the next cohort once, free of charge, with at least 48 hours&apos; notice before Day 1.</p>
          </div>
        </details>
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
            <p>Enrolment is confirmed on receipt of the course fee. Class replays and materials are provided for your personal use within your cohort and may not be redistributed or resold. Certificates are issued on meeting each certificate&apos;s completion requirements. DSP may reschedule a class due to circumstances beyond its control; a replacement session will always be provided.</p>
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
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="foot-brand"><span className="brand-mark" aria-hidden="true">D</span> Digital Services Program</p>
            <p>Live AI agents training for Pakistan — taught in English and Urdu, one hour a night, by a real instructor.</p>
            <p style={{ marginTop: '.9rem' }}>Islamabad, Pakistan<br />
              <a href="mailto:info@digitalservicesprogram.com">info@digitalservicesprogram.com</a><br />
              <a href="tel:+923118122222">+92 311 8122222</a> (call &amp; WhatsApp)</p>
          </div>
          <div>
            <h3>Bootcamp</h3>
            <ul>
              <li><a href="#week">7-day schedule</a></li>
              <li><a href="#pricing">Fee</a></li>
              <li><a href="#certificates">Certificates</a></li>
              <li><a href="#instructor">Instructor</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>DSP</h3>
            <ul>
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

/* ============ Sticky mobile CTA ============ */
export function StickyCta() {
  return (
    <div className="sticky-cta" role="region" aria-label="Quick actions">
      <div className="price-tag">Next batch <small>Starts Monday</small></div>
      <a className="btn btn-primary" href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20reserve%20my%20seat%20for%20Monday%27s%20batch">
        <WhatsAppIcon />
        Reserve on WhatsApp
      </a>
    </div>
  )
}
