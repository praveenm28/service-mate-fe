import { Badge } from "@/components/ui/badge"

export function AdminRecentBookings() {
  // Mock data - in a real app, this would come from an API
  const recentBookings = [
    {
      id: "b1",
      service: "Home Cleaning",
      customer: "John Smith",
      provider: "CleanPro Services",
      date: "2023-11-15",
      time: "10:00 AM",
      status: "confirmed",
      price: 80,
    },
    {
      id: "b2",
      service: "Plumbing Repair",
      customer: "Sarah Johnson",
      provider: "Quick Fix Plumbers",
      date: "2023-11-20",
      time: "02:00 PM",
      status: "pending",
      price: 95,
    },
    {
      id: "b3",
      service: "Lawn Maintenance",
      customer: "Michael Brown",
      provider: "Green Thumb Gardens",
      date: "2023-10-05",
      time: "09:00 AM",
      status: "completed",
      price: 60,
    },
    {
      id: "b4",
      service: "Electrical Work",
      customer: "Emily Davis",
      provider: "PowerTech Electric",
      date: "2023-11-25",
      time: "11:00 AM",
      status: "confirmed",
      price: 110,
    },
    {
      id: "b5",
      service: "Furniture Assembly",
      customer: "Robert Wilson",
      provider: "Assembly Pros",
      date: "2023-11-18",
      time: "03:00 PM",
      status: "cancelled",
      price: 70,
    },
  ]

  return (
    <div className="space-y-4">
      {recentBookings.map((booking) => (
        <div key={booking.id} className="flex flex-col space-y-2 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">{booking.service}</span>
            <StatusBadge status={booking.status} />
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span>{booking.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider:</span>
              <span>{booking.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time:</span>
              <span>
                {new Date(booking.date).toLocaleDateString()} at {booking.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium">${booking.price}</span>
            </div>
          </div>
        </div>
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

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  )
}
