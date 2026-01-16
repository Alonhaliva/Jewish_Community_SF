"use client"

import { useState, useEffect } from "react"
import { X, ShieldCheck, Briefcase, Users, Search } from "lucide-react"

interface OnboardingOverlayProps {
    onRecruiterSelect?: () => void
}

export function OnboardingOverlay({ onRecruiterSelect }: OnboardingOverlayProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [step, setStep] = useState(1)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        // Check if seen before (v2 for new flow)
        const hasSeenOnboarding = localStorage.getItem("isv_onboarding_seen_v2")
        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleDismiss = () => {
        setIsClosing(true)
        setTimeout(() => setIsVisible(false), 300) // Allow animation to finish
        localStorage.setItem("isv_onboarding_seen_v2", "true")
    }

    const handleSelection = (role: string) => {
        localStorage.setItem("isv_user_role", role)
        handleDismiss()

        // Optional: Trigger a custom event for immediate UI reaction if needed
        window.dispatchEvent(new Event("storage"))
    }

    if (!isVisible) return null

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {/* Backdrop - blurred but allows peeking (marketing choice) */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleDismiss}></div>

            <div className={`w-full max-w-md bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-8 relative overflow-hidden transform transition-all duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}>

                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 ? (
                    <div className="animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-3">
                            Welcome to a curated<br />Silicon Valley network
                        </h2>

                        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            This is not a public directory.<br />
                            It’s a relationship-driven ecosystem connecting founders, operators, investors, and talent through relevance and trust.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Continue
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="w-full py-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-medium text-sm transition-colors"
                            >
                                Explore without onboarding
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
                            What brings you here?
                        </h2>
                        <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">
                            We'll customize your experience based on your role.
                        </p>

                        <div className="grid gap-3">
                            <button
                                onClick={() => handleSelection('founder')}
                                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group text-left"
                            >
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                    <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-900 dark:text-white">Founder / Operator</span>
                                    <span className="text-xs text-slate-500">Looking for capital or talent</span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleSelection('investor')}
                                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all group text-left"
                            >
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors role-icon">
                                    <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-900 dark:text-white">Investor</span>
                                    <span className="text-xs text-slate-500">Scouting deal flow</span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleSelection('recruiter')}
                                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group text-left"
                            >
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                                    <Users className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-900 dark:text-white">Recruiter / Hiring</span>
                                    <span className="text-xs text-slate-500">Finding top talent</span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleSelection('exploring')}
                                className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group text-left"
                            >
                                <div className="p-2">
                                    <Search className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="font-medium text-slate-600 dark:text-slate-400">Just exploring</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
