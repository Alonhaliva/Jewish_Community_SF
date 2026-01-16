
interface Article {
    title: string
    description: string
    link: string
    source: string
}

interface NewsletterData {
    date: string
    quote?: {
        text: string
        author: string
        role?: string
    }
    founderSpotlight?: {
        name: string
        company: string
        quote: string
        description: string
        image?: string
    }
    articles: Article[]
    marketPulse?: {
        symbol: string
        price: string
        change: string
        isUp: boolean
    }[]
}

export function generateNewsletterHTML(data: NewsletterData): string {
    const { date, quote, founderSpotlight, articles, marketPulse } = data

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Israeli Silicon Valley Map</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #1f2937;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                
                <!-- Main Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Top Navigation -->
                    <tr>
                        <td align="center" style="padding: 10px; background-color: #111827; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #374151;">
                            <a href="https://v0-israeli-silicon-valley-map.vercel.app/advertise" style="color: #d1d5db; text-decoration: none; font-weight: 600;">Advertise</a>
                            <span style="margin: 0 10px;">|</span>
                            <a href="https://v0-israeli-silicon-valley-map.vercel.app/whats-new" style="color: #d1d5db; text-decoration: none; font-weight: 600;">View Online</a>
                        </td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 30px 20px; background-color: #ffffff; text-align: center; border-bottom: 2px solid #2563eb;">
                            <h1 style="margin: 0; color: #111827; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">
                                ITON - Tech Bridge
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                                ${date}
                            </p>
                        </td>
                    </tr>

                    <!-- The Morning Spark (Quote) -->
                    ${quote ? `
                    <tr>
                        <td style="padding: 30px; border-bottom: 1px solid #f3f4f6;">
                            <h2 style="margin: 0 0 15px 0; font-size: 16px; color: #2563eb; text-transform: uppercase; letter-spacing: 1px;">The Morning Spark</h2>
                            <blockquote style="margin: 0; border-left: 4px solid #2563eb; padding-left: 15px; font-size: 18px; font-style: italic; color: #374151; line-height: 1.6;">
                                "${quote.text}"
                            </blockquote>
                            <p style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; color: #6b7280; font-weight: 600;">
                                — ${quote.author}${quote.role ? `, ${quote.role}` : ''}
                            </p>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Founder Spotlight -->
                    ${founderSpotlight ? `
                    <tr>
                        <td style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
                            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111827; border-bottom: 2px solid #2563eb; display: inline-block; padding-bottom: 5px;">Founder Spotlight: SV Connector</h2>
                            
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top">
                                        <h3 style="margin: 0; font-size: 22px; color: #1f2937;">${founderSpotlight.name}</h3>
                                        <p style="margin: 5px 0 15px 0; font-size: 16px; color: #2563eb; font-weight: 700;">${founderSpotlight.company}</p>
                                        <p style="margin: 0 0 15px 0; font-size: 16px; color: #4b5563; font-style: italic;">
                                            "${founderSpotlight.quote}"
                                        </p>
                                        <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.6;">
                                            <strong>The SV Bridge:</strong> ${founderSpotlight.description}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Top Briefings (Articles) -->
                    <tr>
                        <td style="padding: 30px; background-color: #ffffff;">
                            <h2 style="margin: 0 0 25px 0; font-size: 20px; color: #111827; border-bottom: 2px solid #2563eb; display: inline-block; padding-bottom: 5px;">Top Briefings</h2>
                            
                            ${articles.map(article => `
                                <div style="margin-bottom: 35px;">
                                    <div style="font-size: 12px; font-weight: 700; color: #2563eb; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.5px;">via ${article.source}</div>
                                    <h3 style="margin: 0 0 10px 0; font-size: 20px; line-height: 1.4;">
                                        <a href="${article.link}" style="color: #111827; text-decoration: none; font-weight: 800;">${article.title}</a>
                                    </h3>
                                    <p style="margin: 0 0 15px 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
                                        <strong>The Big Picture:</strong> ${article.description}
                                    </p>
                                    <div style="margin-top: 10px; background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #10b981;">
                                        <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">
                                            <strong>Why it matters:</strong> <span style="color: #059669; font-weight: 600;">The Impact:</span> 
                                            Capital is fuel. Even in tough times, these rounds show that VCs are still betting big on the 'Startup Nation' engine.
                                        </p>
                                    </div>
                                    <div style="margin-top: 12px;">
                                        <a href="${article.link}" style="font-size: 14px; color: #2563eb; text-decoration: none; font-weight: 600;">Read full briefing →</a>
                                    </div>
                                </div>
                            `).join('')}
                        </td>
                    </tr>

                    <!-- Market Pulse -->
                    ${marketPulse ? `
                    <tr>
                        <td style="padding: 30px; background-color: #f9fafb;">
                            <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #111827; border-bottom: 2px solid #ec4899; display: inline-block; padding-bottom: 5px;">Market Pulse: Israeli Ecosystem</h2>
                            
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                ${marketPulse.map(item => `
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                            <span style="font-weight: 700; font-size: 16px; color: #1f2937;">${item.symbol}</span>
                                        </td>
                                        <td align="right" style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                            <span style="font-size: 16px; font-weight: 600; color: #111827;">${item.price}</span>
                                            <span style="margin-left: 10px; font-size: 14px; color: ${item.isUp ? '#10b981' : '#ef4444'};">
                                                ${item.isUp ? '▲' : '▼'} ${item.change}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: 500;">
                                Smart, curated briefings for the Israeli tech community.
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 14px; color: #2563eb; font-weight: 600;">
                                <a href="https://v0-israeli-silicon-valley-map.vercel.app/advertise" style="color: #2563eb; text-decoration: none;">Interested in reaching our audience? Advertise with us →</a>
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                &copy; 2026 ISRAELI SILICON VALLEY MAP | <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
