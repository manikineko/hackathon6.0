/**
 * bunqTool: Human-friendly Bunq API tool for agent/LLM use, using /api/bunqProxy.
 * Accepts a prompt (e.g. "List my payments", "What is my balance?", "Create a payment of 10 EUR to John Doe"),
 * parses it, maps to the correct Bunq endpoint/method/args, calls /api/bunqProxy, and returns a readable summary.
 *
 * For advanced use, you can hook this up to an LLM for prompt parsing. This version uses simple heuristics/examples.
 */
export async function bunqTool(prompt: string): Promise<string> {
  // Simple mapping for demo; replace with LLM or more advanced NLP for full coverage
  let endpoint = '';
  let method = '';
  let args: Record<string, any> = {};

  const lower = prompt.toLowerCase();
  if (lower.includes('balance')) {
    // Use the budget endpoint for balance
    try {
      const res = await fetch('http://localhost:8000/budget');
      if (!res.ok) return `Failed to fetch budget: ${res.status} ${res.statusText}`;
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        return "Failed to parse budget response as JSON.";
      }
      if (!data || typeof data.budget === 'undefined') {
        return "Budget data is missing in the response.";
      }
      return `Your main account balance is ${data.budget} ${data.currency}.`;
    } catch (err: any) {
      return `Error fetching budget: ${err.message}`;
    }
  } else if (lower.includes('payments') || lower.includes('transactions')) {
    endpoint = 'Payment';
    method = 'list';
  } else if (lower.includes('create payment')) {
    endpoint = 'Payment';
    method = 'create';
    // Example: "Create a payment of 10 EUR to John Doe"
    // You would parse the amount, currency, and recipient from the prompt
    // For demo, hardcode example args:
    args = {
      amount: { value: '10.00', currency: 'EUR' },
      counterparty_alias: { type: 'EMAIL', value: 'john@example.com' },
      description: 'Demo payment',
      monetary_account_id: 1 // Replace with real account ID
    };
  } else {
    return 'Sorry, I do not understand this Bunq request. Please rephrase.';
  }

  // Demo/stub responses only
  if (endpoint === 'MonetaryAccountBank' && method === 'list') {
    return 'Your main account balance is 1234.56 EUR. [demo]';
  } else if (endpoint === 'Payment' && method === 'list') {
    return 'Recent payments:\n- 10.00 EUR to John Doe: Coffee\n- 20.00 EUR to Jane Roe: Groceries [demo]';
  } else if (endpoint === 'Payment' && method === 'create') {
    return 'Payment created: {"id": 99999, "amount": "10.00 EUR", "status": "SUCCESS"} [demo]';
  } else {
    return 'Bunq API response: [demo/stub]';
  }
}
