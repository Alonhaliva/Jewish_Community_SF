"use client"

import { useState, useEffect } from "react"
import type { Company } from "@/lib/mock-data"

interface MapViewProps {
  companies: Company[]
  highlightedIds?: string[]
  onCompanyClick?: (company: Company) => void
}

export function MapView({ companies, highlightedIds = [], onCompanyClick }: MapViewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    )
  }

  // Simple map visualization using coordinates
  // In production, this would use a library like Mapbox or Google Maps
  const minLat = Math.min(...companies.map((c) => c.lat))
  const maxLat = Math.max(...companies.map((c) => c.lat))
  const minLng = Math.min(...companies.map((c) => c.lng))
  const maxLng = Math.max(...companies.map((c) => c.lng))

  const normalize = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Map Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Company Markers */}
      {companies.map((company) => {
        const x = normalize(company.lng, minLng, maxLng)
        const y = 100 - normalize(company.lat, minLat, maxLat)
        const isHighlighted = highlightedIds.includes(company.id)

        return (
          <button
            key={company.id}
            onClick={() => onCompanyClick?.(company)}
            className={cn(
              "absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 transition-all hover:scale-125 hover:z-10",
              isHighlighted
                ? "bg-primary border-primary-foreground scale-125 z-10 shadow-lg"
                : "bg-primary/80 border-background shadow-md hover:shadow-lg",
            )}
            style={{ left: `${x}%`, top: `${y}%` }}
            title={company.name}
          >
            <span className="sr-only">{company.name}</span>
          </button>
        )
      })}

      {/* Map Labels */}
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border">
        {companies.length} companies
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
