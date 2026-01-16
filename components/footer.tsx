import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Israeli SV Map</span>
            </div>
            <p className="text-sm text-muted-foreground">Connecting the Israeli tech community in Silicon Valley</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/database" className="hover:text-foreground transition-colors">
                  Database
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-foreground transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-foreground transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/groups" className="hover:text-foreground transition-colors">
                  Groups
                </Link>
              </li>
              <li>
                <Link href="/whats-new" className="hover:text-foreground transition-colors">
                  What&apos;s New
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Join our community and stay updated with the latest from Israeli tech in Silicon Valley.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Israeli Silicon Valley Map. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
