"use client"

import { useState, useEffect } from "react"
import { SideNav } from "@/components/side-nav"
import { InteractiveMap } from "@/components/interactive-map"
import { mockCompanies, type Company } from "@/lib/mock-data"
import { HeroNetwork } from "@/components/hero-network"
import { DiscoveryFeed } from "@/components/discovery-feed"
import { NewsSection } from "@/components/news-section"
import { CommunityEventsSection } from "@/components/community-events-section"
import { ArrowUpRight, Zap, Globe, Share2, Lock } from "lucide-react"
import { OnboardingOverlay } from "@/components/onboarding-overlay"
import { TalentNetworkLayer } from "@/components/talent-network-layer"
import { RecruiterModal } from "@/components/recruiter-modal"

export default function HomePage() {
  const [filteredCompanies, setFilteredCompanies] = useState<Company[] | undefined>(undefined)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false)

  useEffect(() => {
    // Listen for role changes (from modal)
    const checkRole = () => {
      const role = localStorage.getItem("isv_user_role")
      setUserRole(role)
    }
    checkRole()
    window.addEventListener("storage", checkRole)
    return () => window.removeEventListener("storage", checkRole)
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30 transition-colors duration-500">


      {/* 1. Hero Section (100vh) */}
      <HeroNetwork />

      {/* 1.5 Decision Block (High Signal) */}
      <div className="relative z-10 -mt-10 mb-24 container mx-auto px-6 animate-fade-in-up delay-700">
        <div className="bg-white dark:bg-[#13141f] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl max-w-4xl mx-auto text-center transform hover:-translate-y-1 transition-transform duration-500">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">What are you looking for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/database?category=founder" className={`group flex items-center justify-center gap-2 px-6 py-4 rounded-xl border transition-all ${userRole === 'founder' ? 'border-blue-500 ring-1 ring-blue-500/50 bg-blue-50/50' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'} hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10`}>
              <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Families</span>
            </a>
            <a href="/database?category=company" className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all">
              <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">Young Professionals</span>
            </a>
            <a href="/database?category=investor" className={`group flex items-center justify-center gap-2 px-6 py-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${userRole === 'investor' ? 'border-amber-400 ring-1 ring-amber-400/50 bg-amber-50' : 'border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-900/10'} hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20`}>
              <span className="font-bold text-amber-900 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 flex items-center gap-2">
                Organizations <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 opacity-100" />
              </span>
            </a>
          </div>
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 max-w-lg mx-auto">
            Explore the various groups and communities available.
          </p>
        </div>
      </div>

      {/* 2. The Map Experience (Core) - MOVED UP */}
      <div className="relative z-10 pt-24 pb-24 flex flex-col items-center bg-zinc-50 dark:bg-[#0a0a0f]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 mb-6 shadow-sm">
          <Globe className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 tracking-wider">COMMUNITY MAP</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 text-center tracking-tight">
          Explore the Community
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl text-center px-6 leading-relaxed">
          Navigate the vibrant Jewish community in the Bay Area.
          <span className="block mt-2 text-slate-500 text-base">Zoom in to see synagogues, JCCs, and schools.</span>
        </p>
      </div>

      <section id="map-section" className="relative h-[65vh] md:h-[90vh] w-full border-t border-b border-slate-200 dark:border-slate-800/50 bg-zinc-50 dark:bg-[#0a0a0f]">
        <InteractiveMap companies={mockCompanies} filteredCompanies={filteredCompanies} />
      </section>

      {/* 3. Discovery Feed (What's Happening) */}
      <div className="pt-12 pb-32 bg-zinc-50 dark:bg-[#0a0a0f] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 mix-blend-multiply dark:mix-blend-normal opacity-50"></div>

        <DiscoveryFeed />
        <TalentNetworkLayer />
      </div>

      {/* 4. News (Formerly Momentum & Reads) */}
      <div className="relative z-10 border-b border-slate-200 dark:border-slate-800/50 bg-zinc-50 dark:bg-[#0a0a0f]">
        <NewsSection />
      </div>

      {/* 5. Community & Events */}
      <div className="border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-[#0c0c12]">
        <CommunityEventsSection />
      </div>

      {/* 6. Mission / Story (Why This Exists) */}
      <section className="py-32 relative overflow-hidden bg-zinc-50 dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/10 rotate-3 scale-110 blur-3xl rounded-full opacity-40 dark:opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest mb-8">Our Mission</h2>
          <p className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-8 text-slate-900 dark:text-slate-200">
            A strong community is built on <span className="text-slate-900 dark:text-white font-bold">connections</span>.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            We are dedicated to bringing together the Jewish community in the Bay Area through events, resources, and shared values.
          </p>

          <a href="/about" className="inline-flex items-center gap-2 text-lg font-bold border-b border-slate-300 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors pb-1">
            Read the Manifesto <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Trust & Quality / How It Works - Subtle Grid */}
        <div className="container mx-auto px-6 max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative z-10">
          {/* How It Works */}
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-800/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 tracking-tight">How it works</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-sm font-mono text-slate-400 dark:text-slate-600">01</span>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Find your community</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-mono text-slate-400 dark:text-slate-600">02</span>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Connect with others</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-mono text-slate-400 dark:text-slate-600">03</span>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Attend local events</p>
              </div>
            </div>
          </div>

          {/* Trust & Quality */}
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-800/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Trust & Quality</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Verified community members</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Trusted organizations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Safe and inclusive environment</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500 italic">
              Supported by local leaders and community members.
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community CTA (Emotional Anchor) */}
      <section className="py-40 relative border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-[#050508]">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">500+ Active Members</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter">
            Join a network built on<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-600">real connections.</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            For everyone who wants to be part of a thriving Jewish community.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://chat.whatsapp.com/GocVt0aU0bGAgYSfQyQHiJ"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-indigo-700 hover:scale-105 shadow-xl shadow-indigo-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">Request Access <Zap className="w-5 h-5 fill-current" /></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <button className="flex items-center gap-2 px-6 py-4 text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-white transition-colors">
              <Share2 className="w-5 h-5" /> Share this Map
            </button>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 max-w-lg mx-auto">
            Join the community today.
          </p>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-900 bg-zinc-50 dark:bg-[#0a0a0f] text-slate-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start opacity-80">
            <span className="text-slate-900 dark:text-slate-200 font-bold text-lg mb-1 tracking-tight">Jewish Community SF</span>
            <p>Connecting the Jewish community in the Bay Area.</p>
          </div>

          <div className="flex gap-8 opacity-80">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Instagram</a>
            <a href="mailto:contact@jewishsf.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
          </div>

          <div className="text-right opacity-60">
            <p>© 2025 Jewish Community SF</p>
            <div className="flex items-center gap-2 mt-2 justify-end">
              <span className="w-1.5 h-1.5 bg-green-50 rounded-full"></span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
      <OnboardingOverlay onRecruiterSelect={() => setIsRecruiterModalOpen(true)} />
      <RecruiterModal isOpen={isRecruiterModalOpen} onClose={() => setIsRecruiterModalOpen(false)} />

    </div>
  )
}
