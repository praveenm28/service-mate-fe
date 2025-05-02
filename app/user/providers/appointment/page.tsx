"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MapPinIcon, CalendarIcon, ClockIcon, SearchIcon, FilterIcon, CheckIcon, XIcon, UserIcon } from "lucide-react"

// Define appointment type
type Appointment = {
  id: string
  serviceName: string
  providerName: string
  providerImage: string
  date: string
  time: string
  duration: string
  address: string
  city: string
  status: "pending" | "completed" | "cancelled" | "upcoming"
  price: string
  notes?: string
}

export default function AppointmentsPage() {
  // Sample appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "apt-001",
      serviceName: "Deep House Cleaning",
      providerName: "CleanPro Services",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-05-15",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      address: "123 Market Street",
      city: "San Francisco",
      status: "upcoming",
      price: "$120",
      notes: "Please focus on kitchen and bathrooms",
    },
    {
      id: "apt-002",
      serviceName: "Plumbing Repair",
      providerName: "Quick Fix Plumbing",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-05-22",
      time: "2:00 PM - 4:00 PM",
      duration: "2 hours",
      address: "123 Market Street",
      city: "San Francisco",
      status: "pending",
      price: "$150",
    },
    {
      id: "apt-003",
      serviceName: "Electrical Inspection",
      providerName: "Safe Circuit Electricians",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-06-03",
      time: "9:00 AM - 11:00 AM",
      duration: "2 hours",
      address: "123 Market Street",
      city: "San Francisco",
      status: "pending",
      price: "$180",
    },
    {
      id: "apt-004",
      serviceName: "Regular Cleaning",
      providerName: "CleanPro Services",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-04-10",
      time: "1:00 PM - 3:00 PM",
      duration: "2 hours",
      address: "456 Pine Avenue",
      city: "Oakland",
      status: "completed",
      price: "$80",
    },
    {
      id: "apt-005",
      serviceName: "Window Cleaning",
      providerName: "Crystal Clear Windows",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-04-18",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      address: "789 Oak Street",
      city: "Berkeley",
      status: "completed",
      price: "$90",
    },
    {
      id: "apt-006",
      serviceName: "Lawn Mowing",
      providerName: "Green Thumb Landscaping",
      providerImage: "/placeholder.svg?height=80&width=80",
      date: "2023-04-25",
      time: "3:00 PM - 4:00 PM",
      duration: "1 hour",
      address: "321 Maple Road",
      city: "San Jose",
      status: "cancelled",
      price: "$60",
    },
  ])

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [cityFilter, setCity] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments)

  // Get unique cities for filter dropdown
  const cities = Array.from(new Set(appointments.map((apt) => apt.city)))

  // Apply filters
  useEffect(() => {
    let filtered = [...appointments]

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    // Date filter
    if (dateFilter) {
      const filterDateStr = format(dateFilter, "yyyy-MM-dd")
      filtered = filtered.filter((apt) => apt.date === filterDateStr)
    }

    // City filter
    if (cityFilter) {
      filtered = filtered.filter((apt) => apt.city === cityFilter)
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (apt) =>
          apt.serviceName.toLowerCase().includes(query) ||
          apt.providerName.toLowerCase().includes(query) ||
          apt.address.toLowerCase().includes(query),
      )
    }

    setFilteredAppointments(filtered)
  }, [statusFilter, dateFilter, cityFilter, searchQuery, appointments])

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter("all")
    setDateFilter(undefined)
    setCity("")
    setSearchQuery("")
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "completed":
        return "bg-green-600"
      case "cancelled":
        return "bg-red-600"
      case "upcoming":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">My Appointments</h1>
          <Button className="bg-white text-black hover:bg-gray-200">Book New Appointment</Button>
        </div>

        {/* Filters Section */}
        <Card className="bg-[#242424] border-gray-800 mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="outline"
                className="mt-2 md:mt-0 border-gray-700 text-white hover:bg-gray-800"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-400">
                  Search
                </Label>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search appointments..."
                    className="bg-[#1a1a1a] border-gray-700 focus:border-white pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-400">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 focus:border-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#242424] border-gray-700">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Filter */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-400">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[#1a1a1a] border-gray-700 hover:bg-gray-800"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? format(dateFilter, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#242424] border-gray-700">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                      className="bg-[#242424]"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* City Filter */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-400">
                  City
                </Label>
                <Select value={cityFilter} onValueChange={setCity}>
                  <SelectTrigger className="bg-[#1a1a1a] border-gray-700 focus:border-white">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#242424] border-gray-700">
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="bg-[#242424] border-gray-800 p-8">
              <div className="text-center">
                <FilterIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No appointments found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-[#242424] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row">
                    {/* Provider Image */}
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <Image
                        src={appointment.providerImage || "/placeholder.svg"}
                        alt={appointment.providerName}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </div>

                    {/* Appointment Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{appointment.serviceName}</h3>
                          <p className="text-gray-400">{appointment.providerName}</p>
                        </div>
                        <Badge
                          className={`${getStatusBadgeColor(appointment.status)} self-start md:self-center mt-2 md:mt-0`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">{format(parseISO(appointment.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">
                            {appointment.address}, {appointment.city}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">{appointment.price}</span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-800">
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-gray-400">Notes: </span>
                            {appointment.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap gap-2">
                        {appointment.status === "pending" && (
                          <>
                            <Button className="bg-green-600 hover:bg-green-700">
                              <CheckIcon className="w-4 h-4 mr-2" />
                              Confirm
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-700 text-red-400 hover:bg-red-900 hover:text-red-300"
                            >
                              <XIcon className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === "upcoming" && (
                          <>
                            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-700 text-red-400 hover:bg-red-900 hover:text-red-300"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <Button className="bg-white text-black hover:bg-gray-200">Leave Review</Button>
                        )}
                        <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 ml-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
