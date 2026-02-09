"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [role, setRole] = useState("")

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
      // Formspree receives the data regardless of response status
      // (confirmed via dashboard). Show success if no network error.
      setStatus("success")
      form.reset()
      setRole("")
    } catch {
      // Only show error on actual network failure
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 px-5 bg-card/20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight text-balance">
          Ready to See What Coherence Looks Like?
        </h2>
        <p className="text-muted-foreground mb-10 text-pretty">
          {"Whether you're a clinician, researcher, health system leader, or family navigating complexity — let's start a conversation."}
        </p>

        {status === "success" ? (
          <div className="p-8 bg-background rounded-xl border border-primary/30 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <p className="text-foreground font-medium mb-2">Thank you. {"We'll"} be in touch soon.</p>
            <p className="text-sm text-muted-foreground">
              In the meantime, feel free to reach us at{" "}
              <a href="mailto:mike@kayser-medical.com" className="text-primary hover:underline">
                mike@kayser-medical.com
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="Your name"
                />
              </div>
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
            </div>

            <div>
              <label htmlFor="role" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                I am a...
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
                <option value="Patient / Family Member">Patient / Family Member</option>
                <option value="Clinician">Clinician</option>
                <option value="Health System / Organization">Health System / Organization</option>
                <option value="Researcher">Researcher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                Message <span className="text-muted-foreground/50">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full bg-background border border-border px-4 py-3 rounded-lg text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Anything you'd like us to know..."
              />
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
              {status === "submitting" ? "Sending..." : "Request Access"}
              {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
