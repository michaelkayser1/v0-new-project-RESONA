import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resona AI - Your Personal Medical Assistant | Kayser Medical",
  description:
    "Get instant, intelligent health guidance powered by advanced AI. Ask questions, get personalized advice, and take control of your wellness journey with Resona.",
  keywords: "AI medical assistant, health guidance, medical AI, healthcare technology, Resona, Kayser Medical",
  authors: [{ name: "Kayser Medical" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
