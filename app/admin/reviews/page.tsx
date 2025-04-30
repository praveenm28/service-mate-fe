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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, Star } from "lucide-react"

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock review data - in a real app, this would come from an API
  const reviews = [
    {
      id: "r1",
      service: "Home Cleaning",
      serviceId: "s1",
      customer: "Sarah Johnson",
      customerId: "u2",
      provider: "CleanPro Services",
      providerId: "p1",
      rating: 5,
      comment:
        "Excellent service! The cleaners were thorough, professional, and left my home spotless. Will definitely book again.",
      date: "2023-10-15",
      status: "published",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "r2",
      service: "Plumbing Repair",
      serviceId: "s2",
      customer: "Michael Chen",
      customerId: "u3",
      provider: "Quick Fix Plumbers",
      providerId: "p2",
      rating: 4,
      comment:
        "Good service overall. They did a great job with most areas, though I had to point out a few spots they missed initially.",
      date: "2023-09-28",
      status: "published",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "r3",
      service: "Lawn Maintenance",
      serviceId: "s3",
      customer: "Emily Rodriguez",
      customerId: "u4",
      provider: "Green Thumb Gardens",
      providerId: "p3",
      rating: 5,
      comment: "I've tried several lawn services, and this is by far the best. The attention to detail was impressive!",
      date: "2023-09-10",
      status: "published",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "r4",
      service: "Electrical Work",
      serviceId: "s4",
      customer: "David Wilson",
      customerId: "u5",
      provider: "PowerTech Electric",
      providerId: "p4",
      rating: 2,
      comment: "The electrician was late and didn't fix the issue properly. Had to call them back to redo the work.",
      date: "2023-10-20",
      status: "flagged",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "r5",
      service: "Furniture Assembly",
      serviceId: "s5",
      customer: "Jennifer Lee",
      customerId: "u6",
      provider: "Assembly Pros",
      providerId: "p5",
      rating: 4,
      comment: "Quick and efficient assembly. The technician was friendly and professional.",
      date: "2023-10-05",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "r6",
      service: "Home Cleaning",
      serviceId: "s1",
      customer: "Robert Brown",
      customerId: "u7",
      provider: "CleanPro Services",
      providerId: "p1",
      rating: 1,
      comment: "Terrible service! They were 2 hours late and did a rushed job. Many areas were still dirty.",
      date: "2023-10-25",
      status: "flagged",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter reviews based on search query and filters
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchQuery === "" ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesStatus = statusFilter === "all" || review.status === statusFilter

    return matchesSearch && matchesRating && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reviews</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search reviews..."
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
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.customer} />
                      <AvatarFallback>{review.customer.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{review.customer}</span>
                  </div>
                </TableCell>
                <TableCell>{review.service}</TableCell>
                <TableCell>{review.provider}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={review.status} />
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
                      {review.status === "pending" && <DropdownMenuItem>Approve Review</DropdownMenuItem>}
                      {review.status === "flagged" && <DropdownMenuItem>Unflag Review</DropdownMenuItem>}
                      {review.status === "published" && <DropdownMenuItem>Flag Review</DropdownMenuItem>}
                      <DropdownMenuItem className="text-destructive">Delete Review</DropdownMenuItem>
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
    case "published":
      variant = "default"
      break
    case "pending":
      variant = "secondary"
      break
    case "flagged":
      variant = "destructive"
      break
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  )
}
