"use client"

import { useState } from "react"
import { X, Lock, CheckCircle, ArrowRight, Briefcase, MapPin } from "lucide-react"

export function TalentNetworkLayer() {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState<'intro' | 'preview' | 'form' | 'success'>('intro')
    const [isLoading, setIsLoading] = useState(false)

    // Mock Data for View Only
    const talentProfiles = [
        { role: "Senior Product Designer", seniority: "Senior", location: "Bay Area", status: "Open to opportunities", intro: "Selectively" },
        { role: "Founding Engineer", seniority: "Staff", location: "San Francisco", status: "Selective", intro: "Yes" },
        { role: "Head of Growth", seniority: "Lead", location: "Remote / NY", status: "Open", intro: "Yes" },
        { role: "Head of Product", seniority: "VP", location: "Palo Alto", status: "Passive", intro: "Yes" },
    ]

    const handleOpen = () => {
        setIsOpen(true)
        setView('intro')
    }

    const handleEnter = () => {
        setView('preview')
    }

    const handleRequestAccess = () => {
        setView('form')
    }

    const handleRequestIntro = () => {
        setView('form') // Intro requests also go to the form
    }


    if (!isOpen) {
        return (
            <div className="flex justify-center py-6 animate-fade-in-up">
                <div className="bg-white/50 dark:bg-[#13141f]/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-500 group">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Hiring or recruiting in the Bay Area?
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                        Access a curated, referral-based talent network connected to founders, operators, and investors.
                    </p>
                    <button
                        onClick={handleOpen}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-lg shadow-indigo-500/10"
                    >
                        Request Access to Talent Network
                    </button>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-4 font-bold flex items-center justify-center gap-1.5 grayscale opacity-70">
                        Access is reviewed to maintain quality and trust
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Container */}
            <div className="relative bg-white dark:bg-[#0f111a] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content Views */}
                <div className="p-8 md:p-10">

                    {/* VIEW: INTRO - Private Network */}
                    {view === 'intro' && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-white/50 dark:ring-white/5">
                                <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                                Private Talent Network
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-sm mx-auto">
                                This is a curated network of operators, engineers, and founders across the Bay Area and Israel.
                                <br />
                                <span className="font-semibold text-slate-900 dark:text-white">Full profiles are visible only to approved members.</span>
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 mb-8">
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Quality</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Geography</span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Vetted</span>
                            </div>

                            <button
                                onClick={handleEnter}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-xl"
                            >
                                See Examples
                            </button>
                        </div>
                    )}

                    {/* VIEW: PREVIEW - Blurred */}
                    {view === 'preview' && (
                        <div className="relative">
                            <h3 className="text-center font-bold text-slate-900 dark:text-white mb-6">Network Snapshot</h3>

                            <div className="space-y-4 mb-2 filter blur-sm select-none pointer-events-none opacity-50">
                                {talentProfiles.map((p, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200">{p.role}</h4>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span>{p.location}</span>
                                                <span>•</span>
                                                <span className="text-indigo-600 dark:text-indigo-400">{p.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                <div className="bg-white/90 dark:bg-[#0f111a]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-sm mx-auto">
                                    <Lock className="w-8 h-8 text-slate-900 dark:text-white mx-auto mb-4" />
                                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">
                                        Request access to view full profiles and make introductions.
                                    </p>
                                    <button
                                        onClick={handleRequestAccess}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-500/30"
                                    >
                                        Request Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: FORM - Real */}
                    {view === 'form' && (
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Recruiter Access</h3>
                            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                Verified founders, VCs, and Talent Partners only.
                            </p>

                            <form onSubmit={(e) => {
                                e.preventDefault()
                                setIsLoading(true)
                                const formData = new FormData(e.currentTarget)
                                const data = {
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    company: formData.get('company'),
                                    role: formData.get('role'), // This is TYPE (e.g. Founder)
                                    type: formData.get('text-role'), // This is specific title if needed, reusing 'role' field below for simplicity
                                    hiringFor: formData.get('hiring_for'),
                                    isConsented: formData.get('consent') === 'on'
                                }

                                fetch('/api/talent/submit', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        name: data.name,
                                        email: data.email,
                                        company: data.company,
                                        role: data.role, // "Type"
                                        type: "Talent Request",
                                        hiringFor: data.hiringFor,
                                        isConsented: data.isConsented
                                    })
                                }).then(res => {
                                    if (res.ok) setView('success')
                                    setIsLoading(false)
                                }).catch(() => setIsLoading(false))

                            }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
                                        <input name="name" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Work Email</label>
                                        <input name="email" type="email" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Company / Fund</label>
                                        <input name="company" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Role Type</label>
                                        <select name="role" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                                            <option>Founder Hiring</option>
                                            <option>VC / Talent Partner</option>
                                            <option>Internal Recruiter</option>
                                            <option>Agency / Headhunter</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">What are you looking to hire for?</label>
                                    <input name="hiring_for" required placeholder="e.g. Founding Engineer, VP Sales..." className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                                </div>

                                <div className="flex items-start gap-3 mt-2">
                                    <input name="consent" type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span className="text-xs text-slate-500">I understand access is reviewed manually and limited to active participants in the ecosystem.</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl hover:opacity-90 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Request'}
                                </button>
                                <p className="text-center text-[10px] text-slate-400 mt-2">
                                    We usually respond within a few days.
                                </p>
                            </form>
                        </div>
                    )}

                    {/* VIEW: SUCCESS */}
                    {view === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Received</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Thanks. Access requests are reviewed manually to maintain quality and trust.
                                <br /><span className="text-sm opacity-80 mt-1 block">You’ll hear back shortly.</span>
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
