import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { site, waLink, mastery } from '@/config/site'
import { bunnyConfigured, welcomeEmbedPath } from '@/lib/mastery/bunny'
import TrackedLink from '@/components/site/TrackedLink'
import MasteryClient from './MasteryClient'
import LazyEmbed from '@/components/site/LazyEmbed'
import { breadcrumbLd } from '@/lib/schema'
import { masterySchema } from './schema'
import { CANONICAL, SEO_DESCRIPTION, SEO_TITLE } from './seo'
import './mastery.css'

// WhatsApp-first conversion (owner ruling 2026-08-30): every primary CTA on
// this page opens WhatsApp so the owner talks to each buyer before payment.
// The prefill differs per CTA location — that, plus the whatsapp_click
// location param, is how conversions are attributed. The self-serve payment
// path (/mastery/enrol) stays reachable as the "Pay directly" secondary next
// to every primary; it keeps firing begin_enrol.
const WA_MSG = {
  nav: 'Hi DSP, I want to enrol in AI Agent Mastery. ($100)',
  hero: 'Hi DSP, I want to join AI Agent Mastery. ($100)',
  build: 'Hi DSP, I want to build my own AI Employee — tell me about Mastery.',
  certs: 'Hi DSP, I want to enrol in AI Agent Mastery and earn the certificates.',
  offer: "Hi DSP, I'm ready to enrol in AI Agent Mastery.",
  final: 'Hi DSP, I have a question before enrolling in Mastery.',
  sticky: 'Hi DSP, I want to enrol in AI Agent Mastery.',
}


// Structured data: one JSON-LD @graph (Organization · WebSite · WebPage ·
// Person · Course · FAQPage) built in ./schema.ts, plus the sitewide
// BreadcrumbList. The FAQ and curriculum text the graph carries is mirrored
// from the sections below via ./faqs.ts and ./curriculum.ts —
// `npm run test:schema` keeps them in step, so edit copy in both places.

// Fonts cascade from the root layout's next/font trio (Instrument Serif /
// Inter / JetBrains Mono) via the :root variable mapping — no local loads.
// Embed tokens are no longer baked into this page: iframes point at
// /api/video/[videoId], which signs a short-lived token per request.

// Title, description and canonical live in ./seo.ts, shared with the
// JSON-LD graph so <title>, Open Graph, Twitter and schema never drift.
export const metadata: Metadata = {
  // `absolute` on purpose: the root layout applies a '%s | DSP' template to
  // plain string titles, and SEO_TITLE already ends in '| DSP' — a string
  // here would render the suffix twice.
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  // Next merges `openGraph` shallowly: once this page declares its own block,
  // the root layout's siteName/type/images are NOT inherited. They are
  // restated here so the existing /og-card.png stays the share image.
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: CANONICAL,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og-card.png', width: 1200, height: 630, alt: mastery.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ['/og-card.png'],
  },
}

export default function MasteryPage() {
  const enrolHref = mastery.checkoutUrl ?? '/mastery/enrol'
  const welcomeSrc = welcomeEmbedPath
  // Real student stories, recorded on camera — the same videos that sit in Module 15.
  const stories = [
    { guid: '7e642dff-ebb7-48a5-9da5-e94190716a56', name: 'Mohsin', where: 'United Kingdom',
      line: 'A finance professional with no software background. He built his first website and AI agent in the program and deployed it live.' },
    { guid: '2c5ac1cf-9643-4265-9c0a-72af532a84a9', name: 'DSP student', where: 'Pakistan',
      line: 'Earned PKR 60,000 from AI work before he had even finished the bootcamp.' },
    { guid: 'e50847ea-7fa4-4e26-ae72-1273fec6ae33', name: 'DSP student', where: 'Agentic Master Class',
      line: 'Came for practical skills — AI agents, automation and prompt engineering — and says the training changed how she works.', portrait: true },
  ].map((v) => ({ ...v, src: bunnyConfigured ? `/api/video/${v.guid}` : null })).filter((v) => v.src)
  return (
    <div className="page-mastery">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(masterySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: 'AI Agent Mastery', path: '/mastery' }])) }} />
