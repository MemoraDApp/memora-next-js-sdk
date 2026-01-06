import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Providers } from "./providers"
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Updated metadata for Memora
export const metadata: Metadata = {
  title: "Memora Labs",
  description:
    "Transform your trading behavior into stablecoin rewards. Non-custodial, data-driven, and completely automated.",
  generator: "memoralabs.fun",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
          {children}
        <Analytics />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "oklch(0.12 0.015 260)",
              color: "oklch(0.98 0.01 260)",
              border: "1px solid oklch(0.22 0.02 260)",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  )
}
