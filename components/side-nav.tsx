"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Database, Briefcase, Users, Calendar, TrendingUp, Plus, Info, Radio, BookOpen } from "lucide-react"
import Image from "next/image"

import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { href: "/database", label: "Database", icon: Database },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/podcasts", label: "Podcasts", icon: Radio },
  { href: "/whats-new", label: "What's New", icon: TrendingUp },
  { href: "/add-company", label: "Add Company", icon: Plus },
  { href: "/about", label: "About", icon: Info },
  { href: "/blog", label: "Blog", icon: BookOpen },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6 h-full flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="relative h-20 w-20">
            <Image
              src="/images/isv-network-logo.png"
              alt="ISV Logo"
              fill
              className="object-contain animate-[spin_10s_linear_infinite]"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-blue-50 dark:hover:bg-slate-800",
                  isActive ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold" : "text-gray-700 dark:text-slate-300",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}

          <div className="ml-2 border-l border-slate-200 dark:border-slate-700 pl-2">
            <ModeToggle />
          </div>
        </div>
      </div >
    </nav >
  )
}
