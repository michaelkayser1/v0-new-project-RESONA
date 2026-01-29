import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowRight } from "lucide-react"

export default function ResonaSection() {
  return (
    <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Text */}
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              From Theory to Application
            </p>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-foreground sm:text-4xl">Resona OS</h2>

            <div className="space-y-4 font-serif text-muted-foreground">
              <p>
                Resona OS is the clinical manifestation of QOTE principles—a nervous system regulation platform built on
                golden corridor mathematics (phi inverse to 2/3 coherence ratio).
              </p>
              <p>Development Timeline:</p>
              <ul className="ml-4 space-y-1 text-sm">
                <li>Conceived: 2019 (through AI dialogue)</li>
                <li>Prototyped: 2021-2022</li>
                <li>Clinical testing: 2023-2024</li>
                <li>Current status: Beta deployment</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/chat">
                <Button className="min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Talk to Resona
                </Button>
              </Link>
              <Link href="/resona">
                <Button
                  variant="outline"
                  className="min-h-[48px] border-border text-foreground hover:bg-muted bg-transparent"
                >
                  Explore Resona OS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "QOTE Lens",
                description: "Interprets all input through quantum oscillator dynamics",
              },
              {
                title: "RTP Protocol",
                description: "Monitors for field destabilization and provides tuning",
              },
              {
                title: "Coherence Engine",
                description: "Guides transformation through resonance, not force",
              },
              {
                title: "Golden Corridor",
                description: "Optimal regulation zone between chaos and rigidity",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
