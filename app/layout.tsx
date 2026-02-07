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
  title: "Dr. Michael A. Kayser | Clinical Geneticist",
  description:
    "Clinical geneticist helping people make sense of complex systems — medical, human, and sometimes technological. Grounded care, careful thinking.",
  keywords: [
    "clinical genetics",
    "medical genetics",
    "systems thinking",
    "human-AI collaboration",
    "Dr. Michael Kayser",
  ],
  openGraph: {
    title: "Dr. Michael A. Kayser, DO, FACMG",
    description: "Clinical geneticist. Pattern observer. Careful collaborator.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#faf9f7",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-[#faf9f7]`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
