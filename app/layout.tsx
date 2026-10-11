import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'abeldev — Crafting the future of web',
  description: 'abeldev is a full-stack developer crafting modern, responsive and scalable digital experiences with clean code and thoughtful design.',
  metadataBase: new URL('https://abeldev.vercel.app'),
  openGraph: {
    title: 'abeldev — Crafting the future of web',
    description: 'Full-stack development, thoughtful design and digital products built with purpose.',
    url: 'https://abeldev.vercel.app',
    siteName: 'abeldev',
    type: 'website',
  },
  icons: {
    icon: '/images/abel.png',
    apple: '/images/abel.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08090d',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}