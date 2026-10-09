import ResearchHeader from "@/components/research-header"
import ResearchFooter from "@/components/research-footer"
import ArchiveExplorer from "@/components/archive-explorer"
import { publicResources, publicNotebookResource, type ResourceCategory } from "@/lib/public-resources"

export default function ResourcePage({ title, description, category, notice }: { title: string; description: string; category?: ResourceCategory; notice?: string }) {
  const notebook = publicNotebookResource(process.env.PUBLIC_NOTEBOOK_URL)
  const resources = notebook ? [...publicResources, notebook] : publicResources
  return <div className="min-h-screen bg-background text-foreground"><ResearchHeader /><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <p className="mb-3 text-sm uppercase tracking-widest text-primary">Kayser research & creative work</p>
    <h1 className="mb-5 text-3xl font-light sm:text-4xl">{title}</h1>
    <p className="mb-8 max-w-3xl text-lg text-muted-foreground">{description}</p>
    {notice && <p className="mb-8 rounded-lg border border-border bg-card p-5 text-muted-foreground">{notice}</p>}
    <ArchiveExplorer resources={resources} category={category} />
    {!category && !notebook && <section className="mt-10 rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-xl">Research notebook</h2><p className="text-muted-foreground">A notebook link will appear here when Michael supplies a share link. No notebook contents are published on this site yet.</p></section>}
  </main><ResearchFooter /></div>
}
