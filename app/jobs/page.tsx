"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MOCK_JOBS } from "@/lib/mock-jobs"
import { Search, MapPin, Briefcase, Filter, ArrowRight } from "lucide-react"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [locationFilter, setLocationFilter] = useState("All")

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = departmentFilter === "All" || job.department === departmentFilter
    const matchesLoc = locationFilter === "All" || job.location.includes(locationFilter)
    return matchesSearch && matchesDept && matchesLoc
  })

  // Unique departments for filter
  const departments = ["All", ...Array.from(new Set(MOCK_JOBS.map(j => j.department)))]
  const locations = ["All", ...Array.from(new Set(MOCK_JOBS.map(j => j.location)))]

  return (
    <main className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-200 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 mb-4">
            <Briefcase className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-600 dark:text-blue-300 tracking-wide uppercase">Live Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight text-slate-900 dark:text-white">Join the Network</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore {MOCK_JOBS.length}+ active roles across the Israeli Tech Ecosystem in Silicon Valley.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-20 z-30 backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles or companies..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full md:w-48 px-3 py-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc === "All" ? "Location" : loc}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 no-scrollbar border-t border-slate-100 dark:border-slate-800 pt-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider py-2 mr-2">Departments:</span>
            {departments.slice(0, 8).map(dept => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${departmentFilter === dept
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-[#0f172a]/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">Department</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">Location</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Posted</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                          {job.title}
                        </div>
                        <div className="md:hidden text-xs text-slate-500 mt-1">{job.company} • {job.location}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{job.company}</span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {job.department}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                          {job.location}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-sm text-slate-400 font-mono">
                        {job.postedDate}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-6 h-6 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No jobs found</h3>
                      <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Mockup */}
          <div className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a]/50 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
            <span>Showing {filteredJobs.length} of {MOCK_JOBS.length} jobs</span>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed bg-white dark:bg-slate-800">Previous</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 bg-white dark:bg-slate-800 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
