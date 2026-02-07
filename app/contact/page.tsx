"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ResonaChatModal } from "@/components/resona-chat"
import { useState } from "react"
import { MessageCircle, Mail } from "lucide-react"

export default function ContactPage() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Nav onChatOpen={() => setShowChat(true)} />

      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">Contact</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">Let's talk</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            If this resonates — whether you're a clinician, technologist, or just someone trying to make sense of
            complexity — we might have a useful conversation.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="p-6 md:p-8 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-xl text-foreground">Email</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5">The most reliable way to reach me.</p>
              <a
                href="mailto:mike@kayser-medical.com"
                className="inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                mike@kayser-medical.com
              </a>
            </div>

            {/* Resona */}
            <div className="p-6 md:p-8 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-serif text-xl text-foreground">Talk to Resona</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Want to explore some of these ideas first? Resona is a thinking partner built on the frameworks I've
                described. Not magic — just a useful space for working through complexity.
              </p>
              <button
                onClick={() => setShowChat(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground text-sm font-medium rounded-md hover:bg-muted transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Start a conversation
              </button>
            </div>
          </div>

          {/* Note */}
          <p className="mt-12 text-sm text-muted-foreground text-center">
            I read everything, though response time varies with clinical load.
            <br />
            Genuine questions always welcome. Sales pitches less so.
          </p>
        </div>
      </section>

      <Footer />

      {showChat && <ResonaChatModal onClose={() => setShowChat(false)} />}
    </div>
  )
}
