import SitePage from "@/components/site-page"
import { qoteOverview } from "@/lib/qote-overview"

export const metadata = { title: "Research scope & methods | Kayser Medical" }
export default function Page() {
  return <SitePage title="Research scope & methods" intro={qoteOverview.description}>
    {qoteOverview.principles.map(principle => <section key={principle.title} className="max-w-3xl rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-xl">{principle.title}</h2><p className="text-muted-foreground">{principle.description}</p></section>)}
    <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Human–AI collaboration</h2><p className="text-muted-foreground">Personal observations and AI-generated interpretations should remain distinguishable. A model agreeing with an idea is not independent validation. Reproducible claims should identify equations, assumptions, controls, code versions, and measured results.</p></section>
    <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Available material</h2><p className="text-muted-foreground">The public resource collection links to writing and software at their original sources. It does not certify publication status, clinical efficacy, or a complete research inventory.</p><a href="/archive" className="inline-flex min-h-11 items-center text-primary underline">Browse public resources</a></section>
  </SitePage>
}
