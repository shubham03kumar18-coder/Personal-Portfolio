import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subham Kumar | Full-Stack Developer',
  description: 'Personal portfolio of Subham Kumar — Full-Stack Developer specializing in responsive web development with HTML5, CSS3, and JavaScript.',
  generator: undefined,
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1f23' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
