"use client"
import { SideNav } from "@/components/side-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCompanies } from "@/lib/mock-data"
import { ExternalLink, Building2, TrendingUp, Users, Banknote } from "lucide-react"
import { useState } from "react"

export default function CompaniesPage() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("All")
  const [entityType, setEntityType] = useState<"all" | "company" | "investor" | "vc">("all")

  const cities = ["All", ...Array.from(new Set(mockCompanies.map((c) => c.city))).sort()]

  const featuredCompanies = mockCompanies.filter((c) => c.isFeatured && c.type === "company")

  const filtered = mockCompanies.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
    const matchesCity = city === "All" || c.city === city
    const matchesType = entityType === "all" || c.type === entityType
    return matchesQuery && matchesCity && matchesType
  })

  const stats = {
    companies: mockCompanies.filter((c) => c.type === "company").length,
    investors: mockCompanies.filter((c) => c.type === "investor").length,
    vcs: mockCompanies.filter((c) => c.type === "vc").length,
    totalJobs: mockCompanies
      .filter((c) => c.type === "company" && c.jobsCreated)
      .reduce((sum, c) => sum + Number.parseInt(c.jobsCreated?.replace(/,/g, "") || "0"), 0),
  }

  const getTypeIcon = (type: string) => {
    if (type === "vc") return <TrendingUp className="h-4 w-4" />
    if (type === "investor") return <Banknote className="h-4 w-4" />
    return <Building2 className="h-4 w-4" />
  }

  const getTypeBadgeColor = (type: string) => {
    if (type === "vc") return "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
    if (type === "investor") return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0"
    return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0"
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient">Israeli Ecosystem in Silicon Valley</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Companies, investors, and VCs with Israeli connections in California
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 text-sm text-blue-700 mb-2 font-medium">
                  <Building2 className="h-5 w-5" />
                  Companies
                </div>
                <div className="text-3xl font-bold text-blue-600">{stats.companies}</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 text-sm text-purple-700 mb-2 font-medium">
                  <TrendingUp className="h-5 w-5" />
                  VCs
                </div>
                <div className="text-3xl font-bold text-purple-600">{stats.vcs}</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 text-sm text-emerald-700 mb-2 font-medium">
                  <Banknote className="h-5 w-5" />
                  Investors
                </div>
                <div className="text-3xl font-bold text-emerald-600">{stats.investors}</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-2 text-sm text-amber-700 mb-2 font-medium">
                  <Users className="h-5 w-5" />
                  Jobs Created
                </div>
                <div className="text-3xl font-bold text-amber-600">{stats.totalJobs.toLocaleString()}</div>
              </Card>
            </div>
          </div>

          {/* Featured Companies */}
          {featuredCompanies.length > 0 && (
            <Card className="rounded-2xl shadow-lg mb-12 p-8 bg-gradient-to-br from-white to-blue-50 border-blue-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-900">
                <Building2 className="h-6 w-6" />
                Featured Companies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCompanies.map((company) => (
                  <a
                    key={company.id}
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="flex items-center justify-between bg-white border-2 border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-blue-300 hover:scale-105">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-3 text-blue-900">{company.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">{company.city}</Badge>
                          <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                            {company.valuation}
                          </Badge>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-600 ml-4 transition" />
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}

          <div className="flex gap-2 mb-4 flex-wrap">
            <Button
              variant={entityType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("all")}
            >
              All
            </Button>
            <Button
              variant={entityType === "company" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("company")}
              className="gap-2"
            >
              <Building2 className="h-4 w-4" />
              Companies
            </Button>
            <Button
              variant={entityType === "vc" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("vc")}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              VCs
            </Button>
            <Button
              variant={entityType === "investor" ? "default" : "outline"}
              size="sm"
              onClick={() => setEntityType("investor")}
              className="gap-2"
            >
              <Banknote className="h-4 w-4" />
              Investors
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2 flex-wrap">
              {cities.slice(0, 6).map((c) => (
                <Button key={c} variant={city === c ? "default" : "outline"} size="sm" onClick={() => setCity(c)}>
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entity) => (
              <a key={entity.id} href={entity.linkedin} target="_blank" rel="noopener noreferrer" className="group">
                <div className="flex items-start justify-between bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-primary hover:scale-105">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {getTypeIcon(entity.type)}
                      <h3 className="font-bold text-lg">{entity.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{entity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`text-xs font-semibold ${getTypeBadgeColor(entity.type)}`}>
                        {entity.type.toUpperCase()}
                      </Badge>
                      <Badge className="text-xs bg-slate-100 text-slate-700">{entity.city}</Badge>
                      {entity.type === "company" && entity.employees && (
                        <Badge className="text-xs bg-indigo-100 text-indigo-700">
                          {entity.employees.toLocaleString()} employees
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary ml-4 flex-shrink-0 transition" />
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
