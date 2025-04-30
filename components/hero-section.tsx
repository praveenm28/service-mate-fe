import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find the perfect service provider for your needs
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect with trusted professionals for home services, repairs, personal care, and more.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="What service do you need?" className="pl-8 w-full" />
              </div>
              <Button type="submit" size="default">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/services?category=cleaning">Cleaning</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/services?category=plumbing">Plumbing</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/services?category=electrical">Electrical</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/services?category=landscaping">Landscaping</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-lg bg-background">
              <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/0 to-background/20" />
              <div className="flex h-full items-center justify-center">
                <img
                  src="/placeholder.svg?height=350&width=500"
                  alt="Hero image"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
