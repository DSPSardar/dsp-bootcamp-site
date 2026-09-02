# Testing Before & After Launch — companion notes
Written companion to the M11 lecture video, summarizing the core distinction.

**Before launch:** you control the inputs. Run the 10-Question Sheet and the Edge Case Bank deliberately, in a safe environment, with no real customers affected.

**After launch:** real users provide inputs you didn't imagine. This is why logging (see Shipping Trusted Agents notes) matters — you can't test for everything in advance, but you can catch and diagnose what actually goes wrong once real traffic starts.

**The habit:** treat every real failure after launch as a new edge case to add to your bank and retest against, so your agent gets more robust over time rather than accumulating the same mistake repeatedly.