<nav className="nav"><div className="wrap">
  <a className="logo" href="#top">DSP <span>·</span> AI Agent Mastery</a>
  <div className="navlinks">
    <a href="#journey">Journey</a><a href="#build">What you build</a><a href="#curriculum">Curriculum</a><a href="#included">What&apos;s included</a><a href="#faq">FAQ</a>
  </div>
  <div className="nav-cta">
    <TrackedLink className="paylink" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'nav' }}>Pay directly</TrackedLink>
    <TrackedLink className="btn btn-gold btn-sm" target="_blank" rel="noopener" href={waLink(WA_MSG.nav)} event="whatsapp_click" params={{ location: 'nav' }}>Enrol — $100</TrackedLink>
  </div>
</div></nav>


<header className="hero" id="top"><div className="wrap">
  <div>
    <div className="eyebrow">Self-paced · Lifetime access · 1 year free support</div>
    <h1>Go from zero to <em>building, deploying and selling</em> AI agents.</h1>
    <p className="lead">15 modules. One real AI Employee you build from an empty folder to a live URL — then your own. No coding background needed. Taught in Urdu &amp; English, all materials in English.</p>
    <div className="cta-row">
      <TrackedLink className="btn btn-gold" target="_blank" rel="noopener" href={waLink(WA_MSG.hero)} event="whatsapp_click" params={{ location: 'hero' }}>Start building <span className="price-tag">$100 · one-time</span></TrackedLink>
      <a className="btn btn-ghost" href="#welcome">Watch the 6-minute tour</a>
    </div>
    <p className="paynote"><TrackedLink className="paylink" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'hero' }}>Pay directly — bank transfer · JazzCash · Easypaisa</TrackedLink></p>
    <div className="trust">
      <span><b>24 years</b> teaching IT</span>
      <span><b>Thousands</b> of students</span>
      <span>Students in <b>UK, UAE, USA, Canada &amp; more</b></span>
      <span><b>Google &amp; Anthropic</b>-verified trainer</span>
      <span><b>7-day</b> money-back guarantee</span>
    </div>
  </div>

  <div className="formula" aria-label="The DSP agent formula">
    <div className="lab"><span>The one formula behind the whole program</span><i>assembling…</i></div>
    <div className="eq">
      <span className="term a">Agent<small>what you ship</small></span>
      <span className="op">=</span>
      <span className="term b">Claude<small>the brain · M03</small></span>
      <span className="op">+</span>
      <span className="term c">Job Description<small>who it is · M02</small></span>
      <span className="op">+</span>
      <span className="term d">Tools<small>what it can do · M08–M10</small></span>
      <span className="op">+</span>
      <span className="term e">Memory<small>what it remembers · M09</small></span>
      <span className="op">+</span>
      <span className="term f">Loop<small>until done · M07</small></span>
    </div>
    <p className="note">Every module adds one piece. By Module 13 you have all five, live, on a URL you can send to anyone.</p>
  </div>
</div></header>


{/* WELCOME VIDEO */}
{welcomeSrc && (
<section id="welcome" style={{paddingTop:'0'}}><div className="wrap">
  <div className="eyebrow">Six minutes inside DSP</div>
  <h2>Watch what you&apos;ll be building — running my business today.</h2>
  <p className="lead" style={{marginBottom:'28px'}}>The AI Employee that handles DSP&apos;s admissions, the content system behind 6 million views, and what the program looks like from the inside. Recorded by Sardar, not a marketing team.</p>
  <LazyEmbed
    src={welcomeSrc}
    title="Welcome to DSP AI Agent Mastery"
    load="click"
    style={{borderRadius:'20px',border:'1px solid var(--line)'}}
  />
</div></section>
)}


<section><div className="wrap">
  <div className="eyebrow">Why this exists</div>
  <h2>You already use AI every day. You still can&apos;t build with it.</h2>
  <p className="lead" style={{marginBottom:'36px'}}>That is the whole gap this program closes — and it is a smaller gap than it looks from the outside.</p>
  <div className="grid3">
    <div className="card"><div className="k">Where most people are</div><h3>Chatting, not building</h3><p>You ask Claude or ChatGPT a question, copy the answer, and start again tomorrow. Nothing you made on Monday is still working for you on Friday.</p></div>
    <div className="card"><div className="k">What stops them</div><h3>Every tutorial assumes you code</h3><p>Free material jumps from &quot;what is an agent&quot; straight to Python and API keys, so you stop at the first error nobody explains.</p></div>
    <div className="card"><div className="k">What changes here</div><h3>You describe it — then you ship it</h3><p>Fifteen modules, one build at a time, ending in a live URL that keeps running after you close the laptop, and a system you can sell to someone else.</p></div>
  </div>
