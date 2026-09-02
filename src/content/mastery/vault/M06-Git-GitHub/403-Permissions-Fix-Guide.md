# Fixing GitHub "403" / Permission Errors
The most common blocker in this module. Work through these in order.

## 1. Check you're pushing to a repo you actually own
`git remote -v` shows the URL you're pushing to. If it's someone else's repo (a fork you didn't rename, or a copy-pasted URL), that's the problem — create your own repo and point to that instead.

## 2. Re-authenticate
GitHub no longer accepts your account password for git operations over HTTPS. You need either:
- **A Personal Access Token (PAT):** GitHub → Settings → Developer settings → Personal access tokens → generate one with `repo` permissions, and use it in place of your password when prompted.
- **SSH instead of HTTPS:** generate an SSH key (`ssh-keygen`), add the public key to GitHub → Settings → SSH keys, then use the SSH remote URL instead of the HTTPS one.

## 3. Check the credential cache isn't stuck on old, wrong credentials
Mac: Keychain Access → search "github" → delete the old entry, then push again and re-enter fresh credentials.
Windows: Control Panel → Credential Manager → Windows Credentials → remove the GitHub entry, then push again.

## 4. Confirm collaborator access (if it's a shared repo)
If you're pushing to someone else's repository, you need to be added as a collaborator by the owner — Settings → Collaborators on their repo.

## Still stuck?
Post in the DSP group with: the exact error message, the output of `git remote -v`, and whether you're using HTTPS or SSH. Someone has hit this exact error before.
