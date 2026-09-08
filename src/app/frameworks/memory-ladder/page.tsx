// src/app/frameworks/memory-ladder/page.tsx — Framework page (Day 3).
//
// DSP's way of deciding which kind of memory an agent needs, as taught in
// Module 9 (RAG & Memory). The rungs are the ones on the Memory Ladder
// diagram students download in that module, from least to most persistent:
// context window → files → retrieval (RAG) → persistent store — plus the
// rung above it that the agency's multi-tenant AI Employees use, shared
// memory across one business's agents. Rule of the ladder: pick the LOWEST
// rung that solves the actual problem. DefinedTerm + HowTo schema.
import type { Metadata } from 'next'
import Link from 'next/link'
import Guide from '@/components/guides/Guide'
import { founder, mastery, site } from '@/config/site'
import type { Faq, JsonLd } from '@/lib/schema'

const PATH = '/frameworks/memory-ladder'
const TITLE = 'The Memory Ladder: Which Kind of Memory an AI Agent Needs, and When'
const DESCRIPTION =
  'The Memory Ladder is DSP\'s framework for choosing an AI agent\'s memory: five rungs from the context window, through files and retrieval (RAG), to a persistent per-customer store and shared memory across a business\'s agents. Pick the lowest rung that solves the problem. With a decision table and the café example.'
const PUBLISHED = '2026-09-08'
const UPDATED = '2026-09-08'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | DSP` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'article', url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: '/og-card.png', width: 1200, height: 630 }] },
}

const DEFINITION =
  'The Memory Ladder is DSP\'s framework for deciding what an AI agent should remember: five rungs from least to most persistent — the context window, attached files, retrieval from a knowledge base (RAG), a persistent per-customer store, and shared memory across a business\'s agents — with one rule: use the lowest rung that solves the actual problem.'

const ANSWER =
  `${DEFINITION} Most AI employees need rung 3 for the business's facts and rung 4 for returning customers; almost none need more.`

const TERM_ID = `${site.url}${PATH}#term`

const RUNGS = [
  {
    n: '1',
    name: 'Context window',
    persists: 'This conversation only',
    what: 'What has been said so far in the current chat — the last few messages back and forth. Every agent has this for free. It is enough for the agent to remember that the customer asked for a large chai two messages ago, and it disappears the moment the conversation ends.',
    use: 'Following a single conversation.',
    example: 'The café agent remembers the order it is building while the customer is still typing.',
  },
  {
    n: '2',
    name: 'Files',
    persists: 'This session',
    what: 'A document handed to the agent for one session — a PDF menu pasted in, a price list uploaded to a Claude Project. The agent can read all of it, but it is loaded whole, every time, so it suits documents of a few pages, not a catalogue.',
    use: 'A small, stable document for one conversation or one project.',
    example: 'The Module 2 exercise: a one-page menu in a Claude Project so the JD can be tested.',
  },
  {
    n: '3',
    name: 'Retrieval (RAG)',
    persists: 'Across all conversations — the business\'s knowledge',
    what: 'A knowledge base the agent searches on demand — menu, policies, FAQs, product pages — chunked and indexed so it fetches only the relevant part, then answers from it. This is what stops an agent inventing prices: it reads the answer instead of guessing.',
    use: 'A large or changing body of business facts that every customer might ask about.',
    example: 'The café agent answers "do you have anything without dairy?" from the menu file, and the owner updates the menu without touching the agent.',
  },
  {
    n: '4',
    name: 'Persistent store',
    persists: 'Across sessions, per customer, forever',
    what: 'A database row per customer: their name, their number, their last three orders, the booking they cancelled. The agent writes to it during a conversation and reads from it the next time the same person messages. This is the rung that turns a good agent into one customers feel knows them.',
    use: 'Returning customers; anything that must survive between one conversation and the next.',
    example: '"Same as last time, Ahmed?" — the café agent recalls a returning customer\'s usual order.',
  },
  {
    n: '5',
    name: 'Shared memory',
    persists: 'Across agents and channels, for one business',
    what: 'One memory that several agents read and write — the sales agent on WhatsApp, the booking agent on the website, the phone agent — so a customer who booked on one channel is known on the others. It needs an owner (who may write what), rules for conflicts, and care about what one agent is allowed to see. This is how the agency\'s AI Sales Team runs Zara, Adam and Maya on one number.',
    use: 'More than one agent, or more than one channel, serving the same customers.',
    example: 'Module 14: one deployment serving two cafés, each with its own memory, no leakage between them.',
  },
]

const DECIDE = [
  { need: 'Remember what was said two messages ago', rung: '1 — Context window' },
  { need: 'Answer from a short document, just for this chat or project', rung: '2 — Files' },
  { need: 'Answer accurately from a large or changing knowledge base (menu, policies, FAQs)', rung: '3 — Retrieval (RAG)' },
  { need: 'Recognise a returning customer and recall their history', rung: '4 — Persistent store' },
  { need: 'Several agents or channels sharing the same customers', rung: '5 — Shared memory' },
]

