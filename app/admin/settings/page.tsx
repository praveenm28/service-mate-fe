"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "ServiceHub",
    siteDescription: "Find and book services from trusted providers",
    supportEmail: "support@servicehub.com",
    contactPhone: "+1 (555) 123-4567",
    logo: "/logo.png",
    favicon: "/favicon.ico",
  })

  const [bookingSettings, setBookingSettings] = useState({
    autoApproveBookings: false,
    allowCancellations: true,
    cancellationTimeLimit: "24",
    bookingTimeSlots: "60",
    maxBookingsPerDay: "10",
    advanceBookingDays: "30",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    platformFee: "10",
    minimumPayout: "50",
    payoutSchedule: "weekly",
    taxRate: "7.5",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    marketingEmails: false,
  })

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to update settings
    console.log("Updating general settings:", generalSettings)
    alert("General settings updated successfully!")
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to update settings
    console.log("Updating booking settings:", bookingSettings)
    alert("Booking settings updated successfully!")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to update settings
    console.log("Updating payment settings:", paymentSettings)
    alert("Payment settings updated successfully!")
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to update settings
    console.log("Updating notification settings:", notificationSettings)
    alert("Notification settings updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <form onSubmit={handleGeneralSubmit}>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your platform's general settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={generalSettings.logo}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, logo: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <form onSubmit={handleBookingSubmit}>
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
                <CardDescription>Configure how bookings work on your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoApproveBookings">Auto-approve Bookings</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve bookings without provider confirmation
                    </p>
                  </div>
                  <Switch
                    id="autoApproveBookings"
                    checked={bookingSettings.autoApproveBookings}
                    onCheckedChange={(checked) =>
                      setBookingSettings({ ...bookingSettings, autoApproveBookings: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowCancellations">Allow Cancellations</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to cancel their bookings</p>
                  </div>
                  <Switch
                    id="allowCancellations"
                    checked={bookingSettings.allowCancellations}
                    onCheckedChange={(checked) =>
                      setBookingSettings({ ...bookingSettings, allowCancellations: checked })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cancellationTimeLimit">Cancellation Time Limit (hours)</Label>
                    <Input
                      id="cancellationTimeLimit"
                      type="number"
                      value={bookingSettings.cancellationTimeLimit}
                      onChange={(e) =>
                        setBookingSettings({ ...bookingSettings, cancellationTimeLimit: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookingTimeSlots">Booking Time Slots (minutes)</Label>
                    <Input
                      id="bookingTimeSlots"
                      type="number"
                      value={bookingSettings.bookingTimeSlots}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, bookingTimeSlots: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBookingsPerDay">Max Bookings Per Day</Label>
                    <Input
                      id="maxBookingsPerDay"
                      type="number"
                      value={bookingSettings.maxBookingsPerDay}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, maxBookingsPerDay: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advanceBookingDays">Advance Booking Days</Label>
                    <Input
                      id="advanceBookingDays"
                      type="number"
                      value={bookingSettings.advanceBookingDays}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, advanceBookingDays: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <form onSubmit={handlePaymentSubmit}>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment options and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={paymentSettings.currency}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platformFee">Platform Fee (%)</Label>
                    <Input
                      id="platformFee"
                      type="number"
                      value={paymentSettings.platformFee}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, platformFee: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumPayout">Minimum Payout Amount</Label>
                    <Input
                      id="minimumPayout"
                      type="number"
                      value={paymentSettings.minimumPayout}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, minimumPayout: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payoutSchedule">Payout Schedule</Label>
                    <Select
                      value={paymentSettings.payoutSchedule}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, payoutSchedule: value })}
                    >
                      <SelectTrigger id="payoutSchedule">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <form onSubmit={handleNotificationSubmit}>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile devices</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="adminAlerts">Admin Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for important system events</p>
                  </div>
                  <Switch
                    id="adminAlerts"
                    checked={notificationSettings.adminAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, adminAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Send promotional emails to users</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
