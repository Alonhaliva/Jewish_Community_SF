const { Client } = require('@notionhq/client');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Parser = require('rss-parser');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Initialize clients (Lazy init in main)
let notion;
let genAI;
let parser;


// Gmail Transporter (Lazy init)
let transporter;

// Config
const TARGET_EMAIL = process.argv[2] || "alonhaliva@gmail.com";
const RSS_FEEDS = [
    { url: "https://techcrunch.com/tag/israel/feed/", source: "TechCrunch" },
    { url: "https://www.geektime.co.il/feed/", source: "Geektime" },
    { url: "https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=594", source: "Globes" }
];

// --- Premium HTML Template Generator (TLDR Style Refined) ---
function generateNewsletterHTML(data) {
    const { date, quote, founderSpotlight, articles, marketPulse } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Israeli Silicon Valley Map</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1f2937;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                
                <!-- Main Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%;">
                    
                    <!-- Top Navigation -->
                    <tr>
                        <td align="center" style="padding: 10px; color: #6b7280; font-size: 12px; border-bottom: 1px solid #e5e7eb;">
                            <a href="https://v0-israeli-silicon-valley-map.vercel.app/advertise" style="color: #6b7280; text-decoration: underline;">Advertise</a>
                            <span style="margin: 0 10px;">|</span>
                            <a href="https://v0-israeli-silicon-valley-map.vercel.app/whats-new" style="color: #6b7280; text-decoration: underline;">View Online</a>
                        </td>
                    </tr>

                    <!-- Header (TLDR Style: Logo Centered) -->
                    <tr>
                        <td align="center" style="padding: 40px 20px 20px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #2563eb; font-size: 32px; font-weight: 800; letter-spacing: -1px;">
                                ITON
                            </h1>
                            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                                Tech Bridge • ${date}
                            </p>
                        </td>
                    </tr>

                    <!-- The Morning Spark (Quote) - Blue Box -->
                    ${quote ? `
                    <tr>
                        <td style="padding: 20px;">
                            <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; border-left: 4px solid #2563eb;">
                                <h2 style="margin: 0 0 10px 0; font-size: 13px; color: #2563eb; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">The Morning Spark</h2>
                                <p style="margin: 0; font-size: 18px; font-style: italic; color: #1e3a8a; line-height: 1.5;">
                                    "${quote.text}"
                                </p>
                                <p style="margin: 8px 0 0 0; font-size: 14px; color: #1e40af; font-weight: 600;">
                                    — ${quote.author}
                                </p>
                            </div>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Section Divider -->
                    <tr>
                         <td align="center" style="padding: 10px 0;">
                            <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin: 0;">Big Tech & Startups</h2>
                         </td>
                    </tr>

                    <!-- Top Briefings (Articles) -->
                    <tr>
                        <td style="padding: 20px;">
                            ${articles.map(article => `
                                <div style="margin-bottom: 40px;">
                                    <h3 style="margin: 0 0 8px 0; font-size: 18px; line-height: 1.4; font-weight: 700;">
                                        <a href="${article.link}" style="color: #111827; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px;">${article.title}</a>
                                    </h3>
                                    
                                    <div style="margin-bottom: 12px;">
                                        <p style="margin: 0; font-size: 16px; color: #374151; line-height: 1.6;">
                                            <strong style="color: #2563eb; text-transform: uppercase; font-size: 12px; margin-right: 5px;">The Big Picture:</strong>
                                            ${article.description}
                                        </p>
                                    </div>

                                    <div style="margin-bottom: 15px;">
                                        <p style="margin: 0; font-size: 16px; color: #374151; line-height: 1.6;">
                                            <strong style="color: #059669; text-transform: uppercase; font-size: 12px; margin-right: 5px;">Why It Matters:</strong>
                                            ${article.whyItMatters || "Signaling strong market confidence."}
                                        </p>
                                    </div>
                                    
                                    <div style="margin-top: 15px;">
                                        <a href="${article.link}" style="display: inline-block; background-color: #f3f4f6; color: #2563eb; text-decoration: none; font-weight: 600; font-size: 13px; padding: 8px 12px; border-radius: 6px; border: 1px solid #e5e7eb;">Read Source (${article.source}) →</a>
                                    </div>
                                </div>
                            `).join('')}
                        </td>
                    </tr>

                    <!-- Founder Spotlight - Bordered Card -->
                    ${founderSpotlight ? `
                    <tr>
                        <td style="padding: 20px;">
                            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px;">
                                <h2 style="margin: 0 0 15px 0; font-size: 13px; color: #dc2626; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Founder Spotlight</h2>
                                
                                <h3 style="margin: 0; font-size: 20px; color: #1f2937;">${founderSpotlight.name}</h3>
                                <p style="margin: 2px 0 10px 0; font-size: 14px; color: #2563eb; font-weight: 600;">${founderSpotlight.company}</p>
                                
                                <p style="margin: 0 0 10px 0; font-size: 15px; color: #374151; font-style: italic;">
                                    "${founderSpotlight.quote}"
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.5;">
                                    ${founderSpotlight.description}
                                </p>
                            </div>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Market Pulse -->
                    ${marketPulse ? `
                    <tr>
                        <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                            <h2 style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563; text-transform: uppercase; text-align: center; letter-spacing: 1px;">Market Pulse</h2>
                            
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr align="center">
                                ${marketPulse.map(item => `
                                    <td style="padding: 5px;">
                                        <div style="font-weight: 700; font-size: 14px; color: #1f2937;">${item.symbol}</div>
                                        <div style="font-size: 13px; color: ${item.isUp ? '#059669' : '#dc2626'};">
                                            ${item.isUp ? '▲' : '▼'}${item.change}
                                        </div>
                                    </td>
                                `).join('')}
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Footer -->
                    <tr>
                         <td align="center" style="padding: 40px 20px;">
                            <p style="margin: 0 0 20px 0; font-size: 12px; color: #9ca3af;">
                                &copy; ${new Date().getFullYear()} ITON Tech Bridge.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
// -------------------------------------

async function fetchRSS() {
    console.log('📡 Fetching RSS feeds (English + Hebrew)...');
    const allItems = [];

    for (const feed of RSS_FEEDS) {
        try {
            const data = await parser.parseURL(feed.url);
            // Get last 72h items (to catch weekend news from international sources)
            const recent = data.items.filter(item => {
                const date = new Date(item.pubDate || item.isoDate);
                return (Date.now() - date.getTime()) < (72 * 60 * 60 * 1000);
            }).map(item => ({
                title: item.title,
                link: item.link,
                content: item.contentSnippet || item.content || "",
                source: feed.source,
                date: new Date(item.pubDate || item.isoDate).toISOString().split('T')[0]
            }));

            if (recent.length > 0) {
                console.log(`   found ${recent.length} from ${feed.source}`);
                allItems.push(...recent);
            }
        } catch (e) {
            console.error(`   failed ${feed.source}: ${e.message}`);
        }
    }
    return allItems;
}

async function geminiGenerateFullContent(rssItems) {
    console.log(`\n🧠 Curating & Generating CSS-Polished Content via Gemini...`);

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    Role: Editor-in-Chief of "ITON - Tech Bridge", a premium newsletter for the Israeli Tech ecosystem in Silicon Valley.
    
    Input Data (RSS Items found recently - may be in HEBREW):
    ${JSON.stringify(rssItems, null, 2)}
    
    **Task**: Generate the JSON content for today's newsletter.

    **CRITICAL GUIDELINES**: 
    1.  **DIVERSITY IS KEY**: Try to select articles from **different sources** if available.
    2.  **TRANSLATION**: Input is Hebrew -> Output MUST be Professional English.
    3.  **CURATION**: Focus on big news (Funding, Exits, Product Launches). Ignore minor gossip.
    
    **Requirements**:
    1.  **Articles**: Select the top 5-7 MOST important stories.
        *   "title": English headline ending with a relevant Emoji.
        *   "description": A concise "Big Picture" summary (2 sentences) in English.
        *   "whyItMatters": A sharp analysis (1 sentence) in English.
        *   "source": Keep the original source name (e.g. Geektime).
    2.  **Morning Spark**: Inspiring/insightful quote.
    3.  **Founder Spotlight**: Highlight one major Israeli founder.
    4.  **Market Pulse**: Estimate/Mock current market data for top Israeli tech stocks (WIX, CHKP, CYBR, MNDY).
    
    **Output Format**: A single valid JSON object with this schema:
    {
      "quote": { "text": "Quote", "author": "Name", "role": "Role" },
      "founderSpotlight": { "name": "Name", "company": "Co", "quote": "...", "description": "..." },
      "articles": [
        {
          "title": "English Headline 🚀",
          "description": "English Summary...",
          "whyItMatters": "Impact...",
          "link": "URL",
          "source": "Source Name"
        }
      ],
      "marketPulse": [
        { "symbol": "WIX", "change": "+1.2%", "isUp": true },
        { "symbol": "CHKP", "change": "-0.5%", "isUp": false },
        { "symbol": "CYBR", "change": "+2.1%", "isUp": true },
        { "symbol": "MNDY", "change": "+0.8%", "isUp": true }
      ]
    }
    
    STRICT JSON ONLY. No markdown.
    `;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // Robust JSON extraction: Find { ... }
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');

        if (jsonStart !== -1 && jsonEnd !== -1) {
            text = text.substring(jsonStart, jsonEnd + 1);
        }

        return JSON.parse(text);
    } catch (e) {
        console.error("❌ Gemini Error:", e.message);
        console.log("Raw Output was:", result?.response?.text()?.slice(0, 200) + "...");
        return { articles: [], marketPulse: [], quote: { text: "Error generating content.", author: "System" } };
    }
}

async function pushToNotion(articles) {
    console.log('\n📤 Pushing to Notion...');
    const results = [];

    for (const article of articles) {
        try {
            await notion.pages.create({
                parent: { database_id: NOTION_DATABASE_ID },
                properties: {
                    Title: { title: [{ text: { content: article.title } }] },
                    Description: { rich_text: [{ text: { content: article.description } }] },
                    Link: { url: article.link },
                    Source: { rich_text: [{ text: { content: article.source } }] },
                }
            });
            console.log(`   ✅ Pushed: ${article.title}`);
            results.push(article);
        } catch (error) {
            console.error(`   ❌ Failed "${article.title}":`, error.message);
        }
    }
    return results;
}

async function sendEmail(newsletterData) {
    if (!GMAIL_APP_PASSWORD) {
        console.log('⚠️ No GMAIL_APP_PASSWORD. Skipping email.');
        return;
    }

    // Lazy Init Transporter
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'israelitechglobal@gmail.com',
                pass: GMAIL_APP_PASSWORD
            }
        });
    }

    console.log('\n📧 Sending Direct Gmail Newsletter...');

    const html = generateNewsletterHTML({
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        ...newsletterData
    });

    try {
        const info = await transporter.sendMail({
            from: '"The Bridge" <israelitechglobal@gmail.com>',
            to: TARGET_EMAIL,
            subject: `Tech Bridge: ${newsletterData.articles[0].title}`,
            html: html,
        });
        console.log('✅ Email sent!', info.messageId);
    } catch (e) {
        console.error('❌ Email failed:', e.message);
    }
}

