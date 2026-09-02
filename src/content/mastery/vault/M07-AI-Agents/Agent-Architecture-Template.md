# Agent Architecture Template
Fill this one page out for every agent you build — it's what you submit alongside the demo.

**Agent name:**
**One-line purpose:**

## The 4 parts
**Claude (the brain):** which model, and why (speed vs depth needed for this task)

**Job Description:** link to or paste your 7-Part JD

**Tools:** list every tool this agent can call, one line each
| Tool name | What it does | What it needs as input | What it returns |
|---|---|---|---|
| | | | |

**Loop:** describe the step-by-step flow in plain language — what happens first, what happens next, what makes it stop
1.
2.
3.
(stop condition: )

## Where memory lives (if any)
- [ ] No memory needed for this agent
- [ ] Context only (within one conversation)
- [ ] Files/knowledge base (M09)
- [ ] Persistent store — remembers across sessions (M09)

## Diagram (draw this by hand or in any tool — a simple box diagram is enough)
```
[User] → [Agent: Job Description] → [Tool 1] → [Tool 2] → [Response back to User]
                    ↑
              [Memory/Knowledge base, if used]
```
