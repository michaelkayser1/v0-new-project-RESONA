import Link from "next/link"
import { siteConfig } from "@/lib/config"

export default function ResearchFooter() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-xs font-bold">KM</span>
              </div>
              <span className="font-medium text-foreground">Kayser Medical</span>
            </div>
            <p className="text-xs text-muted-foreground">
              The Kayser Autoethnographic Project: AI-Augmented Theoretical Physics Development (2017-Present)
            </p>
          </div>

          {/* Research */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Research</p>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-sm text-muted-foreground hover:text-foreground">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-muted-foreground hover:text-foreground">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/archive/papers" className="text-sm text-muted-foreground hover:text-foreground">
                  Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Project</p>
            <ul className="space-y-2">
              <li>
                <Link href="/resona" className="text-sm text-muted-foreground hover:text-foreground">
                  Resona OS
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground">
                  Talk to Resona
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Connect</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.kofi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Ko-fi Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kayser Medical PLLC. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Cite: Kayser, M.A. (2025). Kayser Autoethnographic Project (v1.0)
          </p>
        </div>
      </div>
    </footer>
  )
}
