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

      {/* 2. Simple Categories (Replaces Decision Block) */}
      <div className="container mx-auto px-6 -mt-10 relative z-20 mb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <a href="/database?category=founder" className="bg-white dark:bg-[#13141f] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 text-center group">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Families</h3>
            <p className="text-sm text-slate-500 dark:text-slate-500">Find schools, parks, and family-friendly events.</p>
          </a>

          {/* Card 2 */}
          <a href="/database?category=company" className="bg-white dark:bg-[#13141f] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 text-center group">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
              <span className="text-2xl">🥂</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Young Pros</h3>
            <p className="text-sm text-slate-500 dark:text-slate-500">Networking, happy hours, and social gatherings.</p>
          </a>

          {/* Card 3 */}
          <a href="/database?category=investor" className="bg-white dark:bg-[#13141f] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 text-center group">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
              <span className="text-2xl">🕍</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Community</h3>
            <p className="text-sm text-slate-500 dark:text-slate-500">Synagogues, JCCs, and support organizations.</p>
          </a>
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
      <section className="py-24 relative bg-zinc-50 dark:bg-[#0a0a0f]">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-slate-900 dark:text-slate-100">
            Stronger Together.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            We are dedicated to bringing together the Jewish community in the Bay Area. <br />
            Whether you're looking for a Shabbat dinner, a playdate for your kids, or just a friendly face, you'll find it here.
          </p>

          <a href="/about" className="inline-block px-8 py-3 bg-white border border-slate-200 rounded-full font-medium text-slate-900 hover:bg-slate-50 transition-colors shadow-sm">
            About Us
          </a>
        </div>
      </section>

      {/* 7. Community CTA (Emotional Anchor) */}
      <section className="py-24 relative border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-[#050508]">
        <div className="container mx-auto px-6 text-center relative z-10">

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 font-serif">
            Join the Community
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Be part of a thriving Jewish community in San Francisco.
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