</div></section>


<section id="build"><div className="wrap">
  <div className="eyebrow">What you build</div>
  <div className="demo">
    <div>
      <h2>Meet your AI Employee — the project you build from nothing.</h2>
      <p className="lead">A café ordering agent. It starts as an empty folder in Module 4 and finishes in Module 14 serving two cafés from one codebase. Every module adds one real capability to it.</p>
      <ul className="milestones">
        <li><span className="mnum">M04–05</span><div><b>Website</b><span>Home, menu, about, order form. Responsive. No code written by hand.</span></div></li>
        <li><span className="mnum">M07</span><div><b>Ordering agent</b><span>Takes an order item by item, handles corrections, confirms the total.</span></div></li>
        <li><span className="mnum">M08–10</span><div><b>Connected</b><span>Claude API in the backend, orders emailed to the kitchen, written to Sheets via MCP.</span></div></li>
        <li><span className="mnum">M09</span><div><b>Memory</b><span>Knows the menu and allergens. Remembers a returning customer&apos;s last order.</span></div></li>
        <li><span className="mnum">M11–13</span><div><b>Live</b><span>Tested with the 10-Question sheet, hardened against prompt injection, deployed on Vercel.</span></div></li>
        <li><span className="mnum">M14</span><div><b>Two cafés, one system</b><span>Multi-tenant. This is the shape of what you sell to clients.</span></div></li>
      </ul>
    </div>
    <div className="chat" aria-label="Example AI Employee conversation">
      <div className="bar"><i></i> AI Employee · live on ai-employee-yourname.vercel.app</div>
      <div className="msgs">
        <div className="m a">Welcome back, Ayesha. Same as last time — one cappuccino and a chicken tikka wrap?</div>
        <div className="m u">Yes, but make the cappuccino oat milk. And is the wrap spicy?</div>
        <div className="m a">Medium spice — the marinade has green chilli. Want it mild instead?</div>
        <div className="m u">Mild please. That&apos;s it.</div>
        <div className="m a">Order: 1 oat cappuccino, 1 chicken tikka wrap (mild). Total $12. Confirm?</div>
        <div className="m u">Confirm</div>
        <div className="m t">→ order #0417 sent to kitchen · row added to Sheets · owner notified on WhatsApp</div>
        <div className="m a">Done. Ready in about 12 minutes.</div>
      </div>
    </div>
  </div>
  <div className="cta-row" style={{justifyContent:'center',marginTop:'40px'}}>
    <TrackedLink className="btn btn-gold" target="_blank" rel="noopener" href={waLink(WA_MSG.build)} event="whatsapp_click" params={{ location: 'build' }}>Start building yours <span className="price-tag">$100 · one-time</span></TrackedLink>
    <TrackedLink className="paylink" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'build' }}>Pay directly</TrackedLink>
  </div>
</div></section>


<section><div className="wrap">
  <div className="eyebrow">Students</div>
  <h2>From the live cohorts this program was recorded in.</h2>
  <p className="lead" style={{marginBottom:'36px'}}>Not written quotes — the students themselves, on camera. Both videos are lessons inside Module 15.</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'28px'}}>
    {stories.map((v) => (
      <div className="card" key={v.guid} style={{padding:'18px'}}>
        <LazyEmbed
          src={v.src!}
          title={`${v.name} — DSP student story`}
          portrait={Boolean((v as {portrait?:boolean}).portrait)}
          style={{
            maxWidth:(v as {portrait?:boolean}).portrait?'300px':undefined,
            margin:(v as {portrait?:boolean}).portrait?'0 auto':undefined,
            borderRadius:'12px',
          }}
        />
        <p className="md" style={{marginTop:'14px'}}>{v.line}</p>
        <div className="by">{v.name} · {v.where}</div>
      </div>
    ))}
  </div>
  <p className="muted" style={{marginTop:'22px'}}>Results depend on the work you put in. These are individual students, not a promise of income.</p>
</div></section>