const FAQS: Faq[] = [
  {
    q: 'What is the difference between RAG and memory?',
    a: 'On the ladder they are different rungs. RAG (rung 3) is retrieval from a knowledge base the business owns — the same facts for every customer. Memory in the everyday sense is rung 4 — what the agent remembers about one customer between conversations. An AI employee usually needs both.',
  },
  {
    q: 'Do I need a vector database to build an AI agent?',
    a: 'Only when you reach rung 3 with a knowledge base too large to paste into the prompt. A one-page menu is rung 2 and needs nothing. Most students meet their first vector store in Module 9, when the café\'s menu and policies outgrow a single file.',
  },
  {
    q: 'Why not just give the agent all the memory it can have?',
    a: 'Because every rung above the one you need adds cost, latency, things that can break and things that can leak. A persistent store means personal data you must protect; shared memory means rules about who may see what. The ladder\'s one rule — lowest rung that solves the problem — is a security rule as much as an engineering one.',
  },
  {
    q: 'How does the agent stop making things up?',
    a: 'Rung 3 plus a Rule in the job description: answer only from what was retrieved, and say "I will check with the owner" when the answer is not there. Retrieval gives the agent the facts; the rule tells it not to fill gaps with guesses.',
  },
  {
    q: 'Which rung does the café AI Employee use?',
    a: 'Rungs 3 and 4 by Module 9 — the menu and policies through retrieval, returning customers in a persistent store — and rung 5 in Module 14, when the same deployment serves two cafés.',
  },
  {
    q: 'Where is this taught?',
    a: `Module 9 of ${mastery.name} (RAG & Memory), where you give the café agent a knowledge base and memory across two sessions. The Memory Ladder diagram, a knowledge-base formatting guide and a chunking prompt pack are the module's downloads.`,
  },
]

const URDU = [
  'میموری لیڈر DSP کا طریقہ ہے یہ طے کرنے کا کہ AI ایجنٹ کو کیا یاد رکھنا چاہیے۔ پانچ سیڑھیاں ہیں، کم سے زیادہ پائیدار تک: موجودہ گفتگو (context window)، ایک سیشن کے لیے فائل، نالج بیس سے تلاش (RAG)، ہر گاہک کا مستقل ریکارڈ، اور ایک کاروبار کے کئی ایجنٹس کی مشترکہ میموری۔ اصول ایک ہے: وہ سب سے نیچی سیڑھی چنیں جو آپ کا اصل مسئلہ حل کرے۔',
  `زیادہ تر AI ایمپلائیز کو تیسری سیڑھی (کاروبار کی معلومات) اور چوتھی (واپس آنے والا گاہک) چاہیے ہوتی ہے — اس سے اوپر شاذ ہی۔ کیفے کا ایجنٹ مینو RAG سے پڑھتا ہے اور "احمد صاحب، وہی آرڈر؟" مستقل ریکارڈ سے۔ یہ ${mastery.name} کے ماڈیول 9 میں سکھایا جاتا ہے، ${founder.name} کے ساتھ، اردو اور انگریزی میں۔`,
]

const definedTermLd: JsonLd = {
  '@type': 'DefinedTerm',
  '@id': TERM_ID,
  name: 'The Memory Ladder',
  alternateName: ['DSP Memory Ladder', 'Knowledge and Memory Ladder'],
  description: DEFINITION,
  url: `${site.url}${PATH}`,
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'DSP AI agent frameworks', url: `${site.url}${founder.path}` },
}

const howToLd: JsonLd = {
  '@type': 'HowTo',
  '@id': `${site.url}${PATH}#howto`,
  name: 'How to choose an AI agent\'s memory with the Memory Ladder',
  description: 'Name the thing the agent must remember, find the lowest rung that holds it, build that rung, and climb only when a real conversation fails.',
  inLanguage: ['en', 'ur'],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Write down what the agent must remember, and for how long', text: 'One line per fact: "the menu, always", "this customer\'s last order, next time they message", "what they just said, this chat". The "for how long" decides the rung.', url: `${site.url}${PATH}#decide` },
    { '@type': 'HowToStep', position: 2, name: 'Find the lowest rung that holds each fact', text: 'This conversation → rung 1. One document, one session → rung 2. Business facts for everyone → rung 3. Per-customer, across sessions → rung 4. Several agents or channels → rung 5.', url: `${site.url}${PATH}#decide` },
    { '@type': 'HowToStep', position: 3, name: 'Build only that rung', text: 'Do not add a vector store for a one-page menu or a database for a one-off demo. Each rung above the one you need adds cost, latency and data to protect.', url: `${site.url}${PATH}#rungs` },
    { '@type': 'HowToStep', position: 4, name: 'Add a rule against guessing', text: 'In the job description: answer only from what was retrieved or stored; when the answer is not there, say so and hand off.', url: `${site.url}${PATH}#rungs` },
    { '@type': 'HowToStep', position: 5, name: 'Climb one rung when a real conversation fails', text: 'When a customer asks something the agent cannot remember, that failure names the rung to add next. Climb for evidence, not for ambition.', url: `${site.url}${PATH}#decide` },
  ],
}

