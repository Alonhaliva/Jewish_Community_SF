import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IL↔SV | Israeli Tech in Silicon Valley",
  description:
    "Connect with 500+ Israeli tech professionals in the Bay Area. Discover companies, find jobs, join events, and grow your network.",
  keywords: [
    "Israeli tech",
    "Silicon Valley",
    "Bay Area",
    "Israeli startups",
    "tech jobs",
    "Israeli community",
    "networking",
  ],
  authors: [{ name: "IL↔SV" }],
  creator: "IL↔SV",
  publisher: "IL↔SV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://isv-map.com",
    siteName: "IL↔SV",
    title: "IL↔SV | Israeli Tech in Silicon Valley",
    description:
      "Connect with 500+ Israeli tech professionals in the Bay Area. Discover companies, find jobs, join events.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IL↔SV - Israeli Tech in Silicon Valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IL↔SV | Israeli Tech in Silicon Valley",
    description: "Connect with 500+ Israeli tech professionals in the Bay Area",
    images: ["/og-image.png"],
  },
  generator: "v0.app",
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
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { SideNav } from "@/components/side-nav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SideNav />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
