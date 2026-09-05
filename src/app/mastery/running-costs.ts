// src/app/mastery/running-costs.ts — what it costs to RUN an AI Employee
// after you build it (Tier A spec §7, "the section nobody else can publish").
//
// Two tables. The first is qualitative and always renders: the bills a
// deployed café agent actually has, who sends them, and what is free. The
// second is the month-by-month figures from DSP's own café agent and is
// GATED: it renders only once `RUNNING_COST_ROWS` holds real numbers read
// off the Anthropic, Vercel and Meta dashboards. Never fill it with
// estimates — a made-up dollar figure on this page is worse than none.
export type CostComponent = { item: string; billedBy: string; free: string; note: string }

export const RUNNING_COST_COMPONENTS: readonly CostComponent[] = [
  { item: 'Claude API',
    billedBy: 'Anthropic, metered per token',
    free: 'No monthly minimum — you pay for what the agent uses',
    note: 'The only bill that grows with orders. Module 8 covers handling cost; Module 12 caps what the agent may spend.' },
  { item: 'Hosting — website + agent backend',
    billedBy: 'Vercel',
    free: 'Hobby plan is free and covers what this course deploys',
    note: 'A client\'s commercial traffic belongs on Vercel\'s paid plan, which starts at $20 a month.' },
  { item: 'Code + version control',
    billedBy: 'GitHub',
    free: 'Free',
    note: 'Public or private repo, unlimited commits — Module 6.' },
  { item: 'Kitchen email + Google Sheets via MCP',
    billedBy: 'Google',
    free: 'Free with a Google account',
    note: 'Orders are emailed and written to Sheets through MCP — Modules 8 and 10.' },
  { item: 'WhatsApp or voice channel',
    billedBy: 'Meta (per conversation) or a telephony provider',
    free: 'Optional — the café agent in the course runs on a web URL',
    note: 'Zero until you add a channel. Modules 14 and 15 cover when a client\'s use case justifies one.' },
]

export type CostRow = { orders: string; api: string; hosting: string; channel: string; total: string }

/** Real monthly figures from DSP's own café agent, per order volume —
 *  `null` until the owner fills them from the dashboards (then the numeric
 *  table renders under the components table). Example shape:
 *  [{ orders: '300', api: '$4', hosting: '$0', channel: '$0', total: '$4' }, …] */
export const RUNNING_COST_ROWS: readonly CostRow[] | null = null
