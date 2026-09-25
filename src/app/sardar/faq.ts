// One array feeds both the visible <details> list on /sardar and the FAQPage
// node in ./schema.ts — schema may only describe what a visitor can read, so
// there is exactly one copy of this text. Buyer-intent questions first (what
// it is · can I try one free · does it speak Urdu · can it answer my WhatsApp
// and phone · what it costs · how long to go live), because those are the
// queries this page has to answer; the "how is it different" and "can I learn
// it" questions follow.
import type { Faq } from '@/lib/schema'

export const SARDAR_FAQS: ReadonlyArray<Faq> = [
  {
    q: 'What is a voice AI Employee?',
    a: 'An AI agent that holds a spoken conversation for a business. It answers, works out what the caller wants, replies from the company’s own price list and rules, qualifies or books, and hands over to a person when it should. Unlike a recorded menu it is not a list of options, and unlike a chatbot it listens and speaks.',
  },
  {
    q: 'Can I talk to an AI agent for free right now?',
    a: 'Yes. SARDAR is on this page. Allow your microphone and start the call, or type instead if you would rather not speak. There is no signup, no card and no install — it runs in the browser, and you can end the call at any time.',
  },
  {
    q: 'Does SARDAR speak Urdu?',
    a: 'Yes — English, Urdu and Roman Urdu, in the same conversation. The AI Employees DSP builds for clients are deployed in the languages that client’s customers actually use, which in Pakistan is usually both.',
  },
  {
    q: 'Can a voice AI agent answer my WhatsApp messages and my phone line?',
    a: 'That is what the production version does. SARDAR here is the showcase; the Employee DSP builds for your business sits on your own WhatsApp Business API number or phone line, answers around the clock, and reports every conversation and outcome on your DSPAgentHub dashboard.',
  },
  {
    q: 'How much does a voice AI Employee cost in Pakistan?',
    a: 'Setup from $500 one-time, then from $199 a month, cancel anytime. Full packages are on the pricing page. A human receptionist costs salary plus training plus turnover, works eight hours a day and handles one call at a time.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Seven days from sign-off. DSP collects your price list, business rules and escalation contacts, builds and tests the Employee against acceptance tests, connects it to your number, and hands you the dashboard.',
  },
  {
    q: 'How is this different from an IVR menu or a chatbot?',
    a: 'An IVR reads you a menu and a chatbot follows a script; both break the moment a customer says something unexpected. A voice AI Employee has a job description, a knowledge base, acceptance tests and a human supervisor, so it answers the question that was actually asked and escalates the ones it should not answer.',
  },
  {
    q: 'Who builds voice AI agents in Pakistan, and can I learn to build one myself?',
    a: 'Digital Services Program builds and supervises them from Islamabad for businesses in Pakistan and worldwide, and teaches the same build step by step in DSP AI Agent Mastery. SARDAR is assembled from the modules students work through, so every answer on this page maps to a lesson.',
  },
]
