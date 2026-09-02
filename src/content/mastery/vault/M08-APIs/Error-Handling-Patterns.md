# Error-Handling Patterns for API Calls
What should happen when an API call doesn't go as planned — for every integration you build.

| Situation | What the agent should do |
|---|---|
| API key missing/invalid (401) | Log the error internally; tell the user "something went wrong on our end, please try again shortly" — never expose the raw error to the user |
| Rate limit hit (429) | Wait and retry once with a short delay; if it still fails, queue the action and inform the user it'll complete shortly |
| Service completely down (timeout) | Tell the user honestly the action couldn't complete right now, and what to do instead (e.g. "please call us directly") |
| Bad/malformed input | Validate before calling the API — catch obviously wrong data before it's sent, not after it fails |

## The rule
An agent should never crash silently or show a raw error/stack trace to a user. Every external call needs a defined fallback message.
