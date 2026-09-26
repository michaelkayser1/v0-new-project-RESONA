import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resona Chat | Research Demo',
  description: 'An exploratory chat interface for Resona OS research. No clinical or consequential decisions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
