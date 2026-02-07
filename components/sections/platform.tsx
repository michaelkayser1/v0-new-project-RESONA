"use client"

import { CoherenceDemo } from "@/components/coherence-demo"
import { Activity, GitBranch, Network } from "lucide-react"

const layers = [
  {
    icon: Activity,
    title: "Human Regulation",
    description:
      "Real-time physiological coherence monitoring using HRV and autonomic signals. Guides individuals back to regulated states through biofeedback and personalized protocols.",
    stat: "78% reduction in dissociative episodes across clinical participants",
  },
  {
    icon: GitBranch,
    title: "Clinical Decision Support",
    description:
      "Pattern recognition across complex presentations. Surfaces connections between physiology, behavior, and diagnosis that traditional systems miss.",
    stat: "40-60% faster clinical documentation with AI-assisted workflows",
  },
  {
    icon: Network,
    title: "System Coherence",
    description:
      "Coherence monitoring for AI reasoning and organizational decision-making. Detects drift before it becomes failure.",
    stat: "Patent-pending CUST gating technology",
  },
]

export function PlatformSection() {
  return (
    <section id="platform" className="py-20 md:py-28 px-5 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight text-balance">
            One Platform. Three Layers of Coherence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {layers.map((layer, i) => (
            <div key={layer.title} className="p-6 md:p-7 bg-background rounded-xl border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <layer.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Layer {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{layer.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{layer.description}</p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-primary font-medium leading-relaxed">{layer.stat}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coherence Demo */}
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Live Coherence Monitor
          </p>
          <CoherenceDemo />
        </div>
      </div>
    </section>
  )
}
