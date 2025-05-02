"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface ProviderFiltersProps {
  filters: {
    category: string
    rating: string
    sortBy: string
  }
  onFilterChange: (
    filters: Partial<{
      category: string
      rating: string
      sortBy: string
    }>,
  ) => void
}

export function ProviderFilters({ filters, onFilterChange }: ProviderFiltersProps) {
  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Cleaning", label: "Cleaning" },
    { id: "Plumbing", label: "Plumbing" },
    { id: "Electrical", label: "Electrical" },
    { id: "Landscaping", label: "Landscaping" },
    { id: "Painting", label: "Painting" },
    { id: "Assembly", label: "Furniture Assembly" },
  ]

  const ratings = [
    { id: "all", label: "Any Rating" },
    { id: "4plus", label: "4+ Stars" },
    { id: "4.5plus", label: "4.5+ Stars" },
    { id: "5", label: "5 Stars Only" },
  ]

  const sortOptions = [
    { id: "rating", label: "Highest Rated" },
    { id: "jobs", label: "Most Jobs Completed" },
    { id: "newest", label: "Newest Providers" },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Category</h3>
          <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Rating</h3>
          <RadioGroup value={filters.rating} onValueChange={(value) => onFilterChange({ rating: value })}>
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                <Label htmlFor={`rating-${rating.id}`}>{rating.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Sort By</h3>
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange({ sortBy: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
