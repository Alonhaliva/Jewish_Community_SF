import { ArrowRight, Calendar, Users, Mic, Wine } from "lucide-react"

export function CommunityEventsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">
                        Where Israeli tech meets Silicon Valley
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 mb-4">
                        Intimate gatherings. Meaningful conversations.
                    </p>
                    <p className="text-lg md:text-xl text-slate-500 mb-10">
                        A community that turns connections into real opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/events"
                            className="px-8 py-4 bg-[#0070f3] hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-200/50 min-w-[200px]"
                        >
                            See Upcoming Events
                        </a>
                        <a
                            href="https://chat.whatsapp.com/GocVt0aU0bGAgYSfQyQHiJ"
                            target="_blank"
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-bold rounded-full transition-all shadow-sm min-w-[200px]"
                        >
                            Join the Community
                        </a>
                    </div>
                </div>

                {/* Featured Event Card */}
                <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Israeli Tech Night — Silicon Valley</h3>
                                <p className="text-slate-500 font-medium flex items-center gap-2">
                                    <span className="inline-block w-2 H-2 bg-slate-300 rounded-full"></span> JCC Palo Alto | March 1, 2025
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                        </div>

                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Connect with Israeli founders, operators, investors, and builders shaping the Valley.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600 mt-1">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Surprise Guest of Honor</h4>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600 mt-1">
                                    <Wine className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Curated networking & mingling</h4>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                                    <Mic className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Sharp, thought-provoking talk</h4>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mt-1">
                                    <span className="text-xl">🍹</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Warm, community atmosphere</h4>
                                </div>
                            </div>
                        </div>

                        <a href="/events/1" className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-center rounded-xl transition-all shadow-md text-lg">
                            Reserve Your Spot →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
