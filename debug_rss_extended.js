
const Parser = require('rss-parser');
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8'
    }
});

const FEED_URLS = [
    { url: "https://nocamels.com/feed/", source: "NoCamels" },
    { url: "https://www.geektime.com/feed/", source: "Geektime" },
    { url: "https://www.timesofisrael.com/topic/startups/feed/", source: "Times of Israel" },
];

async function testFeeds() {
    for (const feed of FEED_URLS) {
        try {
            console.log(`Checking ${feed.source} (${feed.url})...`);
            const data = await parser.parseURL(feed.url);
            console.log(`  - SUCCESS: Found ${data.items.length} items.`);
        } catch (e) {
            console.log(`  - ERROR: ${e.message}`);
        }
    }
}

testFeeds();
