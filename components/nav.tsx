"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, MessageCircle } from "lucide-react"

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/theory", label: "How I Think" },
  { href: "/contact", label: "Contact" },
]

export function Nav({ onChatOpen }: { onChatOpen?: () => void }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg text-foreground hover:text-primary transition-colors">
          Mike Kayser
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {onChatOpen && (
            <button
              onClick={onChatOpen}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Resona
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base transition-colors py-1 ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {onChatOpen && (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onChatOpen()
                }}
                className="flex items-center gap-2 text-base text-muted-foreground py-1 text-left"
              >
                <MessageCircle className="w-4 h-4" />
                Talk to Resona
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
