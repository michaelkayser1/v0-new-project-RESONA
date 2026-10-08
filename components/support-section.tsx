import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SupportSection() {
  return (
    <section className="px-6 py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-light text-gray-900">Support QOTE</h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Help us continue developing the Quantum Oscillator Theory of Everything and Resona AI
          </p>
        </div>

        <Card className="bg-white/90 border-gray-200 max-w-lg mx-auto">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">☕</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-medium text-gray-900">Buy us a Ko-fi</h4>
              <p className="text-gray-600">
                If you enjoy our content and find value in QOTE and Resona, please consider supporting our work. Your
                contribution helps us continue developing these tools for consciousness and healing.
              </p>

              <div className="pt-4">
                <Link href="https://ko-fi.com/qote868413" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#29abe0] hover:bg-[#1a8dbe] text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
                    </svg>
                    Support on Ko-fi
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 pt-2">Ko-fi.com/qote868413</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
