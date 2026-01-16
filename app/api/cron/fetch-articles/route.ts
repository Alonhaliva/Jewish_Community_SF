import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY
const NOTION_API_KEY = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID
const CRON_SECRET = process.env.CRON_SECRET

// This endpoint will be called daily by Vercel Cron
export async function GET(request: Request) {
  try {
    // Verify the cron secret for security
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!GEMINI_API_KEY || !NOTION_API_KEY || !DATABASE_ID) {
      return NextResponse.json({ error: "Missing required environment variables" }, { status: 500 })
    }

    console.log("[v0] Starting daily article fetch...")

    // 1. Archive old articles
    console.log("[v0] Archiving old articles...")
    const oldArticlesResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 100 }), // Fetch up to 100 old articles
    })

    if (oldArticlesResponse.ok) {
      const oldData = await oldArticlesResponse.json()
      const params = oldData.results.map((page: any) =>
        fetch(`https://api.notion.com/v1/pages/${page.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ archived: true }),
        })
      )
      await Promise.all(params)
      console.log(`[v0] Archived ${params.length} old articles.`)
    }

    // 2. Fetch new articles with Gemini
    const prompt = `Find 8 recent news articles (last 48 hours) about Israeli technology, startups, or VC funding.
    
    Format as a STRICT JSON Array of objects. Each object MUST have:
    - title: String (No "Untitled" allowed. Must be descriptive)
    - link: String (Url)
    - description: String (Summary)
    - source: String (e.g. "Globes", "TechCrunch")
    `

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    )

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ""

    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("Failed to extract articles from Gemini response")
    }

    let articles = []
    try {
      articles = JSON.parse(jsonMatch[0])
    } catch (e) {
      throw new Error("Failed to parse Gemini JSON")
    }

    // 3. Add valid articles to Notion
    let addedCount = 0
    for (const article of articles) {
      if (!article.title || article.title === "Untitled" || !article.link) continue;

      try {
        const notionResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parent: { database_id: DATABASE_ID },
            properties: {
              Title: {
                title: [{ text: { content: article.title } }],
              },
              Link: {
                url: article.link,
              },
              Description: {
                rich_text: [{ text: { content: article.description || "" } }],
              },
              Source: {
                rich_text: [{ text: { content: article.source || "" } }],
              },
            },
          }),
        })

        if (notionResponse.ok) {
          addedCount++
        }
      } catch (error) {
        console.error("[v0] Notion insert error:", error)
      }
    }

    console.log(`[v0] Successfully added ${addedCount} articles.`)

    return NextResponse.json({
      success: true,
      archived: oldArticlesResponse.ok,
      added: addedCount
    })
  } catch (error) {
    console.error("[v0] Cron job error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
