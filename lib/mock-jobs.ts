export interface Job {
    id: string
    title: string
    department: string
    location: string
    type: string
    company: string
    companyId: string
    postedDate: string // e.g. "2d ago" of "Jan 5"
    link: string
}

const ROLES = [
    // Engineering
    "Senior Software Engineer, Backend",
    "Staff Software Engineer, Frontend",
    "Principal Engineer, Platform",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Full Stack Developer",
    "Mobile Engineer (iOS)",
    "Software Architect",
    "Data Engineer",
    "Machine Learning Engineer",
    // Product
    "Senior Product Manager",
    "Director of Product Management",
    "Product Designer",
    "UX Researcher",
    "Technical Product Manager",
    // Sales & Marketing
    "Enterprise Account Executive",
    "Sales Development Representative",
    "Solutions Engineer",
    "Customer Success Manager",
    "Marketing Manager",
    "Content Strategist",
    "Growth Hacker",
    // G&A
    "HR Business Partner",
    "Talent Acquisition Specialist",
    "Finance Manager",
    "Legal Counsel"
]

const COMPANIES = [
    { name: "Wiz", id: "wiz" },
    { name: "Gong", id: "gong" },
    { name: "Deel", id: "deel" },
    { name: "Navan", id: "navan" },
    { name: "Rapyd", id: "rapyd" },
    { name: "SentinelOne", id: "sentinelone" },
    { name: "AppsFlyer", id: "appsflyer" },
    { name: "Monday.com", id: "monday" },
    { name: "Riskified", id: "riskified" },
    { name: "JFrog", id: "jfrog" },
    { name: "CyberArk", id: "cyberark" },
    { name: "Snyk", id: "snyk" },
    { name: "Palo Alto Networks", id: "panw" }
]

const LOCATIONS = [
    "San Francisco, CA",
    "Palo Alto, CA",
    "San Mateo, CA",
    "Tel Aviv (Remote option)",
    "New York, NY",
    "Remote - US",
    "Mountain View, CA",
    "Sunnyvale, CA"
]

const DEPARTMENTS = {
    "Engineer": "Engineering",
    "Developer": "Engineering",
    "Product": "Product",
    "Designer": "Product",
    "Sales": "Sales",
    "Account": "Sales",
    "Marketing": "Marketing",
    "HR": "People",
    "Talent": "People",
    "Finance": "Finance",
    "Legal": "Legal",
    "Success": "Customer Success",
    "Solutions": "Sales"
}

// Generate 120 Jobs
export const MOCK_JOBS: Job[] = Array.from({ length: 120 }).map((_, i) => {
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)]
    const role = ROLES[Math.floor(Math.random() * ROLES.length)]
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

    // Determine Dept
    let department = "General"
    for (const [key, val] of Object.entries(DEPARTMENTS)) {
        if (role.includes(key)) department = val
    }

    return {
        id: `job-${i}`,
        title: role,
        department,
        location,
        type: "Full-time",
        company: company.name,
        companyId: company.id,
        postedDate: `${Math.floor(Math.random() * 7) + 1}d ago`,
        link: `/jobs/${company.id}/${i}`
    }
})
