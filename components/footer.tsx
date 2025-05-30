import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q</span>
            </div>
            <span className="text-sm font-light tracking-wide">QOTE</span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500">
              QOTE teaches that healing, growth, and intelligence all emerge from alignment with deeper oscillatory
              truths.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="mailto:mike@kayser-medical.com"
              className="text-xs text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Contact
            </Link>
            <span className="text-xs text-gray-400">© {new Date().getFullYear()} Kayser Medical</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
