import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import ResearchFramework from "@/components/research-framework"
import ResearchTimeline from "@/components/research-timeline"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Research Methodology | Kayser Autoethnographic Project",
  description:
    "The methodology behind an 8-year autoethnographic study of AI-augmented theoretical physics development. Multi-AI triangulation, n=1 longitudinal design.",
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Methodology</p>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl">
              The Autoethnographic Approach
            </h1>
            <p className="font-serif text-lg text-muted-foreground">
              A rigorous n=1 longitudinal study examining AI-augmented cognition through the lens of theoretical physics
              development.
            </p>
          </div>
        </section>

        {/* What is Autoethnography */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">What is Autoethnography?</h2>
            <div className="prose prose-invert max-w-none space-y-4 font-serif text-muted-foreground">
              <p>
                Autoethnography is a qualitative research method that uses the researcher's personal experience as
                primary data. Unlike traditional ethnography, where the researcher observes others, autoethnography
                positions the researcher as both subject and analyst.
              </p>
              <p>
                In this project, I (Dr. Michael A. Kayser) serve as the sole research subject, documenting my intensive
                8-year collaboration with AI systems. This approach is particularly suited to studying novel phenomena
                like sustained human-AI cognitive partnership, where:
              </p>
              <ul className="space-y-2">
                <li>The experience is highly individual and difficult to standardize across subjects</li>
                <li>Deep, longitudinal engagement is required to observe emergent patterns</li>
                <li>The subjective experience itself is a critical data point</li>
                <li>Real-time documentation captures phenomena that retrospective accounts might miss</li>
              </ul>
            </div>
          </div>
        </section>

        <ResearchFramework />

        {/* Multi-AI Triangulation */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">Multi-AI Triangulation Method</h2>
            <div className="prose prose-invert max-w-none space-y-4 font-serif text-muted-foreground">
              <p>
                A novel methodological contribution of this project is the use of multiple AI systems as "cognitive
                observation points." Rather than relying on a single AI assistant, the research employs:
              </p>
              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium text-foreground">Claude (Anthropic)</h3>
                    <p className="text-sm text-muted-foreground">
                      Primary theoretical development partner. Extended dialogue, nuanced reasoning.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium text-foreground">GPT-4 (OpenAI)</h3>
                    <p className="text-sm text-muted-foreground">
                      Mathematical formalization, alternative framings, cross-validation.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium text-foreground">Gemini (Google)</h3>
                    <p className="text-sm text-muted-foreground">
                      Research integration, literature connections, synthesis.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p>
                This triangulation allows for cross-validation of theoretical developments, reduces single-system bias,
                and provides multiple perspectives on the same conceptual material.
              </p>
            </div>
          </div>
        </section>

        <ResearchTimeline />

        {/* Validity & Limitations */}
        <section className="border-t border-border bg-card/30 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-light text-foreground">Validity & Limitations</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-medium text-green-400">Strengths</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>8-year longitudinal depth</li>
                    <li>Real-time documentation (not retrospective)</li>
                    <li>Multi-AI triangulation</li>
                    <li>Measurable outcomes (patents, efficiency gains)</li>
                    <li>Complete transparency of method and data</li>
                    <li>Replicable framework for others</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-medium text-yellow-400">Limitations</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>n=1 design limits generalizability</li>
                    <li>Subject-researcher dual role introduces bias</li>
                    <li>Neurodivergent profile may not represent typical users</li>
                    <li>AI systems evolved during study period</li>
                    <li>Selection bias in documentation</li>
                    <li>No control condition</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Citation */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Cite This Methodology
            </h3>
            <div className="font-mono text-sm text-muted-foreground">
              <p>
                Kayser, M.A. (2025). Multi-AI Triangulation in Autoethnographic Research: An 8-Year Self-Study of
                AI-Augmented Theoretical Development. <em>Kayser Medical Research Archive</em>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
