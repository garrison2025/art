import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://gibleartai.org'),
  title: {
    default: 'Gible Art AI - Transform Photos into Ghibli Style Artwork',
    template: '%s | Gible Art AI'
  },
  description: 'Transform your photos into beautiful Ghibli-style artwork using advanced AI technology. Create magical, Studio Ghibli-inspired images in seconds.',
  keywords: ['Gible Art AI', 'Ghibli style', 'AI art', 'image transformation', 'Studio Ghibli', 'digital art', 'AI image converter'],
  authors: [{ name: 'Gible Art AI Team' }],
  creator: 'Gible Art AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gibleartai.org',
    title: 'Gible Art AI - Transform Photos into Ghibli Style Artwork',
    description: 'Transform your photos into beautiful Ghibli-style artwork using advanced AI technology.',
    siteName: 'Gible Art AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gible Art AI - Transform Photos into Ghibli Style Artwork',
    description: 'Transform your photos into beautiful Ghibli-style artwork using advanced AI technology.',
    creator: '@gibleartai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <nav className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold">
                  Gible Art AI
                </Link>
                <div className="flex space-x-4">
                  <Link href="/" className="hover:text-gray-300">
                    Home
                  </Link>
                  <Link href="/transform" className="hover:text-gray-300">
                    Transform
                  </Link>
                  <Link href="/pricing" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <p>&copy; 2024 Gible Art AI. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
} 