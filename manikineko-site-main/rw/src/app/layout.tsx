import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Layout } from '@/components/layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://manikineko.nl'),
  title: {
    default: 'Manikineko.nl',
    template: '%s | Manikineko.nl'
  },
  description: 'Community-driven studio focused on AI, cloud services, and gaming',
  openGraph: {
    title: 'Manikineko.nl',
    description: 'Community-driven studio focused on AI, cloud services, and gaming',
    url: 'https://manikineko.nl',
    siteName: 'Manikineko.nl',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <Navbar />
          <main className="p-4">
            {children}
          </main>
        </Layout>
      </body>
    </html>
  )
}

