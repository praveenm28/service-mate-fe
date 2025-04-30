import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle } from "lucide-react"

interface ProviderServicesProps {
  providerId: string
}

export function ProviderServices({ providerId }: ProviderServicesProps) {
  // Mock services data - in a real app, you would fetch this from an API
  const services = [
    {
      id: "s1",
      name: "Basic Home Cleaning",
      description:
        "Standard cleaning service for homes up to 2,000 sq ft. Includes dusting, vacuuming, mopping, and bathroom cleaning.",
      price: 50,
      duration: "2-3 hours",
      features: [
        "Dusting all surfaces",
        "Vacuuming carpets",
        "Mopping floors",
        "Bathroom cleaning",
        "Kitchen cleaning",
      ],
      popular: true,
    },
    {
      id: "s2",
      name: "Deep Cleaning",
      description:
        "Thorough cleaning service that covers hard-to-reach areas and includes detailed cleaning of all rooms.",
      price: 100,
      duration: "4-6 hours",
      features: [
        "Everything in Basic Cleaning",
        "Inside cabinet cleaning",
        "Baseboards and crown molding",
        "Window sills and tracks",
        "Detailed appliance cleaning",
        "Behind furniture cleaning",
      ],
      popular: false,
    },
    {
      id: "s3",
      name: "Move-in/Move-out Cleaning",
      description: "Comprehensive cleaning service for when you're moving in or out of a property.",
      price: 150,
      duration: "5-8 hours",
      features: [
        "Everything in Deep Cleaning",
        "Inside oven cleaning",
        "Inside refrigerator cleaning",
        "Inside all cabinets",
        "Closet cleaning",
        "Wall spot cleaning",
        "Light fixture cleaning",
      ],
      popular: false,
    },
    {
      id: "s4",
      name: "Office Cleaning",
      description: "Professional cleaning service for office spaces and commercial properties.",
      price: 80,
      duration: "Varies by size",
      features: [
        "Dusting and wiping surfaces",
        "Vacuuming and mopping",
        "Restroom sanitizing",
        "Break room cleaning",
        "Trash removal",
        "Glass and window cleaning",
      ],
      popular: false,
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Services Offered</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className={service.popular ? "border-primary" : ""}>
            {service.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary">Popular</Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{service.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>

              <div>
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="text-xl font-bold">${service.price}/hr</div>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
