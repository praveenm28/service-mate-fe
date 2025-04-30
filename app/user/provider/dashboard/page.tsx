"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProviderBookings } from "@/components/provider-bookings"
import { ProviderServices } from "@/components/provider-services"
import { ProviderStats } from "@/components/provider-stats"

export default function ProviderDashboardPage() {
  // In a real app, you would check if the user is authenticated and is a provider
  // const { isAuthenticated, isProvider } = useAuth()
  // if (!isAuthenticated || !isProvider) redirect('/provider/login')

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>

      <ProviderStats />

      <Tabs defaultValue="bookings" className="mt-8">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="services">My Services</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="pt-6">
          <ProviderBookings />
        </TabsContent>
        <TabsContent value="services" className="pt-6">
          <ProviderServices />
        </TabsContent>
        <TabsContent value="earnings" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
                <CardDescription>Your earnings for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center">Chart placeholder</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Earnings by Service</CardTitle>
                <CardDescription>Distribution of earnings by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center">Chart placeholder</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
