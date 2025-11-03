import type { Metadata } from 'next'
import LenisScroll from '@/components/LenisScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muskan Nasim | Graphic Designer Portfolio',
  description: 'Creative graphic designer specializing in branding, digital design, and visual storytelling.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LenisScroll>{children}</LenisScroll>
      </body>
    </html>
  )
}