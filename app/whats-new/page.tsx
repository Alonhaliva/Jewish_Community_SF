"use client"
import type React from "react"
import { SideNav } from "@/components/side-nav"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Newspaper, Sparkles, TrendingUp, Rocket, Mail, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
interface Article {
  id?: string
  title: string
  link: string
  description: string
  source: string
  published_at?: string
}
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Wiz Surpasses $500M ARR, Eyes Major Expansion",
    link: "https://techcrunch.com",
    description:
      "Israeli cybersecurity unicorn Wiz continues rapid growth in Silicon Valley market, adding major enterprise clients.",
    source: "TechCrunch",
  },
  {
    id: "2",
    title: "Israeli AI Startup Secures $100M Series C Led by Sequoia",
    link: "https://www.calcalistech.com",
    description:
      "Tel Aviv-based AI infrastructure company raises major round to expand Bay Area operations and R&D team.",
    source: "Calcalist",
  },
  {
    id: "3",
    title: "Climate Tech: Israeli Startup's Carbon Solution Gains Traction",
    link: "https://en.globes.co.il",
    description:
      "Israeli climate technology company partners with California utilities to deploy innovative carbon capture systems.",
    source: "Globes",
  },
  {
    id: "4",
    title: "Israeli Founders Network Hosts Annual Bay Area Summit",
    link: "https://www.ynetnews.com",
    description:
      "Over 500 Israeli entrepreneurs, VCs, and tech leaders gather in San Francisco for networking and knowledge sharing.",
    source: "Ynetnews",
  },
  {
    id: "5",
    title: "Monday.com Expands Silicon Valley Office, Plans 200 New Hires",
    link: "https://www.jpost.com",
    description:
      "Israeli unicorn doubles down on Bay Area presence with new engineering hub and aggressive hiring plan.",
    source: "Jerusalem Post",
  },
]
// Force Vercel Rebuild: v2.0
export default function WhatsNewPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const response = await fetch("/api/tech-news")

        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }
        const responseData = await response.json()
        const data = responseData.articles || []

        if (!Array.isArray(data)) {
          console.error("API returned non-array articles:", data)
          throw new Error("Invalid data format from API")
        }

        // Map NewsItem (from /api/news) to Article (local interface)
        const mappedArticles = data.map((item: any, index: number) => ({
          id: `news-${index}`,
          title: item.title,
          link: item.link,
          description: item.contentSnippet,
          source: item.source,
          published_at: item.isoDate
        }))

        setArticles(mappedArticles)
      } catch (err) {
        console.error("[v0] Error fetching articles:", err)
        // Fallback to mock only on error
        setArticles(mockArticles.map((article, index) => ({ ...article, id: article.id || `mock-${index}` })))
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || subscribing) return
    setSubscribing(true)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Subscription failed")
      }

      setSubscribed(true)
      setEmail("")
    } catch (error) {
      console.error("Failed to subscribe:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setSubscribing(false)
    }
  }
  const getIconAndColor = (index: number) => {
    const variants = [
      { icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
      { icon: TrendingUp, gradient: "from-purple-500 to-pink-500" },
      { icon: Rocket, gradient: "from-emerald-500 to-teal-500" },
      { icon: Newspaper, gradient: "from-orange-500 to-amber-500" },
      { icon: Sparkles, gradient: "from-indigo-500 to-blue-500" },
    ]
    return variants[index % variants.length]
  }
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
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-2xl">Stay Updated</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Get 3-10 daily articles about Israeli tech in Silicon Valley delivered to your inbox
                  </CardDescription>
                </div>
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="md:w-64 bg-white"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={subscribing}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {subscribing ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Subscribed successfully!</span>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient">What's New</h1>
            <p className="text-lg text-muted-foreground">
              Latest news and updates from the Israeli tech ecosystem • Updated daily
            </p>
          </div>
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading articles...</p>
              </div>
            </div>
          )}
          {!loading && articles.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => {
                const { icon: Icon, gradient } = getIconAndColor(index)
                return (
                  <Card
                    key={article.id}
                    className="hover:shadow-xl transition-all hover:scale-105 flex flex-col bg-white border-2 border-slate-100"
                  >
                    <CardHeader className="flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {article.source && (
                            <Badge className="text-xs font-semibold bg-slate-100 text-slate-700 border-slate-200">
                              {article.source}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-3 line-clamp-2 font-bold">{article.title}</CardTitle>
                      {article.description && (
                        <CardDescription className="text-sm line-clamp-3 mb-4 leading-relaxed">
                          {article.description}
                        </CardDescription>
                      )}
                      {article.link && (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-auto group"
                        >
                          Read full article
                          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          )}
          {!loading && articles.length === 0 && (
            <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
              <CardHeader className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
                    <Newspaper className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">No articles yet</CardTitle>
                <CardDescription className="text-base">
                  Check back soon for the latest updates from the Israeli tech community.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
