import { SideNav } from "@/components/side-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Connect and empower the Israeli tech community in Silicon Valley.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Foster meaningful connections between Israeli professionals.",
    },
    {
      icon: Users,
      title: "Inclusive",
      description: "Welcome everyone interested in the Israeli tech ecosystem.",
    },
  ]

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SideNav />

      <div className="absolute inset-0 left-20 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">About</h1>
            <p className="text-muted-foreground max-w-2xl">
              The Israeli Silicon Valley Map is a community-driven platform showcasing and connecting the Israeli tech
              ecosystem.
            </p>
          </div>

          {/* Story Section */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-3">Our Story</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Silicon Valley has long been home to a vibrant Israeli tech community. From groundbreaking
                  cybersecurity startups to innovative fintech solutions, Israeli entrepreneurs have made an indelible
                  mark on the tech landscape.
                </p>
                <p>
                  The Israeli Silicon Valley Map was created to provide a centralized platform where anyone can explore
                  Israeli-founded companies, find opportunities, attend events, and join professional groups.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title}>
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
