import { CartProvider } from "@/contexts/cart-context"
import "@/app/globals.css"
import { Poppins, Qwigley } from "next/font/google"
import type React from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const qwigley = Qwigley({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-qwigley",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${qwigley.variable}`}>
      <body className="min-h-screen bg-white font-poppins">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}



import './globals.css'