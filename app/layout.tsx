import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Resona OS | Coherence Technology for Health Systems",
  description:
    "A clinical intelligence platform that detects drift in physiology, behavior, and decision-making — and guides systems back to stable function. Built by Kayser Medical PLLC.",
  keywords: [
    "coherence technology",
    "clinical intelligence",
    "health technology",
    "HRV monitoring",
    "clinical decision support",
    "Resona OS",
    "Kayser Medical",
  ],
  openGraph: {
    title: "Resona OS | Coherence Technology for Health Systems",
    description:
      "Helping humans and intelligent systems return to coherence. A clinical intelligence platform by Kayser Medical PLLC.",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A1628",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-[#0A1628]`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
