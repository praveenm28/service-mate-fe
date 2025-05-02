"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPinIcon,
  CalendarIcon,
  SettingsIcon,
  ClockIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  HomeIcon,
  PlusIcon,
  XIcon,
  UploadIcon,
  CheckIcon,
  AlertCircleIcon,
} from "lucide-react"
import { z } from "zod"

// Define validation schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^$$\d{3}$$ \d{3}-\d{4}$/, "Please enter a valid phone number format: (555) 123-4567"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().length(2, "State must be 2 characters"),
  zipCode: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  aboutMe: z.string().min(10, "About me must be at least 10 characters"),
})

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [preferences, setPreferences] = useState<string[]>(["Home Services", "Cleaning", "Plumbing"])
  const [newPreference, setNewPreference] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // User profile data
  const [profileData, setProfileData] = useState({
    fullName: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    location: "San Francisco, CA",
    aboutMe:
      "I'm a software engineer who recently moved to San Francisco. I enjoy hiking, photography, and exploring new restaurants in the city. I use ServiceHub to find reliable professionals for home maintenance and repairs.",
  })

  const handleAddPreference = () => {
    if (newPreference && !preferences.includes(newPreference)) {
      setPreferences([...preferences, newPreference])
      setNewPreference("")
    }
  }

  const handleRemovePreference = (preference: string) => {
    setPreferences(preferences.filter((p) => p !== preference))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProfileData({
      ...profileData,
      [id]: value,
    })

    // Clear error for this field when user types
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      })
    }
  }

  const validateField = (field: string, value: string) => {
    try {
      // Create a subset of the schema with just this field
      const fieldSchema = z.object({ [field]: profileSchema.shape[field as keyof typeof profileSchema.shape] })
      fieldSchema.parse({ [field]: value })
      return ""
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === field)
        return fieldError?.message || ""
      }
      return ""
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const error = validateField(id, value)

    if (error) {
      setErrors({
        ...errors,
        [id]: error,
      })
    }
  }

  const handleSave = () => {
    try {
      // Validate all fields
      profileSchema.parse(profileData)

      // If validation passes, exit edit mode
      setIsEditing(false)
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create an object with all validation errors
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
    
      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-[#242424] border-gray-800 md:col-span-1">
            <CardHeader className="pb-0">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile picture"
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-gray-700"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#242424]"></div>
                </div>
                {isEditing ? (
                  <Button className="bg-white text-black hover:bg-gray-200 mt-2 mb-4">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload New Photo
                  </Button>
                ) : null}
                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <p className="text-gray-400">@{profileData.username}</p>
                <div className="flex items-center mt-2 mb-4">
                  <Badge className="bg-gray-700 hover:bg-gray-600">User</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">{profileData.location}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">Member since Jan 2023</span>
                </div>
                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="bg-[#242424] border-gray-800">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    {isEditing && (
                      <Button className="bg-white text-black hover:bg-gray-200" onClick={handleSave}>
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      // Edit Mode
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName" className="text-sm font-medium text-gray-400">
                                Full Name
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <Input
                                    id="fullName"
                                    value={profileData.fullName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.fullName ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.fullName && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.fullName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="username" className="text-sm font-medium text-gray-400">
                                Username
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <span className="text-gray-400 mr-2">@</span>
                                  <Input
                                    id="username"
                                    value={profileData.username}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.username ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.username && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.username}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-medium text-gray-400">
                                Email Address
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <Input
                                    id="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.email ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.email && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-sm font-medium text-gray-400">
                                Phone Number
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <Input
                                    id="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.phone ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.phone && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-sm font-medium text-gray-400">
                                Street Address
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <HomeIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <Input
                                    id="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.address ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.address && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.address}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium text-gray-400">
                                  City
                                </Label>
                                <div className="flex flex-col">
                                  <Input
                                    id="city"
                                    value={profileData.city}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.city ? "border-red-500" : ""}`}
                                  />
                                  {errors.city && (
                                    <div className="flex items-center mt-1 text-red-500 text-xs">
                                      <AlertCircleIcon className="w-3 h-3 mr-1" />
                                      {errors.city}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-medium text-gray-400">
                                  State
                                </Label>
                                <div className="flex flex-col">
                                  <Input
                                    id="state"
                                    value={profileData.state}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.state ? "border-red-500" : ""}`}
                                  />
                                  {errors.state && (
                                    <div className="flex items-center mt-1 text-red-500 text-xs">
                                      <AlertCircleIcon className="w-3 h-3 mr-1" />
                                      {errors.state}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-400">
                                ZIP Code
                              </Label>
                              <div className="flex flex-col">
                                <Input
                                  id="zipCode"
                                  value={profileData.zipCode}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.zipCode ? "border-red-500" : ""}`}
                                />
                                {errors.zipCode && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.zipCode}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="location" className="text-sm font-medium text-gray-400">
                                Location
                              </Label>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <Input
                                    id="location"
                                    value={profileData.location}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.location ? "border-red-500" : ""}`}
                                  />
                                </div>
                                {errors.location && (
                                  <div className="flex items-center mt-1 text-red-500 text-xs">
                                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                                    {errors.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Preferences */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-gray-400">Service Preferences</Label>
                          <div className="flex flex-wrap gap-2">
                            {preferences.map((preference, index) => (
                              <Badge key={index} className="bg-gray-700 hover:bg-gray-600 flex items-center gap-1 pl-3">
                                {preference}
                                <button
                                  onClick={() => handleRemovePreference(preference)}
                                  className="ml-1 rounded-full hover:bg-gray-500 p-0.5"
                                >
                                  <XIcon className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add preference..."
                              value={newPreference}
                              onChange={(e) => setNewPreference(e.target.value)}
                              className="bg-[#1a1a1a] border-gray-700 focus:border-white"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  handleAddPreference()
                                }
                              }}
                            />
                            <Button
                              onClick={handleAddPreference}
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-gray-800"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* About Me */}
                        <div className="space-y-2">
                          <Label htmlFor="aboutMe" className="text-sm font-medium text-gray-400">
                            About Me
                          </Label>
                          <div className="flex flex-col">
                            <Textarea
                              id="aboutMe"
                              value={profileData.aboutMe}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 focus:border-white ${errors.aboutMe ? "border-red-500" : ""}`}
                            />
                            {errors.aboutMe && (
                              <div className="flex items-center mt-1 text-red-500 text-xs">
                                <AlertCircleIcon className="w-3 h-3 mr-1" />
                                {errors.aboutMe}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Full Name</h4>
                              <p className="text-white">{profileData.fullName}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Email Address</h4>
                              <div className="flex items-center">
                                <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <p className="text-white">{profileData.email}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Phone Number</h4>
                              <div className="flex items-center">
                                <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <p className="text-white">{profileData.phone}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Address</h4>
                              <p className="text-white">{profileData.address}</p>
                              <p className="text-white">
                                {profileData.city}, {profileData.state} {profileData.zipCode}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Preferences</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {preferences.map((preference, index) => (
                                  <Badge key={index} className="bg-gray-700 hover:bg-gray-600">
                                    {preference}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">About Me</h4>
                          <p className="text-gray-300">{profileData.aboutMe}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">My Bookings</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          service: "Home Cleaning",
                          provider: "CleanPro Services",
                          date: "May 15, 2023",
                          time: "10:00 AM - 12:00 PM",
                          status: "Upcoming",
                          statusColor: "bg-yellow-600",
                        },
                        {
                          service: "Plumbing Repair",
                          provider: "Quick Fix Plumbing",
                          date: "May 22, 2023",
                          time: "2:00 PM - 4:00 PM",
                          status: "Confirmed",
                          statusColor: "bg-green-600",
                        },
                        {
                          service: "Electrical Inspection",
                          provider: "Safe Circuit Electricians",
                          date: "June 3, 2023",
                          time: "9:00 AM - 11:00 AM",
                          status: "Pending",
                          statusColor: "bg-blue-600",
                        },
                      ].map((booking, index) => (
                        <div key={index} className="p-4 border border-gray-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{booking.service}</h4>
                              <p className="text-sm text-gray-400">{booking.provider}</p>
                            </div>
                            <Badge className={`${booking.statusColor}`}>{booking.status}</Badge>
                          </div>
                          <div className="mt-3 flex items-center text-sm text-gray-300">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {booking.date}
                            <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                            {booking.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Favorite Service Providers</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "CleanPro Services",
                          category: "Cleaning",
                          rating: 4.8,
                          image: "/placeholder.svg?height=80&width=80",
                        },
                        {
                          name: "Quick Fix Plumbing",
                          category: "Plumbing",
                          rating: 4.9,
                          image: "/placeholder.svg?height=80&width=80",
                        },
                        {
                          name: "Green Thumb Landscaping",
                          category: "Landscaping",
                          rating: 4.7,
                          image: "/placeholder.svg?height=80&width=80",
                        },
                        {
                          name: "Safe Circuit Electricians",
                          category: "Electrical",
                          rating: 4.9,
                          image: "/placeholder.svg?height=80&width=80",
                        },
                      ].map((provider, index) => (
                        <div key={index} className="flex items-center p-3 border border-gray-800 rounded-lg">
                          <div className="flex-shrink-0 mr-3">
                            <Image
                              src={provider.image || "/placeholder.svg"}
                              alt={provider.name}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{provider.name}</h4>
                            <p className="text-sm text-gray-400">{provider.category}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-500 text-sm mr-1">★</span>
                              <span className="text-sm text-gray-300">{provider.rating}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-transparent"
                          >
                            <HeartIcon className="w-5 h-5 fill-current" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
