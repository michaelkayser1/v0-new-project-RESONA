"use client"

import React from "react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export default function RequestAccessPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [role, setRole] = useState("")
  const [tier, setTier] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    const form = e.currentTarget
    try {
      await fetch("https://formspree.io/f/xvzbobwp", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      setStatus("success")
      form.reset()
      setRole("")
      setTier("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24 px-5">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3 text-balance">
            Request Access
          </h1>
          <p className="text-sm text-muted-foreground mb-10 max-w-md leading-relaxed">
            {"Tell us a bit about yourself and how you'd like to use Resona. We'll email next steps within a few business days."}
          </p>

          {status === "success" ? (
            <div className="p-8 bg-card/40 rounded-xl border border-primary/30 animate-fade-in text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">{"We'll email next steps."}</h2>
              <p className="text-sm text-muted-foreground">
                {"In the meantime, explore the "}
                <a href="/resona-api/docs" className="text-primary hover:underline">API docs</a>
                {" or reach us at "}
                <a href="mailto:mike@kayser-medical.com" className="text-primary hover:underline">mike@kayser-medical.com</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
                  placeholder="you@example.com"
                />
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
                  placeholder="Company, practice, or institution"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] appearance-none"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="Family">Family</option>
                  <option value="Clinician">Clinician</option>
                  <option value="Developer">Developer</option>
                  <option value="Researcher">Researcher</option>
                </select>
              </div>

              {/* Intended Use */}
              <div>
                <label htmlFor="intended_use" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Intended Use
                </label>
                <textarea
                  id="intended_use"
                  name="intended_use"
                  rows={3}
                  required
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="How do you plan to use the Resona API?"
                />
              </div>

              {/* Data Tier Intent */}
              <div>
                <label htmlFor="data_tier" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Data Tier Intent
                </label>
                <select
                  id="data_tier"
                  name="data_tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  required
                  className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] appearance-none"
                >
                  <option value="" disabled>Select consent tier</option>
                  <option value="Tier 0 - Device Only">Tier 0 -- Device Only</option>
                  <option value="Tier 1 - Local Processing">Tier 1 -- Local Processing</option>
                  <option value="Tier 2 - Cloud Analytics">Tier 2 -- Cloud Analytics</option>
                  <option value="Tier 3 - Full Sharing">Tier 3 -- Full Sharing</option>
                </select>
              </div>

              {/* Acknowledgements */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    name="ack_not_medical_device"
                    required
                    className="mt-1 w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary/30 shrink-0"
                  />
                  <span>I understand Resona OS is not a medical device and is not intended for emergency use.</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    name="ack_consent_required"
                    required
                    className="mt-1 w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary/30 shrink-0"
                  />
                  <span>I acknowledge that user consent is required before collecting or processing any physiological data.</span>
                </label>
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">
                  {"Something went wrong. Please try again or email "}
                  <a href="mailto:mike@kayser-medical.com" className="underline">mike@kayser-medical.com</a>
                  {" directly."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px] disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Request Access"}
                {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
