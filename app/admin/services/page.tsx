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
import { MoreHorizontal, Search, Plus } from "lucide-react"

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock service data - in a real app, this would come from an API
  const services = [
    {
      id: "s1",
      title: "Home Cleaning",
      provider: "CleanPro Services",
      providerId: "p1",
      category: "Cleaning",
      price: 80,
      status: "active",
      createdAt: "2023-01-15",
      bookings: 24,
    },
    {
      id: "s2",
      title: "Plumbing Repair",
      provider: "Quick Fix Plumbers",
      providerId: "p2",
      category: "Plumbing",
      price: 95,
      status: "active",
      createdAt: "2023-02-20",
      bookings: 18,
    },
    {
      id: "s3",
      title: "Lawn Maintenance",
      provider: "Green Thumb Gardens",
      providerId: "p3",
      category: "Landscaping",
      price: 60,
      status: "pending",
      createdAt: "2023-03-10",
      bookings: 0,
    },
    {
      id: "s4",
      title: "Electrical Work",
      provider: "PowerTech Electric",
      providerId: "p4",
      category: "Electrical",
      price: 110,
      status: "active",
      createdAt: "2023-04-05",
      bookings: 12,
    },
    {
      id: "s5",
      title: "Furniture Assembly",
      provider: "Assembly Pros",
      providerId: "p5",
      category: "Assembly",
      price: 70,
      status: "inactive",
      createdAt: "2023-05-12",
      bookings: 8,
    },
    {
      id: "s6",
      title: "Deep Cleaning",
      provider: "CleanPro Services",
      providerId: "p1",
      category: "Cleaning",
      price: 120,
      status: "active",
      createdAt: "2023-02-28",
      bookings: 15,
    },
    {
      id: "s7",
      title: "Painting Services",
      provider: "Color Masters",
      providerId: "p6",
      category: "Painting",
      price: 90,
      status: "pending",
      createdAt: "2023-06-10",
      bookings: 0,
    },
  ]

  // Filter services based on search query and filters
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    const matchesStatus = statusFilter === "all" || service.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search services..."
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Cleaning">Cleaning</SelectItem>
              <SelectItem value="Plumbing">Plumbing</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Landscaping">Landscaping</SelectItem>
              <SelectItem value="Assembly">Assembly</SelectItem>
              <SelectItem value="Painting">Painting</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.provider}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>${service.price}</TableCell>
                <TableCell>
                  <StatusBadge status={service.status} />
                </TableCell>
                <TableCell>{service.bookings}</TableCell>
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
                      <DropdownMenuItem>Edit Service</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {service.status === "pending" && <DropdownMenuItem>Approve Service</DropdownMenuItem>}
                      {service.status === "active" ? (
                        <DropdownMenuItem>Deactivate Service</DropdownMenuItem>
                      ) : service.status === "inactive" ? (
                        <DropdownMenuItem>Activate Service</DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem className="text-destructive">Delete Service</DropdownMenuItem>
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
    case "active":
      variant = "default"
      break
    case "pending":
      variant = "secondary"
      break
    case "inactive":
      variant = "outline"
      break
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  )
}
