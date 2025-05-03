// Mockup API for LLM chat actions; swap for real LLM integration later
export type LLMMessage = { role: "user" | "ai"; content: string };

export async function sendMessage(message: string): Promise<LLMMessage[]> {
  try {
    const res = await fetch("/api/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      return [{ role: "ai", content: `[Error: ${res.status}] Could not get a response from the LLM.` }];
    }
    const data = await res.json();
    if (!data?.content) {
      return [{ role: "ai", content: "[Error: No reply] The LLM did not return a response." }];
    }
    return [{ role: "ai", content: data.content }];
  } catch (err: any) {
    return [{ role: "ai", content: `[Error: Network/Server] ${err.message}` }];
  }
}

/**
 * Fetch weather data for a city using the /api/weather endpoint.
 * @param city The city name to fetch weather for.
 * @returns The weather data object or error.
 */
export async function fetchWeather(city: string): Promise<any> {
  if (!city || !city.trim()) return { error: 'City is required' };
  try {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      return { error: `Weather API error: ${res.status}` };
    }
    return await res.json();
  } catch (err: any) {
    return { error: err.message || 'Network error' };
  }
}
