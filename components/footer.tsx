import Link from "next/link"

const footerLinks = [
  { href: "#platform", label: "Platform" },
  { href: "/resona-api", label: "Resona API" },
  { href: "/resona-api/docs", label: "API Docs" },
  { href: "#science", label: "Science" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path
                  d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2 12C2 12 5 18 12 18C19 18 22 12 22 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-base font-semibold text-foreground">Resona OS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A clinical intelligence platform by Kayser Medical PLLC.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              {footerLinks.slice(0, 3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center md:min-h-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {footerLinks.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center md:min-h-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:mike@kayser-medical.com"
                className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center md:min-h-0"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 Kayser Medical PLLC. All rights reserved.</p>
          <p>Resona OS is patent-pending technology developed by Kayser Medical PLLC.</p>
        </div>
      </div>
    </footer>
  )
}
