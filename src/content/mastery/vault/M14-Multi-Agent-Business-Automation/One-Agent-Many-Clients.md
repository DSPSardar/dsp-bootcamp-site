# One Agent, Many Clients — the multi-tenant blueprint
The model behind turning a single AI Employee build into a repeatable business, serving multiple clients from one codebase.

## The core idea
Instead of building a new agent from scratch for every client, you build ONE well-structured system where each client's data (menu, brand, policies, bookings) is separate ("tenant isolation"), but the underlying code, Job Description structure, and tools are shared and reused.

## What must be per-client (tenant-specific)
- Business name, branding, tone adjustments
- Menu/services/pricing data
- Contact details, notification recipients
- Any client-specific policy text (hours, delivery area, etc.)

## What stays shared (built once)
- The core Job Description structure (Role/Goal/Audience/Tone/Steps/Rules/Examples skeleton)
- The tools (order-taking logic, notification sending, knowledge base retrieval pattern)
- The testing and security process (M11/M12 checklists apply to every tenant)
- The deployment pipeline

## Why this matters for your business (M15)
This is what makes selling AI Employees scalable instead of "one custom project every time." Client #2 onward is mostly configuration (their menu, their brand, their number) rather than a full rebuild — which is why your price for client #2 can be lower cost-to-you while still valuable to them.

## The practical build (M14 assignment)
Take your AI Employee and add a second café's data (different menu, different name) served from the exact same deployment — proving to yourself the isolation works before you ever pitch this model to a real second client.
