import { NextResponse } from "next/server"
import { addSubscriber } from "@/lib/email-service"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    await addSubscriber(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe API Error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    )
  }
}
