"use client"

import { useState } from "react"
import { SideNav } from "@/components/side-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Users, Ticket, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "professional", label: "Professionals" },
  { id: "friday-night", label: "Friday Nights" },
  { id: "sports", label: "Sport Group" },
  { id: "alumni", label: "University Alumni" },
  { id: "bread", label: "Bread Making" },
]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: 'short' })
  }

  // Filter Logic (Mock logic)
  const filteredEvents = mockEvents.filter(event => {
    if (activeCategory === "all") return true
    // Mapping rudimentary mock data to categories for demo
    if (activeCategory === "professional") return event.title.includes("Tech") || event.title.includes("Networking")
    if (activeCategory === "friday-night") return event.title.includes("Shabbat") || event.title.includes("Dinner")
    if (activeCategory === "sports") return event.title.includes("Run") || event.title.includes("Yoga") || event.title.includes("Soccer")
    if (activeCategory === "alumni") return event.title.includes("Alumni") || event.title.includes("Technion") || event.title.includes("Tel Aviv")
    if (activeCategory === "bread") return event.title.includes("Challah") || event.title.includes("Baking") || event.title.includes("Bread")
    return true
  })

  return (
    <div className="relative min-h-screen w-full bg-slate-50">
      <SideNav />

      <div className="pt-24 pb-20 px-6 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <Badge variant="outline" className="mb-4 bg-white text-blue-600 border-blue-200">Community Gathering</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Events & Meetups
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              From professional networking to Friday night dinners and running groups.
              Find your tribe in the ecosystem.
            </p>
          </div>
          <Button className="bg-[#0a0a0f] text-white rounded-full px-6">
            Submit Event <Ticket className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Categories / Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty State Mockup */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No events found in this category</h3>
            <p className="text-slate-500">Be the first to create one!</p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image Placeholder or Gradient */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-200 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm border-0 font-bold">
                    {formatDate(event.date)}
                  </Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-auto">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    {event.attendees} going
                  </div>
                </div>

                <Button className="w-full mt-6 bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200 font-bold" asChild>
                  {event.title.includes("Shabbat") ? (
                    <a href="/events/shabbat">View Options</a>
                  ) : (
                    <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                      View Details
                    </a>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
