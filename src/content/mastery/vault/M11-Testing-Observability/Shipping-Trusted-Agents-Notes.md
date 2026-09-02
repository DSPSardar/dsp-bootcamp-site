# Five Steps to Shipping Trusted Agents — companion notes
Written companion to the M11 lecture, summarizing the core steps.

1. **Define what it must never do** — before anything else, write the hard Rules (see JD template) — these are your non-negotiables.
2. **Test deliberately** — run the 10-Question Sheet and relevant Edge Case Bank items before real users touch it.
3. **Log everything** — every turn should record input, output, tokens used, and time taken, so failures are diagnosable, not mysterious.
4. **Set limits** — rate limits, spend limits, and tool permission scopes (least privilege — see M12 Security) so a failure mode can't spiral.
5. **Have a human fallback** — a defined way for the agent to say "I can't help with this, here's how to reach a person" rather than guessing past its competence.
