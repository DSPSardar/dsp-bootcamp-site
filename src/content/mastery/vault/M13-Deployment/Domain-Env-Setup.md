# Domain & Environment Variable Setup

## Connecting a custom domain (Vercel)
1. Buy a domain (any registrar — Namecheap, GoDaddy, etc.)
2. In Vercel: Project Settings → Domains → Add your domain
3. Update your domain's DNS records as Vercel instructs (usually an A record or CNAME)
4. Wait for propagation (can take a few minutes to a few hours)

## Environment variables — the golden rule
Every environment variable in your local `.env` file needs to be added AGAIN on the hosting platform's dashboard (Vercel/Railway). Your `.env` file is never uploaded — it only works on your own machine. This is the single most common "works locally, broken live" cause.
