import { AdvertiseNav } from "@/components/advertise-nav"
import { Users, Globe2, Briefcase } from "lucide-react"

export default function AudiencesPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 pb-20">
            <AdvertiseNav />

            <div className="container mx-auto px-4 pt-32 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Startup Nation</span> Elite</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Our readers are the decision-makers, builders, and investors shaping the Israeli tech ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold mb-2">6,000+</div>
                        <div className="text-zinc-500 font-medium">Daily Subscribers</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-6 h-6 text-pink-400" />
                        </div>
                        <div className="text-3xl font-bold mb-2">35%</div>
                        <div className="text-zinc-500 font-medium">Founders & C-Level</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center hover:bg-zinc-900 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe2 className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold mb-2">90%</div>
                        <div className="text-zinc-500 font-medium">Based in TLV/NYC/SF</div>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-8">Who reads ITON - Tech Bridge?</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-purple-400 mb-4 uppercase text-sm tracking-wider">Demographics</h4>
                                <ul className="space-y-3 text-zinc-300">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Software Engineers (Senior/Staff)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Founders & CEOs</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Venture Capitalists</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Product Managers</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-pink-400 mb-4 uppercase text-sm tracking-wider">Companies</h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Wiz', 'Monday.com', 'Check Point', 'CyberArk', 'Wix', 'AppsFlyer', 'Gong', 'SentinelOne'].map(company => (
                                        <span key={company} className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-300 border border-white/10">
                                            {company}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
