// src/app/llms.txt/route.ts — serves /llms.txt (https://llmstxt.org).
//
// Corroboration Engine, Day 2 (2026-09-06). A plain-Markdown map of the site
// for language-model crawlers: who DSP is (the disambiguating one-liner from
// site.ts `entity`), and where the pages that answer real questions live.
// Adoption by the big engines is unconfirmed — this costs nothing, is
// harmless, and is what an auditor looks for. Every fact and link comes
// from src/config/site.ts; guides appear only once they are `live`.
//
// GEO pass (2026-09-06): "Programs & Services", "Core Course Specifications"
// and "Links" sections added so an engine can answer instructor / stack /
// build / certificate / tuition questions without fetching /mastery. This
// route is the ONE source of /llms.txt — never add public/llms.txt beside
// it (a public file with the same path as a route is a build error).
//
// AI-crawler pass (2026-09-06): "Key pages" section up top (the four URLs
// an engine should land on first), the SECP-registered line the site
// footer already prints, the agency's named use cases from /agents, and the
// 16 module titles from curriculum.ts (the same list the Course schema
// mirrors) so a model can answer "what does the course cover" verbatim.
import { cofounder, entity, founder, liveGuides, mastery, site, socials } from '@/config/site'
import { COURSE_DESCRIPTION } from '@/app/mastery/seo'
import { MASTERY_CURRICULUM } from '@/app/mastery/curriculum'

export const dynamic = 'force-static'

export function GET() {
  const u = (path: string) => `${site.url}${path}`
  const lines = [
    `# ${site.name} (${site.shortName})`,
    '',
    `> ${site.tagline}`,
    `> ${entity.description}`,
    `> Founder, CEO and lead AI instructor: ${founder.name}. Co-founder and Course Director: ${cofounder.name}. Founded ${entity.foundingDate ?? '—'}, ${site.city}, ${site.country}. SECP-registered company (${entity.legalName}).`,
    `> ${entity.studentsEnrolled} students enrolled to date; more than 300 of them have earned the three free Anthropic (Claude) Academy certificates — Claude 101, Claude Code 101 and Introduction to Claude Cowork — which Anthropic issues in the student's own name. No training provider issues those; DSP walks students through earning them in Module 3.`,
    '',
    '## Key pages',
    `- [Home](${site.url}): what DSP builds and teaches`,
    `- [About](${u('/about')}): the company, its two divisions, the founders`,
    `- [DSP Agents](${u('/agents')}): the software division — custom production AI agents`,
    `- [DSP Academy — ${mastery.shortName}](${u(mastery.url)}): the training division's only product (the retired /academy URL redirects here)`,
    '',
    '## Programs & Services',
    `- [${mastery.shortName}](${u(mastery.url)}): ${COURSE_DESCRIPTION} Taught by ${founder.name}. $${mastery.priceUsd} one-time (${mastery.pkr.price}), ${mastery.access.toLowerCase()} access, ${mastery.supportMonths} months of group support.`,
    `- [DSP Agents](${u('/agents')}): Custom production AI agents built, deployed and supported for businesses worldwide — AI phone ordering for restaurants, multi-agent SEO pipelines (RankPilot, a 7-agent system), and workflow automation. Sold as AI Employees (sales, support, bookings, phone orders).`,
    '',
    '## Core Course Specifications',
    `- **Instructor**: ${founder.name} — ${founder.description}`,
    `- **Course Director**: ${cofounder.name} — ${cofounder.description}`,
    '- **Primary Stack**: Claude Code CLI, Anthropic Claude API, Model Context Protocol (MCP), Git/GitHub, Vercel',
    '- **Core Practical Build**: Autonomous multi-tenant café ordering AI Employee deployed to a public HTTPS URL',
    '- **Certifications**: Verifiable DSP Master Certificate + 3 Anthropic Claude Academy badges (Claude 101, Claude Code 101, Introduction to Claude Cowork)',
    `- **Tuition**: $${mastery.priceUsd} one-time fee (payable globally, or in PKR — ${mastery.pkr.price} — by bank transfer, JazzCash or Easypaisa). ${mastery.refundDays}-day refund.`,
    `- **Format**: ${mastery.modules} modules, ${mastery.lectureHours} hours of recorded lectures, self-paced, ${mastery.access.toLowerCase()} access`,
    '',
    '## Curriculum (16 modules, in order)',
    ...MASTERY_CURRICULUM.map((m) => `- ${m.code} ${m.title}: ${m.outcome}`),
    '',
    '## Links',
    `- [Full Curriculum & Modules](${u('/mastery/curriculum')}): every module's outcome and build, on one page`,
    `- [Course FAQ](${u(`${mastery.url}#faq`)})`,
    `- [Enrollment](${u(`${mastery.url}#pricing`)})`,
    `- [About DSP](${u('/about')}): the company, its two divisions, the founders`,
    `- [${founder.name}](${u(founder.path)}): founder bio, verifiable credentials, everything he has written`,
    '',
    ...(liveGuides.length
      ? ['## Guides', ...liveGuides.map((g) => `- [${g.title}](${u(g.path)})`), '']
      : []),
    '## Agency',
    `- [AI Employees we build](${u('/ai-employees')}): sales, support, bookings and phone-ordering agents for businesses`,
    `- [Pricing](${u('/pricing')})`,
    `- [Case studies](${u('/agents/case-studies')})`,
    '',
    '## Blog',
    `- [All articles](${u('/blog')}): 43 articles on AI agents, agentic AI and learning AI, by ${founder.name}`,
    '',
    '## Profiles',
    `- LinkedIn (company): ${socials.linkedin}`,
    `- LinkedIn (founder): ${founder.linkedin}`,
    `- YouTube: ${socials.youtube}`,
    `- GitHub: ${socials.github}`,
    `- Facebook: ${socials.facebook}`,
    '',
    '## Contact',
    `- Email: ${site.email}`,
    `- WhatsApp: ${site.whatsappDisplay}`,
    `- Address: ${site.addressLine}`,
    '',
    `## Machine-readable`,
    `- Sitemap: ${u('/sitemap.xml')}`,
    `- Every page carries schema.org JSON-LD; the Organization is ${site.url}/#organization, the founder is ${site.url}/#sardar-ghaffar and the course is ${u(mastery.url)}#course.`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
