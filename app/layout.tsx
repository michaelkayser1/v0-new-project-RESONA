import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  title: "The Kayser Autoethnographic Project | AI-Augmented Theoretical Physics Research",
  description:
    "An 8-year longitudinal self-study documenting AI-augmented theoretical physics development. Researcher: Dr. Michael A. Kayser, DO, FACMG. Focus: QOTE (Quantum Oscillator Theory of Everything) and Resona OS.",
  keywords:
    "autoethnographic AI research, QOTE quantum oscillator theory, AI-augmented cognition, human-AI collaboration methodology, Dr. Michael Kayser, longitudinal research, consciousness research, Resona OS",
  authors: [{ name: "Dr. Michael A. Kayser, DO, FACMG", url: "https://kayser-medical.com" }],
  creator: "Dr. Michael A. Kayser",
  publisher: "Kayser Medical PLLC",
  openGraph: {
    title: "The Kayser Autoethnographic Project",
    description:
      "AI-Augmented Theoretical Physics Development: An 8-Year Self-Study. Documenting the development of QOTE and Resona OS through systematic AI collaboration.",
    url: "https://kayser-medical.com",
    siteName: "Kayser Autoethnographic Project",
    type: "website",
    images: [
      {
        url: "/research-archive-quantum-oscillator-theory.jpg",
        width: 1200,
        height: 630,
        alt: "The Kayser Autoethnographic Project - AI Research Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Kayser Autoethnographic Project",
    description: "AI-Augmented Theoretical Physics Development: An 8-Year Self-Study",
    images: ["/research-archive-quantum-physics.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
