import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Coffee, Users, Rocket } from "lucide-react"

export default function SupportSectionUpdated() {
  const tiers = [
    {
      icon: Coffee,
      name: "Supporter",
      price: "$5/mo",
      benefits: ["Full chat access", "Early papers"],
    },
    {
      icon: Users,
      name: "Collaborator",
      price: "$25/mo",
      benefits: ["Beta tools", "Input on research"],
    },
    {
      icon: Rocket,
      name: "Research Partner",
      price: "$100/mo",
      benefits: ["Co-development opportunities"],
    },
  ]

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column */}
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Independent Research</p>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Support This Research
            </h2>

            <div className="space-y-4 font-serif text-muted-foreground">
              <p>
                This is independent, unfunded research conducted in personal time outside of institutional employment.
              </p>
              <p>Your support helps fund:</p>
              <ul className="ml-4 space-y-1 text-sm">
                <li>Website hosting and development</li>
                <li>Research time and analysis</li>
                <li>Tool development and maintenance</li>
                <li>Open-source software contributions</li>
                <li>Academic publication costs</li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="https://ko-fi.com/qote868413" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="min-h-[48px] bg-[#29abe0] text-white hover:bg-[#1a8dbe]">
                  <Heart className="mr-2 h-4 w-4" />
                  Support on Ko-fi
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Tiers */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Support Tiers</p>
            <div className="grid gap-4">
              {tiers.map((tier, index) => {
                const IconComponent = tier.icon
                return (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-medium text-foreground">{tier.name}</h3>
                          <span className="text-sm font-medium text-accent">{tier.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{tier.benefits.join(" · ")}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground">Free tier: Public archive access for everyone</p>
          </div>
        </div>
      </div>
    </section>
  )
}
