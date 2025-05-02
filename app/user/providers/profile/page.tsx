"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPinIcon,
  CalendarIcon,
  SettingsIcon,
  ClockIcon,
  StarIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  DollarSignIcon,
  MessageSquareIcon,
  ThumbsUpIcon,
  XIcon,
  PlusIcon,
} from "lucide-react";

export default function ServiceProviderProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState([
    { name: "Deep House Cleaning", price: "$120", duration: "3 hours" },
    { name: "Regular Cleaning", price: "$80", duration: "2 hours" },
    { name: "Move-in/Move-out Cleaning", price: "$200", duration: "5 hours" },
    { name: "Office Cleaning", price: "$150", duration: "3 hours" },
  ]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [availability, setAvailability] = useState({
    monday: { available: true, hours: "9:00 AM - 5:00 PM" },
    tuesday: { available: true, hours: "9:00 AM - 5:00 PM" },
    wednesday: { available: true, hours: "9:00 AM - 5:00 PM" },
    thursday: { available: true, hours: "9:00 AM - 5:00 PM" },
    friday: { available: true, hours: "9:00 AM - 5:00 PM" },
    saturday: { available: false, hours: "" },
    sunday: { available: false, hours: "" },
  });

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      setServices([...services, newService]);
      setNewService({ name: "", price: "", duration: "" });
    }
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
  };

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
                <h2 className="text-2xl font-bold">CleanPro Services</h2>
                <p className="text-gray-400">@cleanpro</p>
                <div className="flex items-center mt-2 mb-2">
                  <Badge className="bg-blue-600 hover:bg-blue-500">
                    Verified Provider
                  </Badge>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 4.8 ? "text-yellow-500" : "text-gray-600"
                        }`}
                        fill={star <= 4.8 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300">4.8 (124 reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">Cleaning Services</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-300">Member since Mar 2020</span>
                </div>
                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageSquareIcon className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-[#242424] border-gray-800">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      About CleanPro Services
                    </h3>
                    {isEditing && (
                      <Button
                        className="bg-white text-black hover:bg-gray-200"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="description"
                            className="text-sm font-medium text-gray-400"
                          >
                            Business Description
                          </Label>
                          <Textarea
                            id="description"
                            defaultValue="CleanPro Services is a premier cleaning company serving the San Francisco Bay Area since 2020. We specialize in residential and commercial cleaning services, offering customized solutions to meet our clients' specific needs. Our team of experienced professionals is dedicated to providing exceptional service with attention to detail and eco-friendly cleaning products."
                            className="min-h-[150px] bg-[#1a1a1a] border-gray-700 focus:border-white mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-400"
                              >
                                Business Email
                              </Label>
                              <div className="flex items-center mt-2">
                                <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <Input
                                  id="email"
                                  defaultValue="contact@cleanproservices.com"
                                  className="bg-[#1a1a1a] border-gray-700 focus:border-white"
                                />
                              </div>
                            </div>

                            <div>
                              <Label
                                htmlFor="phone"
                                className="text-sm font-medium text-gray-400"
                              >
                                Business Phone
                              </Label>
                              <div className="flex items-center mt-2">
                                <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <Input
                                  id="phone"
                                  defaultValue="(415) 555-7890"
                                  className="bg-[#1a1a1a] border-gray-700 focus:border-white"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label
                                htmlFor="website"
                                className="text-sm font-medium text-gray-400"
                              >
                                Website
                              </Label>
                              <Input
                                id="website"
                                defaultValue="https://www.cleanproservices.com"
                                className="bg-[#1a1a1a] border-gray-700 focus:border-white mt-2"
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="founded"
                                className="text-sm font-medium text-gray-400"
                              >
                                Founded
                              </Label>
                              <Input
                                id="founded"
                                defaultValue="2020"
                                className="bg-[#1a1a1a] border-gray-700 focus:border-white mt-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300">
                          CleanPro Services is a premier cleaning company
                          serving the San Francisco Bay Area since 2020. We
                          specialize in residential and commercial cleaning
                          services, offering customized solutions to meet our
                          clients' specific needs. Our team of experienced
                          professionals is dedicated to providing exceptional
                          service with attention to detail and eco-friendly
                          cleaning products.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">
                                Business Email
                              </h4>
                              <div className="flex items-center">
                                <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <p className="text-white">
                                  contact@cleanproservices.com
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">
                                Business Phone
                              </h4>
                              <div className="flex items-center">
                                <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <p className="text-white">(415) 555-7890</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">
                                Website
                              </h4>
                              <p className="text-white">
                                https://www.cleanproservices.com
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">
                                Founded
                              </h4>
                              <p className="text-white">2020</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6">
                          <h4 className="text-sm font-medium text-gray-400 mb-3">
                            Certifications & Insurance
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                              <span>Licensed & Insured</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                              <span>Green Cleaning Certified</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                              <span>Background Checked Staff</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold">Services Offered</h3>
                    {isEditing && (
                      <Button
                        className="bg-white text-black hover:bg-gray-200"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-800 rounded-lg"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <div className="flex items-center mt-2 text-sm text-gray-300">
                                <DollarSignIcon className="w-4 h-4 mr-1" />
                                {service.price}
                                <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                                {service.duration}
                              </div>
                            </div>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white"
                                onClick={() => handleRemoveService(index)}
                              >
                                <XIcon className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      {isEditing && (
                        <div className="p-4 border border-gray-800 rounded-lg">
                          <h4 className="font-medium mb-3">Add New Service</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label
                                htmlFor="serviceName"
                                className="text-sm font-medium text-gray-400"
                              >
                                Service Name
                              </Label>
                              <Input
                                id="serviceName"
                                value={newService.name}
                                onChange={(e) =>
                                  setNewService({
                                    ...newService,
                                    name: e.target.value,
                                  })
                                }
                                className="bg-[#1a1a1a] border-gray-700 focus:border-white mt-1"
                                placeholder="e.g. Window Cleaning"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="servicePrice"
                                className="text-sm font-medium text-gray-400"
                              >
                                Price
                              </Label>
                              <Input
                                id="servicePrice"
                                value={newService.price}
                                onChange={(e) =>
                                  setNewService({
                                    ...newService,
                                    price: e.target.value,
                                  })
                                }
                                className="bg-[#1a1a1a] border-gray-700 focus:border-white mt-1"
                                placeholder="e.g. $50"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="serviceDuration"
                                className="text-sm font-medium text-gray-400"
                              >
                                Duration
                              </Label>
                              <Input
                                id="serviceDuration"
                                value={newService.duration}
                                onChange={(e) =>
                                  setNewService({
                                    ...newService,
                                    duration: e.target.value,
                                  })
                                }
                                className="bg-[#1a1a1a] border-gray-700 focus:border-white mt-1"
                                placeholder="e.g. 1 hour"
                              />
                            </div>
                          </div>
                          <Button
                            className="mt-3 bg-white text-black hover:bg-gray-200"
                            onClick={handleAddService}
                            disabled={
                              !newService.name ||
                              !newService.price ||
                              !newService.duration
                            }
                          >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Service
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold">Availability</h3>
                    {isEditing && (
                      <Button
                        className="bg-white text-black hover:bg-gray-200"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(availability).map(
                        ([day, { available, hours }]) => (
                          <div
                            key={day}
                            className="flex items-center justify-between p-3 border border-gray-800 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-24 capitalize">{day}</div>
                              {isEditing ? (
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`available-${day}`}
                                    checked={available}
                                    onChange={(e) =>
                                      setAvailability({
                                        ...availability,
                                        [day]: {
                                          ...availability[
                                            day as keyof typeof availability
                                          ],
                                          available: e.target.checked,
                                        },
                                      })
                                    }
                                    className="mr-2 h-4 w-4"
                                  />
                                  <Label
                                    htmlFor={`available-${day}`}
                                    className="text-sm"
                                  >
                                    Available
                                  </Label>
                                </div>
                              ) : (
                                <Badge
                                  className={
                                    available ? "bg-green-600" : "bg-gray-600"
                                  }
                                >
                                  {available ? "Available" : "Unavailable"}
                                </Badge>
                              )}
                            </div>
                            {isEditing ? (
                              <Input
                                value={hours}
                                onChange={(e) =>
                                  setAvailability({
                                    ...availability,
                                    [day]: {
                                      ...availability[
                                        day as keyof typeof availability
                                      ],
                                      hours: e.target.value,
                                    },
                                  })
                                }
                                disabled={!available}
                                className="w-48 bg-[#1a1a1a] border-gray-700 focus:border-white"
                                placeholder="e.g. 9:00 AM - 5:00 PM"
                              />
                            ) : (
                              <div className="text-gray-300">
                                {available ? hours : "Closed"}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="bg-[#242424] border-gray-800">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Client Reviews</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          name: "Sarah Johnson",
                          date: "April 15, 2023",
                          rating: 5,
                          comment:
                            "CleanPro did an amazing job with our move-out cleaning. The team was thorough, professional, and left the place spotless. Highly recommend their services!",
                        },
                        {
                          name: "Michael Chen",
                          date: "March 22, 2023",
                          rating: 4,
                          comment:
                            "Great service overall. They were on time and did a good job cleaning our office space. Would use again for regular maintenance.",
                        },
                        {
                          name: "Jessica Williams",
                          date: "February 10, 2023",
                          rating: 5,
                          comment:
                            "I've been using CleanPro for monthly cleaning of my home for over a year now. They are consistently excellent, reliable, and trustworthy. The staff is friendly and they use eco-friendly products which I appreciate.",
                        },
                      ].map((review, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-800 rounded-lg"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                                <UserIcon className="w-5 h-5 text-gray-300" />
                              </div>
                              <div>
                                <h4 className="font-medium">{review.name}</h4>
                                <p className="text-sm text-gray-400">
                                  {review.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "text-yellow-500"
                                      : "text-gray-600"
                                  }`}
                                  fill={
                                    star <= review.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-gray-300">{review.comment}</p>
                          {index < 2 && (
                            <div className="mt-3 flex items-center text-sm text-gray-400">
                              <div className="flex items-center mr-4">
                                <ThumbsUpIcon className="w-4 h-4 mr-1" />
                                <span>Helpful (12)</span>
                              </div>
                              {isEditing && (
                                <div className="flex items-center">
                                  <MessageSquareIcon className="w-4 h-4 mr-1" />
                                  <span>Reply</span>
                                </div>
                              )}
                            </div>
                          )}
                          {index === 2 && isEditing === false && (
                            <div className="mt-3 text-sm text-gray-400">
                              <div className="border-t border-gray-800 pt-3 mt-3">
                                <div className="flex items-start">
                                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                    <UserIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-white">
                                      CleanPro Services
                                    </h5>
                                    <p className="mt-1">
                                      Thank you so much for your continued
                                      support, Jessica! We're glad you're happy
                                      with our services and eco-friendly
                                      approach.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                    >
                      View All  Reviews
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
