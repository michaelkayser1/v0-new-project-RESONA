import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl md:text-6xl font-light text-foreground">404</h1>
          <h2 className="text-xl md:text-2xl font-light text-muted-foreground">Field Not Found</h2>
        </div>

        <p className="text-muted-foreground max-w-md text-pretty">
          The quantum field you are seeking has shifted to a different resonance frequency.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/">
            <Button className="rounded-full px-6 min-h-[44px]">Return to QOTE</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="rounded-full px-6 min-h-[44px]">
              Enter Resona Chat
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">The field remembers all paths. Trust the process.</p>
      </div>
    </div>
  )
}
