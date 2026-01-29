import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Wrench, GraduationCap, Music, Brain, BarChart3, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Research Archive | Kayser Autoethnographic Project",
  description:
    "Explore 8 years of documented AI-augmented theoretical physics development. Chat transcripts, generated artifacts, research papers, and more.",
}

const archiveCategories = [
  {
    icon: FileText,
    title: "Chat Transcripts",
    description:
      "Real-time theory development conversations documenting the evolution of QOTE through systematic AI dialogue.",
    meta: "Latest: Dec 2025",
    count: "500+ sessions",
    href: "/archive/transcripts",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Generated Artifacts",
    description:
      "Applications, visualizations, tools, and prototypes built through AI-augmented development processes.",
    meta: "142 items",
    count: "Apps, tools, visualizations",
    href: "/archive/artifacts",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "Research Papers",
    description: "Formal theoretical frameworks, methodological documentation, and academic submissions.",
    meta: "8 papers",
    count: "In preparation & submitted",
    href: "/archive/papers",
    featured: true,
  },
  {
    icon: Music,
    title: "Creative Works",
    description: "AI-generated music, podcasts, and multimedia exploring oscillatory themes and QOTE concepts.",
    meta: "23 pieces",
    count: "Audio, visual, multimedia",
    href: "/archive/creative",
    featured: false,
  },
  {
    icon: Brain,
    title: "Phenomenological Notes",
    description: "Monthly reflections on the subjective experience of sustained human-AI collaborative cognition.",
    meta: "Monthly entries",
    count: "First-person accounts",
    href: "/archive/notes",
    featured: false,
  },
  {
    icon: BarChart3,
    title: "Outcome Metrics",
    description: "Quantitative data on clinical efficiency, productivity gains, and coherence measurements.",
    meta: "Dashboard",
    count: "Real-time tracking",
    href: "/archive/metrics",
    featured: false,
  },
]

const recentItems = [
  {
    date: "Dec 28, 2025",
    category: "Transcript",
    title: "QOTE Coherence Model Refinement Session",
    description: "Extended dialogue exploring the mathematical formalization of oscillatory coherence.",
  },
  {
    date: "Dec 22, 2025",
    category: "Artifact",
    title: "Resona Tuning Protocol v2.3",
    description: "Updated nervous system regulation algorithm with improved golden corridor detection.",
  },
  {
    date: "Dec 15, 2025",
    category: "Paper",
    title: "Autoethnographic Methods in AI Research",
    description: "Draft methodology section for the primary research paper.",
  },
  {
    date: "Dec 10, 2025",
    category: "Notes",
    title: "Reflection: Multi-AI Triangulation",
    description: "Observations on using Claude, GPT, and Gemini as cognitive observation points.",
  },
]

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl">
              8 Years of Documentation
            </h1>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              A comprehensive archive of the Kayser Autoethnographic Project, documenting AI-augmented theoretical
              physics development from 2017 to present.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex max-w-xl gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search the archive..."
                  className="min-h-[44px] bg-card pl-10 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="outline"
                className="min-h-[44px] border-border bg-transparent text-foreground hover:bg-muted"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-medium text-foreground">Browse by Category</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archiveCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <Link key={index} href={category.href}>
                    <Card
                      className={`archive-card h-full border-border bg-card hover:border-primary/50 cursor-pointer ${category.featured ? "ring-1 ring-primary/20" : ""}`}
                    >
                      <CardContent className="flex flex-col p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          {category.featured && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-foreground">{category.title}</h3>
                        <p className="mb-4 flex-1 text-sm text-muted-foreground">{category.description}</p>
                        <div className="flex items-center justify-between border-t border-border pt-4">
                          <div>
                            <p className="text-xs font-medium text-primary">{category.meta}</p>
                            <p className="text-xs text-muted-foreground">{category.count}</p>
                          </div>
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

        {/* Recent Items */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-medium text-foreground">Recent Additions</h2>
              <Link href="/archive/all" className="flex items-center gap-1 text-sm text-primary hover:underline">
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {recentItems.map((item, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Items", value: "700+" },
                { label: "Chat Sessions", value: "500+" },
                { label: "Generated Artifacts", value: "142" },
                { label: "Years Documented", value: "8" },
              ].map((stat, index) => (
                <Card key={index} className="border-border bg-card text-center">
                  <CardContent className="p-6">
                    <p className="text-3xl font-light text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
