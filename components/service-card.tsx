import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  id: string
  title: string
  provider: string
  rating: number
  price: number
  image: string
}

export function ServiceCard({ id, title, provider, rating, price, image }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{provider}</p>
          <p className="font-medium">${price}/hr</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/services/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
