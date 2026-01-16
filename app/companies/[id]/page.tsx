import { notFound } from "next/navigation"
import { mockCompanies } from "@/lib/mock-data"
import { SideNav } from "@/components/side-nav"
import { Building2, MapPin, Users, Globe, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = mockCompanies.find((c) => c.id === id)

  if (!company) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SideNav />

      <main className="ml-20 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-lg text-muted-foreground">{company.industry}</p>
            </div>
            <Button asChild>
              <Link href={company.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </Link>
            </Button>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{company.description}</p>
            </CardContent>
          </Card>

          {/* Company Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="font-medium">{company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size</span>
                  <span className="font-medium">{company.size} employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-medium">{company.foundedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{company.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Israeli Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Israeli Founders</div>
                  <div className="space-y-1">
                    {company.israeliFounders?.map((founder) => (
                      <div key={founder} className="flex items-center gap-2">
                        <User className="h-3 w-3 text-primary" />
                        <span className="text-sm">{founder}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Israeli Employees</span>
                    <span className="font-medium">{company.israeliEmployees}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
              <CardDescription>{company.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Map view: {company.lat}, {company.lng}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
