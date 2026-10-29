import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.kayser-medical.com"),
  title: "SUPERINTELLIGENCE (SI) | Kayser Medical Research & Creative Archive",
  description: "Kayser Medical SUPERINTELLIGENCE (SI) research, historical model experiments, chat, writing and music. Independent authorization and verified execution remain research objectives.",
  authors: [{ name: "Michael A. Kayser, DO, FACMG" }],
  creator: "Michael A. Kayser",
  publisher: "Kayser Medical PLLC",
  openGraph: { title: "SUPERINTELLIGENCE (SI) | Kayser Medical", description: "Independent destination-side authorization research, writing and creative archives.", url: "https://chat.kayser-medical.com", type: "website" },
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
