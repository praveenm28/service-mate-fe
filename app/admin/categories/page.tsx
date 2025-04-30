"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Plus, Search } from "lucide-react"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "",
  })

  // Mock category data - in a real app, this would come from an API
  const categories = [
    {
      id: "c1",
      name: "Cleaning",
      description: "Home and office cleaning services",
      icon: "🧹",
      services: 12,
      status: "active",
    },
    {
      id: "c2",
      name: "Plumbing",
      description: "Plumbing repair and installation services",
      icon: "🔧",
      services: 8,
      status: "active",
    },
    {
      id: "c3",
      name: "Electrical",
      description: "Electrical repair and installation services",
      icon: "⚡",
      services: 6,
      status: "active",
    },
    {
      id: "c4",
      name: "Landscaping",
      description: "Lawn care and landscaping services",
      icon: "🌱",
      services: 9,
      status: "active",
    },
    {
      id: "c5",
      name: "Assembly",
      description: "Furniture and equipment assembly services",
      icon: "🪑",
      services: 5,
      status: "active",
    },
    {
      id: "c6",
      name: "Painting",
      description: "Interior and exterior painting services",
      icon: "🎨",
      services: 7,
      status: "active",
    },
    {
      id: "c7",
      name: "Moving",
      description: "Moving and packing services",
      icon: "📦",
      services: 4,
      status: "inactive",
    },
  ]

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      searchQuery === "" ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would call an API to add the category
    console.log("Adding category:", newCategory)
    setNewCategory({ name: "", description: "", icon: "" })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <form onSubmit={handleAddCategory}>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>Create a new service category for the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g. Home Cleaning"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  placeholder="e.g. 🧹"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Brief description of the category"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Category</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="text-2xl">{category.icon}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.services}</TableCell>
                <TableCell>
                  <StatusBadge status={category.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Category</DropdownMenuItem>
                      <DropdownMenuItem>View Services</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {category.status === "active" ? (
                        <DropdownMenuItem>Deactivate Category</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Activate Category</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">Delete Category</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline"

  switch (status) {
    case "active":
      variant = "default"
      break
    case "inactive":
      variant = "outline"
      break
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  )
}
