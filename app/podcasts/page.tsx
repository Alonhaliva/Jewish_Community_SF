"use client"

import { useEffect, useState } from "react"
import { SideNav } from "@/components/side-nav"
import { ExternalLink, Play, Search, Home, Library } from "lucide-react"

interface Podcast {
  id: number | string
  title: string
  description: string
  link: string
  thumbnail?: string
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/podcasts")
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Error loading podcasts:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex min-h-screen bg-black font-sans text-white">
      <SideNav />

      {/* Main Content Area */}
      <main className="ml-16 flex-1 flex flex-col bg-neutral-900 m-2 rounded-lg overflow-hidden relative">

        {/* Gradient Header Background */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-emerald-900/80 to-neutral-900/0 pointer-events-none" />

        {/* Top Bar (Visual Simulation) */}
        <div className="flex items-center gap-4 px-8 py-4 sticky top-0 z-20 bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-3 py-2 w-full max-w-sm text-neutral-400">
            <Search className="h-5 w-5" />
            <span className="text-sm">What do you want to play?</span>
          </div>
          <div className="ml-auto">
            <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Log in
            </button>
          </div>
        </div>

        <div className="relative z-10 px-8 py-6 overflow-y-auto custom-scrollbar">

          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">Podcasts</h1>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold hover:underline cursor-pointer">Startups & Tech</h2>
              <span className="text-sm font-bold text-neutral-400 hover:underline cursor-pointer">Show all</span>
            </div>

            {/* Podcast Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="bg-neutral-800/50 p-4 rounded-md animate-pulse h-64"></div>
                ))
              ) : (
                podcasts.map((podcast, index) => (
                  <a
                    key={`podcast-${index}`}
                    href={podcast.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-neutral-800/40 p-4 rounded-md hover:bg-neutral-800 transition-all duration-300 relative flex flex-col gap-4 group"
                  >
                    <div className="relative aspect-square w-full rounded-md overflow-hidden shadow-lg bg-neutral-800 shadow-black/50">
                      {podcast.thumbnail ? (
                        <img
                          src={podcast.thumbnail}
                          alt={podcast.title}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-800 to-neutral-900">
                          <span className="text-2xl font-bold opacity-30">sv</span>
                        </div>
                      )}
                      {/* Play Button Overlay */}
                      <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 hover:bg-green-400">
                          <Play className="fill-current ml-1 w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-base truncate" title={podcast.title}>{podcast.title}</h3>
                      <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                        {podcast.description}
                      </p>
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold hover:underline cursor-pointer">Made for You</h2>
            </div>
            <div className="bg-neutral-800/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-neutral-800">
              <div className="flex-1 space-y-4">
                <span className="text-green-500 font-bold tracking-wider text-xs uppercase">Featured</span>
                <h3 className="text-3xl font-bold">Discover Israeli Innovation</h3>
                <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl">
                  Dive into the stories behind the Unicorns. From cyber security to food-tech, hear directly from the founders shaping the future in Silicon Valley and Tel Aviv.
                </p>
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform mt-4">
                  Listen Now
                </button>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="text-6xl">🇮🇱</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
