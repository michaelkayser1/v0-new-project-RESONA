"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  BookOpen,
  Zap,
  Lock,
  Users,
  Activity,
  Database,
  GitBranch,
  TrendingUp,
  Bell,
  AlertTriangle,
  Gauge,
  FileText,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: BookOpen },
      { id: "quickstart", label: "Quickstart", icon: Zap },
      { id: "authentication", label: "Authentication", icon: Lock },
    ],
  },
  {
    title: "Endpoints",
    items: [
      { id: "users", label: "Users", icon: Users },
      { id: "state", label: "State", icon: Activity },
      { id: "ingest", label: "Ingest", icon: Database },
      { id: "interventions", label: "Interventions", icon: GitBranch },
      { id: "trends", label: "Trends", icon: TrendingUp },
      { id: "alerts", label: "Alerts & Webhooks", icon: Bell },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "errors", label: "Errors", icon: AlertTriangle },
      { id: "rate-limits", label: "Rate Limits", icon: Gauge },
      { id: "changelog", label: "Changelog", icon: FileText },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Top Bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/[0.06] bg-[#0B1220]/90 backdrop-blur-xl">
        <div className="h-full flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -ml-2 rounded-lg text-white/50 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#2DD4BF]" />
              </div>
              <span className="text-sm font-semibold text-white">Resona</span>
            </Link>
            <span className="hidden sm:block text-white/20">{"/"}</span>
            <span className="hidden sm:block text-sm text-white/50 font-medium">API Docs</span>
            <span className="hidden sm:inline-flex px-2 py-0.5 bg-[#2DD4BF]/10 text-[#2DD4BF] text-[10px] font-mono font-bold rounded-full tracking-wider">
              v1
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/resona-api"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5 min-h-[44px]"
            >
              Dashboard
            </Link>
            <Link
              href="/request-access"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#2DD4BF] text-[#0B1220] text-xs font-semibold rounded-lg hover:bg-[#2DD4BF]/90 transition-colors min-h-[44px]"
            >
              Get API Key
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-56 lg:w-60 shrink-0 border-r border-white/[0.06] sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 px-3">
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                {section.title}
              </p>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-white/50 hover:text-white hover:bg-white/[0.04] min-h-[40px]"
                >
                  <item.icon className="w-3.5 h-3.5 opacity-60" />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Sidebar - Mobile Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside
              className="absolute top-14 left-0 bottom-0 w-72 bg-[#0B1220] border-r border-white/[0.06] overflow-y-auto py-6 px-3"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarSections.map((section) => (
                <div key={section.title} className="mb-6">
                  <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                    {section.title}
                  </p>
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all text-white/50 hover:text-white hover:bg-white/[0.04] min-h-[44px]"
                    >
                      <item.icon className="w-3.5 h-3.5 opacity-60" />
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
