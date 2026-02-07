import { CheckCircle2 } from "lucide-react"

const proofPoints = [
  "Board-certified Clinical Geneticist & Pediatrician",
  "7+ years of clinical research on coherence dynamics",
  "47-participant study: 78% reduction in dissociative episodes",
  "Provisional patents filed on coherence gating mechanisms",
  "Independent peer-reviewed validation of core theoretical predictions",
  "Active clinical practice at Saint Francis Hospital, Tulsa, OK",
]

export function ScienceSection() {
  return (
    <section id="science" className="py-20 md:py-28 px-5 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-12 leading-tight text-balance">
          Why This Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Narrative */}
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Resona OS is built on a theoretical framework called QOTE (Quantum Oscillator Theory of Everything), developed over seven years of clinical research by Dr. Michael Kayser. The core mathematics describe how coupled oscillating systems maintain coherence — and what happens when they don{"'"}t.
            </p>
            <p>
              This isn{"'"}t theory in search of a problem. It emerged from treating medically fragile children whose symptoms defied conventional diagnostic categories. The clinical outcomes came first. The mathematics explained why they worked.
            </p>
          </div>

          {/* Proof points */}
          <div className="space-y-4">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
