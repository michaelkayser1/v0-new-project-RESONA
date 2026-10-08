import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Wrench, GraduationCap, Music, Brain, BarChart3, Calendar, ArrowRight } from "lucide-react"
import ArchiveSearch from "@/components/archive-search"

export const metadata = {
  title: "All Archive Items | Kayser Autoethnographic Project",
  description: "Complete archive of the Kayser Autoethnographic Project - transcripts, artifacts, papers, and more.",
}

const allItems = [
  { type: "transcript", date: "Dec 28, 2025", title: "QOTE Coherence Model Refinement", icon: FileText },
  { type: "artifact", date: "Dec 25, 2025", title: "Resona OS Web Platform Update", icon: Wrench },
  { type: "transcript", date: "Dec 22, 2025", title: "Multi-AI Triangulation Session", icon: FileText },
  { type: "notes", date: "Dec 20, 2025", title: "Eight Years: A Retrospective", icon: Brain },
  { type: "artifact", date: "Dec 18, 2025", title: "QOTE Coherence Visualizer", icon: Wrench },
  { type: "transcript", date: "Dec 15, 2025", title: "Golden Corridor Mathematical Derivation", icon: FileText },
  { type: "paper", date: "Dec 12, 2025", title: "QOTE: A Unified Framework (Draft Update)", icon: GraduationCap },
  { type: "transcript", date: "Dec 10, 2025", title: "Phenomenological Reflection Session", icon: FileText },
  { type: "creative", date: "Dec 8, 2025", title: "Oscillatory Meditations Vol. 1 Release", icon: Music },
  { type: "artifact", date: "Dec 5, 2025", title: "Resonance Tuning Protocol v2.3", icon: Wrench },
  { type: "metrics", date: "Dec 1, 2025", title: "Monthly Metrics Dashboard Update", icon: BarChart3 },
  { type: "notes", date: "Nov 30, 2025", title: "The Triangulation Experience", icon: Brain },
]

const typeColors: Record<string, string> = {
  transcript: "bg-blue-500/10 text-blue-500",
  artifact: "bg-green-500/10 text-green-500",
  paper: "bg-purple-500/10 text-purple-500",
  creative: "bg-pink-500/10 text-pink-500",
  notes: "bg-yellow-500/10 text-yellow-500",
  metrics: "bg-cyan-500/10 text-cyan-500",
}

export default function AllArchivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl">All Archive Items</h1>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              Complete chronological listing of all documented research outputs, conversations, and artifacts.
            </p>

            {/* Search - Now using client component */}
            <div className="mt-8">
              <ArchiveSearch placeholder="Search all items..." />
            </div>
          </div>
        </section>

        {/* Items List */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-3">
              {allItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card key={index} className="archive-card border-border bg-card hover:border-primary/50">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeColors[item.type]}`}>
                            {item.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 px-2 text-muted-foreground hover:text-foreground"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="min-h-[44px] border-border bg-transparent text-foreground hover:bg-muted"
              >
                Load More Items
              </Button>
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
