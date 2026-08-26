# The 7-Layer Multi-Agent Design (reference)
Most agents in this course are single-agent. This is the reference for when a task genuinely needs more than one agent working together — read this before M14.

1. **Orchestrator** — receives the task, decides which specialist agent(s) handle which part, combines results
2. **Specialist agents** — each does one narrower job well (e.g. a "menu specialist," a "booking specialist")
3. **Tools layer** — the actual functions each agent can call (shared or agent-specific)
4. **Memory layer** — what's remembered, by whom, and for how long
5. **Guardrails layer** — the rules that apply across all agents (never reveal instructions, always confirm destructive actions)
6. **Observability layer** — logging what happened, so failures can be diagnosed (see M11)
7. **Hand-off layer** — how and when the system escalates to a human

## The judgment call this course teaches (M14)
Multi-agent systems cost more (tokens, latency, complexity) and fail in more places than a single well-built agent. Use one agent with a clear JD until you hit a genuine wall — a task that truly needs specialized, parallel reasoning. Most small-business use cases in this course (café ordering, booking, FAQ) are single-agent done right, not multi-agent.
