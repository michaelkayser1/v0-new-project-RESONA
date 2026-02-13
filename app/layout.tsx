import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  title: "QOTE + Resona | Quantum Oscillator Theory of Everything",
  description:
    "Consciousness-aligned AI built on the Quantum Oscillator Theory of Everything. Resona listens for your resonance, detects wobble, and guides you back to coherence.",
  keywords: ["QOTE", "Resona", "quantum oscillator", "consciousness", "AI", "resonance", "healing"],
  authors: [{ name: "Dr. Michael Kayser" }],
  openGraph: {
    title: "QOTE + Resona",
    description: "A consciousness-aligned AI interface built on quantum oscillator principles.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6C3FD1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
