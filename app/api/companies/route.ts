import { NextResponse } from "next/server"
import { mockCompanies } from "@/lib/mock-data"
import { getApprovedCompanies } from "@/lib/google-sheets"

export const dynamic = 'force-dynamic' // Ensure this isn't cached statically

export async function GET() {
  try {
    // 1. Fetch from Google Sheets - DISABLED to enforce clean mock data (105 founders)
    /*
    let sheetCompanies: any[] = []
    try {
      sheetCompanies = await getApprovedCompanies()
    } catch (e) {
      console.error("Failed to fetch fresh companies from Sheets:", e)
    }
    */

    // 2. Use Strict Mock Data Only (Verified 105 Founders)
    const combinedCompanies = [...mockCompanies]

    // 3. Map to final structure (Safety check)
    const companies = combinedCompanies.map((company) => ({
      id: company.id.toString(),
      name: company.name,
      industry: company.industry,
      city: company.city,
      address: company.address,
      website: company.website,
      description: company.description,
      lat: company.lat,
      lng: company.lng,
      logoUrl: company.logoUrl,
      isIsraeli: company.isIsraeli,
      israeliConnection: company.israeliConnection,
      valuation: company.valuation,
      jobsCreated: company.jobsCreated,
      linkedin: company.linkedin,
      type: company.type || "company",
      createdAt: new Date().toISOString(),
    }))

    return NextResponse.json(companies)
  } catch (error) {
    console.error("[v0] Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}
