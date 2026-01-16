const NOTION_TOKEN = process.env.NOTION_TOKEN || "ntn_B24231263608WyEA29t7R0OyOb0WyOILamYk49cokcU8Rq"
const DATABASE_ID = process.env.NOTION_DATABASE_ID || "9e9c67f0-0d3f-45e3-89e9-7f9a2cfb1c5b"

async function main() {
    console.log("Fetching from DB:", DATABASE_ID)

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_TOKEN}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page_size: 3
            }),
        })

        if (!response.ok) {
            console.log("Error:", response.status, await response.text())
            return
        }

        const data = await response.json()
        console.log("Found", data.results.length, "items")

        if (data.results.length > 0) {
            const firstItem = data.results[0]
            console.log("--- Item ID:", firstItem.id, "---")
            console.log("--- Properties Keys ---")
            console.log(Object.keys(firstItem.properties))

            console.log("\n--- Full Properties Structure ---")
            console.log(JSON.stringify(firstItem.properties, null, 2))
        }
    } catch (error) {
        console.error("Error:", error.message)
    }
}

main()
