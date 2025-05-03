"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FolderX, Loader, MoreHorizontal, Plus, Search } from "lucide-react";
import { useAdminCategoryStore } from "@/lib/stores/admin/admin-category-store";
import { getAdminCategories } from "@/app/_api/admin/category/route";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Image from "next/image";
import { useDebounce } from "@/hooks/debounce";
import { ServiceProvider } from "@/lib/types/ServiceProvider";
import { useAdminServiceProviderStore } from "@/lib/stores/admin/admin-provider-store";
import { getAdminProviders } from "@/app/_api/admin/providers/route";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .min(3, { message: "Category name must be at least 3 characters" }),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB max
      { message: "Image must be less than 5MB" }
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Only JPEG, PNG, and WEBP formats are supported" }
    ),
});

export default function CategoriesPage() {
  const initialLoad = useRef(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProvider, setEditingProvider] =
    useState<ServiceProvider | null>(null);
  const {
    providerLoading,
    providers,
    paginationOptions,
    error,
    setPaginationOptions,
    createdProvider,
    setProviders,
    setCreatedProvider,
  } = useAdminServiceProviderStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      image: undefined,
    },
  });

  const handleAddProvider = (values: z.infer<typeof formSchema>) => {
    setSaveLoading(true);
    // createCategory(values).then((res) => {
    //   if (res?.success) {
    //     toast.success(res.message);
    //     setCreatedProvider(res);
    //     setShowAddForm(false);
    //     form.reset();
    //   } else {
    //     toast.error(res.message);
    //   }
    //   setSaveLoading(false);
    // });
  };

  const handleUpdateProvider = (values: z.infer<typeof formSchema>) => {
    setSaveLoading(true);
    // updateCategory(editingCategory?.id || 0, values).then((res) => {
    //   if (res?.success) {
    //     setEditingCategory(null);
    //     toast.success(res.message);
    //     setCreatedCategory(res);
    //     setShowAddForm(false);
    //     form.reset();
    //   } else {
    //     toast.error(res.message);
    //   }
    //   setSaveLoading(false);
    // });
  };

  const handleArchiveProvider = (id: number) => {
    // archiveCategory(id).then((res) => {
    //   if (res?.success) {
    //     setCreatedCategory(res);
    //     toast.success(res.message);
    //   } else {
    //     toast.error(res.message);
    //   }
    // });
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getAdminProviders(
          paginationOptions.pageCount,
          paginationOptions.pageSize
        );

        setProviders(res?.records);
        setPaginationOptions({
          pageCount: res?.pageNumber,
          pageSize: res?.pageSize,
          totalRecords: res?.totalRecords,
          totalPages: res?.totalPages,
        });
      } catch (error) {
        toast.error("Failed to fetch providers");
      }
    };

    if (initialLoad.current) {
      // Initial load
      fetchProviders();
      initialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialLoad.current) {
      const fetchProviders = async () => {
        try {
          const res = await getAdminProviders(
            paginationOptions.pageCount,
            paginationOptions.pageSize
          );

          setProviders(res?.records);
          // Don't update pageCount here to avoid loop
          setPaginationOptions({
            ...paginationOptions,
            pageSize: res?.pageSize,
            totalRecords: res?.totalRecords,
            totalPages: res?.totalPages,
          });
        } catch (error) {
          toast.error("Failed to fetch categories");
        }
      };

      fetchProviders();
    }
  }, [paginationOptions.pageCount, createdProvider]);

  return (
    <div className="space-y-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Service Providers</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service Provider
        </Button>
      </div>

      {editingProvider && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateProvider)}>
              <CardHeader>
                <CardTitle>Edit Category</CardTitle>
                <CardDescription>Update the category details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Home Cleaning" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...fieldProps}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset();
                    setEditingProvider(null);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={saveLoading} type="submit">
                  {saveLoading ? (
                    <Loader className="animate-spin size-4" />
                  ) : (
                    "Update Service Provider"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {/* No need for category but need to implement in other modules */}
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
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
      </div> */}
      {providerLoading ? (
        <div className="flex flex-grow items-center justify-center py-32">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="rounded-md border flex flex-col">
            <Table className="flex-grow">
              {providers?.length > 0 ? (
                <>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">
                          {provider.businessName}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={provider.verified} />
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
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingProvider(provider);
                                  // form.reset({
                                  //   name: category.name,
                                  //   image: undefined,
                                  // });
                                }}
                              >
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {provider.verified ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleArchiveProvider(provider.id)
                                  }
                                  className="text-destructive"
                                >
                                  Archive Service Provider
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleArchiveProvider(provider.id)
                                  }
                                >
                                  Activate Service Provider
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              ) : (
                <div className="flex-grow font-semibold flex flex-col gap-4 py-20 items-center justify-center">
                  <FolderX className="size-12" />
                  <div>No Providers found</div>
                </div>
              )}
            </Table>
          </div>
          {providers.length > 0 && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: paginationOptions?.totalPages }).map(
                  (_, i) => {
                    return (
                      <PaginationItem
                        onClick={() => {
                          if (i + 1 !== paginationOptions?.pageCount)
                            setPaginationOptions({
                              ...paginationOptions,
                              pageCount: i + 1,
                            });
                        }}
                        key={i}
                      >
                        <PaginationLink
                          isActive={paginationOptions?.pageCount === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddProvider)}>
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>
                  Create a new service category for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Home Cleaning" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...fieldProps}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset();
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={saveLoading} type="submit">
                  {saveLoading ? (
                    <Loader className="animate-spin size-4" />
                  ) : (
                    "Save Category"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: Boolean }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

  switch (status) {
    case true:
      variant = "default";
      break;
    case false:
      variant = "outline";
      break;
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status ? "Verfied" : "Unverfied"}
    </Badge>
  );
}
