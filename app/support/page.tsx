import SitePage from "@/components/site-page"
export const metadata = { title: "Support this work | Kayser Medical" }
export default function Page() {
 return <SitePage title="Support this work" intro="Support Michael Kayser’s independent research, writing, music, and software development.">
  <section className="max-w-3xl rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-2xl">Voluntary support on Ko-fi</h2><p className="mb-5 text-muted-foreground">You can choose a one-time or recurring contribution on Ko-fi. Amounts and payment terms are shown there. Contributions do not unlock transcript access, papers, or other gated features on this site.</p><a href="https://ko-fi.com/qote868413" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 text-primary-foreground">Visit Michael’s Ko-fi ↗</a></section>
  <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Discuss a project</h2><p className="text-muted-foreground">Contact Michael to discuss a workflow review, collaboration, or other work. Scope, price, and delivery should be agreed directly.</p><a href="mailto:mike@kayser-medical.com" className="inline-flex min-h-11 items-center text-primary underline">Email Michael</a></section>
 </SitePage>
}
