"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ExternalLink } from "lucide-react"

interface NewsItem {
    title: string
    link: string
    pubDate: string
    contentSnippet: string
    source: string
    sourceLogo: string
    image?: string
    isoDate: string
}

// Safe News Card Component - "New Yorker" Style
function NewsCard({ item }: { item: NewsItem }) {
    const [imgError, setImgError] = useState(false)
    // Prefer extracted article image, fallback to source logo
    const displayImage = !imgError && (item.image || item.sourceLogo)

    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col h-full"
        >
            {/* Image Container - Aspect 3:2 */}
            <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/50 rounded-lg mb-5 relative border border-slate-200 dark:border-slate-800/50">
                {displayImage ? (
                    <img
                        src={imgError ? item.sourceLogo : (item.image || item.sourceLogo)}
                        alt={item.source}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgError || !item.image ? 'object-contain p-8 opacity-50' : ''}`}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-700">
                        <span className="text-xs font-bold uppercase tracking-widest">{item.source}</span>
                    </div>
                )}
            </div>

            {/* Content - Serif Typography */}
            <div className="flex-1 flex flex-col">
                <h3 className="font-serif text-[16px] font-medium text-slate-900 dark:text-slate-300 leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-white transition-colors line-clamp-3">
                    {item.title}
                </h3>

                {/* Fallback Snippet if available, else just source */}
                <div className="mt-auto pt-2">
                    <p className="text-[9px] font-bold text-blue-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                        By {item.source}
                    </p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-600">
                        {new Date(item.isoDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </a>
    )
}

export function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch("/api/news")
                if (!res.ok) throw new Error("Failed to fetch news")
                const data = await res.json()
                if (Array.isArray(data)) {
                    setNews(data)
                }
            } catch (e) {
                console.error("News fetch error:", e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchNews()
    }, [])

    if (isLoading) return null
    if (news.length === 0) return null

    // Take exactly 10 items for the requested grid (5x2) or flexible
    const displayNews = news.slice(0, 10)
    // Duplicate for seamless marquee
    const marqueeItems = [...displayNews, ...displayNews]

    return (
        <section className="py-16 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1920px]">

                {/* Minimalist Serif Header */}
                <div className="text-center mb-12 border-t border-slate-200 dark:border-slate-800 pt-4 max-w-7xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 dark:text-slate-200 tracking-tight">
                        News
                    </h2>
                </div>

                {/* Marquee Layout */}
                <div className="relative w-full">
                    {/* Gradient Masks for smooth fade out at edges - Matching Page BG */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee gap-8">
                        {marqueeItems.map((item, idx) => (
                            <div key={idx} className="w-[300px] flex-shrink-0">
                                <NewsCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}
