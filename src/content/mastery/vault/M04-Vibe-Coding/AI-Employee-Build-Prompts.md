# AI Employee Build Prompts — copy-paste for Claude Code
These are the exact prompts to run in Claude Code to build the course project from an empty folder. Run them one at a time, in order. Test after each before moving to the next.

## Part 1 — The Skeleton (M04)

**Prompt 1 — Plan first, don't build yet:**
```
I want to build "[Your Business Name] Ordering" — an ordering website + AI agent for a small café,
as a learning project. Before writing any code, write a PLAN.md that lists the features in the
order we should build them, starting from the simplest working version. Don't build anything yet —
just the plan.
```

**Prompt 2 — First feature only:**
```
From PLAN.md, build ONLY the first feature: a working local project skeleton with a home page
that says "Welcome to [Your Business Name]". Nothing else yet. Show me how to run it locally.
```

**Prompt 3 — Test and confirm:**
```
Run the project and confirm it starts without errors. Show me the exact command to run it myself.
```

**Prompt 4 — One feature at a time from here:**
```
Now build the next feature from PLAN.md: [the specific next item, e.g. "a menu page listing at
least 5 items with name, description, price"]. Don't touch anything else already working.
```

Repeat Prompt 4's pattern — one feature, confirm it, then the next — for every remaining item in PLAN.md.

## Context management commands (use throughout)
- `/context` — see how full the context window is and what's in it
- `/compact` — summarize the conversation so far to free up space (use when context is getting full but you're continuing the same task)
- `/clear` — wipe context entirely (use when starting a genuinely new, unrelated task)

## When something breaks
```
This is broken: [paste the exact error message]. Diagnose what's causing it before changing anything.
```
Never say "fix it" without the actual error text — Claude Code works far better with the real error than a vague description.

## Golden rule for this whole course
PLAN → BUILD ONE FEATURE → TEST → COMMIT (see M06) → NEXT. Never ask for five features in one prompt — it's slower to fix when something breaks, and burns more tokens.
