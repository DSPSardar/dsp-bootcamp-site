# MCP Setup Guide
How to connect an MCP server to Claude.ai and to Claude Code.

## In Claude.ai (for chat-based use)
1. Settings → Connectors (or "Integrations," depending on current UI)
2. Browse available connectors (Google Drive, Gmail, Calendar, etc.) or add a custom MCP server URL if you built your own
3. Authenticate the connector (usually an OAuth sign-in to that service)
4. In a chat, the connector's tools become available automatically — Claude will call them when relevant

## In Claude Code (for your AI Employee project)
1. Check the current Claude Code documentation for the MCP configuration file format (this changes as the tool evolves — always check docs.claude.com for the current syntax)
2. Add the MCP server you want (e.g. a Google Sheets MCP server) to your project's configuration
3. Restart Claude Code so it picks up the new server
4. Test with a simple prompt: "use the [connector name] tool to [simple test action]"

## Verifying it worked
You should see the tool call happen in the conversation transcript, and the result should be visible in the actual external app (a new row in the Sheet, an event in the Calendar).

## Common issues
- Connector shows as available but calls fail → check the authentication hasn't expired, re-authenticate
- Tool never gets called → check your Job Description actually tells the agent when to use it (M07 Tool Definition template)
