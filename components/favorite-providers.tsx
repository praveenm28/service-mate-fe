import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export function FavoriteProviders() {
  // In a real app, you would fetch the user's favorite providers
  const providers = [
    {
      id: "1",
      name: "CleanPro Services",
      category: "Cleaning",
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Quick Fix Plumbers",
      category: "Plumbing",
      rating: 4.7,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Green Thumb Gardens",
      category: "Landscaping",
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  if (providers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't saved any providers yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{provider.name}</h3>
                <div className="text-sm text-muted-foreground">{provider.category}</div>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{provider.rating}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/providers/${provider.id}`}>View Profile</Link>
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
