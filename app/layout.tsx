import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jewish Community SF | Connecting the Bay Area",
  description:
    "Connect with the Jewish community in San Francisco and the Bay Area. Find events, synagogues, kosher food, and more.",
  keywords: [
    "Jewish Community",
    "San Francisco",
    "Bay Area",
    "Synagogues",
    "Kosher",
    "Events",
    "Jewish Tech",
  ],
  authors: [{ name: "Jewish Community SF" }],
  creator: "Jewish Community SF",
  publisher: "Jewish Community SF",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jewish-community-sf.com",
    siteName: "Jewish Community SF",
    title: "Jewish Community SF | Connecting the Bay Area",
    description:
      "Connect with the Jewish community in San Francisco and the Bay Area. Find events, synagogues, kosher food, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jewish Community SF - Connecting the Bay Area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewish Community SF | Connecting the Bay Area",
    description: "Connect with the Jewish community in San Francisco and the Bay Area",
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
