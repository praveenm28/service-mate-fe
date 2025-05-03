"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProviderCard } from "@/components/provider-card";
import { ProviderFilters } from "@/components/provider-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { useProviderStore } from "@/lib/stores/provider-store";
import { getFilteredProviders } from "@/app/_api/user/providers/route";
import { useMemo } from "react";

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    date?: string;
    isVerified?: boolean;
    minFee?: number;
    maxFee?: number;
    day?: string;
    cityId?: number;
    categoryId?: number;
    tagId?: number;
    search?: string;
    avgRatings?: number[];
  }>({
    date: undefined,
    isVerified: undefined,
    minFee: undefined,
    maxFee: undefined,
    day: undefined,
    cityId: undefined,
    categoryId: undefined,
    tagId: undefined,
    search: undefined,
    avgRatings: undefined,
  });

  console.log("🚀 ~ ProvidersPage ~ filters:", filters)


  const { providers, isLoading, error, setProviders } =
    useProviderStore();

  // Items per page
  const itemsPerPage = 9;

  // useEffect(() => {
  //   fetchProviders();
  // }, [fetchProviders]);

  // Paginate providers
  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const paginatedProviders = providers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    getFilteredProviders(1, 10, filters).then((data) => {
      if (!data?.success) {
        console.error("Error fetching providers:", data);
      } else {
        setProviders(data);
      }
    });
  }, [filters]);

  return (
    <div className="w-full py-8">
      <h1 className="text-3xl font-bold mb-6">Service Providers</h1>

      <div className="flex w-full flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search providers..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <Button type="submit" className="sr-only">
                Search
              </Button>
            </div>
          </form>

          <ProviderFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          {isLoading ? (
            <div className="w-full text-center py-12">
              <p>Loading providers...</p>
            </div>
          ) : error ? (
            <div className="text-center w-full py-12 text-destructive">
              <p>Error loading providers. Please try again later.</p>
            </div>
          ) : paginatedProviders.length === 0 ? (
            <div className="text-center w-full py-12">
              <p>No providers found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setFilters({
                    categoryId: undefined,
                    cityId: undefined,
                    date: undefined,
                    day: undefined,
                    isVerified: undefined,
                    maxFee: undefined,
                    minFee: undefined,
                    search: undefined,
                    tagId: undefined,
                    avgRatings: undefined,
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
