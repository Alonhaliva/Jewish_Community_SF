const Parser = require('rss-parser');
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
});

const RSS_FEEDS = [
    { url: "https://techcrunch.com/feed/", source: "TechCrunch (Main)" },
    { url: "https://www.ynetnews.com/business/feed", source: "Ynet Business" },
    { url: "https://en.globes.co.il/en/rss.xml", source: "Globes (English)" },
    { url: "https://www.jpost.com/rss/rssfeedsheadlines", source: "JPost Headlines" },
    { url: "https://www.calcalistech.com/ctech/home/0,7340,L-8,00.xml", source: "CTech (User Link)" }
];

async function checkFeeds() {
    console.log('🔍 Checking (Hebrew) Feed Ages...');
    const now = Date.now();

    for (const feed of RSS_FEEDS) {
        try {
            console.log(`\n--- ${feed.source} ---`);
            const data = await parser.parseURL(feed.url);

            if (data.items.length === 0) console.log("   (No items)");

            data.items.slice(0, 3).forEach(item => {
                const date = new Date(item.pubDate || item.isoDate);
                const ageHours = ((now - date.getTime()) / (1000 * 60 * 60)).toFixed(1);
                console.log(`   - [${ageHours}h ago] ${item.title}`);
            });
        } catch (e) {
            console.log(`❌ Failed ${feed.source}: ${e.message}`);
        }
    }
}

checkFeeds();
