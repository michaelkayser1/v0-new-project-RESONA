import { Card, CardContent } from "@/components/ui/card"
import { User, Cpu, Database, Target } from "lucide-react"

export default function ResearchFramework() {
  const frameworkColumns = [
    {
      icon: User,
      title: "Subject",
      items: ["Michael A. Kayser, DO, FACMG", "Neurodivergent pattern recognition", "Clinical geneticist & physicist"],
    },
    {
      icon: Cpu,
      title: "Intervention",
      items: [
        "Daily AI collaboration (2017-present)",
        "Multi-AI triangulation method",
        "Treating AI systems as observation points",
      ],
    },
    {
      icon: Database,
      title: "Data",
      items: ["1M+ token chat corpus", "Generated artifacts: apps, papers, media", "Clinical efficiency metrics"],
    },
    {
      icon: Target,
      title: "Outcomes",
      items: [
        "QOTE framework development",
        "Patent applications filed",
        "Resona OS platform",
        "40-60% efficiency gains",
      ],
    },
  ]

  return (
    <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Methodology</p>
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">The Research Framework</h2>
        </div>

        {/* Framework Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {frameworkColumns.map((column, index) => {
            const IconComponent = column.icon
            return (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-medium text-foreground">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
