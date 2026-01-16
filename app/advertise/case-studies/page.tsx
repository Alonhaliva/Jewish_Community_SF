import { AdvertiseNav } from "@/components/advertise-nav"
import { TrendingUp, MousePointerClick, MessageSquare } from "lucide-react"

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 pb-20">
            <AdvertiseNav />

            <div className="container mx-auto px-4 pt-32 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20 mb-4">
                        Proven Results
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight">Success Stories</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        See how top Israeli tech companies use ITON to hire, sell, and build brand awareness.
                    </p>
                </div>

                <div className="grid gap-12">
                    {/* Case Study 1 */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors group">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-2xl font-bold text-white">Wiz</span>
                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Recruitment</span>
                                </div>
                                <h3 className="text-3xl font-bold leading-tight group-hover:text-purple-400 transition-colors">
                                    Hiring Senior DevSecOps Engineers in a competitive market
                                </h3>
                                <p className="text-zinc-400 text-lg">
                                    Wiz needed to reach senior security engineers who aren't actively looking on LinkedIn. They utilized our main feed sponsorship to tell their developer-focused story.
                                </p>
                                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                    <div>
                                        <div className="text-2xl font-bold text-white">52x</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">ROI</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">5</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Hires</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">$4k</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Cost</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-zinc-950 p-8 md:p-12 flex items-center justify-center border-l border-zinc-800">
                                <div className="space-y-6 w-full max-w-sm">
                                    <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                        <TrendingUp className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                        <div>
                                            <div className="font-medium text-white">High Intent Traffic</div>
                                            <div className="text-sm text-zinc-400 mt-1">Candidates spent avg 4.5 mins on the job description page.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                        <MousePointerClick className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                                        <div>
                                            <div className="font-medium text-white">3.2% CTR</div>
                                            <div className="text-sm text-zinc-400 mt-1">Significantly above industry average for hiring ads.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 2 */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-colors group">
                        <div className="grid md:grid-cols-2">
                            <div className="bg-zinc-950 p-8 md:p-12 flex items-center justify-center border-r border-zinc-800 order-2 md:order-1">
                                <div className="space-y-6 w-full max-w-sm">
                                    <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                        <MessageSquare className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
                                        <div>
                                            <div className="font-medium text-white">Brand Sentiment</div>
                                            <div className="text-sm text-zinc-400 mt-1">Positioned Monday.com as a developer-first platform.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center order-1 md:order-2">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-2xl font-bold text-white">Monday.com</span>
                                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">Brand Awareness</span>
                                </div>
                                <h3 className="text-3xl font-bold leading-tight group-hover:text-pink-400 transition-colors">
                                    Launching MondayDB to the developer community
                                </h3>
                                <p className="text-zinc-400 text-lg">
                                    To launch their new engine, Monday needed technical credibility. They sponsored "Deep Dives" explaining the architecture behind MondayDB.
                                </p>
                                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                    <div>
                                        <div className="text-2xl font-bold text-white">12k</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Reads</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">850</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Signups</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">Top 10</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">HackerNews</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
