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
              The Kayser Autoethnographic Project: research, AI governance, writing, and music.
            </p>
          </div>

          {/* Research */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Research</p>
            <ul className="flex flex-col">
              <li>
                <Link href="/science-and-governance" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">Science & Rules</Link>
              </li><li>
                <Link href="/research" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/archive" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/archive/papers" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Project</p>
            <ul className="flex flex-col">
              <li>
                <Link href="/resona" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  Resona OS
                </Link>
              </li>
              <li>
                <Link href="/chat" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  Talk to Resona
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Connect</p>
            <ul className="flex flex-col">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.kofi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-foreground"
                >
                  Ko-fi Support
                </a>
              </li>
              <li><a href="https://suno.com/@michaelkayser155" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground">Suno Music</a>
              </li>
              <li><a href="https://michaelkayser.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground">Substack Writing</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kayser Medical PLLC. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Cite individual works at their original sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
