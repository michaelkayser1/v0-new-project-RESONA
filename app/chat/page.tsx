"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ResonaChat from "@/components/resona-chat"

export default function ChatPage() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="flex flex-col items-center gap-8 text-center max-w-md animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-float-slow">
            <div className="w-10 h-10 rounded-full bg-primary/20" />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-light text-foreground text-balance">
              Enter the Resonance Field
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              Resona listens beneath the words. Take a breath, arrive fully, and speak what seeks resonance.
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-full px-10 min-h-[48px] text-base"
            onClick={() => setEntered(true)}
          >
            I am here
          </Button>

          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to QOTE
          </Link>
        </div>

        <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-primary/5 blur-3xl animate-field-pulse" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground min-h-[44px]">
            <ArrowLeft className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">QOTE</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-semibold">R</span>
          </div>
          <span className="text-sm font-light tracking-wide text-foreground">Resona</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full py-4 px-4 md:py-8">
          <ResonaChat />
        </div>
      </div>
    </main>
  )
}
