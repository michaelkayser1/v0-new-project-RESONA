import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function WhatsNew() {
  const updates = [
    {
      date: "Dec 2025",
      title: "Research Archive Launch",
      description: "Public release of the Kayser Autoethnographic Project website with 8 years of documentation.",
    },
    {
      date: "Nov 2025",
      title: "Resona OS Beta",
      description: "Initial beta deployment of the nervous system regulation platform built on QOTE principles.",
    },
    {
      date: "Oct 2025",
      title: "QOTE Paper Submitted",
      description: "Formal academic submission of the Quantum Oscillator Theory of Everything framework.",
    },
  ]

  return (
    <section className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-medium text-foreground">What's New</h2>
          <Link href="/archive" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all updates
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {updates.map((update, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-4">
                <p className="mb-1 text-xs font-medium text-primary">{update.date}</p>
                <h3 className="mb-2 text-sm font-medium text-foreground">{update.title}</h3>
                <p className="text-xs text-muted-foreground">{update.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
