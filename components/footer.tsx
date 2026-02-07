import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-serif text-lg text-foreground mb-1">Mike Kayser</p>
            <p className="text-sm text-muted-foreground">DO, FACMG</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
                Work
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/theory" className="text-muted-foreground hover:text-foreground transition-colors">
                How I Think
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="text-sm">
            <a
              href="mailto:mike@kayser-medical.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              mike@kayser-medical.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>Grounded care. Careful thinking. Human first.</p>
        </div>
      </div>
    </footer>
  )
}