<section><div className="wrap">
  <div className="eyebrow">Who this is for</div>
  <h2>Built for people who use AI every day but have never built with it.</h2>
  <p className="lead" style={{marginBottom:'36px'}}>If you can describe what you want in plain words, you can build an agent. That is the entire skill this program teaches.</p>
  <div className="grid3">
    <div className="card"><div className="k">Students &amp; graduates</div><h3>Skills a job description asks for</h3><p>Leave with a live agent on GitHub and a certificate that verifies what you built — not what you watched.</p></div>
    <div className="card"><div className="k">Teachers &amp; trainers</div><h3>Automate the admin, keep the teaching</h3><p>Build an agent that answers parent queries, grades against a rubric, or drafts lesson plans from your notes.</p></div>
    <div className="card"><div className="k">Freelancers</div><h3>Add a $500–$2,000 service line</h3><p>Deliver agents to clients using the same discovery, proposal and pricing templates DSP uses.</p></div>
    <div className="card"><div className="k">Marketers</div><h3>Agents that run your pipeline</h3><p>Lead qualification, follow-up sequences, content research — built by you, connected to your tools.</p></div>
    <div className="card"><div className="k">Business owners</div><h3>Your first AI employee</h3><p>A booking, ordering or support agent for your own business, running on WhatsApp, web or email.</p></div>
    <div className="card"><div className="k">Working abroad</div><h3>Learn in Urdu and English, on your own time</h3><p>Lectures are taught in an Urdu–English mix, with English materials and subtitles. Study at 6 am in Dubai or midnight in Manchester. Nothing is live-only.</p></div>
  </div>
</div></section>


<section id="journey" className="journey"><div className="wrap">
  <div className="eyebrow">The journey</div>
  <h2>Five phases. Fifteen modules. One project that grows with you.</h2>
  <p className="lead" style={{marginBottom:'48px'}}>Modules open in order, one build at a time — that&apos;s how everyone finishes. No tests, no grades. You watch, you build, you move on.</p>
  <div className="rail" id="rail">
    <div className="phase"><div className="dot">0</div><h3>Zero — Foundations</h3><div className="out">You can explain what an agent is and write a Job Description that works</div>
      <div className="mods"><span>M01 AI Foundations</span><span>M02 Prompting &amp; Context Engineering</span><span>M03 Claude · ChatGPT · Gemini</span></div>
      <p className="build"><b>You produce:</b> one chosen agent idea, a tested 7-Part Job Description, and a working Claude Project.</p></div>
    <div className="phase"><div className="dot">1</div><h3>Builder</h3><div className="out">You can build and version software by describing it</div>
      <div className="mods"><span>M04 Vibe Coding</span><span>M05 Websites</span><span>M06 Git &amp; GitHub</span></div>
      <p className="build"><b>You produce:</b> AI Employee Parts 1–2 — a responsive café website, on GitHub, from an empty folder.</p></div>
    <div className="phase"><div className="dot">2</div><h3>Agent Engineer</h3><div className="out">Your website becomes an agent that acts, remembers and connects</div>
      <div className="mods"><span>M07 AI Agents</span><span>M08 APIs</span><span>M09 RAG &amp; Memory</span><span>M10 MCP</span></div>
      <p className="build"><b>You produce:</b> AI Employee Parts 3–6 — takes orders, remembers customers, emails the kitchen, writes to Google Sheets.</p></div>
    <div className="phase"><div className="dot">3</div><h3>Production</h3><div className="out">Your agent is tested, hardened and live on the internet</div>
      <div className="mods"><span>M11 Testing &amp; Observability</span><span>M12 Security</span><span>M13 Deployment</span></div>
      <p className="build"><b>You produce:</b> AI Employee LIVE — a public URL you can send to anyone.</p></div>
    <div className="phase"><div className="dot">4</div><h3>Seller</h3><div className="out">You can turn one agent into a business and sell it</div>
      <div className="mods"><span>M14 Multi-Agent &amp; Business Automation</span><span>M15 Selling AI Solutions</span><span>Capstone</span></div>
      <p className="build"><b>You produce:</b> your AI Employee serving two cafés from one system, a real client proposal, and your own original agent — the capstone that earns the certificate.</p></div>
  </div>
</div></section>


