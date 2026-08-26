# API Integration Prompt Pack
Copy-paste starting points for Claude Code when connecting your AI Employee to the Claude API and one external service.

## Connecting the Claude API (backend)
```
Move the agent logic to a backend endpoint that calls the Claude API. Store the API key in a
.env file, never in the code itself. Add error handling for: missing key, rate limit hit,
and the API being unreachable — show a clear message in each case, don't crash.
```

## Adding an external API — pick one
**Email (order confirmation):**
```
Add a tool that sends an email confirmation when an order is confirmed, using [service — e.g.
Resend/SendGrid free tier]. Use an environment variable for the API key.
```

**Google Sheets (order log):**
```
Add a tool that appends a new row to a Google Sheet with the order details when an order is
confirmed. Walk me through the Google Cloud setup steps needed first.
```

**WhatsApp notification to owner:**
```
Add a tool that sends a WhatsApp message to the business owner's number when a new order comes
in, using [service]. Keep the number in an environment variable, not hardcoded.
```

## Testing the integration
```
Show me how to test this integration without placing a real order every time — is there a test
mode or a way to mock the external call?
```
