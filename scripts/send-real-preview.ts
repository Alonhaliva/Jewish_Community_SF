import { Resend } from 'resend';
import { generateNewsletterHTML } from '../lib/newsletter-template';

// Keys from user provided earlier
const RESEND_API_KEY = 're_KpPRoTk5_A9m2tgNxrNmtgAfUsX91qfbD';

const resend = new Resend(RESEND_API_KEY);

async function sendPreview(recipient: string) {
    console.log(`📧 Preparing to send full newsletter preview to ${recipient}...`);

    // Mock data to render the full template
    const mockData = {
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        // Removed quote ("Morning Spark") to reduce clutter as requested
        founderSpotlight: {
            name: "Assaf Rappaport",
            company: "Wiz",
            quote: "Making cloud security simple and scalable.",
            description: "The SV Bridge: The force behind one of the fastest-growing startups in SV history, with Israeli roots.",
        },
        articles: [
            {
                title: "Israeli startups raised $1.5b in December",
                description: "Israeli privately-held tech companies have raised over $10.5 billion in 2025.",
                link: "https://www.globes.co.il",
                source: "Globes"
            },
            {
                title: "SNC: Israeli tech cos raised $15.6b in 2025",
                description: "Investors are doing fewer deals but committing significantly more capital to each one.",
                link: "https://www.globes.co.il",
                source: "SNC"
            },
            {
                title: "Cybersecurity Giant Check Point acquires CyberArk",
                description: "A major consolidation in the Israeli cyber market as Check Point expands its identity security portfolio.",
                link: "https://techcrunch.com",
                source: "TechCrunch"
            },
            {
                title: "NVIDIA expands R&D center in Yokneam",
                description: "The chip giant announces plans to hire 500 more engineers for its Mellanox division.",
                link: "https://calcalistech.com",
                source: "Calcalist"
            }
        ],
        marketPulse: [
            { symbol: "WIX", price: "$180.47", change: "(+0.19%)", isUp: true },
            { symbol: "CHKP", price: "$158.20", change: "(-0.45%)", isUp: false },
            { symbol: "CYBR", price: "$295.10", change: "(+1.2%)", isUp: true },
        ]
    };

    const html = generateNewsletterHTML(mockData);

    try {
        const data = await resend.emails.send({
            from: 'ITON - Tech Bridge <onboarding@resend.dev>',
            to: [recipient],
            subject: '🕵️ Verification: Israeli Silicon Valley Map Preview',
            html: html,
        });

        if (data.error) throw data.error;
        console.log('✅ Email sent successfully!', data);
    } catch (error) {
        console.error('❌ Failed to send email:', error);
    }
}

// Get recipient from command line args
const recipient = process.argv[2];

if (!recipient) {
    console.error("Please provide an email address as an argument.");
    console.log("Usage: npx tsx scripts/send-real-preview.ts <email>");
} else {
    sendPreview(recipient);
}
