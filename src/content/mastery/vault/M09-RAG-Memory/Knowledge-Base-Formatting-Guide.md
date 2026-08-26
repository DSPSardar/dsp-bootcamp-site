# Knowledge Base Formatting Guide
How to structure documents so retrieval (RAG) actually works well.

## Do
- Break content into clear, self-contained chunks (one menu item per entry, one policy per section)
- Use consistent headers so similar content is easy to find ("## Allergen Info", "## Opening Hours")
- Keep each chunk focused on one topic — a chunk mixing "delivery policy" and "vegan options" retrieves poorly for either question
- Update the source document when facts change — don't let the agent's knowledge base go stale

## Don't
- Don't dump a huge unstructured wall of text — the agent can't find the right piece efficiently
- Don't duplicate the same fact in three different places with slightly different wording (creates contradictions)
- Don't include information you don't want the agent repeating to customers (internal notes, cost prices)

## Example — good menu entry
```
## Chicken Tikka Wrap
Price: Rs 450
Description: Grilled chicken, mint yogurt, mixed greens, in a wheat wrap.
Allergens: Gluten, Dairy
Spice level: Medium (contains green chilli in the marinade)
Vegetarian: No
```