async function main() {
    console.log('🚀 Daily Agent Starting (Polished Design)...');

    try {
        // Validation
        console.log("Checking Environment Variables:");
        console.log(`NOTION_TOKEN: ${NOTION_TOKEN ? '✅ Available' : '❌ Missing'}`);
        console.log(`NOTION_DATABASE_ID: ${NOTION_DATABASE_ID ? '✅ Available' : '❌ Missing'}`);
        console.log(`GOOGLE_GEMINI_API_KEY: ${GOOGLE_GEMINI_API_KEY ? '✅ Available' : '❌ Missing'}`);
        console.log(`GMAIL_APP_PASSWORD: ${GMAIL_APP_PASSWORD ? '✅ Available' : '❌ Missing'}`);

        if (!NOTION_TOKEN) throw new Error("Missing NOTION_TOKEN");
        if (!NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
        if (!GOOGLE_GEMINI_API_KEY) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

        // Init Clients
        notion = new Client({ auth: NOTION_TOKEN });
        genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
        // Re-require parser if needed or just new it here
        // Parser init
        parser = new Parser({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const rssItems = await fetchRSS();
        const newsletterData = await geminiGenerateFullContent(rssItems);

        if (!newsletterData.articles || newsletterData.articles.length === 0) {
            console.log('No articles generated.');
            return;
        }

        const validArticles = newsletterData.articles.filter(a => a.url || a.link).map(a => ({ ...a, url: a.url || a.link }));
        await pushToNotion(validArticles);

        newsletterData.articles = validArticles;
        await sendEmail(newsletterData);

        // Log run stats
        const runStats = {
            date: new Date().toISOString(),
            articlesFound: rssItems.length,
            articlesPublished: validArticles.length
        };
        try {
            await fs.writeFile(path.join(__dirname, '../last-run.json'), JSON.stringify(runStats, null, 2));
        } catch (e) {
            console.log('⚠️ Could not write last-run.json:', e.message);
        }

        console.log('\n✅ All Done!');
    } catch (error) {
        console.error('\n❌ Fatal error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
