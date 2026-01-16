import { NextResponse } from "next/server"
// import { addTalentRequest } from "@/lib/google-sheets" // Removed

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, company, role, type, hiringFor, isConsented } = body

        // Basic Validation
        if (!name || !email || !company || !role || !hiringFor) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        if (!isConsented) {
            return NextResponse.json({ error: "Must accept terms" }, { status: 400 })
        }

        const scriptUrl = process.env.RECRUITER_SHEET_SCRIPT_URL

        if (!scriptUrl) {
            console.error("Missing RECRUITER_SHEET_SCRIPT_URL env var")
            return NextResponse.json({ error: "Configuration Error: RECRUITER_SHEET_SCRIPT_URL missing" }, { status: 500 })
        }

        // console.log("Submitting to GAS:", scriptUrl)

        // Send to Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                company,
                role,
                type,
                hiringFor,
                timestamp: new Date().toISOString()
            })
        })

        const text = await response.text()
        // console.log("GAS Response Status:", response.status)
        // console.log("GAS Response Text:", text)

        if (!response.ok) {
            throw new Error(`GAS responded with ${response.status}: ${text}`)
        }

        try {
            const result = JSON.parse(text)
            if (!result.success) {
                throw new Error("Script returned success: false")
            }
        } catch (e) {
            throw new Error(`Failed to parse GAS response: ${text}`)
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Talent submit error:", error)
        return NextResponse.json({ error: error.message, scriptUrl: process.env.RECRUITER_SHEET_SCRIPT_URL, stack: error.stack }, { status: 500 })
    }
}
