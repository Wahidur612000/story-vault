import "./globals.css"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <Navbar />
          <main className="pt-18">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
