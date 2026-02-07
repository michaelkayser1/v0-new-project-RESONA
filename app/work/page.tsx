import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">Work</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">What I work on</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            Three interconnected areas, all grounded in the same question: how do we help complex systems — and the
            humans within them — function well?
          </p>

          <div className="space-y-8">
            {/* Clinical Genetics */}
            <div className="p-6 md:p-8 bg-card rounded-lg border border-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">The foundation</span>
              <h2 className="font-serif text-2xl text-foreground mt-2 mb-4">Clinical Genetics</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Helping families understand complicated biology with clarity and care. This is the work that grounds
                  everything else.
                </p>
                <p>
                  A genetic diagnosis is rarely simple. It affects identity, family relationships, future planning, and
                  often involves genuine uncertainty. My job is to hold complexity without overwhelming people, and to
                  help them make decisions that fit their values.
                </p>
                <p className="text-foreground">
                  The skills this requires — sitting with ambiguity, communicating nuance, respecting autonomy — turn
                  out to be useful far beyond the clinic.
                </p>
              </div>
            </div>

            {/* Systems & Pattern Safety */}
            <div className="p-6 md:p-8 bg-card rounded-lg border border-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">The extension</span>
              <h2 className="font-serif text-2xl text-foreground mt-2 mb-4">Systems & Pattern Safety</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Designing ways for complex systems — including AI — to pause, adapt, and not cause harm when things
                  get complicated.
                </p>
                <p>
                  Most systems work fine under normal conditions. The question is what happens when they don't. Can they
                  recognize when they're drifting? Can they recover gracefully? Do they know when to ask for help?
                </p>
                <p>
                  These questions apply equally to organizations, technologies, and individual humans. The principles
                  are surprisingly consistent.
                </p>
              </div>
            </div>

            {/* Human-AI Collaboration */}
            <div className="p-6 md:p-8 bg-card rounded-lg border border-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">The application</span>
              <h2 className="font-serif text-2xl text-foreground mt-2 mb-4">Human–AI Collaboration</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>Practical tools for thinking with AI responsibly, without pretending it's conscious or magical.</p>
                <p>
                  I've developed frameworks (including Resona) for collaborative cognition — ways for humans and AI
                  systems to work together on complex problems while maintaining appropriate boundaries.
                </p>
                <p>
                  This work is grounded in a simple observation: conversation can become a shared cognitive workspace.
                  That's useful and interesting, but it doesn't require mysticism.
                </p>
                <p className="text-foreground">
                  What matters is grounding, responsibility, and recovery when things drift.
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              This work is about <span className="text-foreground font-medium">governance and care</span>, not hype.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/theory"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              The underlying idea
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
