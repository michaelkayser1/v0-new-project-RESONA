import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.kayser-medical.com"),
  title: "Resona | Experimental Chat, Research & Writing",
  description: "Explore experimental Resona conversation, evidence-centered AI governance research, Michael Kayser's writing, music, and creative archives. Not a clinical service or validated authorization system.",
  authors: [{ name: "Michael A. Kayser, DO, FACMG" }],
  creator: "Michael A. Kayser",
  publisher: "Kayser Medical PLLC",
  openGraph: { title: "Resona | Kayser Medical Research & Creative Archive", description: "Experimental AI conversation, governance research, personal writing, and creative archives.", url: "https://chat.kayser-medical.com", type: "website" },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} bg-background`}>
      <head>
        <link rel="icon" href="/k-research.jpg" />
        <link rel="apple-touch-icon" href="/k-research.jpg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
