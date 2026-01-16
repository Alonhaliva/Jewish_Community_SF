"use client"
import { Mountain, UtensilsCrossed, Dumbbell, Users, Spade } from "lucide-react"
import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export default function BlogPage() {
  const sections = [
    {
      id: "hikes",
      title: "15 of the Best Hikes in the Bay Area",
      description:
        "From coastal cliffs to towering redwoods, discover the most stunning trails in Northern California.",
      icon: Mountain,
      href: "/blog/hikes",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "food",
      title: "Best Jewish Food in the Bay Area",
      description: "Your complete guide to authentic Jewish delis, bakeries, and restaurants across the Bay.",
      icon: UtensilsCrossed,
      href: "/blog/jewish-food",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "soccer",
      title: "Pickup Soccer in Palo Alto",
      description: "Join the local Israeli tech community for weekly pickup soccer games in Palo Alto.",
      icon: Dumbbell,
      href: "/blog/pickup-soccer",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "running",
      title: "Running Clubs in South Bay",
      description: "Connect with fellow runners and explore scenic routes across the South Bay.",
      icon: Users,
      href: "/blog/running-club",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "poker",
      title: "Poker Clubs in the Bay Area",
      description: "Find friendly poker games and clubs to meet other Israeli entrepreneurs and tech professionals.",
      icon: Spade,
      href: "/blog/poker-club",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
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
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#FAF7F0] to-[#F5F1E8] pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Community Resources</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Everything you need to thrive in the Bay Area - from outdoor adventures to social clubs and local
              favorites.
            </p>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`${section.bgColor} border-2 ${section.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all group`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{section.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Explore →
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
