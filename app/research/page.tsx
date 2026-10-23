import SitePage from "@/components/site-page"
import { qoteOverview } from "@/lib/qote-overview"

export const metadata = { title: "Research scope & methods | Kayser Medical" }
export default function Page() {
  return <SitePage title="Research scope & methods" intro={qoteOverview.description}>
    <section id="resona-si" className="max-w-3xl rounded-xl border border-border bg-card p-6 scroll-mt-24">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Research proposal · separate demonstration</p>
      <h2 className="mb-3 text-2xl">RESONA-SI: Ten-System Superintelligence Research Testbed</h2>
      <p className="text-muted-foreground">A proposed architecture studying cooperation among ten AI systems under independent authorization. “Superintelligence” names the research question, not a demonstrated capability. This synthetic prototype does not contact live models or establish destination enforcement and is not NSF-endorsed.</p>
      <a href="https://resona-si-ten-research.vercel.app/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-primary underline">Explore the RESONA-SI demonstration ↗</a>
      <p className="mt-2 text-xs text-muted-foreground">Separate Vercel project; may require team authentication. Existing Resona-OS verification gates remain unchanged.</p>
    </section>
    {qoteOverview.principles.map(principle => <section key={principle.title} className="max-w-3xl rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-xl">{principle.title}</h2><p className="text-muted-foreground">{principle.description}</p></section>)}
    <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Human–AI collaboration</h2><p className="text-muted-foreground">Personal observations and AI-generated interpretations should remain distinguishable. A model agreeing with an idea is not independent validation. Reproducible claims should identify equations, assumptions, controls, code versions, and measured results.</p></section>
    <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Available material</h2><p className="text-muted-foreground">The public resource collection links to writing and software at their original sources. It does not certify publication status, clinical efficacy, or a complete research inventory.</p><a href="/archive" className="inline-flex min-h-11 items-center text-primary underline">Browse public resources</a></section>
  </SitePage>
}
