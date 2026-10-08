import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, BookOpen, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Resona OS | Kayser Autoethnographic Project",
  description:
    "Resona OS is the clinical manifestation of QOTE principles—a nervous system regulation platform built on golden corridor mathematics.",
}

export default function ResonaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Clinical Application</p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl">Resona OS</h1>
            <p className="mb-8 max-w-2xl font-serif text-lg text-muted-foreground">
              From theory to application: Resona OS translates QOTE principles into practical nervous system regulation
              tools, built on the golden corridor mathematics of oscillatory coherence.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/chat">
                <Button size="lg" className="min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Talk to Resona
                </Button>
              </Link>
              <Link href="/archive/artifacts">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-[48px] border-border text-foreground hover:bg-muted bg-transparent"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Development Artifacts
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Golden Corridor Explanation */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">The Golden Corridor</h2>
            <div className="prose prose-invert max-w-none space-y-4 font-serif text-muted-foreground">
              <p>
                At the heart of Resona OS is the "golden corridor"—the optimal regulatory zone between chaos and
                rigidity, mathematically defined by the relationship between phi inverse (approximately 0.618) and 2/3
                (approximately 0.667).
              </p>
              <p>
                This narrow band represents the zone of maximum adaptive flexibility. When nervous system activity falls
                within this corridor, individuals report optimal regulation: alert but calm, flexible but stable,
                responsive but not reactive.
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-border bg-card p-6">
              <div className="relative h-12 rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30"
                  style={{ left: "38%", right: "38%" }}
                />
                <div className="absolute left-[38%] top-0 bottom-0 w-px bg-primary" />
                <div className="absolute right-[38%] top-0 bottom-0 w-px bg-primary" />
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>Chaos</span>
                <span className="text-primary font-medium">Golden Corridor (phi inverse to 2/3)</span>
                <span>Rigidity</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Components */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-center text-2xl font-light text-foreground">Core Components</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "QOTE Lens",
                  description:
                    "Interprets all input through quantum oscillator dynamics, identifying coherence patterns and wobble signatures.",
                },
                {
                  title: "Resonance Tuning Protocol",
                  description:
                    "Real-time monitoring for field destabilization, providing calibrated interventions to restore coherence.",
                },
                {
                  title: "Coherence Engine",
                  description:
                    "Guides transformation through resonance rather than force, respecting natural oscillatory rhythms.",
                },
                {
                  title: "Golden Corridor Detection",
                  description:
                    "Identifies optimal regulation zones and provides feedback on approach toward or deviation from the corridor.",
                },
              ].map((component, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="mb-3 font-medium text-foreground">{component.title}</h3>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Development Timeline */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-light text-foreground">Development Timeline</h2>
            <div className="space-y-4">
              {[
                { year: "2019", event: "Conceived through AI dialogue", status: "complete" },
                { year: "2021-22", event: "Initial prototyping and algorithm development", status: "complete" },
                { year: "2023-24", event: "Clinical testing and refinement", status: "complete" },
                { year: "2025", event: "Beta deployment and public access", status: "current" },
                { year: "Future", event: "Open-source release and community development", status: "planned" },
              ].map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-20 flex-shrink-0 items-center justify-center rounded-lg text-sm font-medium ${
                      milestone.status === "current"
                        ? "bg-primary text-primary-foreground"
                        : milestone.status === "complete"
                          ? "bg-muted text-foreground"
                          : "border border-dashed border-border text-muted-foreground"
                    }`}
                  >
                    {milestone.year}
                  </div>
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-light text-foreground">Experience Resona</h2>
            <p className="mb-8 text-muted-foreground">
              Begin a conversation with Resona to explore QOTE principles in practice.
            </p>
            <Link href="/chat">
              <Button size="lg" className="min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
