import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Manikineko.nl\'s story and mission',
}

export default function About() {
  return (
    <div className="rounded-lg bg-gray-800/50 p-6 shadow-lg border border-gray-700">
      <h1 className="text-4xl font-bold mb-6">Manikineko.nl&apos;s Story</h1>
      <div className="space-y-6 text-lg">
        <p>
          Manikineko was born from the vision of a father and daughter, aiming to innovate and bring about a harmonious blend of technology and community. Originally rooted in the concepts of InTouch NV, our journey began before our founder passed away in April 2019. After the company was sold, we re-emerged with a renewed focus on AI, cloud services, and gaming, continuing the legacy of compassion, love, and technological advancement.
        </p>
        <p>
          Our mission is to transform the way individuals and businesses interact with technology. We&apos;re not just a company; we&apos;re a community-driven studio that listens, engages, and evolves with our users. With projects like YukiBot and our innovative LLM, llama32-helpsteer, we strive to create platforms that foster unity, kindness, and inspiration in a connected world.
        </p>
      </div>
    </div>
  )
}

