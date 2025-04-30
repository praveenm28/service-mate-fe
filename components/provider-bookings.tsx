import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export function ProviderBookings() {
  // In a real app, you would fetch bookings from an API
  const bookings = [
    {
      id: "1",
      service: "Home Cleaning",
      customer: "John Smith",
      date: "2023-11-15",
      time: "10:00 AM",
      location: "123 Main St, Apt 4B",
      status: "confirmed",
      price: 80,
    },
    {
      id: "2",
      service: "Home Cleaning",
      customer: "Emily Johnson",
      date: "2023-11-20",
      time: "02:00 PM",
      location: "456 Oak Ave",
      status: "pending",
      price: 95,
    },
    {
      id: "3",
      service: "Home Cleaning",
      customer: "Michael Brown",
      date: "2023-10-05",
      time: "09:00 AM",
      location: "789 Pine St",
      status: "completed",
      price: 60,
    },
  ]

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.service}</CardTitle>
                <CardDescription>Booking #{booking.id}</CardDescription>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.customer}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="font-medium">${booking.price}</div>
            <div className="flex space-x-2">
              {booking.status === "pending" && (
                <>
                  <Button variant="default" size="sm">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm">
                    Decline
                  </Button>
                </>
              )}
              {booking.status === "confirmed" && (
                <>
                  <Button variant="default" size="sm">
                    Start Service
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </>
              )}
              {booking.status === "completed" && (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline"

  switch (status) {
    case "confirmed":
      variant = "default"
      break
    case "pending":
      variant = "secondary"
      break
    case "completed":
      variant = "outline"
      break
    case "cancelled":
      variant = "destructive"
      break
  }

  return <Badge variant={variant}>{status}</Badge>
}
