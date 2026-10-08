import ResearchHeader from "@/components/research-header"
import ResearchHero from "@/components/research-hero"
import ResearchFramework from "@/components/research-framework"
import QOTEPrinciples from "@/components/qote-principles"
import ArchiveSection from "@/components/archive-section"
import ResearchTimeline from "@/components/research-timeline"
import ResonaSection from "@/components/resona-section"
import WhatsNew from "@/components/whats-new"
import ResearchDisclosure from "@/components/research-disclosure"
import SupportSectionUpdated from "@/components/support-section-updated"
import ResearchFooter from "@/components/research-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResearchHeader />
      <main>
        <ResearchHero />
        <ResearchFramework />
        <QOTEPrinciples />
        <ArchiveSection />
        <ResearchTimeline />
        <ResonaSection />
        <WhatsNew />
        <SupportSectionUpdated />
        <ResearchDisclosure />
      </main>
      <ResearchFooter />
    </div>
  )
}
