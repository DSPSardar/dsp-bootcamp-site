# API Keys & .env Checklist
Go through this before you commit any code that uses an API key.

- [ ] The key lives in a `.env` file, never typed directly into a `.js`/`.ts`/`.py` file
- [ ] `.env` is listed in `.gitignore` — confirm with `cat .gitignore` that it's there
- [ ] Run `git log -p | grep -i "api"` (or search your repo on GitHub) to confirm no key ever got committed, even by accident in an early commit
- [ ] The key has a spend limit set on the provider's dashboard (Anthropic Console, etc.)
- [ ] A `.env.example` file exists showing the variable NAMES only, with blank values, so anyone cloning your project knows what to fill in
- [ ] If you ever did accidentally commit a key: revoke/regenerate it immediately on the provider's dashboard — don't just remove it from the code, the old key is still valid until revoked
