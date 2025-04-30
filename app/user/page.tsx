import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceCard } from "@/components/service-card"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProviders } from "@/components/featured-providers"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-12 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Popular Services</h2>
          <p className="text-muted-foreground max-w-[700px]">
            Browse our most popular services from verified providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            id="1"
            title="Home Cleaning"
            provider="CleanPro Services"
            rating={4.8}
            price={80}
            image="/placeholder.svg?height=200&width=300"
          />
          <ServiceCard
            id="2"
            title="Plumbing Repair"
            provider="Quick Fix Plumbers"
            rating={4.7}
            price={95}
            image="/placeholder.svg?height=200&width=300"
          />
          <ServiceCard
            id="3"
            title="Lawn Maintenance"
            provider="Green Thumb Gardens"
            rating={4.9}
            price={60}
            image="/placeholder.svg?height=200&width=300"
          />
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Top Service Providers</h2>
            <p className="text-muted-foreground max-w-[700px]">Meet our highest-rated service professionals</p>
          </div>

          <FeaturedProviders />
        </div>
      </section>

      <section className="container py-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to offer your services?</CardTitle>
            <CardDescription className="text-center">
              Join our platform as a service provider and grow your business
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/provider/register">Become a Provider</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
