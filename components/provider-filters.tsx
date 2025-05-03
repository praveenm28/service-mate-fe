"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useEffect } from "react";
import { getCategories } from "@/app/_api/categories/route";
import { useCategoryStore } from "@/lib/stores/category-store";

interface ProviderFiltersProps {
  filters: {
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
  };
  onFilterChange: (
    filters: Partial<{
      categoryId: number;
      day: string;
      sortBy: string;
      avgRatings: number[];
      minFee: number;
      maxFee: number;
      cityId: number;
    }>
  ) => void;
}

export function ProviderFilters({
  filters,
  onFilterChange,
}: ProviderFiltersProps) {
  const { setCategories, categories, categoryLoading } = useCategoryStore();

  const ratings = [
    { id: "all", label: "Any Rating" },
    { id: "5", label: "5 Stars" },
    { id: "4", label: "4+ Stars" },
    { id: "3", label: "3+ Stars" },
    { id: "2", label: "2+ stars" },
    { id: "1", label: "1+ stars" },
  ];

  const sortOptions = [
    { id: "rating", label: "Highest Rated" },
    { id: "jobs", label: "Most Jobs Completed" },
    { id: "newest", label: "Newest Providers" },
  ];

  const days = [
    { value: "ALL", label: "All Days" },
    {
      value: "MONDAY",
      label: "Monday",
    },
    {
      value: "TUESDAY",
      label: "Tuesday",
    },
    {
      value: "WEDNESDAY",
      label: "Wednesday",
    },
    {
      value: "THURSDAY",
      label: "Thursday",
    },
    {
      value: "FRIDAY",
      label: "Friday",
    },
    {
      value: "SATURDAY",
      label: "Saturday",
    },
    {
      value: "SUNDAY",
      label: "Sunday",
    },
  ];

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Category</h3>
          <Select
            value={filters.categoryId?.toString()}
            onValueChange={(value) =>
              onFilterChange({ categoryId: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Day</h3>
          <Select
            value={filters.day}
            onValueChange={(value) => {
              if (value === "ALL") {
                onFilterChange({ day: undefined });
                return;
              }
              onFilterChange({ day: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Rating</h3>
          <RadioGroup
            value={
              filters?.avgRatings ? filters.avgRatings[0]?.toString() : "all"
            }
            onValueChange={(value) => {
              if (value === "all") {
                onFilterChange({ avgRatings: undefined });
                return;
              }
              onFilterChange({ avgRatings: [parseInt(value)] });
            }}
          >
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                <Label htmlFor={`rating-${rating.id}`}>{rating.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
