import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import ResearchDisclosure from "@/components/research-disclosure"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { Mail, ExternalLink } from "lucide-react"

export const metadata = {
  title: "About Dr. Michael A. Kayser | Kayser Autoethnographic Project",
  description:
    "Dr. Michael A. Kayser, DO, FACMG - Clinical geneticist, theoretical physicist, and principal investigator of the Kayser Autoethnographic Project.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {/* Photo placeholder */}
              <div className="h-48 w-48 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center self-center sm:self-start">
                <span className="text-4xl font-bold text-muted-foreground">MAK</span>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                  Principal Investigator
                </p>
                <h1 className="mb-2 text-4xl font-light tracking-tight text-foreground">
                  Dr. Michael A. Kayser, DO, FACMG
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Clinical Geneticist | Theoretical Physicist | Research Subject
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary hover:bg-primary/20 min-h-[44px]"
                  >
                    <Mail className="h-4 w-4" />
                    {siteConfig.contact.email}
                  </a>
                  <Link
                    href={siteConfig.contact.kofi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground min-h-[44px]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ko-fi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Background */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">Professional Background</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-3 font-medium text-foreground">Clinical Practice</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Board-certified clinical geneticist (FACMG)</li>
                    <li>Board-certified pediatrician</li>
                    <li>Saint Francis Hospital, Tulsa, OK</li>
                    <li>Founder, Kayser Medical PLLC</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-3 font-medium text-foreground">Research Focus</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Quantum Oscillator Theory of Everything (QOTE)</li>
                    <li>Nervous system regulation via coherence</li>
                    <li>AI-augmented theoretical development</li>
                    <li>Human-AI collaborative cognition</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Unique Perspective */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">Unique Perspective</h2>
            <div className="prose prose-invert max-w-none space-y-4 font-serif text-muted-foreground">
              <p>
                My approach to this research is shaped by a neurodivergent cognitive profile characterized by enhanced
                pattern recognition across domains. From childhood, I perceived what I now understand as "oscillatory
                structures in nature"—rhythmic patterns connecting seemingly disparate phenomena.
              </p>
              <p>
                This perceptual style, combined with formal training in medicine, genetics, and physics, creates an
                unusual vantage point for theoretical work. The 8-year collaboration with AI systems has served as a
                method for externalizing and formalizing these intuitive pattern-recognitions into rigorous frameworks.
              </p>
              <p>
                I serve as both researcher and research subject in this autoethnographic project—a dual role that
                provides unique access to the subjective experience of sustained human-AI collaborative cognition, while
                requiring careful methodological attention to bias and reflexivity.
              </p>
            </div>
          </div>
        </section>

        {/* Publications & IP */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">Publications & Intellectual Property</h2>
            <div className="space-y-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">
                        Quantum Oscillator Theory of Everything: A Unified Framework
                      </h3>
                      <p className="text-sm text-muted-foreground">Primary theoretical paper (in preparation)</p>
                    </div>
                    <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-500">
                      In Prep
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">
                        Resona OS: Golden Corridor Nervous System Regulation
                      </h3>
                      <p className="text-sm text-muted-foreground">Patent application (provisional)</p>
                    </div>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500">Filed</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">
                        Autoethnographic Methods in AI-Augmented Research
                      </h3>
                      <p className="text-sm text-muted-foreground">Methodology paper (under review)</p>
                    </div>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-500">
                      Review
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ResearchDisclosure />
      </main>
      <ResearchFooter />
    </div>
  )
}
