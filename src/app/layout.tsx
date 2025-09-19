import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TestStore - A/B Testing E-commerce Platform',
  description: 'A testing ground for A/B testing and analytics snippets. Experience different variants and see how they affect user behavior.',
  keywords: 'A/B testing, e-commerce, analytics, conversion optimization, testing platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics script will be loaded in body for better performance */}
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <Script 
          src="https://abai-one.vercel.app/api/integrations/cmfqp8zo9007xyt5lqdd6qhv6/script" 
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}