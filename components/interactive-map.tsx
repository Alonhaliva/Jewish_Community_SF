"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import type { Company } from "@/lib/mock-data"

interface InteractiveMapProps {
  companies: Company[]
  filteredCompanies?: Company[]
}

export function InteractiveMap({ companies, filteredCompanies }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const companiesWithJitter = useMemo(() => {
    return companies.map((company) => ({
      ...company,
      jitterLat: company.lat + (Math.random() - 0.5) * 0.02,
      jitterLng: company.lng + (Math.random() - 0.5) * 0.02,
    }))
  }, [companies])

  useEffect(() => {
    setLastUpdate(new Date())

    if (typeof window === "undefined" || !mapRef.current) return

    const container = mapRef.current

    import("leaflet").then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      const californiaBounds: L.LatLngBoundsExpression = [
        [32.5, -124.5], // Southwest corner
        [42.0, -114.0], // Northeast corner
      ]

      const map = L.map(container, {
        center: [37.6, -122.2],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
        maxBounds: californiaBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 7,
        maxZoom: 18,
      })
      mapInstanceRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        detectRetina: true,
      }).addTo(map)

      // Add Custom Large City Labels
      const majorCities = [
        { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
        { name: "San Mateo", lat: 37.5630, lng: -122.3255 },
        { name: "Redwood City", lat: 37.4852, lng: -122.2364 },
        { name: "Palo Alto", lat: 37.4419, lng: -122.1430 },
        { name: "Mountain View", lat: 37.3861, lng: -122.0839 },
        { name: "Sunnyvale", lat: 37.3688, lng: -122.0363 },
        { name: "San Jose", lat: 37.3382, lng: -121.8863 },
      ]

      majorCities.forEach(city => {
        L.marker([city.lat, city.lng], {
          icon: L.divIcon({
            className: 'map-city-label',
            html: `<span>${city.name}</span>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10] // Center
          }),
          interactive: false
        }).addTo(map)
      })

      const displayCompanies = filteredCompanies
        ? companiesWithJitter.filter((c) => filteredCompanies.some((fc) => fc.name === c.name))
        : companiesWithJitter

      displayCompanies.forEach((company, index) => {
        let color = "#3B82F6" // Blue for companies
        let gradientColor = "#60A5FA"

        if (company.type === "vc") {
          color = "#FF6B6B" // Coral for VCs
          gradientColor = "#F97316"
        } else if (company.type === "investor") {
          color = "#8B5CF6" // Purple for investors
          gradientColor = "#A78BFA"
        }

        const markerIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <style>
              @keyframes pulse-pin {
                0%, 100% {
                  transform: translateX(-50%) rotate(-45deg) scale(1);
                  opacity: 1;
                }
                50% {
                  transform: translateX(-50%) rotate(-45deg) scale(1.05);
                  opacity: 0.95;
                }
              }
            </style>
            <div style="
              position: relative;
              width: 48px;
              height: 48px;
              cursor: pointer;
              transform: translateY(-50%);
              z-index: ${1000 + index};
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 50%;
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, ${color}, ${gradientColor});
                border-radius: 50% 50% 50% 0;
                transform: translateX(-50%) rotate(-45deg);
                border: 4px solid white;
                box-shadow: 0 8px 20px rgba(0,0,0,0.25), 0 0 0 2px ${color}30;
                animation: pulse-pin 3s ease-in-out infinite;
              "></div>
              <div style="
                position: absolute;
                top: 6px;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: ${color};
                font-size: 12px;
                z-index: 1;
              ">
                ${company.type === "vc" ? "💼" : company.type === "investor" ? "💰" : "🏢"}
              </div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 48],
        })

        const marker = L.marker([company.jitterLat, company.jitterLng], { icon: markerIcon }).addTo(map)

        marker.bindPopup(`
          <div style="min-width: 260px; font-family: 'Inter', system-ui, sans-serif; padding: 4px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
               <div style="
                  width: 40px; height: 40px; 
                  background: ${color}; 
                  border-radius: 50%; 
                  display: flex; align-items: center; justify-content: center; 
                  color: white; font-size: 18px;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
               ">
                  ${company.type === "vc" ? "💼" : company.type === "investor" ? "💰" : "🏢"}
               </div>
               <div>
                  <h3 style="font-weight: 800; font-size: 16px; margin: 0; color: #0F172A; line-height: 1.2;">${company.name}</h3>
                  <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">${company.industry}</span>
               </div>
            </div>
            
            <div style="background: #F8FAFC; border-radius: 8px; padding: 12px; margin-bottom: 12px; border: 1px solid #E2E8F0;">
               <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                  <span style="color: #64748B;">Location</span>
                  <span style="font-weight: 600; color: #0F172A;">${company.city}</span>
               </div>
               <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: ${company.valuation ? '6px' : '0'};">
                  <span style="color: #64748B;">Employees</span>
                  <span style="font-weight: 600; color: #0F172A;">${company.employees.toLocaleString()}</span>
               </div>
               ${company.valuation ? `
               <div style="display: flex; justify-content: space-between; font-size: 13px;">
                  <span style="color: #64748B;">Valuation</span>
                  <span style="font-weight: 600; color: #0F172A;">${company.valuation}</span>
               </div>` : ""}
            </div>
          
            <a href="${company.linkedin}" target="_blank" style="
              display: flex; align-items: center; justify-content: center; width: 100%;
              padding: 10px 0;
              background: #0F172A;
              color: white;
              font-weight: 600;
              text-decoration: none;
              border-radius: 8px;
              font-size: 13px;
              transition: background 0.2s;
            ">View on LinkedIn →</a>
          </div>
        `)
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [companiesWithJitter, filteredCompanies])

  const displayCompanies = filteredCompanies || companies
  const companiesCount = displayCompanies.filter((c) => c.type === "company").length
  const vcsCount = displayCompanies.filter((c) => c.type === "vc").length
  const investorsCount = displayCompanies.filter((c) => c.type === "investor").length
  const totalCount = displayCompanies.length

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Visual Integration - Gradients */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-zinc-50 to-transparent z-[400] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent z-[400] pointer-events-none" />

      {/* Live Ecosystem Map info box */}
      <div className="absolute top-24 left-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 p-3 max-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-xs font-semibold text-green-600">LIVE</span>
          </div>

          <h2 className="text-sm font-bold text-gray-900 mb-1">Ecosystem Map</h2>

          <p className="text-gray-600 text-xs mb-2 leading-snug">{totalCount} entities</p>

          <div className="space-y-1 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">🏢 Companies</span>
              <span className="font-bold text-teal-600">{companiesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">💼 VCs</span>
              <span className="font-bold text-purple-600">{vcsCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">💰 Investors</span>
              <span className="font-bold text-emerald-600">{investorsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-gray-200 p-3 max-w-[160px]">
          <h3 className="text-xs font-bold text-gray-900 mb-2">Legend</h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-5 h-5 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-[10px]">📍</span>
            </div>
            <span className="text-gray-700">Entities</span>
          </div>
        </div>
      </div>
    </>
  )
}
