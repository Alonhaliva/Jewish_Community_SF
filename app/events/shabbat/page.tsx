"use client"

import { SideNav } from "@/components/side-nav"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowLeft, UtensilsCrossed, Calendar, MapPin, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const SHABBAT_OPTIONS = [
    {
        title: "The Kitchen",
        description: "A religious community in San Francisco. Building Jewish life.",
        url: "https://www.thekitchensf.org/",
        icon: UtensilsCrossed,
        location: "San Francisco"
    },
    {
        title: "Sephardic Dinner",
        description: "First Friday of every month. Authentic Sephardic tradition.",
        url: "https://www.magaindavid.com/",
        icon: Calendar,
        location: "Magain David"
    },
    {
        title: "Mission Minyan",
        description: "Spirited traditional egalitarian prayer and community.",
        url: "https://www.missionminyan.org/",
        icon: Users,
        location: "Mission District"
    },
    {
        title: "Temple Emanuel",
        description: "A vibrant reform congregation in San Francisco.",
        url: "https://emanuelnyc.org/", // User provided this, looks like NYC but I will use it as requested
        icon: MapPin,
        location: "San Francisco"
    }
]

import { Users } from "lucide-react"

export default function ShabbatPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#FAFAFA] dark:bg-[#0a0a0f]">
            <SideNav />

            <div className="pt-28 pb-20 px-6 container mx-auto max-w-4xl">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-serif tracking-tight">
                        Shabbat Dinner & Discussion
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Find your community for Friday night. Choose from these welcoming options across the Bay Area.
                    </p>
                </div>

                <div className="grid gap-6">
                    {SHABBAT_OPTIONS.map((option, idx) => (
                        <a
                            key={idx}
                            href={option.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <option.icon className="w-8 h-8" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                                    {option.title}
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-lg mb-2">
                                    {option.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
                                    <MapPin className="w-3 h-3" /> {option.location}
                                </div>
                            </div>

                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-100 dark:border-slate-700 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all text-slate-300">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-8 text-center border border-blue-100 dark:border-blue-800/30">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Want to host?</h3>
                    <p className="text-blue-700 dark:text-blue-400 mb-6">Create your own Shabbat Dinner event for the community.</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8">
                        Submit Event
                    </Button>
                </div>
            </div>
        </div>
    )
}
