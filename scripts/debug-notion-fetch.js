const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function fetchFromNotion() {
    console.log('🔍 Debugging Notion Fetch (via FETCH API)...');
    console.log('   Database ID:', DATABASE_ID);

    if (!NOTION_TOKEN) {
        console.error('❌ NO NOTION TOKEN FOUND');
        return;
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
                page_size: 10,
            }),
        });

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            console.error(await response.text());
            return;
        }

        const data = await response.json();
        console.log(`   Found ${data.results.length} pages.`);

        data.results.forEach(page => {
            const titleProp = page.properties.Title || page.properties.Name;
            const title = titleProp?.title?.[0]?.plain_text || "Untitled";
            const created = page.created_time || "No Date";
            console.log(`   - [${created}] ${title}`);
        });

    } catch (error) {
        console.error('❌ Error fetching from Notion:', error.message);
    }
}

fetchFromNotion();
