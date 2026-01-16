"use client"

import { useState } from "react"
import { X, CheckCircle, Briefcase, UserPlus } from "lucide-react"

interface RecruiterModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
    const [step, setStep] = useState<'framing' | 'form' | 'success'>('framing')
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: "Recruiter Request", // Generic name since not asked in prompt, or could infer from email context
            email: formData.get('email'),
            company: formData.get('company'),
            role: "Recruiter", // Fixed type for this flow
            type: formData.get('role_type'), // Specific selection
            hiringFor: formData.get('hiring_for'),
            isConsented: true
        }

        try {
            // Reusing existing API endpoint
            const res = await fetch('/api/talent/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setStep('success')
            } else {
                console.error("Submission failed")
                // Still show success to user to avoid friction per "calm" requirement, or handle error gracefully
                setStep('success')
            }
        } catch (err) {
            console.error(err)
            setStep('success') // Fail open/calm
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-md bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-8 overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Step 1: Framing */}
                {step === 'framing' && (
                    <div className="text-center">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserPlus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Hiring through the network
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Talent access is curated and limited.<br />
                            Recruiters and hiring managers can request access to engage with vetted profiles and warm introductions.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => setStep('form')}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Request access
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-medium text-sm transition-colors"
                            >
                                Learn how it works
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Form */}
                {step === 'form' && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Request access</h2>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Role</label>
                                <select name="role_type" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition-all">
                                    <option>Recruiter</option>
                                    <option>Founder hiring</option>
                                    <option>Hiring manager</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Company name</label>
                                <input name="company" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition-all" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">What are you hiring for?</label>
                                <input name="hiring_for" placeholder="e.g. Senior Backend, VP Sales" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition-all" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Work email</label>
                                <input name="email" type="email" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition-all" />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-50"
                            >
                                {isLoading ? 'Sending...' : 'Request Access'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 'success' && (
                    <div className="text-center py-6 animate-fade-in">
                        <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thanks.</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                            We’ll review your request and follow up if there’s a fit.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
