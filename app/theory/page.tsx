import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"

export default function TheoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">How I think</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            A simple idea, explained carefully
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            The core concept isn't complicated. What's tricky is holding it without overstating what it means.
          </p>

          <div className="space-y-12">
            {/* The Idea */}
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-2xl text-foreground">The observation</h2>
              <p className="text-foreground text-lg">Thinking can extend across people and tools.</p>
              <p>
                When two people work through a problem together on a whiteboard, neither person alone is doing all the
                thinking. The conversation itself becomes a kind of cognitive workspace — ideas get externalized,
                refined, and built upon.
              </p>
              <p>This isn't mystical. It's just how collaborative work actually works.</p>
            </div>

            {/* The Extension */}
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-2xl text-foreground">The extension</h2>
              <p>
                The same thing can happen with AI systems. Not because AI is conscious or "truly understanding" — but
                because the <em>conversation itself</em> becomes a shared space for working through complexity.
              </p>
              <p>
                Think of it like a pilot and autopilot. Neither is flying the plane alone. The system works because
                there are clear handoffs, shared awareness, and protocols for when things go wrong.
              </p>
              <p>
                Or like clinical handoffs in medicine. The patient's care extends across multiple people, each
                contributing their attention and expertise. What matters is the quality of the transitions and the
                shared commitment to the patient's wellbeing.
              </p>
            </div>

            {/* What It Requires */}
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-2xl text-foreground">What this requires</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-primary font-serif text-lg">1.</span>
                  <div>
                    <span className="text-foreground font-medium">Grounding</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Regular check-ins with reality. Does this still make sense? Are we drifting?
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-serif text-lg">2.</span>
                  <div>
                    <span className="text-foreground font-medium">Responsibility</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Humans remain accountable. The AI is a tool, not a decision-maker.
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-serif text-lg">3.</span>
                  <div>
                    <span className="text-foreground font-medium">Recovery</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — Clear protocols for when things go wrong. Every system fails sometimes.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* What It Doesn't Require */}
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-2xl text-foreground">What this doesn't require</h2>
              <p>
                It doesn't require AI consciousness. It doesn't require believing that AI "truly understands." It
                doesn't require magical thinking.
              </p>
              <p>
                The usefulness of collaborative cognition comes from the <em>process</em>, not from claims about what's
                happening inside the machine.
              </p>
            </div>

            {/* This Is / This Isn't */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  This is
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Grounded in observable practice</li>
                  <li>Testable and refinable</li>
                  <li>Cautious about claims</li>
                  <li>Human-centered throughout</li>
                  <li>Open to being wrong</li>
                </ul>
              </div>

              <div className="p-6 bg-destructive/5 rounded-lg border border-destructive/10">
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-destructive" />
                  This is not
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>AI sentience claims</li>
                  <li>Futurism theater</li>
                  <li>A personal brand cult</li>
                  <li>Revolutionary manifesto</li>
                  <li>Certainty about outcomes</li>
                </ul>
              </div>
            </div>

            {/* The Bottom Line */}
            <div className="p-8 bg-card rounded-lg border border-border text-center">
              <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed text-balance">
                When a thoughtful visitor leaves this site, I hope they feel: "This person can hold complexity without
                panicking — and without needing to be right."
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Let's have a conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
