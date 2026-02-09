"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Shield,
  Lock,
  FileCheck,
  UserCheck,
  Activity,
  Cpu,
  Users,
  Stethoscope,
  Code2,
  Heart,
} from "lucide-react"
import { useState } from "react"

const pipeline = [
  { label: "Sources", detail: "Apple Health, Oura, wearables" },
  { label: "Normalization", detail: "Signal cleaning + alignment" },
  { label: "State Model", detail: "Autonomic computation" },
  { label: "Corridor Gate", detail: "0.618 - 0.667 range" },
  { label: "Recommendations", detail: "Context-aware interventions" },
  { label: "Logging", detail: "Audit trail + trends" },
]

const consentTiers = [
  { tier: "0", name: "Device Only", description: "All processing stays on device. Nothing leaves your phone." },
  { tier: "1", name: "Local Processing", description: "On-device analytics with local storage. No cloud." },
  { tier: "2", name: "Cloud Analytics", description: "Anonymized data for trend analysis and population insights." },
  { tier: "3", name: "Full Sharing", description: "Shared with your clinician or family. Full context, full consent." },
]

const pricingTiers = [
  {
    name: "Pilot",
    description: "Limited API keys for early builders and researchers exploring coherence integration.",
    cta: "Request Pilot Access",
  },
  {
    name: "Clinician",
    description: "Per-seat access for clinical practices. Includes decision support and patient dashboards.",
    cta: "Request Clinical Access",
  },
  {
    name: "Enterprise",
    description: "Health system integration. Custom pipelines, compliance support, and dedicated onboarding.",
    cta: "Contact Us",
  },
]

const tabs = [
  {
    id: "families",
    label: "Families",
    icon: Heart,
    content: "A simple, non-medical view of nervous system patterns. Track regulation over time, receive gentle coaching prompts, and share summaries with your care team -- all without needing a clinical background.",
  },
  {
    id: "clinicians",
    label: "Clinicians",
    icon: Stethoscope,
    content: "Triage support, trend visualization, and shared care plans. Surface the patterns that traditional intake misses. See what autonomic data reveals about complex presentations -- from dysautonomia to behavioral regression.",
  },
  {
    id: "builders",
    label: "Builders",
    icon: Code2,
    content: "Integrate coherence monitoring into your applications, dashboards, or research pipelines. RESTful endpoints, webhook subscriptions, and structured JSON responses designed for developers who want to build on real physiology.",
  },
]

export default function ResonaApiPage() {
  const [activeTab, setActiveTab] = useState("families")

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest rounded-full mb-6">
              Developer Preview
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight text-balance">
              Resona API
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-3 max-w-2xl mx-auto text-pretty">
              {"Autonomic signals \u2192 coherent recommendations. Same song, different scales."}
            </p>
            <p className="text-sm text-muted-foreground/70 mb-8 max-w-lg mx-auto">
              {"Coherence > capability."}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="/request-access"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                Request Access <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/resona-api/docs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium rounded-full hover:bg-secondary/50 transition-colors min-h-[44px] bg-transparent"
              >
                Read Docs
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["Consent tiers", "Encryption", "Audit logs", "Provider verification"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary/60" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-16 md:py-20 px-5 bg-card/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3 text-balance">What it is</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl">
              {"AI didn't die. The hype did. Resona API does something useful: ingest real physiological signals, compute autonomic state, and return recommendations that make sense."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  "Ingest signals from wearables and clinical devices",
                  "Compute real-time autonomic state",
                  "Return context-aware recommendations",
                  "Log interventions with full audit trail",
                  "Track coherence trends over time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-background border border-border/50 rounded-xl p-5 overflow-x-auto">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Example Response</p>
                <pre className="text-xs text-foreground font-mono leading-relaxed whitespace-pre">
{`{
  "user_id": "usr_8x2k",
  "coherence_score": 72,
  "corridor_status": "in",
  "stress_index": 0.31,
  "readiness": 0.84,
  "confidence": 0.91,
  "recommendation": {
    "type": "breathing",
    "reason": "Elevated sympathetic tone",
    "duration_sec": 180
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For -- Tabs */}
        <section className="py-16 md:py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 text-balance">{"Who it's for"}</h2>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8 bg-card/40 border border-border/50 rounded-xl">
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                  <div key={tab.id} className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tab.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{tab.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{tab.content}</p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>

        {/* How It Works -- Pipeline */}
        <section className="py-16 md:py-20 px-5 bg-card/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3 text-balance">How it works</h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl">
              {"Less apocalypse. More sleep. Here's the pipeline from raw signal to recommendation."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {pipeline.map((step, i) => (
                <div key={step.label} className="relative">
                  <div className="p-4 bg-background border border-border/50 rounded-xl text-center h-full">
                    <span className="block text-[10px] font-mono text-primary/60 mb-1">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{step.label}</h4>
                    <p className="text-[11px] text-muted-foreground leading-snug">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              {"Supported sources: Apple Health, Oura Ring -- and more soon."}
            </p>
          </div>
        </section>

        {/* Consent Tiers */}
        <section className="py-16 md:py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3 text-balance">Consent Tiers</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl">
              Your data, your rules. Four levels of consent, from fully local to fully shared.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {consentTiers.map((tier) => (
                <div key={tier.tier} className="p-5 bg-card/40 border border-border/50 rounded-xl">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold flex items-center justify-center">
                      {tier.tier}
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">{tier.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="text-xs text-destructive font-medium">
                Not a medical device. Not for emergencies. Resona OS is a decision-support and wellness platform. Always consult a licensed healthcare provider.
              </p>
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="py-16 md:py-20 px-5 bg-card/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 text-balance">{"Security & Privacy"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Lock, title: "Encryption", description: "In transit and at rest. TLS 1.3 and AES-256." },
                { icon: Shield, title: "Data Minimization", description: "We collect only what the model needs. Nothing more." },
                { icon: UserCheck, title: "Role-Based Access", description: "Clinicians, families, and admins see only what they should." },
                { icon: FileCheck, title: "Provider Verification", description: "Clinician access requires credential validation." },
                { icon: Users, title: "Patient Controls", description: "Delete, export, or revoke access anytime." },
                { icon: Cpu, title: "HIPAA-Aligned", description: "Architecture designed for healthcare compliance from day one." },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-background border border-border/50 rounded-xl">
                  <item.icon className="w-5 h-5 text-primary mb-3" />
                  <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / Access */}
        <section className="py-16 md:py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3 text-balance">{"Pricing & Access"}</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl">
              {"We're in controlled rollout. Access is by request."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className="p-6 bg-card/40 border border-border/50 rounded-xl flex flex-col">
                  <h4 className="text-lg font-semibold text-foreground mb-2">{tier.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{tier.description}</p>
                  <a
                    href="/request-access"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground text-sm font-medium rounded-full hover:bg-secondary/50 transition-colors min-h-[44px] bg-transparent"
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 px-5 bg-card/20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-3">Coherence Corridor</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-mono text-primary">0.618 - 0.667</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-balance">
              Ready to build on coherence?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              {"Get early access to the API that helps systems stay in their groove."}
            </p>
            <a
              href="/request-access"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
