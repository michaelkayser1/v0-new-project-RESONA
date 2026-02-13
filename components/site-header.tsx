"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#theory", label: "Theory" },
  { href: "#fields", label: "Fields" },
  { href: "#resona", label: "Resona" },
  { href: "#support", label: "Support" },
  { href: "#about", label: "About" },
]

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">Q</span>
          </div>
          <span className="text-lg font-light tracking-widest text-foreground">QOTE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link href="/chat">
            <Button size="sm" className="rounded-full px-5">
              Talk to Resona
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 animate-fade-in-up">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-3 text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/chat" onClick={() => setMobileOpen(false)}>
                <Button className="w-full rounded-full">Talk to Resona</Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
