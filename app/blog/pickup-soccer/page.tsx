"use client"
import { MapPin, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export default function PickupSoccerPage() {
  const handleJoinGroup = () => {
    const subject = encodeURIComponent("Join Pickup Soccer - Palo Alto")
    const body = encodeURIComponent(`Hi,

I would like to join the Pickup Soccer group in Palo Alto.

My details:
Gender: [Please specify]
Age: [Please specify]
Skill Level: [Beginner/Intermediate/Advanced]

Looking forward to playing!

Best regards`)

    window.location.href = `mailto:israelitechglobal@gmail.com?subject=${subject}&body=${body}`
  }

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
        <div className="max-w-5xl mx-auto px-6 pt-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to Community Resources
          </Link>
        </div>

        <div className="bg-gradient-to-b from-[#FAF7F0] to-[#F5F1E8] pt-12 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Pickup Soccer in Palo Alto</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Join the local Israeli tech community for weekly pickup soccer games in Palo Alto.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Weekly Pickup Games</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">When</h3>
                  <p className="text-gray-700">Palo Alto 8:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Where</h3>
                  <p className="text-gray-700">Palo Alto</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Duration</h3>
                  <p className="text-gray-700">2 hours (casual games)</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              All skill levels welcome! Join Israeli founders, engineers, and tech professionals for friendly pickup
              soccer. Great way to stay active and meet people in the community.
            </p>
            <button
              onClick={handleJoinGroup}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Join the Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
