# Test, Secure, Deploy — companion notes
Written companion to the M11/M13 lecture connecting testing, security, and deployment as one sequence, not three separate boxes to tick.

The order matters: test first (M11) so you know what's actually broken, secure second (M12) so what you ship can't be abused, deploy last (M13) so the first thing the public sees is the tested, secured version — not a rough draft. Skipping the order (deploying first, then testing on real users) means real customers become your test cases, which costs trust that's hard to rebuild.
