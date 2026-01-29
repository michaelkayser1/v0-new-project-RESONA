import { Scale, Check, X } from "lucide-react"

export default function ResearchDisclosure() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Scale className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-foreground">Research Disclosure</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              This website documents an ongoing autoethnographic research project. I (Michael A. Kayser) am both the
              researcher and the sole research subject.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* What this includes */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">This includes:</p>
                <ul className="space-y-2">
                  {[
                    "All content represents my personal theoretical work",
                    "My conversations with AI systems",
                    "Artifacts I generated or co-created",
                    "My subjective experiences and reflections",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What this is not */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">This is NOT:</p>
                <ul className="space-y-2">
                  {[
                    "Clinical advice or medical recommendations",
                    "Institutional research (separate from employment)",
                    "Claims about others' outcomes",
                    "Solicitation of human subjects",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              The Ko-fi support button funds my personal research time and hosting costs.{" "}
              <a href="mailto:mike@kayser-medical.com" className="text-primary hover:underline">
                Questions? Contact: mike@kayser-medical.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
