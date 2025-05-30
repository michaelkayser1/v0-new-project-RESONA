export const metadata = {
  title: "Resona Chat API",
  description: "API for Resona chat integration",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
