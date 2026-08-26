# The Smart Library — how RAG works (concept overview)
A plain-English walkthrough of what's actually happening when an agent "retrieves" information, to accompany the M09 lecture. (The original "Smart Library" PDF slides are referenced in the lecture video — this is the text-only companion summary.)

Think of your knowledge base as a library. Instead of making the agent read every book (every document) for every question — slow and expensive — RAG works like a good librarian:

1. Your documents are broken into chunks (like index cards) and stored with a way to search them by meaning, not just exact keywords.
2. When a question comes in, the system finds the most relevant chunks (the librarian pulls the right index cards).
3. Only those relevant chunks are handed to Claude along with the question — not the whole library.
4. Claude answers using that specific, relevant information, instead of guessing.

This is why a well-chunked knowledge base (see the Formatting Guide) matters so much — bad chunking is like a librarian who can't find anything, even in a small library.
