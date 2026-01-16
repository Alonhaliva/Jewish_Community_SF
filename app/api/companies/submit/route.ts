import { NextResponse } from "next/server"
import { appendCompany } from "@/lib/google-sheets"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Basic server-side validation
        if (!body.name || !body.website || !body.description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Call Google Sheets
        await appendCompany({
            name: body.name,
            industry: body.industry,
            city: body.city,
            website: body.website,
            description: body.description,
            type: body.type,
            employees: body.employees,
            linkedin: body.linkedin
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Submission API Error:", error)
        return NextResponse.json(
            { error: error?.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
