import { ArrowRight } from "lucide-react"

const lanes = [
  {
    title: "Patients & Families",
    description:
      "Your child's symptoms aren't random. Resona helps families understand nervous system patterns, track regulation, and work with clinicians who see the whole picture.",
    cta: "Learn More",
  },
  {
    title: "Clinicians",
    description:
      "You already see the patterns. Resona gives you the tools to measure, monitor, and guide coherence — with clinical-grade data and decision support built for complex patients.",
    cta: "Request Clinical Access",
  },
  {
    title: "Health Systems & Partners",
    description:
      "Integrate coherence monitoring into existing clinical workflows. Reduce diagnostic drift, support clinician wellbeing, and improve outcomes at scale.",
    cta: "Partner With Us",
  },
]

export function AudienceSection() {
  return (
    <section id="clinicians" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight text-balance">
            Built for the People Who Need It Most
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {lanes.map((lane) => (
            <div
              key={lane.title}
              className="p-6 md:p-8 bg-card rounded-xl border border-border/50 flex flex-col hover:border-primary/20 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">{lane.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                {lane.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors min-h-[44px]"
              >
                {lane.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
