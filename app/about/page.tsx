import SitePage from "@/components/site-page"
export const metadata = { title: "About Michael A. Kayser | Kayser Medical" }
export default function Page() {
 return <SitePage title="Michael A. Kayser, DO, FACMG" intro="Clinical geneticist and creator of the Kayser Autoethnographic Project, QOTE research, and Resona.">
  <section className="max-w-3xl"><h2 className="mb-3 text-2xl">Research & creative work</h2><p className="text-muted-foreground">This project brings together personal documentation of human–AI collaboration, experimental oscillator modeling, AI governance research, writing, and AI-assisted music. Each source should speak for itself; another person’s beliefs or an AI’s interpretation should not be attributed to Michael without his source record.</p></section>
  <div className="flex flex-wrap gap-4"><a href="/archive" className="inline-flex min-h-11 items-center text-primary underline">Browse the work</a><a href="mailto:mike@kayser-medical.com" className="inline-flex min-h-11 items-center break-all text-primary underline">mike@kayser-medical.com</a></div>
 </SitePage>
}
