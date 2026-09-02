# Vercel + Railway Guide
Where each part of your project should live.

## Vercel — for the frontend (and simple backend functions)
1. Sign up / log in, connect your GitHub account
2. "Add New Project" → select your repo
3. Vercel auto-detects most frameworks — confirm the build settings look right
4. Add your environment variables (Settings → Environment Variables) — match exactly what's in your local `.env`
5. Deploy — you get a live URL automatically on every push to your main branch

## Railway — for anything needing a persistent backend/database
1. Sign up / log in, connect GitHub
2. "New Project" → deploy from your repo
3. Add environment variables the same way
4. Railway gives you a public URL for your backend API — this is what your frontend calls

## When to use which
- Static/frontend + simple serverless functions → Vercel is enough
- A backend that needs to run continuously, or a database → Railway (or similar) alongside Vercel for the frontend
