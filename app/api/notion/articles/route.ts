import { NextResponse } from "next/server"

const NOTION_API_KEY = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID

interface NotionPage {
  id: string
  created_time: string
  properties: {
    Title: {
      title: Array<{ plain_text: string }>
    }
    Link: {
      url: string
    }
    Description: {
      rich_text: Array<{ plain_text: string }>
    }
    Source: {
      rich_text: Array<{ plain_text: string }>
    }
  }
}

export async function GET() {
  try {
    if (!NOTION_API_KEY || !DATABASE_ID) {
      return NextResponse.json(
        {
          articles: [],
          message: "Notion not configured. Add NOTION_TOKEN and NOTION_DATABASE_ID to environment variables.",
        },
        { status: 200 },
      )
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
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
      }),
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json({ articles: [], error: `Notion API error: ${response.status}` }, { status: 200 })
    }

    const data = await response.json()

    // Transform Notion data to simpler format
    const articles = data.results.map((page: NotionPage) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
      link: page.properties.Link?.url || "",
      description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
      source: page.properties.Source?.rich_text?.[0]?.plain_text || "Unknown",
      published_at: page.created_time,
    }))

    return NextResponse.json({ articles })
  } catch (error) {
    return NextResponse.json({ articles: [], error: "Failed to fetch from Notion" }, { status: 200 })
  }
}
