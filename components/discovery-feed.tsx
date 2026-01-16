"use client"

import { useMemo } from "react"
import { mockCompaniesData, mockEvents, mockJobs } from "@/lib/mock-data"
import { ArrowRight, Calendar, TrendingUp, UserPlus, Zap } from "lucide-react"

export function DiscoveryFeed() {
    // Dynamic Stats Calculation
    const stats = useMemo(() => {
        // 1. Featured Startup (Wiz or Random High Valuation)
        const wiz = mockCompaniesData.find(c => c.name.includes("Wiz"))
        const wizJobs = mockJobs.filter(j => j.companyId === wiz?.id).length || 12

        return {
            startup: {
                title: "12 Startups",
                subtitle: "Active this week",
                badge: "Active",
                metric: "Raising & Hiring"
            },
            event: {
                title: "3 Events",
                subtitle: "Happening soon",
                badge: "New",
                metric: "RSVP Open"
            },
            person: {
                title: "7 Founders",
                subtitle: "Added this week",
                badge: "New",
                metric: "High Signal"
            },
            investor: {
                title: "Investors",
                subtitle: "Open to warm intros",
                badge: "Open to Intro",
                metric: "Verified"
            }
        }
    }, [])

    const SPOTLIGHTS = [
        {
            type: "startup",
            title: stats.startup.title,
            subtitle: stats.startup.subtitle,
            badge: stats.startup.badge,
            metric: stats.startup.metric,
            icon: <Zap className="text-yellow-400" />,
            color: "from-blue-500/20 to-cyan-500/20",
            border: "group-hover:border-blue-500/50"
        },
        {
            type: "event",
            title: stats.event.title,
            subtitle: stats.event.subtitle,
            badge: stats.event.badge,
            metric: stats.event.metric,
            icon: <Calendar className="text-purple-400" />,
            color: "from-purple-500/20 to-pink-500/20",
            border: "group-hover:border-purple-500/50"
        },
        {
            type: "person",
            title: stats.person.title,
            subtitle: stats.person.subtitle,
            badge: stats.person.badge,
            metric: stats.person.metric,
            icon: <UserPlus className="text-green-400" />,
            color: "from-green-500/20 to-emerald-500/20",
            border: "group-hover:border-green-500/50"
        },
        {
            type: "investor",
            title: stats.investor.title,
            subtitle: stats.investor.subtitle,
            badge: stats.investor.badge,
            metric: stats.investor.metric,
            icon: <TrendingUp className="text-red-400" />,
            color: "from-red-500/20 to-orange-500/20",
            border: "group-hover:border-red-500/50"
        }
    ]

    return (
        <section className="py-24 md:py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-sm font-bold text-blue-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Live Ecosystem</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">What's Happening Right Now</h3>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 transition-colors text-sm font-medium">
                        See what's new <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SPOTLIGHTS.map((item, idx) => {
                        let link = "/database"
                        let target = "_self"

                        if (item.type === "event") link = "/events"

                        // WhatsApp - External
                        if (item.type === "person") {
                            link = "/database?category=founder"
                            target = "_self"
                        }

                        // Investor
                        if (item.type === "investor") link = "/database?category=investor"

                        // Wiz -> Official Site (relevance: true landing page)
                        if (item.type === "startup" && item.title.includes("Wiz")) {
                            link = "/database?search=Wiz"
                            target = "_self"
                        }

                        return (
                            <a
                                key={idx}
                                href={link}
                                target={target}
                                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                                className={`group relative p-6 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-white/10 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 cursor-pointer ${item.border} block text-left`}
                            >
                                <div className="absolute top-6 right-6 p-2 bg-slate-50 dark:bg-white/5 rounded-lg text-slate-500 dark:text-slate-400 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-white/10 transition-all">
                                    {item.icon}
                                </div>

                                <div className="mt-8">
                                    <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide mb-3 ${item.badge === 'New' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                        item.badge === 'Active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                        }`}>
                                        {item.badge}
                                    </span>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">{item.subtitle}</p>

                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-500">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        {item.metric}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-indigo-400">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </a>
                        )
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-400 font-medium opacity-80">
                        Built on nearly a decade of experience connecting founders, operators, and investors.
                    </p>
                </div>
            </div>
        </section>
    )
}
