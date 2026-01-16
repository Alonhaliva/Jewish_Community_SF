"use client"

import { Search, ArrowRight, Calendar, MapPin, Ticket } from "lucide-react"

export function HeroNetwork() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-amber-50/50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-500">

            {/* Soft Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-200/20 dark:bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/20 dark:bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10 md:mt-0">

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-slate-900 dark:text-white font-serif">
                    Welcome Home, <br className="hidden md:block" />
                    <span className="text-slate-700 dark:text-slate-300">San Francisco.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 animate-fade-in-up delay-100 leading-relaxed">
                    Connecting the Bay Area Jewish community. <br />
                    Find synagogues, events, and your people.
                </p>

                {/* FEATURED EVENT CARD (Unmissable) */}
                <div className="w-full max-w-3xl mb-16 animate-fade-in-up delay-200 transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="relative bg-white dark:bg-[#1a1b26] rounded-3xl p-1 shadow-2xl overflow-hidden border border-purple-100 dark:border-purple-900/30 ring-1 ring-purple-100 dark:ring-white/5">
                        {/* Gradient Border/Glow */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"></div>

                        <div className="px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-purple-50/30 dark:from-[#1a1b26] dark:to-[#13141f]">

                            {/* Event Info */}
                            <div className="text-left flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold tracking-wider mb-4 uppercase">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                                    </span>
                                    Upcoming Highlight
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                                    Purim Party
                                    <span className="block text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 mt-1">by Elevate Shabbat</span>
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 mt-6 text-slate-600 dark:text-slate-300 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-purple-500" />
                                        March 8th
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-purple-500" />
                                        Secret Location, SF
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex-shrink-0">
                                <button className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl translate-y-0 group">
                                    Get Tickets
                                    <Ticket className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar (Simplified) */}
                <div className="w-full max-w-2xl mb-10 relative group animate-fade-in-up delay-300 z-20">
                    <div className="relative flex items-center bg-white dark:bg-[#13141f] border border-slate-200 dark:border-slate-800 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                        <Search className="w-5 h-5 text-slate-400 ml-4" />
                        <input
                            type="text"
                            placeholder="Search for synagogues, kosher food, or friends..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-200 px-4 py-3 placeholder:text-slate-400 text-base"
                        />
                        <button className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm">
                            Search
                        </button>
                    </div>
                </div>

                {/* Filters / Tags (Simplified) */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-16 animate-fade-in-up delay-400">
                    {['Synagogues', 'Kosher Food', 'Young Professionals', 'Families', 'Events'].map((filter) => (
                        <button key={filter} className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all text-sm font-medium">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="animate-bounce opacity-40">
                    <ArrowRight className="w-6 h-6 rotate-90 text-slate-500" />
                </div>
            </div>
        </section>
    )
}
