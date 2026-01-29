"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export default function ResearchHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [archiveDropdownOpen, setArchiveDropdownOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/research", label: "Research" },
    {
      label: "Archive",
      dropdown: [
        { href: "/archive", label: "Overview" },
        { href: "/archive/transcripts", label: "Chat Transcripts" },
        { href: "/archive/artifacts", label: "Generated Artifacts" },
        { href: "/archive/papers", label: "Research Papers" },
        { href: "/archive/creative", label: "Creative Works" },
        { href: "/archive/notes", label: "Phenomenological Notes" },
        { href: "/archive/metrics", label: "Outcome Metrics" },
      ],
    },
    { href: "/resona", label: "Resona OS" },
    { href: "/about", label: "About" },
    { href: "/support", label: "Support" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-bold">KM</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-foreground">Kayser Medical</span>
              <span className="ml-2 text-xs text-muted-foreground">Research Archive</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="relative">
                  <button
                    onClick={() => setArchiveDropdownOpen(!archiveDropdownOpen)}
                    onBlur={() => setTimeout(() => setArchiveDropdownOpen(false), 150)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${archiveDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {archiveDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 w-48 rounded-md border border-border bg-card shadow-lg">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 first:rounded-t-md last:rounded-b-md"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href!}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) =>
                item.dropdown ? (
                  <div key={index}>
                    <button
                      onClick={() => setArchiveDropdownOpen(!archiveDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md min-h-[44px]"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${archiveDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {archiveDropdownOpen && (
                      <div className="pl-4">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md min-h-[44px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.href!}
                    className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
