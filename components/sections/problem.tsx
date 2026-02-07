import { Heart, Brain, Building2, Cpu } from "lucide-react"

const driftCards = [
  {
    icon: Heart,
    title: "Patients & Families",
    description: "Nervous systems dysregulate. Symptoms multiply. Diagnoses miss the pattern.",
  },
  {
    icon: Brain,
    title: "Clinicians",
    description: "Cognitive overload leads to pattern blindness. Burnout erodes clinical intuition.",
  },
  {
    icon: Building2,
    title: "Health Systems",
    description: "Organizational complexity creates decision drift. Quality degrades invisibly.",
  },
  {
    icon: Cpu,
    title: "AI & Intelligent Systems",
    description: "Models hallucinate. Reasoning drifts. Outputs lose alignment with reality.",
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-tight text-balance">
            Systems Drift. Healthy Systems Return.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            Whether it{"'"}s a child{"'"}s nervous system, a clinician{"'"}s decision-making, or an AI model{"'"}s reasoning — complex systems lose coherence under stress. Most systems can detect when something is wrong. Very few have a mechanism to return to stable function. Resona is that mechanism.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 stagger-children">
          {driftCards.map((card) => (
            <div
              key={card.title}
              className="p-6 md:p-7 bg-card rounded-xl border border-border/50 hover:border-primary/20 transition-colors group"
            >
              <card.icon className="w-5 h-5 text-primary mb-4 group-hover:text-primary/80 transition-colors" />
              <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
