"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { PlatformSection } from "@/components/sections/platform"
import { AudienceSection } from "@/components/sections/audience"
import { ScienceSection } from "@/components/sections/science"
import { FounderSection } from "@/components/sections/founder"
import { ContactSection } from "@/components/sections/contact-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <PlatformSection />
        <AudienceSection />
        <ScienceSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
