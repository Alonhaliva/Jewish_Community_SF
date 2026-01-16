
const Parser = require('rss-parser');
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8'
    }
});

const FEED_URLS = [
    { url: "https://techcrunch.com/tag/israel/feed/", source: "TechCrunch" },
    { url: "https://www.ynetnews.com/Integration/StoryRss3089.xml", source: "Ynet Tech XML (Trying new)" },
    { url: "https://www.ynetnews.com/Integration/StoryRss1932.xml", source: "Ynet Business XML (Trying new)" },
    { url: "https://www.ynetnews.com/business/feed", source: "Ynet Original" },
    { url: "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725", source: "Globes English (Likely real)" },
    { url: "https://en.globes.co.il/en/rss.xml", source: "Globes User" },
    { url: "https://www.jpost.com/rss/rssfeedsheadlines", source: "JPost" },
    { url: "https://www.calcalistech.com/ctech/home/0,7340,L-8,00.xml", source: "CTech" },
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
