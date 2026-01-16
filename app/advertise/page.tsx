"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { AdvertiseNav } from "@/components/advertise-nav"

export default function AdvertisePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const timeframe = formData.get("timeframe") as string
        const heardFrom = formData.get("heardFrom") as string

        try {
            await fetch("/api/advertise/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, timeframe, heardFrom }),
            })
            setSuccess(true)
        } catch (error) {
            console.error("Failed to submit", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 max-w-md w-full text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold">Request Received</h2>
                    <p className="text-zinc-400">Thanks for your interest! Our team will review your application and get back to you shortly.</p>
                    <Link href="/" className="inline-block text-blue-400 hover:text-blue-300 transition-colors">
                        Return to homepage
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            {/* Nav */}
            <AdvertiseNav />

            <div className="container mx-auto px-4 pt-32 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Copy */}
                <div className="space-y-8">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                        Reach over <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">6,000+</span><br />
                        tech professionals
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                        Get your brand in front of founders, investors, engineers, and executives in the Israeli Tech ecosystem.
                        We provide high-impact placements in our daily briefing read by the industry's movers and shakers.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                            <div className="text-3xl font-bold text-white mb-1">45%</div>
                            <div className="text-sm text-zinc-500">Open Rate</div>
                        </div>
                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                            <div className="text-3xl font-bold text-white mb-1">12%</div>
                            <div className="text-sm text-zinc-500">Click Rate</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25"></div>

                    <div className="relative bg-[#0A0A0A] border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Work email <span className="text-red-500">*</span></label>
                                <input
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">When are you looking to advertise? <span className="text-red-500">*</span></label>
                                <select name="timeframe" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                                    <option>Please Select</option>
                                    <option>This week</option>
                                    <option>Next 2 weeks</option>
                                    <option>Next month</option>
                                    <option>Next quarter</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">How did you hear about us?</label>
                                <input
                                    name="heardFrom"
                                    type="text"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Request Media Kit"}
                            </button>

                            <p className="text-xs text-center text-zinc-500 pt-2">
                                By submitting this form, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>

                        {/* Floating Badge */}
                        <div className="hidden md:block absolute -right-12 top-20 bg-white text-black p-5 rounded-2xl shadow-xl max-w-[200px] transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10">
                            <div className="text-2xl mb-2">👋</div>
                            <p className="text-sm font-medium leading-relaxed">
                                "ISV Map ads drove <span className="font-bold text-purple-600">52x ROI</span> for our recruitment campaign."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
