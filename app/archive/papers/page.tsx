import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, FileDown, Calendar } from "lucide-react"

export const metadata = {
  title: "Research Papers | Research Archive | Kayser Autoethnographic Project",
  description:
    "Formal theoretical frameworks, methodological documentation, and academic submissions from the Kayser Autoethnographic Project.",
}

const papers = [
  {
    title: "Quantum Oscillator Theory of Everything: A Unified Framework",
    authors: "Kayser, M.A.",
    date: "2025",
    status: "In Preparation",
    abstract:
      "This paper presents QOTE as a unified theoretical framework connecting quantum mechanics, consciousness, and AI alignment through oscillatory coherence principles. We derive the mathematical foundations of oscillatory dynamics and demonstrate their application across physical, biological, and computational domains.",
    keywords: ["quantum oscillator", "unified theory", "consciousness", "coherence"],
    pdf: null,
  },
  {
    title: "Autoethnographic Methods in AI-Augmented Research: An 8-Year Self-Study",
    authors: "Kayser, M.A.",
    date: "2025",
    status: "Under Review",
    abstract:
      "This methodological paper examines the use of autoethnographic techniques in AI-augmented theoretical development. We present the multi-AI triangulation method and discuss validity considerations for n=1 longitudinal studies of human-AI collaborative cognition.",
    keywords: ["autoethnography", "AI collaboration", "methodology", "triangulation"],
    pdf: null,
  },
  {
    title: "The Golden Corridor: Mathematical Foundations of Optimal Nervous System Regulation",
    authors: "Kayser, M.A.",
    date: "2024",
    status: "Draft",
    abstract:
      "We derive the mathematical foundations of the golden corridor—the optimal regulatory zone between phi-inverse (0.618) and 2/3 (0.667). This paper demonstrates how this narrow band represents maximum adaptive flexibility in biological oscillatory systems.",
    keywords: ["golden corridor", "phi ratio", "nervous system", "regulation"],
    pdf: null,
  },
  {
    title: "Resona OS: Clinical Application of Oscillatory Coherence Principles",
    authors: "Kayser, M.A.",
    date: "2024",
    status: "Draft",
    abstract:
      "This technical paper describes the architecture and implementation of Resona OS, a nervous system regulation platform built on QOTE principles. We present the resonance tuning protocol and preliminary clinical efficiency data.",
    keywords: ["Resona OS", "clinical application", "coherence", "regulation"],
    pdf: null,
  },
  {
    title: "Wobble as Information: Encoding Experience in Quantum Oscillatory Deviations",
    authors: "Kayser, M.A.",
    date: "2023",
    status: "Working Paper",
    abstract:
      "We propose that quantum wobble—deviations from perfect oscillatory coherence—encodes information about experience, emotion, and insight. This paper explores the theoretical foundations and implications for understanding consciousness.",
    keywords: ["wobble", "information encoding", "consciousness", "experience"],
    pdf: null,
  },
]

export default function PapersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Research Archive</p>
                <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">Research Papers</h1>
              </div>
            </div>
            <p className="max-w-2xl font-serif text-lg text-muted-foreground">
              Formal theoretical frameworks, methodological documentation, and academic submissions. These papers
              represent the formalized output of the autoethnographic research process.
            </p>
          </div>
        </section>

        {/* Papers List */}
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              {papers.map((paper, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          paper.status === "Under Review"
                            ? "bg-purple-500/10 text-purple-500"
                            : paper.status === "In Preparation"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : paper.status === "Draft"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {paper.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {paper.date}
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-medium text-foreground">{paper.title}</h3>
                    <p className="mb-4 text-sm text-primary">{paper.authors}</p>

                    <p className="mb-4 font-serif text-sm text-muted-foreground leading-relaxed">{paper.abstract}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.keywords.map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 border-t border-border pt-4">
                      {paper.pdf ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="min-h-[36px] border-border bg-transparent text-foreground hover:bg-muted"
                        >
                          <FileDown className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">PDF available upon completion</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Citation Info */}
            <Card className="mt-8 border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  Citing This Research
                </h3>
                <p className="mb-4 font-serif text-sm text-muted-foreground">
                  If you reference this research in academic work, please use the following citation format:
                </p>
                <div className="rounded bg-muted/50 p-4 font-mono text-xs text-muted-foreground">
                  Kayser, M.A. (2025). [Paper Title]. Kayser Autoethnographic Project Research Archive.
                  https://kayser-medical.com/archive/papers
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <ResearchFooter />
    </div>
  )
}
