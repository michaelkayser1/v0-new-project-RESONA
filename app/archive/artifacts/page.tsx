import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, ExternalLink, Github, Calendar } from "lucide-react"
import Link from "next/link"
import ArchiveSearch from "@/components/archive-search"

export const metadata = {
  title: "Generated Artifacts | Research Archive | Kayser Autoethnographic Project",
  description:
    "Applications, visualizations, tools, and prototypes built through AI-augmented development processes over 8 years.",
}

const artifactCategories = [
  { name: "All", count: 142 },
  { name: "Applications", count: 34 },
  { name: "Visualizations", count: 28 },
  { name: "Tools", count: 45 },
  { name: "Prototypes", count: 23 },
  { name: "Documentation", count: 12 },
]

const artifacts = [
  {
    title: "Resona OS Web Platform",
    category: "Application",
    date: "Dec 2025",
    description:
      "Full-featured nervous system regulation platform built on QOTE principles and golden corridor mathematics.",
    status: "Active",
    links: { demo: "/chat", source: null },
  },
  {
    title: "QOTE Coherence Visualizer",
    category: "Visualization",
    date: "Nov 2025",
    description: "Interactive 3D visualization of oscillatory coherence patterns and golden corridor dynamics.",
    status: "Beta",
    links: { demo: "#", source: null },
  },
  {
    title: "Resonance Tuning Protocol v2.3",
    category: "Tool",
    date: "Dec 2025",
    description: "Algorithm implementation for real-time nervous system coherence monitoring and tuning.",
    status: "Active",
    links: { demo: null, source: null },
  },
  {
    title: "Golden Corridor Calculator",
    category: "Tool",
    date: "Oct 2025",
    description: "Mathematical tool for computing phi-inverse to 2/3 corridor boundaries for any input parameters.",
    status: "Active",
    links: { demo: "#", source: null },
  },
  {
    title: "QOTE Framework Documentation",
    category: "Documentation",
    date: "Sep 2025",
    description: "Comprehensive technical documentation of the Quantum Oscillator Theory of Everything.",
    status: "Draft",
    links: { demo: null, source: null },
  },
  {
    title: "Wobble Signature Analyzer",
    category: "Prototype",
    date: "Aug 2025",
    description: "Experimental tool for detecting and classifying quantum wobble patterns in biological systems.",
    status: "Experimental",
    links: { demo: null, source: null },
  },
]

export default function ArtifactsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
                <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">Generated Artifacts</h1>
              </div>
            </div>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              Applications, visualizations, tools, and prototypes built through AI-augmented development. Each artifact
              represents a concrete manifestation of QOTE principles.
            </p>

            {/* Search - Now using client component */}
            <div className="mt-8">
              <ArchiveSearch placeholder="Search artifacts..." />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border bg-card/30 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2">
              {artifactCategories.map((cat, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={`min-h-[36px] ${index === 0 ? "bg-primary text-primary-foreground" : "border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                >
                  {cat.name}
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{cat.count}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Artifacts Grid */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artifacts.map((artifact, index) => (
                <Card key={index} className="archive-card border-border bg-card hover:border-primary/50">
                  <CardContent className="flex flex-col p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {artifact.category}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          artifact.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : artifact.status === "Beta"
                              ? "bg-blue-500/10 text-blue-500"
                              : artifact.status === "Draft"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-purple-500/10 text-purple-500"
                        }`}
                      >
                        {artifact.status}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">{artifact.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{artifact.description}</p>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {artifact.date}
                      </span>
                      <div className="flex gap-2">
                        {artifact.links.demo && (
                          <Link href={artifact.links.demo}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {artifact.links.source && (
                          <Link href={artifact.links.source}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-foreground"
                            >
                              <Github className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
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