<section><div className="wrap">
  <div className="eyebrow">How it works</div>
  <h2>Watch. Build. Share. Move on.</h2>
  <p className="lead" style={{marginBottom:'36px'}}>The same rhythm every module, so you never wonder what to do next. No tests. No grades.</p>
  <div className="steps">
    <div className="step"><div className="sn">1</div><b>Watch</b><p>Chaptered lectures, 35–60 minutes, taught in Urdu and English.</p></div>
    <div className="step"><div className="sn">2</div><b>Build</b><p>A specific project with a template and copy-paste prompts. Always a real artefact.</p></div>
    <div className="step"><div className="sn">3</div><b>Share</b><p>Post your screenshot or URL in the DSP group. Stuck? Ask — someone ahead of you has hit it.</p></div>
    <div className="step"><div className="sn">4</div><b>Move on</b><p>Mark the module complete and the next one opens. Badges at each phase.</p></div>
  </div>

</div></section>


<section><div className="wrap">
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'18px',marginBottom:'44px'}}>
    {[
      { img: '/mastery/cert-claude-101.jpg', name: 'Claude 101', by: 'Anthropic, USA' },
      { img: '/mastery/cert-claude-code-101.jpg', name: 'Claude Code 101', by: 'Anthropic, USA' },
      { img: '/mastery/cert-claude-cowork.jpg', name: 'Introduction to Claude Cowork', by: 'Anthropic, USA' },
      { img: '/mastery/cert-dsp-master.jpg', name: 'DSP AI Agent Mastery', by: 'Digital Services Program' },
    ].map((c) => (
      <div className="card" key={c.name} style={{padding:'14px',display:'flex',flexDirection:'column'}}>
        <div style={{position:'relative',paddingTop:'66%',borderRadius:'10px',overflow:'hidden',background:'var(--ink)',border:'1px solid var(--line)'}}>
          <Image src={c.img} alt={`${c.name} — certificate issued by ${c.by}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" style={{objectFit:'cover'}} />
        </div>
        <div className="by" style={{marginTop:'12px'}}>{c.name}</div>
        <div className="muted" style={{fontSize:'13px'}}>{c.by}</div>
      </div>
    ))}
  </div>
  <div style={{maxWidth:'840px'}}>
    <div>
      <div className="eyebrow">Certificates</div>
      <h2>Three certificates from Claude — Anthropic, USA. And one from DSP.</h2>
      <p className="lead">Every certificate has a public verification page showing the capstone URL and repo behind it. An employer or client can open it and see the agent working. Featured capstones earn Master with Distinction.</p>
      <p className="md" style={{marginTop:'18px'}}><b>You finish with four, and three of them are not ours.</b> Module 3 takes you through Claude Academy, the training run by Anthropic — the American company in San Francisco that builds Claude — and you come out holding <b>Claude 101</b>, <b>Claude Code 101</b> and <b>Introduction to Claude Cowork</b>, each with your own name on it. Anthropic issues them, so they say nothing about DSP and everything about you. The fourth is the DSP Master certificate, and it is the one that points at a live agent you built.</p>
      <p className="md" style={{marginTop:'12px'}}>None of this is out of reach. Every DSP student who follows the module earns all three — no exam fee, no waiting list, no degree required. Ours have been earning them for months, and we publish every one on our channels the week it lands.</p>
      <div className="badges">
        <span><b>M06</b>Builder</span><span><b>M10</b>Agent Engineer</span><span><b>M13</b>Production-Ready</span><span><b>M15</b>AI Solutions Seller</span><span><b>CAP</b>Master</span>
      </div>
    </div>
  </div>
  <div className="cta-row" style={{justifyContent:'center',marginTop:'40px'}}>
    <TrackedLink className="btn btn-gold" target="_blank" rel="noopener" href={waLink(WA_MSG.certs)} event="whatsapp_click" params={{ location: 'certificates' }}>Enrol now — $100</TrackedLink>
    <TrackedLink className="paylink" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'certificates' }}>Pay directly</TrackedLink>
  </div>
</div></section>


<section><div className="wrap">
  <div className="who">
    <div className="portrait"><Image src="/mastery/sardar.jpg" alt="Sardar Ghaffar, founder and lead instructor, Digital Services Program" width={640} height={800} /></div>
    <div>
      <div className="eyebrow">Your instructor</div>
      <h2><Link href="/about">Sardar Ghaffar</Link></h2>
      <p className="lead">I was in IT before most of my students had email. Twenty-four years of teaching — in London, the UAE and Pakistan — and the last few spent on one thing: showing people who aren&apos;t programmers how to build AI agents that work and earn.</p>
      <p className="lead" style={{marginTop:'14px'}}>Everything in this program is what I use with real clients. The templates are the ones my team uses. The AI Employee you build is a simplified version of the multi-tenant agents DSP builds for businesses. I&apos;ve watched thousands of students go from &quot;what is an agent?&quot; to a live URL. This is the path they took, cleaned up.</p>
      <div className="creds">
        <span>Founder, Digital Services Program</span><span>Google-verified AI Agentic Trainer</span><span>Anthropic (Claude)-verified educator</span><span>24 years in IT</span>
      </div>
    </div>
  </div>
</div></section>


<section id="included"><div className="wrap">
  <div className="eyebrow">What&apos;s included</div>
  <h2>Everything you need, nothing you&apos;ll never open.</h2>
  <div className="stack" id="pricing">
    <ul>
      <li><span>30+ hours of lectures, cut and chaptered, across 15 modules</span><span>~30 hrs</span></li>
      <li><span>AI Employee build thread — 8 parts, empty folder to two live cafés</span><span>1 project</span></li>
      <li><span>Original capstone, reviewed by the DSP team</span><span>1 project</span></li>
      <li><span>Resource Vault — 100+ prompts, 25 starter Job Descriptions, templates, checklists</span><span>100+ files</span></li>
      <li><span>AI Employee build-prompts PDF, copy-paste ready</span><span>PDF</span></li>
      <li className="hi"><span>Client Acquisition Kit — discovery sheet, proposal, pricing calculator, contract, outreach pack</span><span>bonus</span></li>
      <li className="hi"><span>One Agent Many Clients blueprint — the multi-tenant model DSP sells</span><span>bonus</span></li>
      <li className="hi"><span>One year of free support in the DSP group</span><span>12 months</span></li>
      <li className="hi"><span>Live weekend session — bring your build, we debug it on the call, recorded</span><span>every weekend</span></li>
      <li><span>DSP Master certificate with a verifiable URL + 4 milestone badges</span><span>on completion</span></li>
      <li><span>Claude Academy badges: Claude 101, Claude Code 101, Claude Cowork</span><span>issued by Anthropic, USA</span></li>
      <li><span>Lifetime access and every future update</span><span>lifetime</span></li>
    </ul>
    <aside className="pricebox">
      <div className="strike">Later: $197</div>
      <div className="big">$100<small>one-time</small></div>
      <p>Founding price. Lifetime access. One year of group support included. No subscription, no upsell required to finish.</p>
      <TrackedLink className="btn btn-gold" target="_blank" rel="noopener" href={waLink(WA_MSG.offer)} event="whatsapp_click" params={{ location: 'offer' }}>Enrol now — $100</TrackedLink>
      <TrackedLink className="btn btn-ghost" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'offer' }} style={{marginTop:'10px'}}>Pay directly — bank transfer · JazzCash · Easypaisa</TrackedLink>
      <p className="paynote" style={{textAlign:'center'}}><a className="paylink" href="#welcome">Watch the 6-minute intro first</a></p>
      <div className="guarantee">7-day money-back guarantee. Start Module 1; if it isn&apos;t for you, email us within 7 days for a full refund.</div>
      <div className="pay">Pakistan: bank transfer · JazzCash · Easypaisa<br />Card checkout coming shortly — email us to pay by card today</div>
    </aside>
  </div>
</div></section>


<section id="curriculum"><div className="wrap">
  <div className="eyebrow">Curriculum</div>
  <h2>Fifteen modules. Every one ends with something you built.</h2>
  <p className="lead" style={{marginBottom:'36px'}}>Around 30 hours of lectures, recorded live with real students asking real questions — cut, chaptered and put in the order a beginner needs.</p>
  <div className="acc">
    <details><summary><span className="n">M01</span>AI Foundations<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Explain what an LLM and an agent are, what each can&apos;t do, and pick one idea worth building.</div><div><b>You build</b>5 ideas through the Agent Idea Filter, one chosen with a clear user and success condition.</div></div></details>
    <details><summary><span className="n">M02</span>Prompting &amp; Context Engineering<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Write a production-grade Job Description using the 7-Part JD: Role, Goal, Audience, Tone, Steps, Rules, Examples.</div><div><b>You build</b>Your JD v2 with three real test inputs and a note on what you changed.</div></div></details>
    <details><summary><span className="n">M03</span>Claude · ChatGPT · Gemini<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Set up Claude, Console, Claude Code, GitHub and Vercel correctly; know when to reach for each tool.</div><div><b>You build</b>A working Claude Project and a completed setup checklist.</div></div></details>
    <details><summary><span className="n">M04</span>Vibe Coding<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Build software by describing it: PLAN → BUILD ONE FEATURE → TEST → COMMIT → NEXT, with Claude Code.</div><div><b>You build</b>Your AI Employee, Part 1 running locally, on video.</div></div></details>
    <details><summary><span className="n">M05</span>Websites<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Ship a responsive multi-page site with forms from a one-page spec.</div><div><b>You build</b>the AI Employee&apos;s four pages, desktop and mobile screenshots.</div></div></details>
    <details><summary><span className="n">M06</span>Git &amp; GitHub<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Version-control every project; branch, merge, recover a mistake, fix the common permission errors.</div><div><b>You build</b>A public repo with ten meaningful commits.</div></div></details>
    <details><summary><span className="n">M07</span>AI Agents<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Build a real agent — Job Description + Tools + Loop — that completes a multi-step task.</div><div><b>You build</b>A demo of your AI Employee taking a full order, plus its architecture on one page.</div></div></details>
    <details><summary><span className="n">M08</span>APIs<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Connect to the Claude API and one external service; keep keys safe; handle errors and cost.</div><div><b>You build</b>An order sent by email/Sheets from the agent, with a clean repo history.</div></div></details>
    <details><summary><span className="n">M09</span>RAG &amp; Memory<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Give an agent knowledge and memory using the Memory Ladder; pick the right rung for the job.</div><div><b>You build</b>Five grounded answers from a knowledge base and memory across two sessions.</div></div></details>
    <details><summary><span className="n">M10</span>MCP<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Connect an agent to real tools — Sheets, Calendar, Gmail — through the Model Context Protocol.</div><div><b>You build</b>An MCP tool executing from the agent, result visible in the external app.</div></div></details>
    <details><summary><span className="n">M11</span>Testing &amp; Observability<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Test systematically with the DSP 10-Question Test Sheet; read logs instead of guessing.</div><div><b>You build</b>The completed sheet, three fixes with before/after, and a log.</div></div></details>
    <details><summary><span className="n">M12</span>Security<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Protect keys, block prompt injection, limit what the agent can do and spend.</div><div><b>You build</b>A 15-point checklist signed off and ten injection attempts logged.</div></div></details>
    <details><summary><span className="n">M13</span>Deployment<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Put your AI Employee on a public HTTPS URL with the backend hosted and env vars set.</div><div><b>You build</b>The live URL — share it in the group.</div></div></details>
    <details><summary><span className="n">M14</span>Multi-Agent &amp; Business Automation<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Turn one agent into a business system: One Agent Many Clients, notifications, and when multi-agent is worth it.</div><div><b>You build</b>your AI Employee serving two cafés from one deployment.</div></div></details>
    <details><summary><span className="n">M15</span>Selling AI Solutions<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Run discovery, price the work, write the proposal, deliver, get paid — as a freelancer or a one-person agency.</div><div><b>You build</b>A discovery sheet and a proposal for a real business.</div></div></details>
    <details><summary><span className="n">CAP</span>Capstone — your own agent<span className="plus">+</span></summary><div className="body"><div><b>Outcome</b>Build, test, secure, deploy and pitch an original agent for a real use case — not the café AI Employee.</div><div><b>You build</b>Live URL, repo, 3-minute demo, 1-page proposal — reviewed by the DSP team. This earns the certificate.</div></div></details>
  </div>
</div></section>


<section id="faq"><div className="wrap">
  <div className="eyebrow">Questions</div>
  <h2>Before you ask.</h2>
  <div className="faq" style={{maxWidth:'820px'}}>
    <details><summary>I have never coded. Can I really do this?</summary><p>Yes. That is the audience this was built for. You describe what you want and Claude Code writes the code. Your job is to plan, direct, test and ship — which is what the program teaches. If you can write a clear WhatsApp message, you can write a Job Description.</p></details>
    <details><summary>How much time does it take?</summary><p>About an hour a day for 30 days, or four sessions a week for eight weeks. Each module is one to three lectures plus a build. Lifetime access means you can go slower — the only thing that doesn&apos;t work is stopping.</p></details>
    <details><summary>Windows or Mac?</summary><p>Both. Setup guides for each are in Module 3, including the fixes for the common Windows issues we&apos;ve solved with hundreds of students.</p></details>
    <details><summary>Is $100 really all I pay?</summary><p>$100 covers the entire program, lifetime. You will need a Claude account to build with during the modules — Module 3 walks you through setup and the free-tier route, and paid Claude plans start at $20/month if you choose to upgrade. GitHub and Vercel are free for what this program uses. No other purchase is required to finish.</p></details>
    <details><summary>What does &quot;one year of free support&quot; mean?</summary><p>You&apos;re in the DSP group from day one, and questions there are answered within one working day. On top of that there&apos;s a live session every weekend — bring your build, we debug your errors on the call, and every session is recorded. Support runs for a full year.</p></details>
    <details><summary>Is it in Urdu or English?</summary><p>Lectures are taught in an Urdu–English mix, the way DSP teaches live. All templates, slides and downloads are in English. Subtitles are provided.</p></details>
    <details><summary>Can I pay from Pakistan?</summary><p>Yes — bank transfer, JazzCash or Easypaisa. Go to the enrol page, send the payment, upload the screenshot with your email, and we send your sign-in link once it&apos;s verified — usually within a few hours.</p></details>
    <details><summary>Do I get a recognised certificate?</summary><p>Two kinds. The DSP Master certificate has a public verification page showing the live agent you built — that is proof of work, not attendance. Separately, Module 3 walks you through Claude Academy, the free training run by Anthropic — the US company that builds Claude — so you finish holding three of their course completion badges with your name on them — Claude 101, Claude Code 101 and Introduction to Claude Cowork. Those are issued by Anthropic, not by DSP. Neither is a university accreditation; what employers and clients actually check is the working agent behind the link.</p></details>
    <details><summary>Refunds?</summary><p>Seven days, no questions. Start Module 1; if it isn&apos;t for you, email us and we refund in full.</p></details>
  </div>
</div></section>


<section className="final" id="checkout"><div className="wrap">
  <div className="eyebrow" style={{justifyContent:'center'}}>Start today</div>
  <h2>Module 1, Lesson 1 is waiting.</h2>
  <p className="lead">One hundred dollars, once. Lifetime access. A year of support. A live agent with your name on it at the end.</p>
  {/* Primary IS WhatsApp here, so the old "Ask a question" WhatsApp ghost is
      gone — its job moved into the final prefill (question-friendly). */}
  <div className="cta-row" style={{justifyContent:'center'}}>
    <TrackedLink className="btn btn-gold" target="_blank" rel="noopener" href={waLink(WA_MSG.final)} event="whatsapp_click" params={{ location: 'final' }}>Enrol now — $100 one-time</TrackedLink>
    <TrackedLink className="btn btn-ghost" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'final' }}>Pay directly</TrackedLink>
  </div>
  <address style={{marginTop:'20px',fontFamily:'var(--mono)',fontSize:'12px',color:'var(--muted)',fontStyle:'normal'}}>digitalservicesprogram.com · {site.whatsappDisplay} · {site.addressLine}</address>
</div></section>



<footer><div className="wrap">
  <span>© 2026 <Link href="/">Digital Services Program</Link> · Sardar Group of Companies</span>
  <span>Privacy · Terms · Refund policy</span>
</div></footer>

<div className="sticky" id="sticky"><div className="wrap">
  <div className="l"><b>DSP AI Agent Mastery</b> <span>· $100 one-time · 7-day refund</span></div>
  <div className="nav-cta">
    <TrackedLink className="paylink" href={enrolHref} event="begin_enrol" params={{ cta: 'pay_direct', location: 'sticky' }}>Pay directly</TrackedLink>
    <TrackedLink className="btn btn-gold btn-sm" target="_blank" rel="noopener" href={waLink(WA_MSG.sticky)} event="whatsapp_click" params={{ location: 'sticky' }}>Enrol now</TrackedLink>
  </div>
</div></div>

<div id="free" hidden></div>
      <MasteryClient />
    </div>
  )
}
