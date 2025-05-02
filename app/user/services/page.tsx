"use client";
import { ServiceFilters } from "@/components/service-filters";
import { ServiceCard } from "@/components/service-card";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

export default function ServicesPage() {

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ServiceFilters />
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCard
                key={i}
                id={`${i + 1}`}
                title={
                  [
                    "Home Cleaning",
                    "Plumbing Repair",
                    "Lawn Maintenance",
                    "Electrical Work",
                    "Painting",
                    "Furniture Assembly",
                  ][i % 6]
                }
                provider={
                  [
                    "CleanPro Services",
                    "Quick Fix Plumbers",
                    "Green Thumb Gardens",
                    "PowerTech Electric",
                    "Color Masters",
                    "Assembly Pros",
                  ][i % 6]
                }
                rating={4.5 + (i % 5) / 10}
                price={60 + i * 10}
                image="/placeholder.svg?height=200&width=300"
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
