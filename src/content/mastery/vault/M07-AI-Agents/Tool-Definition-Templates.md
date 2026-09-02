# Tool Definition Templates
Every tool an agent can call needs these four things defined clearly. Use this template for each tool you build in M07-M10.

```
Tool name: [short, clear name, e.g. "check_menu_item"]
What it does: [one sentence]
Input needed: [parameter name: type — description]
  - e.g. item_name: string — the name of the menu item to look up
Returns: [what comes back, and in what shape]
  - e.g. { available: true/false, price: number, allergens: [list] }
When the agent should use it: [the situation that should trigger this tool call]
When it should NOT be used: [any limits]
```

## Example — filled in
```
Tool name: send_order_to_kitchen
What it does: Sends a confirmed order to the kitchen's email/notification system.
Input needed: order_items (list), total (number), customer_name (string)
Returns: { success: true/false, order_id: string }
When to use: Only after the customer has confirmed the full order and total.
When NOT to use: Never before confirmation. Never with an empty order list.
```
