"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SideNav } from "@/components/side-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle2, ArrowRight, Building2, Globe, Linkedin, MapPin } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industry: z.string().min(1, "Please select an industry"),
  city: z.string().min(2, "City is required"),
  type: z.enum(["company", "vc", "investor"], {
    required_error: "Please select an entity type",
  }),
  employees: z.string().optional(),
})

const industryOptions = [
  "Cybersecurity", "Fintech", "AI", "Adtech", "Retail", "Proptech",
  "Healthcare", "Energy", "B2C", "Enterprise", "Other"
]

export default function AddCompanyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      linkedin: "",
      description: "",
      industry: "",
      city: "Palo Alto",
      type: "company",
      employees: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/companies/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          employees: values.employees ? parseInt(values.employees) : 0,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || `Server Error (${response.status})`)
      }

      setIsSuccess(true)
    } catch (error: any) {
      console.error(error)
      alert("Submission error: " + (error?.message || "Unknown error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col font-sans">
        {/* Animated Background */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <SideNav />

        <div className="flex-1 flex items-center justify-center p-6 pt-24 h-screen">
          <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100/80 rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-white">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
              Submission Received!
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              <span className="font-semibold text-gray-900">{form.getValues().name}</span> has been added to the queue.
            </p>

            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 text-sm text-gray-500 mb-6">
              <p>Your company is now <strong>pending approval</strong>.</p>
              <p>It will appear on the map automatically once verified.</p>
            </div>

            <Button
              onClick={() => {
                setIsSuccess(false)
                form.reset()
              }}
              className="w-full bg-black hover:bg-gray-800 text-white shadow-lg transition-all hover:scale-[1.02] h-12 rounded-xl"
            >
              Add Another Company
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FBFBFD] font-sans selection:bg-blue-100">
      <SideNav />

      {/* Left Panel - Sticky & Visual */}
      <div className="lg:w-[45%] lg:fixed lg:h-screen bg-white relative overflow-hidden flex flex-col justify-center p-12 lg:p-20 border-r border-gray-100 z-10">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-70" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50/30 rounded-full blur-3xl opacity-60" />

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-gray-600 text-[10px] font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Community Contribution
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl text-gray-900 leading-[0.95] tracking-tight mb-8">
            Add to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ecosystem.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-md">
            Help us map the entire Israeli tech landscape in Silicon Valley.
            Join over 160+ companies, VCs, and investors making an impact.
          </p>

          <div className="mt-12 flex items-center gap-4 text-sm font-medium text-gray-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <span>Join the community</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Scrollable Form */}
      <div className="lg:w-[55%] lg:ml-auto min-h-screen bg-[#FBFBFD] relative">
        <div className="max-w-xl mx-auto px-6 py-20 lg:py-32">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* Section 1: Identity */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-gray-900 border-b border-gray-100 pb-2">Identity</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Company Name</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input placeholder="e.g. Waze" className="pl-10 bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 transition-all" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Entity Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-transparent shadow-sm ring-1 ring-gray-100 h-11 focus:ring-2 focus:ring-blue-500/20">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="company">🏢 Company</SelectItem>
                            <SelectItem value="vc">💼 VC / Fund</SelectItem>
                            <SelectItem value="investor">💰 Angel Investor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-transparent shadow-sm ring-1 ring-gray-100 h-11 focus:ring-2 focus:ring-blue-500/20">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industryOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">City (Bay Area)</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input placeholder="e.g. Palo Alto" className="pl-10 bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 transition-all" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 2: Details */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-gray-900 border-b border-gray-100 pb-2">Details</h3>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What does the company do? (Min 10 chars)"
                          className="bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 min-h-[120px] resize-none p-4 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Website</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Globe className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input placeholder="https://..." className="pl-10 bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 transition-all" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">LinkedIn</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Linkedin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input placeholder="https://linkedin.com/..." className="pl-10 bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 transition-all" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">Employee Count (Approx)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" className="bg-white border-transparent shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 transition-all max-w-[140px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-medium bg-black hover:bg-gray-800 text-white rounded-lg shadow-xl shadow-gray-200 transition-all hover:scale-[1.01]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center">
                      Submit Company <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
                    </span>
                  )}
                </Button>
                <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">
                  Submissions are reviewed within 24 hours
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
