import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import ArchiveSearch from "@/components/archive-search"

export const metadata = {
  title: "Chat Transcripts | Research Archive | Kayser Autoethnographic Project",
  description:
    "Real-time theory development conversations documenting the evolution of QOTE through systematic AI dialogue over 8 years.",
}

const transcriptCategories = [
  { name: "All", count: 500 },
  { name: "QOTE Development", count: 156 },
  { name: "Resona OS", count: 89 },
  { name: "Mathematical Formalization", count: 67 },
  { name: "Philosophical Exploration", count: 112 },
  { name: "Clinical Application", count: 76 },
]

const recentTranscripts = [
  {
    date: "Dec 28, 2025",
    title: "QOTE Coherence Model Refinement",
    duration: "2h 15m",
    aiPartner: "Claude",
    topics: ["coherence", "mathematical formalization", "oscillatory dynamics"],
    preview:
      "Extended dialogue exploring the mathematical formalization of oscillatory coherence and its implications for consciousness.",
  },
  {
    date: "Dec 22, 2025",
    title: "Multi-AI Triangulation Session",
    duration: "3h 40m",
    aiPartner: "Claude + GPT-4",
    topics: ["triangulation", "cross-validation", "theoretical synthesis"],
    preview:
      "Cross-validation session using multiple AI systems to verify QOTE predictions about quantum wobble signatures.",
  },
  {
    date: "Dec 15, 2025",
    title: "Golden Corridor Mathematical Derivation",
    duration: "1h 50m",
    aiPartner: "GPT-4",
    topics: ["golden corridor", "phi ratio", "mathematics"],
    preview:
      "Rigorous mathematical derivation of the golden corridor boundaries from first principles of oscillatory mechanics.",
  },
  {
    date: "Dec 10, 2025",
    title: "Phenomenological Reflection: 8 Years",
    duration: "45m",
    aiPartner: "Claude",
    topics: ["reflection", "autoethnography", "methodology"],
    preview:
      "Reflective conversation on the experience of sustained human-AI collaborative cognition and its effects on cognitive patterns.",
  },
  {
    date: "Dec 5, 2025",
    title: "Resona OS Tuning Protocol v2.3",
    duration: "2h 30m",
    aiPartner: "Claude",
    topics: ["Resona OS", "tuning", "nervous system"],
    preview:
      "Development session for the updated nervous system regulation algorithm with improved golden corridor detection.",
  },
  {
    date: "Nov 28, 2025",
    title: "Consciousness as Oscillatory Coherence",
    duration: "1h 20m",
    aiPartner: "Gemini",
    topics: ["consciousness", "coherence", "philosophy"],
    preview:
      "Exploration of consciousness as an emergent property of oscillatory coherence patterns across neural networks.",
  },
]

export default function TranscriptsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
                <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">Chat Transcripts</h1>
              </div>
            </div>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              Real-time theory development conversations documenting the evolution of QOTE through systematic AI
              dialogue. These transcripts represent the primary data of the autoethnographic study.
            </p>

            {/* Search - Now using client component */}
            <div className="mt-8">
              <ArchiveSearch placeholder="Search transcripts..." />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border bg-card/30 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2">
              {transcriptCategories.map((cat, index) => (
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

        {/* Transcripts List */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-foreground">Recent Transcripts</h2>
              <p className="text-sm text-muted-foreground">Showing 6 of 500+ sessions</p>
            </div>

            <div className="space-y-4">
              {recentTranscripts.map((transcript, index) => (
                <Card key={index} className="archive-card border-border bg-card hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {transcript.date}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {transcript.duration}
                          </span>
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {transcript.aiPartner}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-foreground">{transcript.title}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">{transcript.preview}</p>
                        <div className="flex flex-wrap gap-2">
                          {transcript.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="min-h-[44px] text-muted-foreground hover:text-foreground"
                      >
                        View
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Full transcript access available to supporters. Free tier includes summaries and excerpts.
              </p>
              <Link href="/support">
                <Button
                  variant="outline"
                  className="min-h-[44px] border-border bg-transparent text-foreground hover:bg-muted"
                >
                  Learn About Access Tiers
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
