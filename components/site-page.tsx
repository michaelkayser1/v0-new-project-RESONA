import type { ReactNode } from "react"
import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"

export default function SitePage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><ResearchHeader /><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <p className="mb-3 text-sm uppercase tracking-widest text-primary">Kayser Medical · Research & creative work</p>
    <h1 className="mb-5 max-w-4xl text-4xl font-light tracking-tight sm:text-5xl">{title}</h1>
    <p className="mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
    <div className="space-y-8">{children}</div>
  </main><ResearchFooter /></div>
}
