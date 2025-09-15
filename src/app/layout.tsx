import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ABTestScript from '@/components/ABTestScript'
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
        {/* Your A/B testing snippet would be injected here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Placeholder for your external A/B testing snippet
              // This is where you would inject your actual snippet
              console.log('A/B Testing Snippet Placeholder - Replace with your actual snippet');
              
              // Example of what your snippet might look like:
              // (function() {
              //   var script = document.createElement('script');
              //   script.src = 'https://your-cdn.com/ab-testing-snippet.js';
              //   script.async = true;
              //   document.head.appendChild(script);
              // })();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <ABTestScript />
        <Analytics />
      </body>
    </html>
  )
}