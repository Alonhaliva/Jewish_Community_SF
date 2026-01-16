const { Client } = require("@notionhq/client")

// Using the token known from previous tests
const NOTION_TOKEN = "ntn_B24231263608WyEA29t7R0OyOb0WyOILamYk49cokcU8Rq"

const notion = new Client({ auth: NOTION_TOKEN })

async function main() {
    console.log("Searching for databases connected to the bot...")
    try {
        const response = await notion.search({
            query: '', // empty query searches everything
        })

        console.log(`Found ${response.results.length} databases:`)
        response.results.forEach(db => {
            console.log(`- Name: "${db.title?.[0]?.plain_text || 'Untitled'}"`)
            console.log(`  ID:   ${db.id}`)
            console.log(`  URL:  ${db.url}`)
            console.log('---')
        })
    } catch (error) {
        console.error("Error:", error.body || error.message)
    }
}

main()
