
import Parser from "rss-parser";

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent'],
            ['media:thumbnail', 'mediaThumbnail'],
            ['content:encoded', 'contentEncoded'],
            ['enclosure', 'enclosureField']
        ]
    }
});

const URLS = [
    "https://nocamels.com/feed/",
    "https://www.ynetnews.com/Integration/StoryRss3083.xml",
    "https://techcrunch.com/tag/israel/feed/",
    "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
    "https://rss.jpost.com/rss/rssfeedsheadlines"
];

async function debug() {
    for (const url of URLS) {
        console.log(`\n--- Fetching ${url} ---`);
        try {
            const feed = await parser.parseURL(url);
            if (feed.items.length > 0) {
                // Check first 3 items
                feed.items.slice(0, 3).forEach((item, i) => {
                    console.log(`\n[Item ${i}] Title:`, item.title);
                    console.log("  Enclosure:", item.enclosure);
                    console.log("  media:content:", item['media:content']);

                    const content = item['content:encoded'] || item.content || "";
                    console.log("  Content Length:", content.length);
                    // Match any img tag to see what it looks like
                    const imgMatch = content.match(/<img[^>]+>/);
                    console.log("  First <img> tag found:", imgMatch ? imgMatch[0] : "None");
                    if (imgMatch) {
                        // Check specifically for src
                        const srcMatch = imgMatch[0].match(/src=["']([^"']+)["']/);
                        console.log("  Extracted SRC:", srcMatch ? srcMatch[1] : "Failed to extract src");
                    }
                    console.log("  Content Snippet:", content.substring(0, 300).replace(/\n/g, " "));
                });
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }
}

debug();
