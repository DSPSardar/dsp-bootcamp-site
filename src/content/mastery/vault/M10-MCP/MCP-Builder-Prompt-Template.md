# MCP-Builder Prompt Template
If no existing connector fits, this is the starting prompt for building a simple custom MCP server with Claude Code.

```
I need a custom MCP server that exposes one tool: [describe exactly what it should do, e.g.
"check today's bookings from our internal system"]. The tool should take [inputs] and return
[outputs]. Walk me through building this step by step, starting with the simplest working
version, following the current MCP server format from the official docs.
```

## Before building custom
Always check if an existing connector already does what you need — building custom is the last resort, not the first step, because it's more to maintain long-term.
