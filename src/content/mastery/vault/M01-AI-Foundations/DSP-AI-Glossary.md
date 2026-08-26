# DSP AI Glossary — plain-English definitions
No jargon left undefined. If a word isn't here and you hit it in a lesson, ask in the group — it gets added.

**LLM (Large Language Model)** — the type of AI (like Claude) that reads text and predicts the next most likely words. It has no memory between conversations unless you give it one, and no live internet access unless you give it a tool.

**Agent** — an LLM that has a Job Description, Tools, and a Loop: it can take an action (not just answer), check the result, and keep going until a task is done. The DSP formula: **Agent = Claude + Job Description + Tools + Loop.**

**Prompt** — the text you send an LLM. A Job Description is a structured, reusable prompt for an agent.

**Job Description (JD)** — this course's term for a well-written system prompt: Role, Goal, Audience, Tone, Steps, Rules, Examples. It's what makes an agent behave consistently.

**Context / Context window** — everything the model can "see" at once: your message, its instructions, any files, the conversation so far. It has a limit (measured in tokens). When it's full, older content gets pushed out.

**Token** — a chunk of text, roughly ¾ of a word. Models are priced and limited by tokens, not characters.

**Hallucination** — when the model states something false with full confidence. It's not lying — it's predicting plausible text, and sometimes plausible isn't true. Grounding it in real data (RAG) reduces this.

**Tool / Function call** — a specific action an agent can take: send an email, look up a row in a spreadsheet, check a calendar. You define what tools exist; the agent decides when to use them.

**Loop** — the agent repeating "observe → decide → act" until the goal condition is met or a stop rule triggers. Without a loop, it's just a single reply, not an agent.

**API (Application Programming Interface)** — a defined way for one piece of software to ask another for something. "Calling the Claude API" means your app is sending a request to Claude programmatically, not through the chat website.

**API key** — a password-like string that proves your app is allowed to use an API. Never put it in code that gets shared or committed — always in a `.env` file.

**RAG (Retrieval-Augmented Generation)** — giving an agent a knowledge base (documents, a menu, policies) so it retrieves the relevant piece and answers from it, instead of guessing.

**Memory** — an agent remembering something across time: a customer's name, their last order, a preference. Different from context — memory has to be deliberately stored and retrieved.

**MCP (Model Context Protocol)** — a standard way to connect an AI model to external tools and data sources (Google Sheets, Calendar, Gmail, custom systems) so any MCP-capable model can use them without custom-coding each connection.

**Vibe coding** — building software by describing what you want in plain language and letting an AI (like Claude Code) write and run the code, while you direct, test, and approve each step.

**Claude Code** — a tool that lets Claude read your files, write code, and run commands in a project on your computer — the main tool used to "vibe code" in this course.

**Repo / Repository** — a project's folder tracked by Git, usually hosted on GitHub. "Push to your repo" means send your latest code there.

**Git / GitHub** — Git tracks every change (a "commit") to your project so you can undo mistakes. GitHub is a website that hosts your Git project online and lets you share or deploy it.

**Deploy / Deployment** — putting your app on a public URL that anyone can visit, as opposed to it only running on your own laptop.

**Frontend / Backend** — the frontend is what a user sees and clicks in their browser. The backend is the server-side logic, data, and API calls the user doesn't see directly.

**Multi-tenant** — one system (one codebase) serving multiple separate clients or businesses, each with their own data, kept isolated from each other. This is how "One Agent, Many Clients" works.

**Prompt injection** — a malicious input trying to override an agent's instructions (e.g. "ignore all previous instructions and…"). Defended against with Rules in the JD, tool permission limits, and testing.

**Guardrail** — a rule built into an agent's instructions or code that stops it doing something unsafe, unauthorized, or off-topic.
