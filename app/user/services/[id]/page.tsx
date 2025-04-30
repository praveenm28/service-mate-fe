import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingForm } from "@/components/booking-form"
import { ProviderInfo } from "@/components/provider-info"
import { Reviews } from "@/components/reviews"

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the service details based on the ID
  const serviceId = params.id

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=400&width=800" alt="Service image" fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Professional Home Cleaning Service</h1>
            <p className="text-muted-foreground mt-2">
              Provided by <span className="font-medium">CleanPro Services</span>
            </p>
          </div>

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 pt-4">
              <p>
                Our professional home cleaning service provides comprehensive cleaning for your entire home. We use
                eco-friendly products and follow a detailed checklist to ensure nothing is missed.
              </p>
              <p>
                Whether you need a one-time deep clean or regular maintenance, our experienced team will leave your home
                spotless and fresh.
              </p>
            </TabsContent>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div>
                <h3 className="font-semibold text-lg">What's Included:</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Dusting all surfaces</li>
                  <li>Vacuuming and mopping floors</li>
                  <li>Bathroom cleaning and sanitizing</li>
                  <li>Kitchen cleaning including appliances</li>
                  <li>Bed making and linen changing (upon request)</li>
                  <li>Window sill and baseboard cleaning</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Duration:</h3>
                <p>3-4 hours (depending on home size)</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <Reviews serviceId={serviceId} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">$80</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>4.8 (124 reviews)</span>
                  </div>
                </div>
                <BookingForm serviceId={serviceId} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ProviderInfo
                  name="CleanPro Services"
                  rating={4.8}
                  reviewCount={124}
                  responseTime="Within 1 hour"
                  image="/placeholder.svg?height=100&width=100"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
