"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar, MoreHorizontal, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [date, setDate] = useState<Date>()

  // Mock booking data - in a real app, this would come from an API
  const bookings = [
    {
      id: "b1",
      service: "Home Cleaning",
      serviceId: "s1",
      customer: "John Smith",
      customerId: "u1",
      provider: "CleanPro Services",
      providerId: "p1",
      date: "2023-11-15",
      time: "10:00 AM",
      status: "confirmed",
      price: 80,
    },
    {
      id: "b2",
      service: "Plumbing Repair",
      serviceId: "s2",
      customer: "Sarah Johnson",
      customerId: "u2",
      provider: "Quick Fix Plumbers",
      providerId: "p2",
      date: "2023-11-20",
      time: "02:00 PM",
      status: "pending",
      price: 95,
    },
    {
      id: "b3",
      service: "Lawn Maintenance",
      serviceId: "s3",
      customer: "Michael Brown",
      customerId: "u3",
      provider: "Green Thumb Gardens",
      providerId: "p3",
      date: "2023-10-05",
      time: "09:00 AM",
      status: "completed",
      price: 60,
    },
    {
      id: "b4",
      service: "Electrical Work",
      serviceId: "s4",
      customer: "Emily Davis",
      customerId: "u4",
      provider: "PowerTech Electric",
      providerId: "p4",
      date: "2023-11-25",
      time: "11:00 AM",
      status: "confirmed",
      price: 110,
    },
    {
      id: "b5",
      service: "Furniture Assembly",
      serviceId: "s5",
      customer: "Robert Wilson",
      customerId: "u5",
      provider: "Assembly Pros",
      providerId: "p5",
      date: "2023-11-18",
      time: "03:00 PM",
      status: "cancelled",
      price: 70,
    },
    {
      id: "b6",
      service: "Deep Cleaning",
      serviceId: "s6",
      customer: "Jennifer Lee",
      customerId: "u6",
      provider: "CleanPro Services",
      providerId: "p1",
      date: "2023-11-22",
      time: "01:00 PM",
      status: "confirmed",
      price: 120,
    },
    {
      id: "b7",
      service: "Plumbing Repair",
      serviceId: "s2",
      customer: "David Miller",
      customerId: "u7",
      provider: "Quick Fix Plumbers",
      providerId: "p2",
      date: "2023-11-10",
      time: "04:00 PM",
      status: "pending",
      price: 95,
    },
  ]

  // Filter bookings based on search query and filters
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    const matchesDate = !date || booking.date === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.provider}</TableCell>
                <TableCell>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </TableCell>
                <TableCell>${booking.price}</TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {booking.status === "pending" && <DropdownMenuItem>Confirm Booking</DropdownMenuItem>}
                      {booking.status === "confirmed" && <DropdownMenuItem>Mark as Completed</DropdownMenuItem>}
                      {(booking.status === "pending" || booking.status === "confirmed") && (
                        <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
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
