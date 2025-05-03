import { Metadata } from 'next'
import { NavButton } from '../components/nav-button'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Manikineko.nl - A community-driven technology studio',
}

export default function Home() {
  return (
    <div className="rounded-lg bg-gray-800/50 p-6 shadow-lg border border-gray-700">
      <h1 className="text-4xl font-bold mb-6">Welcome to Manikineko.nl</h1>
      <div className="space-y-6 text-lg">
        <p>
          Manikineko is a community-driven technology studio focused on AI, cloud services, and gaming. Born from a vision to blend technology with community, we continue to innovate while fostering unity, kindness, and inspiration.
        </p>
        <h2 className="text-2xl font-bold">Projects</h2>
        <ul className="list-disc pl-5">
          <li>
            <NavButton href="https://yukibot.manikineko.nl" className="inline-block hover:underline">
              YukiBot
            </NavButton> - Our AI-powered chatbot designed to assist and engage.
          </li>
          <li>
            <NavButton href="https://ollama.com/angelfencer/llama32-steer" className="inline-block hover:underline">
              llama32-helpsteer
            </NavButton> - An innovative LLM for steering AI interactions with compassion.
          </li>
        </ul>
      </div>
    </div>
  )
}