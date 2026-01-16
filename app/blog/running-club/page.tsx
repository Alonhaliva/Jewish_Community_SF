"use client"
import { MapPin, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export default function RunningClubPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Running Clubs in South Bay</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Connect with fellow runners and explore scenic routes across the South Bay.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Weekly Group Runs</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">When</h3>
                  <p className="text-gray-700">Wednesdays at 6:30 PM & Saturdays at 7:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Where</h3>
                  <p className="text-gray-700">Various trails - Mountain View, Los Altos, Palo Alto</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Pace</h3>
                  <p className="text-gray-700">Multiple pace groups (8:00-11:00 min/mile)</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Join Israeli tech professionals for group runs through scenic Bay Area trails. All fitness levels welcome!
              Great networking opportunity and way to stay healthy.
            </p>
            <a
              href="/community"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Join the Club
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
