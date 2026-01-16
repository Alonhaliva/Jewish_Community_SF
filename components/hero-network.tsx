"use client"

import { useEffect, useRef } from "react"
import { Search, Zap, ArrowRight, User, Building2, Calendar } from "lucide-react"

export function HeroNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = window.innerWidth)
        let h = (canvas.height = window.innerHeight)

        // Nodes for the network animation
        const particles: { x: number; y: number; vx: number; vy: number }[] = []
        const particleCount = 80

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            })
        }

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, w, h)

            // Node Styles - Slate-400 works decently on both white and dark
            ctx.fillStyle = "rgba(148, 163, 184, 0.5)"
            ctx.strokeStyle = "rgba(148, 163, 184, 0.15)"

            for (let i = 0; i < particleCount; i++) {
                let p = particles[i]
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > w) p.vx *= -1
                if (p.y < 0 || p.y > h) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
                ctx.fill()

                // Connect nearby particles
                for (let j = i + 1; j < particleCount; j++) {
                    let p2 = particles[j]
                    let dx = p.x - p2.x
                    let dy = p.y - p2.y
                    let dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }
            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-500">
            {/* Network Animation Background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 dark:opacity-30" />

            {/* Decorative Gradient Glows - Works on both */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/20 blur-[120px] rounded-full opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-indigo-900/20 blur-[150px] rounded-full opacity-60 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10 md:mt-0">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mb-8 animate-fade-in-up shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">BAY AREA JEWISH COMMUNITY • 2026</span>
                </div>

                {/* Headline */}
                {/* Headline */}
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up delay-100 max-w-6xl leading-tight text-slate-900 dark:text-white">
                    The Living Map of <br />
                    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 animate-gradient-x bg-[length:200%_auto]">
                        Our Community
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mb-4 leading-relaxed animate-fade-in-up delay-200 font-light">
                    Connecting families, young professionals, and organizations in the Bay Area.
                </p>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-500 max-w-2xl mb-12 animate-fade-in-up delay-200 font-medium">
                    A central hub for synagogues, events, and community resources.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-2xl mb-8 relative group animate-fade-in-up delay-300 z-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center bg-white dark:bg-[#13141f] border border-slate-200 dark:border-slate-800/60 rounded-full p-2 shadow-xl hover:shadow-2xl hover:border-blue-300 dark:hover:border-slate-700 transition-all">
                        <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 ml-4" />
                        <input
                            type="text"
                            placeholder="Search synagogues, events, or people..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-200 px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-lg"
                        />
                        <button className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                            Search
                        </button>
                    </div>
                </div>

                {/* Filters / Tags */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-in-up delay-400">
                    {['Synagogues', 'Events', 'Kosher Food', 'Schools', 'Organizations'].map((filter) => (
                        <button key={filter} className="px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all text-sm font-medium backdrop-blur-sm">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col items-center gap-4 animate-fade-in-up delay-500">
                    <button
                        onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Start discovering the community around you
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-slate-500 rounded-full"></div>
                </div>
            </div>
        </section>
    )
}
