"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingModal } from "@/components/booking-modal"
import { ProviderServices } from "@/components/provider-services"
import { ProviderReviews } from "@/components/provider-reviews"
import { ProviderGallery } from "@/components/provider-gallery"
import { useProviderStore } from "@/lib/stores/provider-store"
import { Star, MapPin, CheckCircle, Calendar, MessageSquare, Clock, Award } from "lucide-react"

export default function ProviderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const { providers, fetchProviders } = useProviderStore()

  useEffect(() => {
    fetchProviders()
  }, [fetchProviders])

  // Find the provider by ID
  const provider = providers.find((p) => p.id === id)

  if (!provider) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Provider not found</h2>
        <p className="text-muted-foreground mb-6">
          The service provider you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/providers">Back to Providers</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Provider Info - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Provider Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-2 border-background">
              <AvatarImage src={provider.image || "/placeholder.svg?height=96&width=96"} alt={provider.name} />
              <AvatarFallback>{provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                {provider.verified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{provider.location}</span>
              </div>

              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(provider.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 font-medium">{provider.rating.toFixed(1)}</span>
                <span className="ml-1 text-muted-foreground">({provider.completedJobs} jobs)</span>
              </div>
            </div>
          </div>

          {/* Provider Gallery Preview */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=500&width=900"
              alt={`${provider.name} featured image`}
              fill
              className="object-cover"
            />
          </div>

          {/* Provider Tabs */}
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services" id="services">
                Services
              </TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About {provider.name}</h2>
                <p className="text-muted-foreground">{provider.description}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                  sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla
                  enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Response Time</h4>
                      <p className="text-sm text-muted-foreground">Within 2 hours</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Member Since</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(provider.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Completion Rate</h4>
                      <p className="text-sm text-muted-foreground">98% of jobs completed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services">
              <ProviderServices providerId={id} />
            </TabsContent>

            <TabsContent value="gallery">
              <ProviderGallery providerId={id} />
            </TabsContent>

            <TabsContent value="reviews">
              <ProviderReviews providerId={id} providerRating={provider.rating} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card - Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Book {provider.name}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Starting price</span>
                    <span className="font-medium">$50/hr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium text-green-600">Available</span>
                  </div>
                  <Button className="w-full" onClick={() => setIsBookingModalOpen(true)}>
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        providerId={id}
        providerName={provider.name}
      />
    </div>
  )
}
