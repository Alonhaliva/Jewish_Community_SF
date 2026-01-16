"use client"

import { useState } from "react"
import { SideNav } from "@/components/side-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockGroups, groupCategories } from "@/lib/mock-data"
import { Users, Mail } from "lucide-react"

export default function GroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const filteredGroups = mockGroups.filter((group) => {
    return selectedCategory === "All Categories" || group.category === selectedCategory
  })

  const isRequestToJoin = (url: string) => url.startsWith("mailto:")

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SideNav />

      <div
        className="absolute inset-0 left-20 overflow-auto pt-24"
        style={{
          background: `radial-gradient(circle at top right, hsla(221, 83%, 53%, 0.15), transparent 50%),
                       radial-gradient(circle at bottom left, hsla(262, 83%, 58%, 0.1), transparent 50%),
                       linear-gradient(to bottom, transparent, #f8fafc)`,
        }}
      >
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Groups</h1>
            <p className="text-muted-foreground">{filteredGroups.length} groups</p>
          </div>

          {/* Filter */}
          <div className="max-w-xs mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {groupCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {group.category}
                    </Badge>
                    {group.members > 0 ? (
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {group.members}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        Request
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription className="text-sm">{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full" asChild>
                    <a href={group.joinUrl} target="_blank" rel="noopener noreferrer">
                      {isRequestToJoin(group.joinUrl) ? "Request to Join" : "Join"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
