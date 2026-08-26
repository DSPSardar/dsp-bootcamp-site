# Claude Code Command Card
Quick reference — keep this open while building.

| Command | What it does | Use it when |
|---|---|---|
| `/context` | Shows how much of the context window is used and what's in it | You want to check before a big ask |
| `/compact` | Summarizes the conversation to free up space, keeps continuity | Context is getting full but you're still on the same task |
| `/clear` | Wipes all context, starts fresh | Starting an unrelated task |
| `/help` | Lists all available commands | You forget one |
| Ctrl+C (once) | Interrupts the current response | It's going the wrong direction and you want to redirect |
| Ctrl+C (twice) | Exits Claude Code | Ending the session |

## Prompting patterns that work well
- **Plan before build:** "Write a plan, don't code yet" — catches misunderstandings before they cost you a rebuild
- **One feature at a time:** smaller asks are easier to test and cheaper to fix
- **Paste real errors:** always paste the exact error text, never paraphrase it
- **Name what NOT to touch:** "don't change the existing menu page" prevents accidental scope creep

## Red flags in a Claude Code session
- If it starts rewriting large parts of the project you didn't ask about → stop, `/clear` if needed, and re-scope the ask narrower
- If the same error persists after 2-3 attempts → paste the full error plus what you've already tried, don't just repeat "still broken"
