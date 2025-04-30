"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingsList } from "@/components/bookings-list"
import { FavoriteProviders } from "@/components/favorite-providers"

export default function DashboardPage() {
  // In a real app, you would check if the user is authenticated
  // const isAuthenticated = useAuth()
  // if (!isAuthenticated) redirect('/login')

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow at 10:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Added 2 this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorite Providers</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="pt-6">
          <BookingsList status="upcoming" />
        </TabsContent>
        <TabsContent value="past" className="pt-6">
          <BookingsList status="past" />
        </TabsContent>
        <TabsContent value="favorites" className="pt-6">
          <FavoriteProviders />
        </TabsContent>
      </Tabs>
    </div>
  )
}
