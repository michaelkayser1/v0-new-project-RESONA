import SitePage from "@/components/site-page"
import ArchiveExplorer from "@/components/archive-explorer"
import { allPublicResources } from "@/lib/public-resources"
import { qoteOverview } from "@/lib/qote-overview"

export default function HomePage() {
  const resources = allPublicResources(process.env.PUBLIC_NOTEBOOK_URL)
  return <SitePage title="The Kayser Autoethnographic Project" intro="Michael A. Kayser, DO, FACMG — clinical geneticist exploring human–AI collaboration, experimental oscillator models, AI governance, and creative work.">
    <div className="flex flex-wrap gap-3"><a href="/chat" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">Talk to Resona</a><a href="/archive" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3">Explore public resources</a><a href="/archive/notebooks" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3">Browse notebooks</a><a href="/archive/creative" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3">Browse music archive</a><a href="/support" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3">Support this work</a></div>
    <section className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-2xl">Experimental QOTE research</h2><p className="text-muted-foreground">{qoteOverview.description}</p><a href="/research" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Read about the research</a></article>
      <article className="rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-2xl">Resona-OS governance</h2><p className="text-muted-foreground">A separate workstream examining policy, authority, correction records, and control of AI actions. The conversational chat does not demonstrate independent authorization enforcement.</p><a href="/resona" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Explore governance work</a></article>
    </section>
    <section><h2 className="mb-5 text-2xl">Writing, music, notebooks & software</h2><ArchiveExplorer resources={resources} /></section>
    <p className="max-w-3xl text-sm text-muted-foreground">This site shares personal research and creative work. Experimental ideas and conversational outputs require evidence and independent testing. The chat is not a clinical service or a medical device.</p>
  </SitePage>
}
