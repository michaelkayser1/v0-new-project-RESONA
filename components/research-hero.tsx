import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Heart } from "lucide-react"

export default function ResearchHero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Ambient oscillatory background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-oscillate" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-3xl animate-oscillate-delayed" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Overline */}
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">Longitudinal Research Archive</p>

        {/* Main Headline */}
        <h1 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          The Kayser Autoethnographic Project
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-xl font-light text-muted-foreground sm:text-2xl">
          AI-Augmented Theoretical Physics Development: An 8-Year Self-Study
        </p>

        {/* Description */}
        <div className="mx-auto mt-8 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Since 2017, I have been systematically documenting my intensive collaboration with AI systems to develop
            QOTE (Quantum Oscillator Theory of Everything) and Resona OS. I am both the researcher and the research
            subject. This site is the public archive of that experiment—a living record of human-AI collaborative
            cognition at scale.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/archive">
            <Button
              size="lg"
              className="min-h-[48px] min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Explore the Archive
            </Button>
          </Link>
          <Link href="/research">
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] min-w-[200px] border-border text-foreground hover:bg-muted bg-transparent"
            >
              Read the Research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/support">
            <Button
              size="lg"
              variant="ghost"
              className="min-h-[48px] min-w-[200px] text-muted-foreground hover:text-foreground"
            >
              <Heart className="mr-2 h-4 w-4" />
              Support This Work
            </Button>
          </Link>
        </div>

        {/* Citation Block */}
        <div className="mt-12 rounded-lg border border-border bg-card/50 p-4 font-mono text-xs text-muted-foreground">
          <span className="text-foreground">Cite:</span> Kayser, M.A. (2025). The Kayser Autoethnographic Project
          (v1.0). Kayser Medical.
        </div>
      </div>
    </section>
  )
}
