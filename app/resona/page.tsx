import SitePage from "@/components/site-page"
export const metadata = { title: "Resona-OS governance | Kayser Medical" }
export default function Page() {
 return <SitePage title="Resona-OS governance" intro="Govern movement, not truth. Resona-OS is a separate research workstream concerned with authority, policy, auditable decisions, and control of AI actions.">
  <section className="max-w-3xl rounded-xl border border-border bg-card p-6"><h2 className="mb-3 text-2xl">Source and verification status</h2><p className="mb-4 text-muted-foreground">Consult the public repository for the current implementation, tests, and unresolved limitations. Passing a conversational correction test does not prove signed authorization, independent custody, or enforcement of an external action.</p><a href="https://github.com/michaelkayser1/Resona-OS" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-primary underline">Open Resona-OS on GitHub ↗</a></section>
  <section className="max-w-3xl"><h2 className="mb-3 text-2xl">The conversational chat</h2><p className="text-muted-foreground">Resona chat answers questions using a language model. It can use temporary context from up to 10 completed exchanges, display optional text heuristics, and offer reflection when requested. It has no external-action tools and does not independently verify authorization.</p><a href="/chat" className="inline-flex min-h-11 items-center text-primary underline">Open the conversational chat</a></section>
 </SitePage>
}
