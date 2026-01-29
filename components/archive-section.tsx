import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Wrench, GraduationCap, Music, Brain, BarChart3, ArrowRight } from "lucide-react"

export default function ArchiveSection() {
  const archiveCategories = [
    {
      icon: FileText,
      title: "Chat Transcripts",
      description: "Real-time theory development conversations",
      meta: "Latest: Dec '25",
      href: "/archive/transcripts",
    },
    {
      icon: Wrench,
      title: "Generated Artifacts",
      description: "Apps, visualizations, tools built through AI collaboration",
      meta: "142 items",
      href: "/archive/artifacts",
    },
    {
      icon: GraduationCap,
      title: "Research Papers",
      description: "Theoretical frameworks & findings",
      meta: "8 papers",
      href: "/archive/papers",
    },
    {
      icon: Music,
      title: "Creative Works",
      description: "AI-generated music, podcasts exploring oscillatory themes",
      meta: "23 pieces",
      href: "/archive/creative",
    },
    {
      icon: Brain,
      title: "Phenomenological Notes",
      description: "Reflections on human-AI collaboration experience",
      meta: "Monthly",
      href: "/archive/notes",
    },
    {
      icon: BarChart3,
      title: "Outcome Metrics",
      description: "Clinical efficiency, productivity, coherence data",
      meta: "Dashboard",
      href: "/archive/metrics",
    },
  ]

  return (
    <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Data & Documentation</p>
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            Explore the Research Archive
          </h2>
        </div>

        {/* Archive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {archiveCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={index} href={category.href}>
                <Card className="archive-card h-full border-border bg-card hover:border-primary/50 cursor-pointer">
                  <CardContent className="flex flex-col p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">{category.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">{category.meta}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
