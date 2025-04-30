"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"

interface ProviderReviewsProps {
  providerId: string
  providerRating: number
}

export function ProviderReviews({ providerId, providerRating }: ProviderReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent")

  // Mock reviews data - in a real app, you would fetch this from an API
  const reviews = [
    {
      id: "r1",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Excellent service! The cleaners were thorough, professional, and left my home spotless. Will definitely book again.",
      helpful: 12,
      service: "Deep Cleaning",
    },
    {
      id: "r2",
      user: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Good service overall. They did a great job with most areas, though I had to point out a few spots they missed initially. They were very responsive and fixed the issues right away.",
      helpful: 5,
      service: "Basic Home Cleaning",
    },
    {
      id: "r3",
      user: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-09-10",
      comment:
        "I've tried several cleaning services, and this is by far the best. The attention to detail was impressive! They even organized my messy shelves without me asking.",
      helpful: 8,
      service: "Move-in/Move-out Cleaning",
    },
    {
      id: "r4",
      user: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      date: "2023-08-22",
      comment:
        "The service was okay. They cleaned most areas well but missed some spots under furniture. They were on time and professional though.",
      helpful: 2,
      service: "Basic Home Cleaning",
    },
    {
      id: "r5",
      user: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-08-05",
      comment:
        "Absolutely fantastic! They went above and beyond what I expected. My apartment hasn't been this clean since I moved in. Highly recommend their deep cleaning service.",
      helpful: 15,
      service: "Deep Cleaning",
    },
  ]

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingCounts[5 - review.rating]++
  })

  const totalReviews = reviews.length
  const ratingPercentages = ratingCounts.map((count) => (count / totalReviews) * 100)

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else {
      return a.rating - b.rating
    }
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold mr-4">{providerRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(providerRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="w-12 text-sm">{rating} stars</div>
                  <Progress value={ratingPercentages[index]} className="h-2" />
                  <div className="w-8 text-sm text-right">{ratingCounts[index]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Sort Reviews</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("recent")}
              >
                Most Recent
              </Button>
              <Button
                variant={sortBy === "highest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("highest")}
              >
                Highest Rated
              </Button>
              <Button
                variant={sortBy === "lowest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("lowest")}
              >
                Lowest Rated
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                    <AvatarFallback>{review.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.user}</div>
                    <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Service: {review.service}</div>
                <p className="text-sm">{review.comment}</p>
              </div>

              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
