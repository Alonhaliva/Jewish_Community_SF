import { Resend } from 'resend'
import { Client } from "@notionhq/client"
import { generateNewsletterHTML } from './newsletter-template'
import { addSubscriber as addSubscriberToSheet } from './google-sheets'

const resend = new Resend(process.env.RESEND_API_KEY)
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const SUBSCRIBERS_DB_ID = process.env.NOTION_SUBSCRIBERS_DB_ID

export async function getSubscribers() {
    // ... existing getSubscribers code ...
    if (!SUBSCRIBERS_DB_ID) return []

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${SUBSCRIBERS_DB_ID}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Notion API error: ${response.status}`)
        }

        const data = await response.json()

        // Check if 'Email' property exists and extract text
        return data.results
            .map((page: any) => {
                const emailProp = page.properties['Email']
                if (emailProp?.type === 'email') return emailProp.email
                if (emailProp?.type === 'rich_text') return emailProp.rich_text[0]?.plain_text
                if (emailProp?.type === 'title') return emailProp.title[0]?.plain_text
                return null
            })
            .filter(Boolean)
    } catch (error) {
        console.error("Failed to fetch subscribers:", error)
        return []
    }
}

export async function addSubscriber(email: string) {
    let notionSuccess = false
    let sheetSuccess = false

    // 1. Try Notion
    if (SUBSCRIBERS_DB_ID) {
        try {
            await notion.pages.create({
                parent: { database_id: SUBSCRIBERS_DB_ID },
                properties: {
                    "Name": {
                        title: [
                            {
                                text: {
                                    content: email,
                                },
                            },
                        ],
                    },
                    "Email": {
                        email: email,
                    },
                    Status: {
                        status: {
                            name: "Active"
                        }
                    },
                    "Join Date": {
                        date: {
                            start: new Date().toISOString()
                        }
                    },
                    Source: {
                        select: {
                            name: "Website",
                        }
                    }
                },
            })
            notionSuccess = true
        } catch (error) {
            console.error("[Notion] Failed to add subscriber:", error)
        }
    } else {
        console.warn("[Notion] SUBSCRIBERS_DB_ID is missing")
    }

    // 2. Try Google Sheets
    try {
        await addSubscriberToSheet(email)
        sheetSuccess = true
    } catch (error) {
        console.error("[Google Sheets] Failed to add subscriber:", error)
    }

    if (!notionSuccess && !sheetSuccess) {
        throw new Error("Failed to add subscriber to both Notion and Google Sheets")
    }
}

export async function addLead(data: { email: string; timeframe: string; heardFrom: string }) {
    if (!SUBSCRIBERS_DB_ID) throw new Error("Missing Database ID")

    // 1. Save to Notion (Reuse Subscribers DB but mark as Advertiser)
    try {
        await notion.pages.create({
            parent: { database_id: SUBSCRIBERS_DB_ID },
            properties: {
                "Name": {
                    title: [{ text: { content: `LEAD: ${data.email}` } }],
                },
                "Email": {
                    email: data.email,
                },
                Status: {
                    status: { name: "Active" }
                },
                "Join Date": {
                    date: { start: new Date().toISOString() }
                },
                Source: {
                    select: { name: "Advertiser" } // Distinguish from regular subs
                }
            },
        })
    } catch (e) {
        console.error("Failed to save lead to Notion:", e)
    }

    // 2. Send Notification Email to Owner
    try {
        await resend.emails.send({
            from: 'Iton - Tech Bridge <onboarding@resend.dev>',
            to: ['israelitechglobal@gmail.com'], // Send to owner
            subject: `📢 New Advertising Lead: ${data.email}`,
            html: `
                <h1>New Lead Received</h1>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Timeframe:</strong> ${data.timeframe}</p>
                <p><strong>Heard From:</strong> ${data.heardFrom}</p>
            `
        })
    } catch (e) {
        console.error("Failed to send lead email:", e)
    }
}

export async function sendNewsletter(to: string | string[], subject: string, data: any) {
    const html = generateNewsletterHTML(data)

    try {
        const response = await resend.emails.send({
            from: 'Iton - Tech Bridge <newsletter@resend.dev>',
            to: typeof to === 'string' ? [to] : to,
            subject: subject,
            html: html,
        })

        if (response.error) {
            console.error("Resend API Error:", response.error)
            return { success: false, error: response.error }
        }

        return { success: true, id: response.data?.id }
    } catch (error) {
        console.error("Error sending email:", error)
        return { success: false, error }
    }
}
