"use client"

import { useState } from "react"
import { Search, X, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Company } from "@/lib/mock-data"

interface SearchOverlayProps {
  companies: Company[]
  onSearch: (results: Company[], query: string) => void
}

const industrySynonyms: Record<string, string[]> = {
  ai: ["artificial intelligence", "machine learning", "ml", "data", "genai", "ai/ml", "ai"],
  climate: ["climate tech", "climate", "energy", "sustainability", "cleantech", "renewable"],
  cyber: ["cybersecurity", "security", "infosec", "cyber"],
  fintech: ["fintech", "financial", "finance", "payments", "banking", "payoneer"],
  insurtech: ["insurtech", "insurance", "lemonade", "hippo"],
  adtech: ["ad tech", "adtech", "advertising", "marketing", "taboola"],
  productivity: ["productivity", "work", "collaboration", "monday"],
}

function normalizeQuery(query: string): string[] {
  const lowerQuery = query.toLowerCase().trim()

  for (const [key, synonyms] of Object.entries(industrySynonyms)) {
    for (const synonym of synonyms) {
      if (lowerQuery.includes(synonym)) {
        return synonyms
      }
    }
  }

  return [lowerQuery]
}

export function SearchOverlay({ companies, onSearch }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchResults, setSearchResults] = useState<Company[]>([])

  const handleSearch = (value: string) => {
    setQuery(value)

    if (!value.trim()) {
      onSearch([], "")
      setSearchResults([])
      setIsExpanded(false)
      return
    }

    setIsExpanded(true)

    const normalizedQueries = normalizeQuery(value)
    const results = companies.filter((company) => {
      const companyText = `${company.name} ${company.industry} ${company.location} ${company.description}`.toLowerCase()
      return normalizedQueries.some((normalized) => companyText.includes(normalized))
    })

    onSearch(results, value)
    setSearchResults(results)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search companies, VCs, investors..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => query && setIsExpanded(true)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm bg-transparent h-8"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setQuery("")
                handleSearch("")
              }}
              className="flex-shrink-0 h-8 w-8"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {isExpanded && query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
            {searchResults.length > 0 ? (
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2">
                  Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
                </div>
                {searchResults.map((company) => (
                  <Link
                    key={company.id}
                    href={`/companies/${company.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsExpanded(false)
                      setQuery("")
                    }}
                  >
                    <Building2 className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{company.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {company.industry} • {company.location}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{company.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-gray-500">No results found for "{query}"</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
