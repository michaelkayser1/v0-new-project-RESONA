"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ResonaChatModal } from "@/components/resona-chat"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15, rootMargin: "-50px" },
    )

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <div className="min-h-screen bg-background">
      <Nav onChatOpen={() => setShowChat(true)} />

      {/* Hero */}
      <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24 px-6">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm tracking-wide text-muted-foreground mb-6 uppercase">Michael A. Kayser, DO, FACMG</p>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight text-balance">
            Clarity under complexity.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 text-pretty">
            I'm a clinical geneticist who helps people and systems make sense of complexity — especially when things
            don't behave the way we expect.
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-10 text-pretty">
            Medicine is where I started. Patterns are what I kept noticing. Careful thinking is what I'm trying to
            practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              How I got here
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setShowChat(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground text-sm font-medium rounded-md hover:bg-card transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Talk to Resona
            </button>
          </div>
        </div>
      </section>

      {/* The Line */}
      <section id="quote" className="py-16 md:py-20 px-6 border-y border-border/50">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible("quote") ? "opacity-100" : "opacity-0"}`}
        >
          <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed text-balance">
            "I want to help — but I can't unsee the patterns once I see them."
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            That's the honest version. I didn't choose to become a pattern-watcher. But ignoring them started to feel
            less responsible than naming them carefully.
          </p>
        </div>
      </section>

      {/* What I've Noticed */}
      <section id="noticed" className="py-16 md:py-24 px-6">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible("noticed") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">What I've noticed</h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              After years of working with families navigating complex genetic conditions, I started seeing something I
              couldn't un-see.
            </p>
            <p>
              The patterns that matter in medicine — diagnostic uncertainty, cascading effects, the importance of timing
              — they show up everywhere else too. In how organizations make decisions. In how technology evolves. In how
              humans think about thinking.
            </p>
            <p>
              Most systems behave well until they don't. And by the time they don't, it's often too late to ask why.
            </p>
            <p className="text-foreground">
              When systems can't pause, people get hurt. Most failures aren't from bad intent — they're from complexity
              outrunning care.
            </p>
          </div>
        </div>
      </section>

      {/* Three Areas */}
      <section id="areas" className="py-16 md:py-24 px-6 bg-card/30">
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible("areas") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">What I actually do</h2>
          <p className="text-muted-foreground mb-12 max-w-xl">Three areas. They're more connected than they look.</p>

          <div className="grid gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-background rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">01</span>
              <h3 className="font-serif text-xl text-foreground mt-2 mb-3">Clinical Genetics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Helping patients and families navigate complex biology with clarity and care. This is the work that
                taught me how to hold uncertainty without pretending it isn't there.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-background rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">02</span>
              <h3 className="font-serif text-xl text-foreground mt-2 mb-3">Systems & Pattern Safety</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Observing how complex systems behave under pressure — and designing ways they can pause, adapt, and
                recover without causing harm. Not theory. Practice.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-background rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">03</span>
              <h3 className="font-serif text-xl text-foreground mt-2 mb-3">Human–AI Collaboration</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Working on how humans think with tools like AI — safely, responsibly, without pretending they're
                conscious or magical. Governance matters more than novelty.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            I promise not to diagnose you with a pattern unless you ask.
          </p>
        </div>
      </section>

      {/* Personal Note */}
      <section id="personal" className="py-16 md:py-24 px-6">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible("personal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">A note</h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>I don't think I'm special. I think I'm attentive in a way that doesn't always fit job descriptions.</p>
            <p>
              I started in medicine because I wanted to help people. I stayed because the patterns kept appearing —
              across families, across institutions, across the strange new landscape of technology and care.
            </p>
            <p>
              This site exists because I needed somewhere to put all of it. Not to impress anyone. Just to make sense of
              it out loud.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-16 md:py-20 px-6 bg-card/50 border-t border-border/50">
        <div
          className={`max-w-xl mx-auto text-center transition-all duration-700 ${isVisible("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-serif text-xl md:text-2xl text-foreground mb-8 leading-relaxed text-balance">
            If this resonates — whether you're a clinician, technologist, or just someone trying to make sense of
            complexity — we might have a useful conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Let's talk
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setShowChat(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground text-sm font-medium rounded-md hover:bg-card transition-colors"
            >
              Or start with Resona
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {showChat && <ResonaChatModal onClose={() => setShowChat(false)} />}
    </div>
  )
}
