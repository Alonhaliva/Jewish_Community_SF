"use client"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export default function JewishFoodPage() {
  const restaurants = [
    {
      id: 1,
      name: "Wise Sons Jewish Delicatessen",
      location: "San Francisco & Palo Alto",
      cuisine: "Deli",
      rating: 4.5,
      description: "Authentic Jewish deli with house-made pastrami, latkes, and the best matzo ball soup in the Bay.",
      image: "/jewish-deli.jpg",
      kosher: false,
    },
    {
      id: 2,
      name: "Saul's Restaurant & Delicatessen",
      location: "Berkeley, CA",
      cuisine: "Deli",
      rating: 4.3,
      description:
        "Classic Jewish deli serving traditional favorites since 1986. Known for their corned beef and knishes.",
      image: "/deli-restaurant.jpg",
      kosher: false,
    },
    {
      id: 3,
      name: "Beged's Glory",
      location: "Palo Alto, CA",
      cuisine: "Bakery",
      rating: 4.7,
      description: "Israeli bakery with fresh challah, bourekas, and authentic Middle Eastern pastries.",
      image: "/jewish-bakery.jpg",
      kosher: true,
    },
    {
      id: 4,
      name: "Hummus Bodega",
      location: "Palo Alto, CA",
      cuisine: "Israeli",
      rating: 4.6,
      description:
        "Authentic Israeli hummus bar with fresh pitas, falafel, and Mediterranean salads. A favorite among the Israeli tech community.",
      image: "/hummus-restaurant.jpg",
      kosher: false,
    },
    {
      id: 5,
      name: "Oren's Hummus",
      location: "Mountain View & Palo Alto",
      cuisine: "Israeli",
      rating: 4.5,
      description:
        "The best hummus in the Bay Area. Traditional Israeli street food with shawarma, sabich, and freshly made hummus daily.",
      image: "/israeli-hummus-shop.jpg",
      kosher: false,
    },
    {
      id: 6,
      name: "Eyoni Shawarma",
      location: "San Francisco, CA",
      cuisine: "Israeli",
      rating: 4.4,
      description:
        "Authentic Israeli shawarma with perfectly spiced meat, fresh vegetables, and homemade sauces. Don't miss the Jerusalem mixed grill.",
      image: "/shawarma-restaurant.jpg",
      kosher: false,
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Best Jewish Food in the Bay Area</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your complete guide to authentic Jewish delis, bakeries, and restaurants across the Bay Area.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="space-y-12">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                    {restaurant.kosher && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          Kosher
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-3 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{restaurant.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {restaurant.location}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{restaurant.cuisine}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
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
