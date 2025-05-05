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
import { useAdminTagStore } from "@/lib/stores/admin/admin-tag-store";
import {
  archiveTag,
  createTag,
  getAdminTags,
  updateTag,
} from "@/app/_api/admin/tag/route";
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
import { TagRespone } from "@/lib/types/TagResponse";

const formSchema = z.object({
  name: z
    .string({ required_error: "tag name is required" })
    .min(3, { message: "tag name must be at least 3 characters" }),
});

export default function CategoriesPage() {
  const initialLoad = useRef(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingtag, setEditingtag] =
    useState<TagRespone | null>(null);
  const {
    tagLoading,
    tags,
    paginationOptions,
    setPaginationOptions,
    setTags,
    createdTag,
    setCreatedTag,
  } = useAdminTagStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
    },
  });

  const handleAddtag = (values: z.infer<typeof formSchema>) => {
    debugger
    setSaveLoading(true);
    createTag(values).then((res) => {
      if (res?.success) {
        toast.success(res.message);
        setCreatedTag(res);
        setShowAddForm(false);
        form.reset();
      } else {
        toast.error(res.message);
      }
      setSaveLoading(false);
    });
  };

  const handleUpdatetag = (values: z.infer<typeof formSchema>) => {
    setSaveLoading(true);
    updateTag(editingtag?.id || 0, values).then((res) => {
      if (res?.success) {
        setEditingtag(null);
        toast.success(res.message);
        setCreatedTag(res);
        setShowAddForm(false);
        form.reset();
      } else {
        toast.error(res.message);
      }
      setSaveLoading(false);
    });
  };

  const handleArchivetag = (id: number) => {
    archiveTag(id).then((res) => {
      if (res?.success) {
        setCreatedTag(res);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAdminTags(
          paginationOptions.pageCount,
          paginationOptions.pageSize
        );

        setTags(res?.records);
        setPaginationOptions({
          pageCount: res?.pageNumber,
          pageSize: res?.pageSize,
          totalRecords: res?.totalRecords,
          totalPages: res?.totalPages,
        });
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    if (initialLoad.current) {
      // Initial load
      fetchCategories();
      initialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialLoad.current) {
      const fetchCategories = async () => {
        try {
          const res = await getAdminTags(
            paginationOptions.pageCount,
            paginationOptions.pageSize
          );

          setTags(res?.records);
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

      fetchCategories();
    }
  }, [paginationOptions.pageCount, createdTag]);

  return (
    <div className="space-y-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tags</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddtag)}>
              <CardHeader>
                <CardTitle>Add New Tag</CardTitle>
                <CardDescription>
                  Create a new service tag for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>tag Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Home Cleaning" {...field} />
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
                    "Save tag"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {editingtag && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatetag)}>
              <CardHeader>
                <CardTitle>Edit tag</CardTitle>
                <CardDescription>Update the tag details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>tag Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Home Cleaning" {...field} />
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
                    setEditingtag(null);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={saveLoading} type="submit">
                  {saveLoading ? (
                    <Loader className="animate-spin size-4" />
                  ) : (
                    "Update tag"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {/* No need for tag but need to implement in other modules */}
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
      {tagLoading ? (
        <div className="flex flex-grow items-center justify-center py-32">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="rounded-md border flex flex-col">
            <Table className="flex-grow">
              {tags?.length > 0 ? (
                <>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell className="font-medium">
                          {tag.name}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={tag.active} />
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
                                  setEditingtag(tag);
                                  form.reset({
                                    name: tag.name,
                                  });
                                }}
                              >
                                Edit tag
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {tag.active ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleArchivetag(tag.id)
                                  }
                                  className="text-destructive"
                                >
                                  Archive tag
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleArchivetag(tag.id)
                                  }
                                >
                                  Activate tag
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
                  <div>No tags found</div>
                </div>
              )}
            </Table>
          </div>
          {tags?.length > 0 && (
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
      {status ? "Active" : "Inactive"}
    </Badge>
  );
}