export default function MemoryLadderPage() {
  return (
    <Guide
      path={PATH}
      title={TITLE}
      crumb="The Memory Ladder"
      parents={[{ name: 'DSP frameworks', path: `${founder.path}#frameworks` }]}
      eyebrow="Framework · Module 9 · Updated September 2026"
      answer={ANSWER}
      published={PUBLISHED}
      updated={UPDATED}
      description={DESCRIPTION}
      faqs={FAQS}
      urdu={URDU}
      extraLd={[definedTermLd, howToLd]}
      about={[{ '@id': TERM_ID }, { '@type': 'Course', '@id': `${site.url}${mastery.url}#course` }]}
      related={[
        { path: '/frameworks/7-part-job-description', title: 'The 7-Part Job Description' },
        { path: '/frameworks/agent-idea-filter', title: 'The Agent Idea Filter' },
        { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?' },
        { path: '/mastery/curriculum', title: 'Mastery Curriculum: All 16 Modules' },
      ]}
    >
      <div className="definition" id="definition">
        <p className="kicker">Definition</p>
        <p><strong>The Memory Ladder</strong> (noun) — {DEFINITION}</p>
      </div>

      <h2>Why memory is a decision, not a feature</h2>
      <p>
        &quot;Give it memory&quot; is the most common request {founder.name} hears from students and clients, and the least specific. Memory of what? For how long? For whom? An agent that remembers the last two messages, an agent that can read the whole menu, an agent that knows a customer&apos;s usual order, and an agent that shares what it knows with three other agents are four different builds with four different costs — and four different things that can go wrong. The ladder turns &quot;give it memory&quot; into a question with an answer: which rung?
      </p>
      <p>
        The rule is the important part. <strong>Pick the lowest rung that solves the actual problem.</strong> Beginners build too high — a vector database for a one-page price list — and pay in complexity, cost and bugs. Every rung you do not need is one you do not have to secure.
      </p>

      <h2 id="rungs">The five rungs</h2>
      <pre>{`Rung 5  SHARED MEMORY     → several agents / channels, one business's customers
        ↑
Rung 4  PERSISTENT STORE  → this customer, across sessions, forever
        ↑
Rung 3  RETRIEVAL (RAG)   → the business's knowledge base, searched on demand
        ↑
Rung 2  FILES             → a document attached for this session
        ↑
Rung 1  CONTEXT WINDOW    → what has been said in this conversation`}</pre>
      <dl>
        {RUNGS.map((r) => (
          <div key={r.n} id={`rung-${r.n}`}>
            <dt><span className="n">RUNG {r.n}</span>{r.name} <em>— persists: {r.persists.toLowerCase()}</em></dt>
            <dd>{r.what} <strong>Use it for:</strong> {r.use} <strong>Café example:</strong> {r.example}</dd>
          </div>
        ))}
      </dl>

      <h2 id="decide">How to choose the rung</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">If the agent needs to…</th>
              <th scope="col">Use rung</th>
            </tr>
          </thead>
          <tbody>
            {DECIDE.map((d) => (
              <tr key={d.rung}><td>{d.need}</td><td><strong>{d.rung}</strong></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Write one line per thing the agent must remember, with <em>for how long</em> and <em>for whom</em>. The answer to those two questions is the rung. Then build that rung and nothing above it, and add one Rule to the <Link href="/frameworks/7-part-job-description">job description</Link>: answer only from what was retrieved or stored, and say so when the answer is not there. Climb a rung only when a real conversation fails for lack of memory — that failure names the rung to add next.
      </p>

      <h2>The café agent, rung by rung</h2>
      <ol>
        <li><strong>Module 2 — rung 2.</strong> A one-page menu in a Claude Project, so the job description can be tested.</li>
        <li><strong>Module 7 — rung 1.</strong> The agent holds an order in the conversation while the customer adds items.</li>
        <li><strong>Module 9 — rungs 3 and 4.</strong> The full menu and policies move into a knowledge base the agent searches; returning customers get a record. Five grounded answers, memory across two sessions.</li>
        <li><strong>Module 14 — rung 5.</strong> One deployment serves two cafés; each café&apos;s memory is its own, and nothing leaks between them.</li>
      </ol>
      <p>
        Notice that the agent reached a paying-customer standard at rungs 3 and 4. That is where most <Link href="/what-is-an-ai-employee">AI employees</Link> live, and it is what <Link href="/mastery/curriculum#m09">Module 9</Link> of {mastery.shortName} teaches you to build.
      </p>
    </Guide>
  )
}
