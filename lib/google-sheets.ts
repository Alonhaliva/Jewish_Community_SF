import { google } from "googleapis"

export async function getSheetsClient() {
    try {
        const scopes = ["https://www.googleapis.com/auth/spreadsheets"]
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes,
        })

        return google.sheets({ version: "v4", auth })
    } catch (err) {
        console.error("Google Sheets Auth Error:", err)
        throw new Error("Failed to authenticate with Google Sheets")
    }
}

export async function appendCompany(data: {
    name: string
    industry: string
    city: string
    website: string
    description: string
    type: string
    employees?: number
    linkedin?: string
}) {
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
        throw new Error("Missing GOOGLE_SHEET_ID")
    }

    // Generate a simple ID
    // Generate a simple ID
    const id = `new_${Date.now()}`

    // User's Schema mapping (A-P):
    // A: id
    // B: name
    // C: category (using industry)
    // D: industry
    // E: stage (default "Seed")
    // F: description
    // G: website
    // H: linkedin
    // I: city
    // J: address (default city)
    // K: mapGroup (default "New")
    // L: employees
    // M: valuation (empty)
    // N: isHiring (default FALSE)
    // O: approved (New Column - default FALSE)
    // P: createdAt
    // Q: type

    const row = [
        id,
        data.name,
        data.industry, // C: category
        data.industry, // D: industry
        "Seed",        // E: stage
        data.description,
        data.website,
        data.linkedin || "",
        data.city,
        data.city,     // J: address
        "New",         // K: mapGroup
        data.employees || "",
        "",            // M: valuation
        "FALSE",       // N: isHiring
        "FALSE",       // O: approved (Essential for CMS)
        new Date().toISOString(),
        data.type || "company" // Q: type
    ]

    // Dynamic Sheet Name Resolution
    // Instead of hardcoding 'Sheet1', we fetch the actual name of the first sheet.
    const metadata = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties.title",
    })

    const sheetTitle = metadata.data.sheets?.[0]?.properties?.title
    if (!sheetTitle) throw new Error("Could not find any sheets in the spreadsheet")

    // Range needs to be quoted if it contains spaces (e.g. 'Sheet 1!A:Q')
    const range = `'${sheetTitle}'!A:Q`

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        })
        return { success: true }
    } catch (error) {
        console.error("Google Sheets Append Error:", error)
        throw error
    }
}

export async function getApprovedCompanies() {
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) return []

    // 1. Get Sheet Name
    const metadata = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties.title",
    })
    const sheetTitle = metadata.data.sheets?.[0]?.properties?.title
    if (!sheetTitle) return []

    // 2. Fetch All Rows
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${sheetTitle}'!A:P`,
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) return []

    // 3. Filter & Map
    const companies = rows
        .map((row, index) => {
            if (index === 0) return null // Skip header row

            // Safe access helper
            const get = (i: number) => (row[i] ? row[i].toString().trim() : "")

            const approvedFromSheet = get(14).toUpperCase() // Column O
            if (approvedFromSheet !== "TRUE") return null

            const typeFromSheet = get(16).toLowerCase() // Column Q
            let finalType = "company"
            if (typeFromSheet.includes("investor") || typeFromSheet.includes("angel")) finalType = "investor"
            if (typeFromSheet.includes("vc") || typeFromSheet.includes("venture")) finalType = "vc"

            return {
                id: get(0) || `sheet_${index}`,
                name: get(1),
                category: get(2),
                industry: get(3),
                stage: get(4),
                description: get(5),
                website: get(6),
                linkedin: get(7),
                city: get(8),
                address: get(9),
                mapGroup: get(10),
                employees: parseInt(get(11)) || 0,
                valuation: get(12),
                isHiring: get(13).toUpperCase() === "TRUE",
                isFeatured: false,
                logoUrl: `https://logo.clearbit.com/${get(6).replace(/^https?:\/\//, '')}` || "/placeholder.svg",
                lat: 37.7749, // Default SF (Geocoding would be next step)
                lng: -122.4194,
                isIsraeli: true,
                jobsCreated: get(11),
                type: finalType
            }
        })
        .filter((c): c is any => c !== null) // Type guard

    return companies
}

export async function addSubscriber(email: string) {
    const sheets = await getSheetsClient()
    // Use the specific newsletter sheet ID or fallback to the main one (though likely different schemas)
    const spreadsheetId = process.env.GOOGLE_NEWSLETTER_SHEET_ID || process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
        throw new Error("Missing GOOGLE_NEWSLETTER_SHEET_ID")
    }

    try {
        // Dynamic Sheet Name Resolution
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: "sheets.properties.title",
        })

        const sheetTitle = metadata.data.sheets?.[0]?.properties?.title
        if (!sheetTitle) throw new Error("Could not find any sheets in the spreadsheet")

        const range = `'${sheetTitle}'!A:D` // Email, Date, Status, Source

        const row = [
            email,
            new Date().toISOString(),
            "Active",
            "Website" // Source
        ]

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        })
        return { success: true }
    } catch (error) {
        console.error("[Google Sheets] Failed to add subscriber:", error)
        return { success: false, error }
    }
}

export async function addTalentRequest(data: {
    name: string
    email: string
    company: string
    role: string
    type: string
    hiringFor: string
}) {
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
        throw new Error("Missing GOOGLE_SHEET_ID")
    }

    try {
        // Dynamic Sheet Name Resolution
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId,
            fields: "sheets.properties.title",
        })

        const sheetTitle = metadata.data.sheets?.[0]?.properties?.title
        if (!sheetTitle) throw new Error("Could not find any sheets in the spreadsheet")

        // We'll append to a "Talent" sheet if it exists, or just the main sheet with a distinct prefix/structure
        // MVP: Just append to the main sheet but use a distinct structure or just rely on a new tab if the user has one?
        // User asked for "Send data to Google Sheet".
        // Let's assume we append to the same sheet but maybe we should ideally use a specific range or sheet.
        // For safety/simplicity in MVP without knowing if "Talent" tab exists, we'll try to append to a "Talent" tab,
        // IF it fails we might fall back, but let's assume the user can create a "Talent" tab or we just append to the first sheet with a marker.
        // ACTUALLY: The user said "Send data to Google Sheet... MVP only".
        // Let's try to append to strictly the first sheet for now, but usually it's better to have a separate tab.
        // Given constraints, I'll attempt to write to 'Talent Requests'!A:G.
        // If that fails, the API will error, which is acceptable feedback for the user to create the tab.

        const range = `'Talent Requests'!A:G`

        const row = [
            data.name,
            data.email,
            data.company,
            data.role,     // Founder / Hiring Manager / etc
            data.type,     // (The dropdown selection)
            data.hiringFor,
            new Date().toISOString(),
        ]

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        })
        return { success: true }
    } catch (error: any) {
        console.error("[Google Sheets] Failed to add talent request:", error)
        // Fallback: Try appending to the first sheet if specific sheet fails?
        // No, cleaner to fail and ask user to create the tab or just accept it might be mixed.
        // Let's throw so the frontend sees the error if needed, or return false.
        return { success: false, error: error.message }
    }
}
