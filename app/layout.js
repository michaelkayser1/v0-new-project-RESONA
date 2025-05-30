export const metadata = {
  title: "Resona Chat API",
  description: "API for Resona chat integration",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


import './globals.css'