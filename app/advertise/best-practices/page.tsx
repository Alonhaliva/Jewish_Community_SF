import { AdvertiseNav } from "@/components/advertise-nav"
import { Sparkles, Terminal, Code2, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function BestPracticesPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 pb-20">
            <AdvertiseNav />

            <div className="container mx-auto px-4 pt-32 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight">How to write <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">killer ads</span> for devs</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Developers hate marketing fluff. Here is your no-nonsense guide to earning their clicks (and respect).
                    </p>
                </div>

                <div className="space-y-12">

                    {/* Tip 1 */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Code2 className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-lg">1</div>
                                <h3 className="text-2xl font-bold">Talk to the developer, not the CTO</h3>
                            </div>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                Even if the CTO signs the check, the developer usually does the research. Write your ad as if you are explaining your tool to a colleague at a hackathon.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                                    <div className="flex items-center gap-2 text-red-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <AlertTriangle className="w-4 h-4" /> Avoid This
                                    </div>
                                    <p className="text-zinc-500 italic">"Maximize operational efficiency and synergy with our enterprise-grade solution."</p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                                    <div className="flex items-center gap-2 text-green-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <CheckCircle2 className="w-4 h-4" /> Do This
                                    </div>
                                    <p className="text-zinc-300">"Deploy inside your own VPC with one command. Compatible with k8s."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tip 2 */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Terminal className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold text-lg">2</div>
                                <h3 className="text-2xl font-bold">Be specific. Very specific.</h3>
                            </div>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                Vague promises trigger skepticism. Technical details trigger curiosity. If you support Python 3.11+, say it. If you reduce latency by 40ms, say it.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                                    <div className="flex items-center gap-2 text-red-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <AlertTriangle className="w-4 h-4" /> Avoid This
                                    </div>
                                    <p className="text-zinc-500 italic">"The fastest database in the world."</p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                                    <div className="flex items-center gap-2 text-green-400 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <CheckCircle2 className="w-4 h-4" /> Do This
                                    </div>
                                    <p className="text-zinc-300">"Processing 1M events/sec on a single node. Written in Rust."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tip 3 */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">3</div>
                                <h3 className="text-2xl font-bold">Don't be boring</h3>
                            </div>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                The "Morning Spark" is a fun read. Your ad should fit the vibe. Don't be afraid to use emojis, humor, or a casual tone. We aren't a corporate press release channel.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
