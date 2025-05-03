"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowLeftIcon } from "lucide-react";

type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export default function ServiceTypePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const serviceType = searchParams.get("type") || "default";

  const formattedServiceType = serviceType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const services: Service[] = [
    {
      id: "service-001",
      name: "Deep House Cleaning",
      description:
        "Comprehensive cleaning of your entire home, including kitchen, bathrooms, bedrooms, and living areas.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "service-002",
      name: "Regular Cleaning",
      description:
        "Standard cleaning service for regular maintenance of your home.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "service-003",
      name: "Move-in/Move-out Cleaning",
      description:
        "Thorough cleaning service for when you're moving in or out of a property.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "service-004",
      name: "Office Cleaning",
      description:
        "Professional cleaning services for office spaces and commercial properties.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "service-005",
      name: "Window Cleaning",
      description:
        "Professional window cleaning for interior and exterior windows.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "service-006",
      name: "Carpet Cleaning",
      description:
        "Deep cleaning of carpets to remove stains, dirt, and allergens.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToService = (serviceId: string) => {
    router.push(`/user/services?type=${serviceType}`);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push("/user/services")}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{formattedServiceType} Services</h1>
      </div>

      <div className="relative max-w-md mb-6">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder={`Search ${formattedServiceType} services...`}
          className="bg-[#242424] border-gray-700 focus:border-white pl-10 py-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search query to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="bg-[#242424] border-gray-800 hover:border-gray-600 transition-colors cursor-pointer"
              onClick={() => navigateToService(service.id)}
            >
              <div className="relative h-48">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
