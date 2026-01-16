
import { NextResponse } from "next/server"
import Parser from "rss-parser"

// Set revalidation period (ISR) for Vercel/Next.js
export const revalidate = 900 // 15 minutes

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8'
    },
    customFields: {
        item: [
            ['media:content', 'media:content'],
            ['content:encoded', 'content:encoded']
        ]
    }
})

const FEED_URLS = [
    { url: "https://techcrunch.com/tag/israel/feed/", source: "TechCrunch", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg" },
    { url: "https://nocamels.com/feed/", source: "NoCamels", logo: "https://nocamels.com/wp-content/uploads/2017/09/NoCamels-Logo-clean.png" },
    { url: "https://www.ynetnews.com/Integration/StoryRss3083.xml", source: "Ynet News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ynet_logo.svg/1024px-Ynet_logo.svg.png" },
    { url: "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725", source: "Globes", logo: "https://en.globes.co.il/design/images/new_en_logo.png" },
]

// Global Cache (persists on warm lambda)
let cachedNews: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Helper to fetch OpenGraph Image from a URL (with optimized timeout)
async function fetchOgImage(url: string): Promise<string | undefined> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200); // Reduced to 1.2s timeout for speed

        const res = await fetch(url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
        });
        clearTimeout(timeoutId);

        if (!res.ok) return undefined;

        const html = await res.text();
        const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/i) ||
            html.match(/<meta name="twitter:image" content="([^"]+)"/i);

        return ogMatch ? ogMatch[1] : undefined;
    } catch (e) {
        return undefined;
    }
}

export async function GET() {
    try {
        const now = Date.now();

        // Serve from In-Memory Cache if fresh
        if (cachedNews && (now - lastFetchTime < CACHE_DURATION)) {
            return NextResponse.json(cachedNews, {
                headers: {
                    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=59',
                    'X-Cache-Status': 'HIT'
                }
            });
        }

        const feedPromises = FEED_URLS.map(async (feed) => {
            try {
                const feedData = await parser.parseURL(feed.url)

                // Process items in parallel to fetch images if needed
                // Limit to 5 most recent items per feed to skip old ones and save time
                const recentItems = feedData.items.slice(0, 5);

                const itemsWithImages = await Promise.all(recentItems.map(async (item) => {
                    let itemImg: string | undefined = item.enclosure?.url

                    // 1. Try media:content
                    if (!itemImg && item['media:content']) {
                        if (item['media:content'].url) itemImg = item['media:content'].url
                        else if (item['media:content']['$']?.url) itemImg = item['media:content']['$'].url
                    }

                    // 2. Try HTML content regex
                    if (!itemImg) {
                        const content = item['content:encoded'] || item.content || "";
                        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
                        if (imgMatch) itemImg = imgMatch[1]
                    }

                    // 3. Fallback: Fetch Page for OG Image
                    if (!itemImg && item.link) {
                        // Only fetch if we really have no image
                        itemImg = await fetchOgImage(item.link);
                    }

                    return {
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        contentSnippet: item.contentSnippet,
                        source: feed.source,
                        sourceLogo: feed.logo,
                        image: itemImg,
                        isoDate: item.isoDate || new Date(item.pubDate!).toISOString()
                    }
                }));

                return itemsWithImages;
            } catch (err) {
                console.error(`Failed to parse feed ${feed.url}:`, err)
                return []
            }
        })

        const results = await Promise.all(feedPromises)
        let allNews = results.flat()

        // Filter for relevance
        const keywords = ["israel", "tel aviv", "tech", "startup", "cyber", "ai", "funding", "raised", "unicorn", "acquisition", "merger", "chips", "nvidia", "intel"]

        // Group by source for Round Robin
        const newsBySource: Record<string, any[]> = {}

        allNews.forEach(item => {
            // Validation
            if (!item.title || item.title === "Untitled" || item.title === "Unknown") return
            if (!item.link) return

            // Context correctness
            if (item.source !== "CTech" && item.source !== "TechCrunch" && item.source !== "NoCamels") {
                const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase()
                if (!keywords.some(k => text.includes(k))) return
            }

            if (!newsBySource[item.source]) {
                newsBySource[item.source] = []
            }
            newsBySource[item.source].push(item)
        })

        // Round Robin Shuffle
        const shuffledNews: any[] = []
        const sources = Object.keys(newsBySource)
        let maxItems = 0
        sources.forEach(s => maxItems = Math.max(maxItems, newsBySource[s].length))

        for (let i = 0; i < maxItems; i++) {
            for (const source of sources) {
                const item = newsBySource[source][i]
                if (item) {
                    shuffledNews.push(item)
                }
            }
        }

        // Return up to 15 items
        const topNews = shuffledNews.slice(0, 15)

        // Update Cache
        cachedNews = topNews;
        lastFetchTime = now;

        return NextResponse.json(topNews, {
            headers: {
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=59',
                'X-Cache-Status': 'MISS'
            }
        })
    } catch (error) {
        console.error("News API Error:", error)
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
    }
}
