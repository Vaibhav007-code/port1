import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import LenisScroll from '@/components/LenisScroll'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Muskan Nasim - Creative Director',
  description: 'Portfolio of Muskan Nasim - Creative Director, Brand Storyteller & Design Innovator. Transforming ideas into visual poetry.',
  keywords: ['Creative Director', 'Brand Design', 'Portfolio', 'Muskan Nasim', 'Design', 'Visual Design'],
  authors: [{ name: 'Muskan Nasim' }],
  creator: 'Muskan Nasim',
  icons: {
    icon: [
      { url: '/image.jpg', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/image.jpg',
    apple: [
      { url: '/image.jpg' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Muskan Nasim - Creative Director',
    description: 'Transforming ideas into visual poetry',
    url: 'https://yourwebsite.com',
    siteName: 'Muskan Nasim Portfolio',
    images: [
      {
        url: '/image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muskan Nasim - Creative Director',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muskan Nasim - Creative Director',
    description: 'Transforming ideas into visual poetry',
    images: ['/image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/image.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/image.jpg" />
      </head>
      <body className="antialiased bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#16213e]">
        <LenisScroll>
          {children}
        </LenisScroll>
      </body>
    </html>
  )
}