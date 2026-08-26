# Git Command Card
The commands you'll actually use in this course, nothing more.

| Command | What it does |
|---|---|
| `git init` | Turns the current folder into a Git project (do this once, at the start) |
| `git status` | Shows what's changed since your last commit |
| `git add .` | Stages all changed files, ready to commit |
| `git commit -m "message"` | Saves a snapshot with a description — write what changed, not "update" |
| `git log --oneline` | Shows your commit history, one line each |
| `git push` | Sends your commits to GitHub |
| `git branch new-feature` | Creates a new branch to work on something without touching main |
| `git checkout new-feature` | Switches to that branch |
| `git checkout main` | Switches back to your main branch |
| `git merge new-feature` | Brings a branch's changes into main |
| `git checkout -- .` | Discards uncommitted changes, restores to last commit (use when you've broken something) |
| `git revert <commit>` | Undoes a specific past commit safely, keeping history |

## A good commit message
Bad: `update`, `fix`, `asdf`, `final2`
Good: `Add order form validation and success state`, `Fix menu page mobile layout`, `Connect Claude API to order agent`

## The habit to build
Commit after every small working change, not once at the end of the day. Small, described commits are your safety net.
