// src/app/llms.txt/route.ts — serves /llms.txt (https://llmstxt.org).
//
// Corroboration Engine, Day 2 (2026-09-06). A plain-Markdown map of the site
// for language-model crawlers: who DSP is (the disambiguating one-liner from
// site.ts `entity`), and where the pages that answer real questions live.
// Adoption by the big engines is unconfirmed — this costs nothing, is
// harmless, and is what an auditor looks for. Every fact and link comes
// from src/config/site.ts; guides appear only once they are `live`.
import { entity, founder, liveGuides, mastery, site, socials } from '@/config/site'

export const dynamic = 'force-static'

export function GET() {
  const u = (path: string) => `${site.url}${path}`
  const lines = [
    `# ${site.name} (${site.shortName})`,
    '',
    `> ${entity.description}`,
    `> Founder and lead instructor: ${founder.name}. Founded ${entity.foundingDate ?? '—'}, ${site.city}, ${site.country}.`,
    '',
    '## Start here',
    `- [${mastery.name}](${u(mastery.url)}): the course — price ($${mastery.priceUsd} one-time, ${mastery.pkr.price}), ${mastery.modules} modules, certificates, FAQ, taught in Urdu and English`,
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
    `- Every page carries schema.org JSON-LD; the Organization is ${site.url}/#organization and the founder is ${site.url}/#sardar-ghaffar.`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
