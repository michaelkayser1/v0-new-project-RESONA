import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-light text-gray-900">404</h1>
          <h2 className="text-2xl font-light text-gray-700">Field Not Found</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 max-w-md mx-auto">
            The quantum field you're seeking has shifted to a different resonance frequency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                Return to QOTE
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline">Enter Resona Chat</Button>
            </Link>
          </div>
        </div>

        <div className="text-xs text-gray-500">The field remembers all paths. Trust the process.</div>
      </div>
    </div>
  )
}
