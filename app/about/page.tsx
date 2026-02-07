import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">About</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-balance">How I got here</h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-foreground">
              I trained as a physician because I wanted to help people. That part hasn't changed.
            </p>

            <p>
              Medical school taught me biology. Residency taught me systems. But the real education came from sitting
              with families — watching how a genetic diagnosis ripples through generations, relationships, and
              self-understanding.
            </p>

            <p>
              Clinical genetics is humbling work. You're often dealing with uncertainty, incomplete information, and
              decisions that don't have clean answers. Over time, I learned to notice patterns in how that uncertainty
              moves — when it resolves, when it cascades, when it gets stuck.
            </p>

            <p>
              Then I started noticing those same patterns elsewhere. In how hospitals function (or don't). In how
              technology projects fail. In how organizations make decisions under pressure.
            </p>

            <div className="py-8 border-y border-border my-8">
              <blockquote className="font-serif text-xl text-foreground leading-relaxed">
                "I don't think I'm special. I think I'm attentive in a way that doesn't always fit neatly into job
                descriptions."
              </blockquote>
            </div>

            <p>
              A few years ago, I started working more seriously at the intersection of medicine and AI — not because I
              think AI is magic, but because I think it's a system that needs the same careful attention we give to any
              complex intervention.
            </p>

            <p>
              The patterns are similar: potential benefits, potential harms, cascading effects, the importance of
              knowing when to pause. It turns out a geneticist's mindset is surprisingly useful here.
            </p>

            <p>
              So now I split my time between clinical work, writing, and building frameworks for thinking about complex
              systems — especially ones involving human-AI collaboration.
            </p>

            <p className="text-foreground">
              I'm not trying to claim novelty or build a movement. I'm just trying to help, while being honest about
              what I notice.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-16 p-6 bg-card rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wide">Background</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>DO, FACMG — Board-certified Clinical Geneticist</li>
              <li>Active clinical practice in medical genetics</li>
              <li>Research focus: systems safety, cognitive collaboration, AI governance</li>
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              What I'm working on
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/theory"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              How I think
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
