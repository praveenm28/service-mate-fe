import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface ProviderInfoProps {
  name: string
  rating: number
  reviewCount: number
  responseTime: string
  image: string
}

export function ProviderInfo({ name, rating, reviewCount, responseTime, image }: ProviderInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span>
              {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Response Time</span>
          <span>{responseTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Verification</span>
          <span className="text-green-600">Verified</span>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <MessageSquare className="mr-2 h-4 w-4" />
        Contact Provider
      </Button>
    </div>
  )
}
