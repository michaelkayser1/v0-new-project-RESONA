"use client"

import { CoherenceWaveform } from "@/components/coherence-waveform"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Waveform background */}
      <div className="absolute inset-0 opacity-40">
        <CoherenceWaveform />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-24 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-in text-balance">
            Resona OS
          </h1>

          <p className="text-lg md:text-xl text-primary leading-relaxed mb-5 animate-fade-in text-pretty" style={{ animationDelay: "100ms" }}>
            Helping humans and intelligent systems return to coherence.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 animate-fade-in text-pretty" style={{ animationDelay: "200ms" }}>
            A clinical intelligence platform that detects drift in physiology, behavior, and decision-making — and guides systems back to stable function.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <a
              href="#platform"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Explore the Platform
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clinicians"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-foreground text-sm font-medium rounded-full hover:bg-card transition-colors min-h-[44px]"
            >
              For Clinicians
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-border/30 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              7+ years of clinical research
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              78% reduction in dysregulation episodes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Patent-pending coherence technology
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
