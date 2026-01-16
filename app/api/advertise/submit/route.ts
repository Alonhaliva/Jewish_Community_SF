import { type NextRequest, NextResponse } from "next/server"
import { addLead } from "@/lib/email-service"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, timeframe, heardFrom } = body

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 })
        }

        // Call service to save to Notion and email owner
        await addLead({ email, timeframe, heardFrom })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Advertise submission error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
