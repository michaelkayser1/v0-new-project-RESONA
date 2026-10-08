import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import SupportSectionUpdated from "@/components/support-section-updated"
import ResearchDisclosure from "@/components/research-disclosure"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata = {
  title: "Support This Research | Kayser Autoethnographic Project",
  description:
    "Support independent research into AI-augmented theoretical physics development. Your contribution funds research time, tool development, and open-source contributions.",
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Independent Research</p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl">
              Support This Research
            </h1>
            <p className="font-serif text-lg text-muted-foreground">
              The Kayser Autoethnographic Project is independent, unfunded research conducted in personal time. Your
              support directly enables continued investigation and open sharing of findings.
            </p>
          </div>
        </section>

        <SupportSectionUpdated />

        {/* What Your Support Funds */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-light text-foreground">What Your Support Funds</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Research Time",
                  items: [
                    "Daily AI collaboration sessions",
                    "Data analysis and documentation",
                    "Theoretical development",
                  ],
                },
                {
                  title: "Infrastructure",
                  items: ["Website hosting and development", "Archive storage and organization", "Tool deployment"],
                },
                {
                  title: "Open Sharing",
                  items: ["Open-source software", "Public archive access", "Academic publication costs"],
                },
              ].map((category, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-medium text-foreground">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-medium text-foreground">Transparency Commitment</h2>
                <div className="prose prose-invert max-w-none font-serif text-muted-foreground">
                  <p>
                    This project operates with complete transparency. All research outputs are publicly documented in
                    the archive. Support funds are used exclusively for research-related expenses, not personal income.
                    I maintain full-time clinical employment separate from this research.
                  </p>
                  <p className="mt-4">
                    If you have questions about how funds are used, or want to discuss collaboration opportunities,
                    please contact me directly at{" "}
                    <a href="mailto:mike@kayser-medical.com" className="text-primary hover:underline">
                      mike@kayser-medical.com
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <ResearchDisclosure />
      </main>
      <ResearchFooter />
    </div>
  )
}
