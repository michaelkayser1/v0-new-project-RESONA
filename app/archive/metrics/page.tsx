import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Clock, Brain, FileText, Target } from "lucide-react"

export const metadata = {
  title: "Outcome Metrics | Research Archive | Kayser Autoethnographic Project",
  description:
    "Quantitative data on clinical efficiency, productivity gains, and coherence measurements from the 8-year research project.",
}

const metrics = [
  {
    icon: TrendingUp,
    label: "Clinical Efficiency Gain",
    value: "40-60%",
    description: "Measured improvement in diagnostic workflow efficiency through AI-augmented processes",
    trend: "+12% YoY",
  },
  {
    icon: Clock,
    label: "AI Collaboration Hours",
    value: "4,200+",
    description: "Total documented hours of AI dialogue sessions since 2017",
    trend: "~2 hrs/day avg",
  },
  {
    icon: FileText,
    label: "Token Corpus Size",
    value: "1M+",
    description: "Total tokens in the documented chat transcript corpus",
    trend: "Growing daily",
  },
  {
    icon: Brain,
    label: "Generated Artifacts",
    value: "142",
    description: "Applications, tools, visualizations, and documents created through collaboration",
    trend: "+34 in 2025",
  },
  {
    icon: Target,
    label: "Theoretical Outputs",
    value: "8",
    description: "Research papers in various stages of development",
    trend: "3 under review",
  },
  {
    icon: BarChart3,
    label: "Research Timeline",
    value: "8 years",
    description: "Duration of continuous longitudinal documentation",
    trend: "2017-Present",
  },
]

const yearlyData = [
  { year: "2017", sessions: 120, artifacts: 5, papers: 0 },
  { year: "2018", sessions: 180, artifacts: 12, papers: 0 },
  { year: "2019", sessions: 240, artifacts: 18, papers: 1 },
  { year: "2020", sessions: 300, artifacts: 22, papers: 1 },
  { year: "2021", sessions: 350, artifacts: 25, papers: 2 },
  { year: "2022", sessions: 380, artifacts: 20, papers: 1 },
  { year: "2023", sessions: 400, artifacts: 18, papers: 1 },
  { year: "2024", sessions: 420, artifacts: 15, papers: 1 },
  { year: "2025", sessions: 450, artifacts: 7, papers: 1 },
]

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
                <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">Outcome Metrics</h1>
              </div>
            </div>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              Quantitative data on clinical efficiency, productivity gains, and research outputs. These metrics provide
              measurable evidence of the autoethnographic project's outcomes.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-medium text-foreground">Key Metrics</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-green-500">{metric.trend}</span>
                      </div>
                      <p className="text-3xl font-light text-foreground">{metric.value}</p>
                      <p className="mb-2 text-sm font-medium text-foreground">{metric.label}</p>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Yearly Breakdown */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-medium text-foreground">Yearly Activity Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 text-left font-medium text-foreground">Year</th>
                    <th className="py-3 text-right font-medium text-foreground">Sessions</th>
                    <th className="py-3 text-right font-medium text-foreground">Artifacts</th>
                    <th className="py-3 text-right font-medium text-foreground">Papers</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 text-muted-foreground">{row.year}</td>
                      <td className="py-3 text-right text-muted-foreground">{row.sessions}</td>
                      <td className="py-3 text-right text-muted-foreground">{row.artifacts}</td>
                      <td className="py-3 text-right text-muted-foreground">{row.papers}</td>
                    </tr>
                  ))}
                  <tr className="font-medium">
                    <td className="py-3 text-foreground">Total</td>
                    <td className="py-3 text-right text-primary">2,840</td>
                    <td className="py-3 text-right text-primary">142</td>
                    <td className="py-3 text-right text-primary">8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Methodology Note */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  Methodology Note
                </h3>
                <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                  These metrics are self-reported and based on systematic documentation maintained throughout the
                  research period. Clinical efficiency gains are estimated based on comparative workflow analysis before
                  and during AI-augmented practice. All figures are provided for transparency and should be interpreted
                  within the context of an n=1 autoethnographic study.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
