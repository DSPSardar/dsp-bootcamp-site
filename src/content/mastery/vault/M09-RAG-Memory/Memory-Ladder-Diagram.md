# The Memory Ladder
Four rungs, from least to most persistent. Pick the lowest rung that solves your actual problem — don't over-engineer.

```
Rung 4: PERSISTENT STORE  →  remembers across sessions, forever, per-user
   (a database: this customer's name, their last 3 orders)
        ↑
Rung 3: RETRIEVAL (RAG)   →  looks up the relevant piece of a knowledge base on demand
   (menu, policies, FAQ — agent finds and reads the relevant part)
        ↑
Rung 2: FILES             →  a document attached/uploaded for this session
   (a PDF menu pasted in for one conversation)
        ↑
Rung 1: CONTEXT WINDOW    →  what's in the current conversation only
   (the last few messages back and forth)
```

## How to choose the right rung
| If you need... | Use rung |
|---|---|
| The agent to remember what was said 2 messages ago | 1 — Context |
| The agent to answer from a document just for this chat | 2 — Files |
| The agent to answer accurately from a large, changing knowledge base (menu, policies) | 3 — Retrieval/RAG |
| The agent to recall a specific customer's history next time they message | 4 — Persistent store |

Most of this course's AI Employee build uses rung 3 (menu/policies) and rung 4 (returning customer memory).
