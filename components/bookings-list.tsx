import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

interface BookingsListProps {
  status: "upcoming" | "past"
}

export function BookingsList({ status }: BookingsListProps) {
  // In a real app, you would fetch bookings from an API
  const bookings = [
    {
      id: "1",
      service: "Home Cleaning",
      provider: "CleanPro Services",
      date: "2023-11-15",
      time: "10:00 AM",
      location: "123 Main St, Apt 4B",
      status: "confirmed",
      price: 80,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      service: "Plumbing Repair",
      provider: "Quick Fix Plumbers",
      date: "2023-11-20",
      time: "02:00 PM",
      location: "123 Main St, Apt 4B",
      status: "pending",
      price: 95,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      service: "Lawn Maintenance",
      provider: "Green Thumb Gardens",
      date: "2023-10-05",
      time: "09:00 AM",
      location: "123 Main St, Apt 4B",
      status: "completed",
      price: 60,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date)
    const today = new Date()

    if (status === "upcoming") {
      return bookingDate >= today || booking.status !== "completed"
    } else {
      return bookingDate < today && booking.status === "completed"
    }
  })

  if (filteredBookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No {status} bookings found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredBookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.service}</CardTitle>
                <CardDescription>{booking.provider}</CardDescription>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
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
            {status === "upcoming" && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="destructive" size="sm">
                  Cancel
                </Button>
              </div>
            )}
            {status === "past" && (
              <Button variant="outline" size="sm">
                Leave Review
              </Button>
            )}
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
