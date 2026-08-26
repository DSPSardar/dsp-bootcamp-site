# Setup Checklist — complete before Module 4
Nothing after this module works without these five accounts. Do them in order; each one takes 5-10 minutes.

## 1. Claude.ai account
- [ ] Go to claude.ai, sign up (free tier works to start)
- [ ] Create your first Project (Settings → Projects → New Project)
- [ ] Confirmed: you can start a chat and get a response

## 2. Anthropic Console + API key
- [ ] Go to console.anthropic.com, sign up
- [ ] Add a small amount of credit ($5-10 is enough for this whole course if you follow the token-saving workflow)
- [ ] Create an API key (Settings → API Keys → Create Key)
- [ ] **Save the key somewhere safe — you'll paste it into a `.env` file later, never into code or chat**

## 3. Claude Code installed
- [ ] Follow the install guide for your OS (Mac: terminal command; Windows: see troubleshooting below)
- [ ] Confirmed: running `claude` in a terminal opens a working session

## 4. GitHub account
- [ ] Sign up at github.com
- [ ] Confirmed: you can create a new empty repository

## 5. Vercel account
- [ ] Sign up at vercel.com (use "Continue with GitHub" to link them automatically)
- [ ] Confirmed: your GitHub account shows as connected in Vercel settings

## Windows-specific notes
- Claude Code runs best in WSL2 (Windows Subsystem for Linux) or Git Bash — plain CMD/PowerShell can cause path issues.
- If `claude` isn't recognized after install, close and reopen your terminal fully (not just a new tab).
- Antivirus/Defender sometimes flags the installer — this is a false positive; allow it if you downloaded from the official source.

## Mac-specific notes
- If you get a "developer cannot be verified" warning, go to System Settings → Privacy & Security → click "Open Anyway".
- Use Terminal (built-in) or iTerm2 — both work fine.

## Common blockers
| Problem | Fix |
|---|---|
| API key not working | Check for extra spaces when you paste it; regenerate if unsure |
| `claude` command not found | Restart terminal fully; check install completed without errors |
| GitHub repo won't push (403) | See the Git & GitHub module — this is covered fully in M06 |
| Vercel won't detect the project | Confirm it's linked to the right GitHub repo, not a fork |

**Don't move to Module 4 until every box above is ticked.**
