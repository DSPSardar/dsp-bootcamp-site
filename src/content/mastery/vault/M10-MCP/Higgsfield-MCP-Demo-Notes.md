# Higgsfield MCP — Demo Notes
Reference notes on the Higgsfield MCP connector shown in the M10 lecture, for image/video generation as an example of a creative-tool connector (not required for the core AI Employee project, but useful to know exists).

- Higgsfield's MCP connector lets an agent request AI-generated images or short videos as a tool call, rather than a human manually using a separate app.
- Useful pattern for client work: a marketing-agent-type build that generates social post visuals as part of its workflow (relevant context for M14's business automation ideas).
- Same principle as every other MCP connector: the agent calls a defined tool, gets a result back, uses it in its response — the "generation" is just another tool, not a special case.
