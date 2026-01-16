import { NextResponse } from "next/server"
import { mockPodcasts } from "@/lib/mock-data"

export async function GET() {
  try {
    // Return podcasts data
    const podcasts = mockPodcasts.map((podcast) => ({
      id: Number.parseInt(podcast.id),
      title: podcast.title,
      description: podcast.description,
      link: podcast.link,
      thumbnail: podcast.thumbnail,
      createdAt: new Date().toISOString(),
    }))

    return NextResponse.json(podcasts)
  } catch (error) {
    console.error("[v0] Error fetching podcasts:", error)
    return NextResponse.json({ error: "Failed to fetch podcasts" }, { status: 500 })
  }
}
