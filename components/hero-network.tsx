"use client"

import { Search, ArrowRight, Calendar, MapPin, Ticket } from "lucide-react"

export function HeroNetwork() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-500">

            {/* Subtle Ambient Background (Lighter/Warmer) */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10 md:mt-0">

                {/* MINIMALIST EVENT PILL */}
                <a
                    href="#"
                    className="group inline-flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800 transition-all mb-10 translate-y-0 hover:-translate-y-0.5"
                >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                        <Calendar className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-slate-100">March 8</span> • Purim Party by Elevate Shabbat
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                </a>


                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-slate-900 dark:text-white font-serif">
                    Welcome Home, <br className="hidden md:block" />
                    <span className="text-slate-600 dark:text-slate-400">San Francisco.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-500 max-w-2xl mb-12 animate-fade-in-up delay-100 leading-relaxed font-light">
                    Connecting the Bay Area Jewish community. <br />
                    Find synagogues, events, and your people.
                </p>

                {/* Search Bar (Clean) */}
                <div className="w-full max-w-2xl mb-10 relative group animate-fade-in-up delay-300 z-20">
                    <div className="relative flex items-center bg-white dark:bg-[#13141f] border border-slate-200 dark:border-slate-800/60 rounded-full p-1.5 shadow-sm hover:shadow-lg transition-all duration-300 ring-4 ring-transparent hover:ring-slate-100 dark:hover:ring-slate-800">
                        <Search className="w-5 h-5 text-slate-400 ml-4" />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-200 px-4 py-3 placeholder:text-slate-400 text-base"
                        />
                        <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-medium transition-colors text-sm">
                            Search
                        </button>
                    </div>
                </div>

                {/* Filters / Tags (Minimal text buttons) */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-up delay-400">
                    {['Synagogues', 'Kosher Food', 'Young Professionals', 'Families', 'Events'].map((filter) => (
                        <button key={filter} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="animate-bounce opacity-30">
                    <ArrowRight className="w-5 h-5 rotate-90 text-slate-400" />
                </div>
            </div>
        </section>
    )
}
