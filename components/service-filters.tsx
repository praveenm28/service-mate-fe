"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { useEffect } from "react";
import { getCategories } from "@/app/_api/categories/route";

export function ServiceFilters(setFilter: Dispatch<SetStateAction<{}>>) {
  const [priceRange, setPriceRange] = useState([20, 200]);

  useEffect(() => {
    getCategories();
  }, []);

  const categories = [
    { id: "cleaning", label: "Cleaning" },
    { id: "plumbing", label: "Plumbing" },
    { id: "electrical", label: "Electrical" },
    { id: "landscaping", label: "Landscaping" },
    { id: "painting", label: "Painting" },
    { id: "assembly", label: "Furniture Assembly" },
  ];

  const ratings = [
    { id: "any", label: "Any Rating" },
    { id: "4plus", label: "4+ Stars" },
    { id: "4.5plus", label: "4.5+ Stars" },
    { id: "5", label: "5 Stars Only" },
  ];

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
          <h3 className="font-medium">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id}>{category.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={300}
              step={10}
              onValueChange={setPriceRange}
            />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Rating</h3>
          <RadioGroup defaultValue="any">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                <Label htmlFor={`rating-${rating.id}`}>{rating.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
