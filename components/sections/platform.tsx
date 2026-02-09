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
        <div className="max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Live Coherence Monitor
          </p>
          <CoherenceDemo />
        </div>

        {/* Resona API Block */}
        <div className="border-t border-border/30 pt-14 md:pt-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest rounded-full">
              New
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-foreground">Resona API</h3>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl mb-8 leading-relaxed">
            {"Autonomic signals in, coherent recommendations out. Resona isn't here to optimize you harder. It helps you stay in your coherent groove."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
            {/* Autonomic State */}
            <div className="p-6 bg-background rounded-xl border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-2">Autonomic State</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Coherence score, stress index, readiness, and confidence -- computed from real physiological signals.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["HRV", "Stress", "Readiness", "Confidence"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-primary/5 text-primary text-[11px] rounded-full font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interventions */}
            <div className="p-6 bg-background rounded-xl border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <GitBranch className="w-4 h-4 text-accent" />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-2">Interventions</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {"Breathing, grounding, stimulus reduction. Each recommendation explains why now -- not just what."}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Breathing", "Grounding", "Movement"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-accent/5 text-accent text-[11px] rounded-full font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Consent & Sharing */}
            <div className="p-6 bg-background rounded-xl border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Network className="w-4 h-4 text-secondary-foreground" />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-2">{"Consent & Sharing"}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Four-tier consent model. Your data, your rules. From device-only to full clinical sharing.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Tier 0", "Tier 1", "Tier 2", "Tier 3"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground text-[11px] rounded-full font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/resona-api/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              View Docs
            </a>
            <a
              href="/request-access"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-full hover:bg-secondary/50 transition-colors min-h-[44px] bg-transparent"
            >
              Request Access
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
