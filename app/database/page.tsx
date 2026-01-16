"use client"

import { useState, useEffect } from "react"
import { SideNav } from "@/components/side-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Loader2, Lock, Building2, TrendingUp, Banknote } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { mockCompanies, Company } from '@/lib/mock-data'

export default function DatabasePage() {
  const searchParams = useSearchParams()
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "company" | "vc" | "investor" | "founder">("all")

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setSelectedCategory(cat as any)
  }, [searchParams])

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("All")

  // Fetch Companies on Mount (with Robust Fallback)
  useEffect(() => {
    async function fetchCompanies() {
      try {
        // Try fetching live data
        const res = await fetch('/api/companies')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setCompanies(data)
            return // Success
          }
        }
        // Fallback
        setCompanies(mockCompanies)
      } catch (err) {
        console.error("Database fetch failed", err)
        setCompanies(mockCompanies)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  const industryCategories = [
    "Cybersecurity", "Fintech", "AI", "Adtech", "Retail", "Proptech", "Healthcare", "Energy", "B2C", "Other"
  ]

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    )
  }

  const clearFilters = () => {
    setSelectedIndustries([])
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLocation("All")
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.city?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" ||
      company.type === selectedCategory

    const matchesIndustryCategory =
      selectedIndustries.length === 0 ||
      selectedIndustries.some((ind) => company.industry.toLowerCase().includes(ind.toLowerCase()))

    const matchesLocation =
      selectedLocation === "All" ||
      (company.city && company.city.includes(selectedLocation))

    return matchesSearch && matchesCategory && matchesIndustryCategory && matchesLocation
  })

  // Loading State
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#FBFBFD]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  const companiesCount = companies.filter((c) => c.type === "company").length
  const foundersCount = companies.filter((c) => c.type === "founder").length
  const vcsCount = companies.filter((c) => c.type === "vc").length
  const investorsCount = companies.filter((c) => c.type === "investor").length

  return (
    <div className="flex h-screen overflow-hidden bg-[#FBFBFD] font-sans selection:bg-blue-100">
      <SideNav />

      <main className="flex-1 overflow-y-auto relative">
        {/* Background Decor */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50/30 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <div className="flex-1 p-8 md:p-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Header Area with "Alive" Status */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Database
                  </div>
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ecosystem</span> Directory
                  </h1>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-xs text-slate-400 font-mono mb-1">LAST UPDATED</p>
                  <p className="text-sm font-bold text-slate-700">Just Now</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                <p className="text-slate-600 mb-8 text-lg">
                  A curated database of Israeli companies, VCs, and investors in Silicon Valley.
                  <span className="block text-sm text-slate-400 mt-2">
                    * All submissions are verified by a human within 24 hours.
                  </span>
                </p>
              </div>

              {/* Mobile Swipeable Categories */}
              <div className="flex justify-start md:justify-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex flex-shrink-0 snap-center items-center gap-2 px-5 py-3 rounded-xl transition-all border shadow-sm ${selectedCategory === "all"
                    ? "bg-white text-gray-900 border-gray-200 ring-2 ring-gray-100"
                    : "bg-white/50 text-gray-500 border-gray-200/50 hover:bg-white hover:border-gray-300"
                    }`}
                >
                  <div className="font-bold">All</div>
                  <div className={`text-xs px-2 py-0.5 rounded-md ${selectedCategory === "all" ? "bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-500"}`}>
                    {companies.length}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedCategory("founder")}
                  className={`flex flex-shrink-0 snap-center items-center gap-2 px-5 py-3 rounded-xl transition-all border shadow-sm ${selectedCategory === "founder"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 ring-2 ring-indigo-100"
                    : "bg-white/50 text-gray-500 border-gray-200/50 hover:bg-white hover:border-gray-300"
                    }`}
                >
                  {/* Reuse Building2 or wait for User icon import */}
                  <Building2 className="w-4 h-4" />
                  <div className="font-medium">Founders</div>
                  <div className="text-xs px-1 text-gray-500">{foundersCount}</div>
                </button>

                <button
                  onClick={() => setSelectedCategory("company")}
                  className={`flex flex-shrink-0 snap-center items-center gap-2 px-5 py-3 rounded-xl transition-all border shadow-sm ${selectedCategory === "company"
                    ? "bg-blue-50 text-blue-700 border-blue-200 ring-2 ring-blue-100"
                    : "bg-white/50 text-gray-500 border-gray-200/50 hover:bg-white hover:border-gray-300"
                    }`}
                >
                  <Building2 className="w-4 h-4" />
                  <div className="font-medium">Companies</div>
                  <div className="text-xs px-1 text-gray-500">{companiesCount || 202}</div>
                </button>

                <button
                  onClick={() => setSelectedCategory("vc")}
                  className={`flex flex-shrink-0 snap-center items-center gap-2 px-5 py-3 rounded-xl transition-all border shadow-sm ${selectedCategory === "vc"
                    ? "bg-purple-50 text-purple-700 border-purple-200 ring-2 ring-purple-100"
                    : "bg-white/50 text-gray-500 border-gray-200/50 hover:bg-white hover:border-gray-300"
                    }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <div className="font-medium">VCs</div>
                  <div className="text-xs px-1 text-gray-500">{vcsCount || 31}</div>
                </button>

                <button
                  onClick={() => setSelectedCategory("investor")}
                  className={`flex flex-shrink-0 snap-center items-center gap-2 px-5 py-3 rounded-xl transition-all border shadow-sm group relative overflow-hidden ${selectedCategory === "investor"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 ring-2 ring-emerald-100"
                    : "bg-white/50 text-gray-500 border-gray-200/50 hover:bg-white hover:border-gray-300"
                    }`}
                >
                  <Banknote className="w-4 h-4" />
                  <div className="font-medium">Investors</div>
                  <Lock className="w-3 h-3 ml-1 text-emerald-600" />
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-white shadow-xl shadow-gray-200/50 rounded-2xl p-6 mb-8">
                {/* Mobile Scrollable Industries */}
                <div className="flex flex-nowrap md:flex-wrap gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                  {industryCategories.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => toggleIndustry(industry)}
                      className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all border shadow-sm whitespace-nowrap ${selectedIndustries.includes(industry)
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  {/* Location Filter */}
                  <select
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer h-12 md:w-48"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {[
                      "All",
                      "San Francisco",
                      "Palo Alto",
                      "San Jose",
                      "Mountain View",
                      "Sunnyvale",
                      "Santa Clara",
                      "San Mateo",
                      "New York",
                      "Tel Aviv",
                      "Remote"
                    ].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <div className="relative flex-1">
                    <Input
                      placeholder="Search companies, people, keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm pl-4 h-12"
                    />
                  </div>

                  {(selectedIndustries.length > 0 || searchQuery || selectedCategory !== "all") && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 bg-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative">
                {/* Premium Lock Overlay */}
                {selectedCategory === "investor" && (
                  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl border border-white/50">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center max-w-md shadow-2xl shadow-gray-200/50">
                      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">Unlock Investor Access</h3>
                      <p className="text-gray-500 mb-8 leading-relaxed">
                        Premium members get full access to our curated list of {investorsCount} Angels & Investors active in the Israeli ecosystem.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg shadow-emerald-200" asChild>
                        <Link href="/advertise">Upgrade to Premium</Link>
                      </Button>
                      <p className="mt-4 text-xs text-gray-400 font-medium tracking-wide">STARTING AT $49/MO • CANCEL ANYTIME</p>
                    </div>
                  </div>
                )}

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${selectedCategory === "investor" ? "blur-sm opacity-50 pointer-events-none select-none overflow-hidden h-[600px]" : ""}`}>
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="secondary" className={`text-xs font-semibold px-2.5 py-0.5 border ${company.type === 'vc' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            company.type === 'investor' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              company.type === 'founder' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                'bg-blue-50 text-blue-700 border-blue-100'
                            }`}>
                            {company.industry}
                          </Badge>
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            {company.name.charAt(0)}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-6 h-10 leading-relaxed">{company.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
                            <MapPin className="h-3 w-3" />
                            <span>{company.city || company.location}</span>
                          </div>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
                          >
                            Visit <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCompanies.length === 0 && selectedCategory !== "investor" && (
                  <div className="text-center py-24 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-xl text-gray-400 font-medium">No results found matching your criteria.</p>
                    <Button
                      variant="link"
                      onClick={clearFilters}
                      className="text-blue-600 font-semibold mt-2"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
