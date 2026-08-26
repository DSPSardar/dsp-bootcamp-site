# AI in One Page — the cheat sheet
Keep this open while you watch Module 1.

**What an LLM actually does:** predicts the next likely word, based on patterns learned from huge amounts of text. It doesn't "know" things the way a database does — it generates plausible text.

**What it can do well:** write, summarize, explain, translate, brainstorm, follow structured instructions, hold a conversation, write and reason about code.

**What it cannot do on its own:** know anything after its training cutoff, remember you between separate conversations, take real-world actions (send an email, check a calendar), or guarantee 100% factual accuracy.

**How you fix those limits (this is the whole course):**
| Limit | Fix | Where you learn it |
|---|---|---|
| No live/current info | Give it a tool to search or fetch data | M08 APIs, M10 MCP |
| No memory between chats | Give it a knowledge base / memory store | M09 RAG & Memory |
| Can't take actions | Give it Tools | M07 AI Agents |
| Might make things up | Ground it in real documents (RAG) | M09 |
| Might go off-script | Write clear Rules in its Job Description | M02 |

**The one formula:** Agent = Claude + Job Description + Tools + Loop.
- **Claude** — the brain that reasons and writes
- **Job Description** — tells it who it is, what to do, what never to do
- **Tools** — lets it check a menu, send a message, book a slot
- **Loop** — it keeps going, step by step, until the task is actually finished

**Why this matters for a beginner:** you don't need to understand how the model works inside. You need to get good at the four things above — and that's a skill anyone can learn, coder or not.
