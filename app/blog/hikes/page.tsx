"use client"
import { MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export default function HikesPage() {
  const hikes = [
    {
      id: 1,
      title: "Lands End Trail",
      location: "San Francisco, CA",
      distance: "4 miles",
      difficulty: "Easy",
      description:
        "Rugged coastal paths featuring historic ruins and stunning Golden Gate Bridge views from unique angles. Walk along dramatic cliffs overlooking the Pacific Ocean.",
      image: "/lands-end-san-francisco-golden-gate.jpg",
      category: "Coastal Views",
    },
    {
      id: 2,
      title: "Mount Tamalpais",
      location: "Marin County, CA",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Diverse hiking options from the strenuous Dipsea Trail to the panoramic Verna Dunshee Loop around the summit. Breathtaking 360-degree views of the Bay Area.",
      image: "/mount-tamalpais-marin-county.jpg",
      category: "Mountain Views",
    },
    {
      id: 3,
      title: "Muir Woods",
      location: "Mill Valley, CA",
      distance: "2 miles",
      difficulty: "Easy",
      description:
        "Immersive, easy walks among towering redwood giants on the peaceful Redwood Creek Trail. Experience ancient forests just minutes from the city.",
      image: "/muir-woods-redwood-forest.jpg",
      category: "Redwood Forests",
    },
    {
      id: 4,
      title: "Point Reyes National Seashore",
      location: "Point Reyes Station, CA",
      distance: "8.5 miles",
      difficulty: "Moderate",
      description:
        "Trek to Alamere Falls, a rare 'tidefall' that flows directly onto the beach. Dramatic coastal cliffs and pristine wilderness.",
      image: "/alamere-falls-point-reyes.jpg",
      category: "Waterfalls",
    },
    {
      id: 5,
      title: "Mission Peak",
      location: "Fremont, CA",
      distance: "6 miles",
      difficulty: "Hard",
      description:
        "A challenging climb rewarded with breathtaking 360-degree views of the entire Bay Area from the iconic summit pole.",
      image: "/mission-peak-fremont-pole.jpg",
      category: "Summit Hikes",
    },
    {
      id: 6,
      title: "Castle Rock State Park",
      location: "Los Gatos, CA",
      distance: "5.5 miles",
      difficulty: "Moderate",
      description:
        "Unique sandstone rock formations and spectacular ridgetop views. Perfect for rock climbing and hiking enthusiasts.",
      image: "/castle-rock-state-park-sandstone.jpg",
      category: "Rock Formations",
    },
  ]

  return (
    <div
      className="relative min-h-screen w-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at top right, hsla(221, 83%, 53%, 0.15), transparent 50%), radial-gradient(circle at bottom left, hsla(262, 83%, 58%, 0.1), transparent 50%), linear-gradient(to bottom, transparent, #f8fafc)`,
      }}
    >
      <SideNav />

      <div
        className="absolute inset-0 left-0 overflow-auto pt-20"
        style={{
          background: `radial-gradient(circle at top right, hsla(221, 83%, 53%, 0.15), transparent 50%), radial-gradient(circle at bottom left, hsla(262, 83%, 58%, 0.1), transparent 50%), linear-gradient(to bottom, transparent, #f8fafc)`,
        }}
      >
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-6 pt-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to Community Resources
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#FAF7F0] to-[#F5F1E8] pt-12 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">15 of the Best Hikes in the Bay Area</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              From coastal cliffs to towering redwoods, discover the most stunning trails in San Francisco and Silicon
              Valley. Your complete guide to outdoor adventures in Northern California.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated January 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bay Area, California</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-gray-700 leading-relaxed text-lg">
              The San Francisco Bay Area is home to some of the most diverse and stunning hiking in the world. Within
              just a short drive from Silicon Valley, you can explore dramatic coastal cliffs, ancient redwood forests,
              panoramic mountain summits, and hidden waterfalls.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              Whether you're a tech professional looking for a weekend escape or a visiting founder exploring the area,
              this guide covers the absolute best hikes from San Francisco to the South Bay and beyond.
            </p>
          </div>

          {/* Hikes Grid */}
          <div className="space-y-12">
            {hikes.map((hike, idx) => (
              <article
                key={hike.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto">
                    <Image src={hike.image || "/placeholder.svg"} alt={hike.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {hike.category}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-8">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-3xl font-bold text-gray-900">{hike.title}</h2>
                      <span className="text-4xl font-bold text-blue-600/20">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hike.location}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{hike.distance}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span
                        className={`font-medium ${
                          hike.difficulty === "Easy"
                            ? "text-green-600"
                            : hike.difficulty === "Moderate"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {hike.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">{hike.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
