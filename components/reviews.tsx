import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewsProps {
  serviceId: string
}

export function Reviews({ serviceId }: ReviewsProps) {
  // In a real app, you would fetch reviews based on the service ID
  const reviews = [
    {
      id: "1",
      user: "Sarah Johnson",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Excellent service! The cleaners were thorough, professional, and left my home spotless. Will definitely book again.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      user: "Michael Chen",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Good service overall. They did a great job with most areas, though I had to point out a few spots they missed initially.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      user: "Emily Rodriguez",
      rating: 5,
      date: "2023-09-10",
      comment:
        "I've tried several cleaning services, and this is by far the best. The attention to detail was impressive!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
              <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{review.user}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="mx-2">•</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <p className="text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
