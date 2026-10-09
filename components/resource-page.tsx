import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import ArchiveExplorer from "@/components/archive-explorer"
import { allPublicResources, type ResourceCategory } from "@/lib/public-resources"

export default function ResourcePage({ title, description, category, notice }: { title: string; description: string; category?: ResourceCategory; notice?: string }) {
  const resources = allPublicResources(process.env.PUBLIC_NOTEBOOK_URL)
  return <div className="min-h-screen bg-background text-foreground"><ResearchHeader /><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <p className="mb-3 text-sm uppercase tracking-widest text-primary">Kayser research & creative work</p>
    <h1 className="mb-5 text-3xl font-light sm:text-4xl">{title}</h1>
    <p className="mb-8 max-w-3xl text-lg text-muted-foreground">{description}</p>
    {notice && <p className="mb-8 rounded-lg border border-border bg-card p-5 text-muted-foreground">{notice}</p>}
    {category === "Music" && <p className="mb-6"><a href="/provenance/suno-catalog.json" download className="inline-flex min-h-11 items-center text-primary underline">Download music provenance catalog (JSON)</a></p>}
    <ArchiveExplorer resources={resources} category={category} />
  </main><ResearchFooter /></div>
}
