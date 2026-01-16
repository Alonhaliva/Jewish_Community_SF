import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Cache for 1 hour

const mockArticles = [
  {
    id: "mock-1",
    title: "Wiz Raises $1B at $12B Valuation, Aims for IPO",
    link: "https://techcrunch.com/wiz-funding",
    description:
      "Israeli cloud security unicorn Wiz announces massive funding round led by Sequoia Capital, plans IPO in 2025.",
    source: "TechCrunch",
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-2",
    title: "Armis Expands Bay Area Operations with New AI Security Platform",
    link: "https://calcalistech.com/armis-expansion",
    description:
      "Israeli cybersecurity firm Armis opens new Silicon Valley office, launches AI-powered asset intelligence platform.",
    source: "Calcalist",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-3",
    title: "Israeli AI Startups Attract $2.3B in Q4 2024",
    link: "https://globes.co.il/israeli-ai-funding",
    description: "Record funding quarter for Israeli AI companies, with Silicon Valley VCs leading investment rounds.",
    source: "Globes",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-4",
    title: "Monday.com Opens New R&D Center in Palo Alto",
    link: "https://ynetnews.com/monday-palo-alto",
    description:
      "Israeli unicorn Monday.com expands US presence with new research center focusing on AI and automation.",
    source: "Ynetnews",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-5",
    title: "SentinelOne Partners with Google Cloud for Enhanced Threat Detection",
    link: "https://jpost.com/sentinelone-google",
    description: "Israeli cybersecurity leader SentinelOne announces strategic partnership with Google Cloud.",
    source: "Jerusalem Post",
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-6",
    title: "Verbit Acquires US Transcription Startup for $50M",
    link: "https://techcrunch.com/verbit-acquisition",
    description: "Israeli AI transcription company Verbit expands market share with strategic US acquisition.",
    source: "TechCrunch",
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-7",
    title: "Israeli Quantum Computing Startup Quantum Machines Raises $50M",
    link: "https://calcalistech.com/quantum-machines",
    description: "Bay Area-based Quantum Machines secures Series B funding to advance quantum orchestration platform.",
    source: "Calcalist",
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-8",
    title: "JFrog Launches New DevOps Platform with AI Capabilities",
    link: "https://techcrunch.com/jfrog-ai",
    description: "Israeli DevOps leader JFrog unveils AI-powered software supply chain security platform.",
    source: "TechCrunch",
    published_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-9",
    title: "WalkMe Acquired by SAP in $1.5B All-Cash Deal",
    link: "https://globes.co.il/walkme-sap",
    description: "Digital adoption platform WalkMe joins SAP to enhance enterprise software user experience.",
    source: "Globes",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-10",
    title: "Palo Alto Networks Acquires Israeli Startup Talon Cyber Security",
    link: "https://calcalistech.com/palo-alto-talon",
    description: "Cybersecurity giant acquires enterprise browser security startup to bolster secure access solutions.",
    source: "Calcalist",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

async function fetchFromNotion(limit: number) {
  const NOTION_TOKEN = process.env.NOTION_TOKEN
  const DATABASE_ID = process.env.NOTION_DATABASE_ID

  // If Notion is not configured, return null immediately
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return null
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            timestamp: "created_time",
            direction: "descending",
          },
        ],
        page_size: limit,
      }),
      // Add timeout
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    // Transform Notion data
    const articles = data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
      link: page.properties.Link?.url || "",
      description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
      source: page.properties.Source?.rich_text?.[0]?.plain_text || "Unknown",
      published_at: page.created_time,
    }))

    return articles
  } catch (error) {
    // Silently fail and use mock data
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

    const notionArticles = await fetchFromNotion(limit)

    if (notionArticles && notionArticles.length > 0) {
      return NextResponse.json({
        articles: notionArticles,
        count: notionArticles.length,
        lastUpdated: new Date().toISOString(),
        source: "notion",
      })
    }

    // Use mock data
    const articlesToReturn = mockArticles.slice(0, Math.min(limit, mockArticles.length))

    return NextResponse.json({
      articles: articlesToReturn,
      count: articlesToReturn.length,
      lastUpdated: new Date().toISOString(),
      source: "demo",
    })
  } catch (error) {
    // Return mock data even on error
    return NextResponse.json(
      {
        articles: mockArticles.slice(0, 10),
        count: 10,
        lastUpdated: new Date().toISOString(),
        source: "demo",
      },
      { status: 200 },
    )
  }
}
