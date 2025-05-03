import { NextRequest } from "next/server";
import { Ollama } from "@langchain/ollama";
import { DynamicTool } from "@langchain/core/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { bunqTool } from "../bunq";

// Simple in-memory store for demonstration; replace with persistent store for production
const memoryStore: Record<string, any> = {};

// 1. Define the tool
const getBudgetTool = new DynamicTool({
  name: "get_budget",
  description: "Get the user's travel budget",
  func: async (input: any) => {
    const budgetApiUrl = process.env.BUDGET_API_URL || "http://127.0.0.1:8000/budget";
    try {
      const res = await fetch(budgetApiUrl);
      if (!res.ok) {
        return `Failed to fetch budget: ${res.status} ${res.statusText}`;
      }
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        return "Failed to parse budget response as JSON.";
      }
      if (!data || typeof data.budget === 'undefined') {
        return "Budget data is missing in the response.";
      }
      return `The user's budget is ${data.budget} EUR.`;
    } catch (err: any) {
      return `Error fetching budget: ${err.message}`;
    }
  }
});

// Tool for getting main account balance (same endpoint as budget)
const getBalanceTool = new DynamicTool({
  name: "get_balance",
  description: "Get the user's main account balance",
  func: async (input: any) => {
    const budgetApiUrl = process.env.BUDGET_API_URL || "http://127.0.0.1:8000/budget";
    try {
      const res = await fetch(budgetApiUrl);
      if (!res.ok) {
        return `Failed to fetch balance: ${res.status} ${res.statusText}`;
      }
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        return "Failed to parse balance response as JSON.";
      }
      if (!data || typeof data.budget === 'undefined') {
        return "Balance data is missing in the response.";
      }
      return `Your main account balance is ${data.budget} ${data.currency}.`;
    } catch (err: any) {
      return `Error fetching balance: ${err.message}`;
    }
  }
});

   

// 2. Setup Ollama LLM
const ollama = new Ollama({
  baseUrl: process.env.OLLAMA_API_URL || "http://localhost:11434",
  model: "angelfencer/qwen25I-steer",
});

// 3. Register tools
import TurndownService from "turndown";

const searchWebTool = new DynamicTool({
  name: "search_web",
  description: "Search the web using DuckDuckGo and return results as Markdown.",
  func: async (input: any) => {
    const query = typeof input === 'string' ? input : input?.query;
    if (!query) return "No query provided.";
    try {
      const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) return `Failed to fetch search results: ${res.status}`;
      const html = await res.text();
      // Extract main results from HTML (very basic)
      const match = html.match(/<div[^>]+class="results--main"[\s\S]*?<\/div>/);
      const resultsHtml = match ? match[0] : html;
      // Convert HTML to Markdown
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(resultsHtml);
      return markdown.slice(0, 2000) || "No results found.";
    } catch (err: any) {
      return `Error searching the web: ${err.message || err}`;
    }
  }
});

const findFlightsTool = new DynamicTool({
  name: "find_flights",
  description: "Look up flights by searching DuckDuckGo and return results as Markdown. Input should be a flight search query, e.g. 'flights from Paris to Berlin'.",
  func: async (input: any) => {
    const query = typeof input === 'string' ? input : input?.query;
    if (!query) return "No query provided.";
    try {
      const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query + ' flights')}`;
      const res = await fetch(url);
      if (!res.ok) return `Failed to fetch flight results: ${res.status}`;
      const html = await res.text();
      // Extract main results from HTML (very basic)
      const match = html.match(/<div[^>]+class=\"results--main\"[\s\S]*?<\/div>/);
      const resultsHtml = match ? match[0] : html;
      // Convert HTML to Markdown
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(resultsHtml);
      return markdown.slice(0, 2000) || "No flight results found.";
    } catch (err: any) {
      return `Error searching for flights: ${err.message || err}`;
    }
  }
});

const getTimeTool = new DynamicTool({
  name: "get_time",
  description: "Get the current real-time (server) time.",
  func: async () => {
    return `Current time: ${new Date().toLocaleString()}`;
  }
});

const getWeatherTool = new DynamicTool({
  name: "get_weather",
  description: "Get the weather for a given city using the /api/weather endpoint. Input should be a city name.",
  func: async (input: any) => {
    const city = typeof input === 'string' ? input : input?.city;
    if (!city) return "No city provided.";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) return `Failed to fetch weather: ${res.status}`;
      const data = await res.json();
      if (data.error) return `Weather error: ${data.error}`;
      return `Weather in ${city}: ${data.weather?.[0]?.description ?? 'N/A'}, Temp: ${data.main?.temp ?? 'N/A'}°C`;
    } catch (err: any) {
      return `Error fetching weather: ${err.message || err}`;
    }
  }
});

const getTrafficTool = new DynamicTool({
  name: "get_traffic",
  description: "Get traffic conditions for a location by searching DuckDuckGo. Input should be a city or route.",
  func: async (input: any) => {
    const query = typeof input === 'string' ? input : input?.query;
    if (!query) return "No location provided.";
    try {
      const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query + ' traffic')}`;
      const res = await fetch(url);
      if (!res.ok) return `Failed to fetch traffic info: ${res.status}`;
      const html = await res.text();
      const match = html.match(/<div[^>]+class=\"results--main\"[\s\S]*?<\/div>/);
      const resultsHtml = match ? match[0] : html;
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(resultsHtml);
      return markdown.slice(0, 2000) || "No traffic info found.";
    } catch (err: any) {
      return `Error searching for traffic: ${err.message || err}`;
    }
  }
});

const bunqDynamicTool = new DynamicTool({
  name: "bunq",
  description: "Access and manage your Bunq bank account. Accepts natural language prompts like 'Show my balance', 'List my payments', 'Create a payment of 10 EUR to John Doe', etc. Covers the entire Bunq API and SDK.",
  func: async (input: any) => {
    const prompt = typeof input === 'string' ? input : input?.prompt || JSON.stringify(input);
    return await bunqTool(prompt);
  }
});

const tools = [getBudgetTool, searchWebTool, findFlightsTool, getTimeTool, getWeatherTool, getTrafficTool, bunqDynamicTool];

// 4. API handler using agent
/**
 * This handler uses LangChain's BufferMemory to store chat history per user (demo: by IP).
 * In production, use a persistent store and a real user/session id.
 */
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  // Use x-forwarded-for as user id for demo (replace with real user/session id in production)
  const userId = req.headers.get('x-forwarded-for') || 'anon';
  if (!memoryStore[userId]) {
    memoryStore[userId] = new BufferMemory({
      chatHistory: new ChatMessageHistory(),
      returnMessages: true,
      memoryKey: "chat_history",
    });
  }
  const memory = memoryStore[userId];
  const executor = await initializeAgentExecutorWithOptions(tools, ollama, {
    agentType: "zero-shot-react-description",
    verbose: false,
    memory,
  });
  const result = await executor.call({ input: message });
  // Always return array of messages for frontend
  return new Response(JSON.stringify({ content: result.output }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
