import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"

export function ProviderServices() {
  // In a real app, you would fetch services from an API
  const services = [
    {
      id: "1",
      title: "Home Cleaning",
      description: "Professional home cleaning service",
      price: 80,
      category: "Cleaning",
      status: "active",
      bookings: 24,
    },
    {
      id: "2",
      title: "Deep Cleaning",
      description: "Thorough deep cleaning for homes",
      price: 120,
      category: "Cleaning",
      status: "active",
      bookings: 18,
    },
    {
      id: "3",
      title: "Move-in/Move-out Cleaning",
      description: "Specialized cleaning for moving",
      price: 150,
      category: "Cleaning",
      status: "inactive",
      bookings: 7,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Services</h2>
        <Button asChild>
          <Link href="/provider/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.category}</CardDescription>
                </div>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
              <div className="flex justify-between text-sm">
                <span>
                  Price: <span className="font-medium">${service.price}</span>
                </span>
                <span>
                  Total Bookings: <span className="font-medium">{service.bookings}</span>
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/provider/services/${service.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
