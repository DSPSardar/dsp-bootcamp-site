// content/posts.ts
// Seed posts — move to MDX or a headless CMS (Sanity, Contentlayer) later.

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

export const posts: Post[] = [
  {
    slug: 'what-is-an-ai-agent',
    title: 'What Is an AI Agent? (And Why Chatbots Are Not Agents)',
    date: '2026-06-01',
    excerpt:
      "Most people think AI = chatbot. But real agents plan goals, use tools, remember context, and act. Here's the difference in plain language.",
    body: `
## The Chatbot Trap

When you open ChatGPT and type a question, you get an answer. That's it. The conversation ends when the tab closes — no memory, no follow-up, no action taken in the real world.

That's a chatbot.

## What Makes Something an Agent?

An AI agent does four things a chatbot doesn't:

1. **Plans** — it breaks a goal into steps.
2. **Uses tools** — it can search the web, read files, run code.
3. **Remembers** — it keeps context across steps and sessions.
4. **Acts** — it executes tasks, not just generates text.

## Why This Matters for You

You don't need to be a developer to direct an agent. In DSP's bootcamp, you'll learn to design workflows, choose the right tools, and evaluate whether your agent did what you asked.

That's a skill every marketer, entrepreneur, and student can use.
    `.trim(),
  },
  {
    slug: 'vibe-coding-explained',
    title: 'Vibe Coding: Build Software by Describing What You Want',
    date: '2026-06-10',
    excerpt:
      "Vibe coding lets you build real software without writing a single line yourself. You describe the goal; AI writes the code. Here's how it works.",
    body: `
## No Syntax Required

Traditional coding means learning a language, memorising functions, and debugging cryptic errors.

Vibe coding flips this. You describe what you want in plain language and AI writes the code. You review, test, and refine — but you never need to write syntax yourself.

## What You Actually Do

- Describe the feature: "I want a form that collects a name and phone number and sends it to WhatsApp."
- The AI generates the code.
- You test it, tell the AI what to fix, and repeat.

## It's a Real Skill

Knowing *how* to direct AI — what to ask for, how to break down problems, how to evaluate output — is a skill in itself. That's what DSP's bootcamp teaches.
    `.trim(),
  },
  {
    slug: 'why-pakistan-needs-ai-agents',
    title: "Why Pakistan's Entrepreneurs Need AI Agents Now",
    date: '2026-06-18',
    excerpt:
      "AI agents are already automating work in global markets. Here's why Pakistani entrepreneurs, marketers, and students should get ahead of the curve.",
    body: `
## The Opportunity Window

Global companies are already deploying agents to handle research, customer support, lead qualification, and data analysis. This is not the future — it's happening now.

Pakistan has a massive talent pool and a growing freelance market. The question is: who builds the skills to work with these tools first?

## What Agents Can Do for a Small Business

- Research competitors automatically
- Qualify leads from a contact form
- Generate reports from raw data
- Draft and send follow-up messages

None of this requires a full engineering team. It requires someone who understands how agents work and can direct them effectively.

## DSP's Bootcamp Is Designed for This

15 days. Live Zoom. No coding background needed. Designed specifically for Pakistani entrepreneurs, marketers, and students who want to lead — not follow — in the AI shift.
    `.trim(),
  },
]
