import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Play, Headphones, Calendar, Clock } from "lucide-react"

export const metadata = {
  title: "Creative Works | Research Archive | Kayser Autoethnographic Project",
  description: "AI-generated music, podcasts, and multimedia exploring oscillatory themes and QOTE concepts.",
}

const creativeWorks = [
  {
    title: "Oscillatory Meditations Vol. 1",
    type: "Album",
    date: "Dec 2025",
    duration: "45 min",
    description: "AI-generated ambient music designed around golden corridor frequencies and oscillatory patterns.",
    tracks: 8,
  },
  {
    title: "The QOTE Podcast: Conversations with AI",
    type: "Podcast",
    date: "Nov 2025",
    duration: "Series",
    description: "Audio recordings of significant AI dialogue sessions, edited for clarity and narrative flow.",
    tracks: 12,
  },
  {
    title: "Coherence Soundscapes",
    type: "Album",
    date: "Oct 2025",
    duration: "60 min",
    description: "Generative audio exploring the sonic representation of coherence and wobble patterns.",
    tracks: 10,
  },
  {
    title: "The Golden Corridor Suite",
    type: "Album",
    date: "Sep 2025",
    duration: "35 min",
    description: "Musical compositions mathematically structured around phi-inverse to 2/3 ratios.",
    tracks: 5,
  },
  {
    title: "Research Reflections: Audio Diary",
    type: "Podcast",
    date: "Ongoing",
    duration: "Weekly",
    description: "Spoken reflections on the research process, methodology, and phenomenological observations.",
    tracks: 24,
  },
]

export default function CreativePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
                <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">Creative Works</h1>
              </div>
            </div>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              AI-generated music, podcasts, and multimedia exploring oscillatory themes and QOTE concepts. These works
              represent creative expressions of theoretical principles.
            </p>
          </div>
        </section>

        {/* Works Grid */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creativeWorks.map((work, index) => (
                <Card key={index} className="archive-card border-border bg-card hover:border-primary/50">
                  <CardContent className="flex flex-col p-6">
                    <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                      {work.type === "Album" ? (
                        <Headphones className="h-12 w-12 text-primary/60" />
                      ) : (
                        <Music className="h-12 w-12 text-primary/60" />
                      )}
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{work.type}</span>
                      <span className="text-xs text-muted-foreground">
                        {work.tracks} {work.type === "Album" ? "tracks" : "episodes"}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-medium text-foreground">{work.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{work.description}</p>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {work.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {work.duration}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground hover:text-foreground"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Full audio access available to supporters. Free tier includes previews.
              </p>
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
