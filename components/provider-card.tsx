import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, CheckCircle } from "lucide-react"
import { ServiceProvider } from "@/lib/types/ServiceProvider"

interface ProviderCardProps {
  provider: ServiceProvider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={provider.userResponse?.preSignedUrl || "/placeholder.svg?height=80&width=80"} alt={provider.name} />
            <AvatarFallback>{provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <h3 className="font-semibold text-lg">{provider.name}</h3>
              {provider.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 mr-1">{provider.avgRating.toFixed(1)}</span>
                
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-center line-clamp-2">{provider.description}</p>

          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {provider.categoryResponses.slice(0, 3).map((category) => (
              <Badge key={category?.id} variant="secondary" className="text-xs">
                {category?.name}
              </Badge>
            ))}
            {provider.categoryResponses.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{provider.categoryResponses.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6">
        <div className="w-full flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/user/providers/${provider.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
