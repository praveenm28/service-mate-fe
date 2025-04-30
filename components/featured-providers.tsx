import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedProviders() {
  const providers = [
    {
      id: "1",
      name: "CleanPro Services",
      category: "Cleaning",
      rating: 4.8,
      jobs: 124,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Quick Fix Plumbers",
      category: "Plumbing",
      rating: 4.7,
      jobs: 98,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Green Thumb Gardens",
      category: "Landscaping",
      rating: 4.9,
      jobs: 156,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "PowerTech Electric",
      category: "Electrical",
      rating: 4.6,
      jobs: 87,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardContent className="pt-6 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
              <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.category}</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span>
                {provider.rating} ({provider.jobs} jobs)
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button variant="outline" asChild>
              <Link href={`/providers/${provider.id}`}>View Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
