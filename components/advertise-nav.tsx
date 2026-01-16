import Link from "next/link"

export function AdvertiseNav() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10">
            <Link href="/advertise" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity text-white">
                ISV<span className="text-purple-500">.</span>Map
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
                <Link href="/advertise/audiences" className="hover:text-white cursor-pointer transition-colors">
                    Audiences
                </Link>
                <Link href="/advertise/case-studies" className="hover:text-white cursor-pointer transition-colors">
                    Case Studies
                </Link>
                <Link href="/advertise/best-practices" className="hover:text-white cursor-pointer transition-colors">
                    Best Practices
                </Link>
            </div>
        </nav>
    )
}
