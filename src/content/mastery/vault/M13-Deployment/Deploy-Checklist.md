# Deploy Checklist
Go through this before sharing your live URL.

- [ ] Frontend deployed to Vercel, connected to your GitHub repo
- [ ] Backend hosted (Vercel functions, or Railway/similar for anything needing to stay running)
- [ ] All environment variables set on the hosting platform (not just locally in `.env`)
- [ ] The live site loads over HTTPS (should be automatic on Vercel/Railway)
- [ ] The API key is NOT visible anywhere in the browser page source
- [ ] A full order/interaction completes successfully on the LIVE url, not just locally
- [ ] Tested on both desktop and mobile
- [ ] A custom domain is connected (optional but recommended for client-facing work)
- [ ] Error pages/fallbacks work (try an intentionally broken input on the live site)
- [ ] The Security Checklist (M12) has been fully completed before this goes live
