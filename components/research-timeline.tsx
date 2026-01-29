import { Card, CardContent } from "@/components/ui/card"

export default function ResearchTimeline() {
  const milestones = [
    {
      year: "2017",
      phase: "Discovery",
      items: ["Initial oscillatory insights", "First QOTE concepts", "AI collaboration begins"],
      active: false,
    },
    {
      year: "2018-2020",
      phase: "Framework Development",
      items: ["Mathematical formalization", "Golden corridor derivation", "Patent filing (provisional)"],
      active: false,
    },
    {
      year: "2021-2023",
      phase: "Production",
      items: ["Resona OS architecture", "Clinical tool prototyping", "Epic AI integration"],
      active: false,
    },
    {
      year: "2024-2025",
      phase: "Public Dissemination",
      items: ["Website launch", "Academic submissions", "Ko-fi support initiated"],
      active: false,
    },
    {
      year: "Now",
      phase: "Active Research",
      items: ["Paper preparation", "Community building", "Tool sharing"],
      active: true,
    },
  ]

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Project History</p>
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            Eight-Year Research Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-6 h-0.5 timeline-line hidden lg:block" />

          {/* Milestone Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {milestones.map((milestone, index) => (
              <Card
                key={index}
                className={`relative border-border bg-card ${milestone.active ? "ring-2 ring-primary" : ""}`}
              >
                <CardContent className="p-5">
                  {/* Timeline Node */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                      milestone.active
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-xs font-bold">{milestone.year}</span>
                  </div>

                  <h3 className="mb-2 text-sm font-semibold text-foreground">{milestone.phase}</h3>
                  <ul className="space-y-1">
                    {milestone.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-xs text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
