"use client";

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
import { FolderX, Loader, MoreHorizontal, Plus } from "lucide-react";
import { useAdminCityStore } from "@/lib/stores/admin/admin-city-store";
import {
  archiveCity,
  createCity,
  getAdminCities,
  updateCity,
} from "@/app/_api/admin/city/route";
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
import { CityResponse } from "@/lib/types/CityResponse";

const formSchema = z.object({
  name: z
    .string({ required_error: "City name is required" })
    .min(3, { message: "City name must be at least 3 characters" }),
});

export default function CitiesPage() {
  const initialLoad = useRef(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCity, setEditingCity] = useState<CityResponse | null>(null);
  const {
    cityLoading,
    cities,
    paginationOptions,
    setPaginationOptions,
    setCities,
    createdCity,
    setCreatedCity,
  } = useAdminCityStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const handleAddCity = (values: z.infer<typeof formSchema>) => {
    setSaveLoading(true);
    createCity(values).then((res) => {
      if (res?.success) {
        toast.success(res.message);
        setCreatedCity(res);
        form.reset();
        setShowAddForm(false);
        form.reset();
      } else {
        toast.error(res.message);
      }
      setSaveLoading(false);
    });
  };

  const handleUpdateCity = (values: z.infer<typeof formSchema>) => {
    setSaveLoading(true);
    updateCity(editingCity?.id || 0, values).then((res) => {
      if (res?.success) {
        setEditingCity(null);
        toast.success(res.message);
        setCreatedCity(res);
        setShowAddForm(false);
        form.reset();
      } else {
        toast.error(res.message);
      }
      setSaveLoading(false);
    });
  };

  const handleArchiveCity = (id: number) => {
    archiveCity(id).then((res) => {
      if (res?.success) {
        setCreatedCity(res);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getAdminCities(
          paginationOptions.pageCount,
          paginationOptions.pageSize
        );
        setCities(res?.records);
        setPaginationOptions({
          pageCount: res?.pageNumber,
          pageSize: res?.pageSize,
          totalRecords: res?.totalRecords,
          totalPages: res?.totalPages,
        });
      } catch (error) {
        toast.error("Failed to fetch cities");
      }
    };
    if (initialLoad.current) {
      fetchCities();
      initialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialLoad.current) {
      const fetchCities = async () => {
        try {
          const res = await getAdminCities(
            paginationOptions.pageCount,
            paginationOptions.pageSize
          );
          setCities(res?.records);
          setPaginationOptions({
            ...paginationOptions,
            pageSize: res?.pageSize,
            totalRecords: res?.totalRecords,
            totalPages: res?.totalPages,
          });
        } catch (error) {
          toast.error("Failed to fetch cities");
        }
      };
      fetchCities();
    }
  }, [paginationOptions.pageCount, createdCity]);

  return (
    <div className="space-y-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cities</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add City
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddCity)}>
              <CardHeader>
                <CardTitle>Add New City</CardTitle>
                <CardDescription>Enter the city name</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Chennai" {...field} />
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
                  {saveLoading ? <Loader className="animate-spin size-4" /> : "Save City"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {editingCity && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateCity)}>
              <CardHeader>
                <CardTitle>Edit City</CardTitle>
                <CardDescription>Update the city name</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Chennai" {...field} />
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
                    setEditingCity(null);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={saveLoading} type="submit">
                  {saveLoading ? <Loader className="animate-spin size-4" /> : "Update City"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {cityLoading ? (
        <div className="flex flex-grow items-center justify-center py-32">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="rounded-md border flex flex-col">
            <Table className="flex-grow">
              {cities?.length > 0 ? (
                <>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cities.map((city) => (
                      <TableRow key={city.id}>
                        <TableCell className="font-medium">{city.name}</TableCell>
                        <TableCell>
                          <StatusBadge status={city.active} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingCity(city);
                                  form.reset({ name: city.name });
                                }}
                              >
                                Edit City
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleArchiveCity(city.id)}
                                className={city.active ? "text-destructive" : ""}
                              >
                                {city.active ? "Archive City" : "Activate City"}
                              </DropdownMenuItem>
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
                  <div>No cities found</div>
                </div>
              )}
            </Table>
          </div>
          {cities.length > 0 && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: paginationOptions?.totalPages }).map((_, i) => (
                  <PaginationItem
                    key={i}
                    onClick={() => {
                      if (i + 1 !== paginationOptions.pageCount) {
                        setPaginationOptions({ ...paginationOptions, pageCount: i + 1 });
                      }
                    }}
                  >
                    <PaginationLink isActive={paginationOptions.pageCount === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: boolean }) {
  let variant: "default" | "outline" = status ? "default" : "outline";
  return <Badge variant={variant}>{status ? "Active" : "Inactive"}</Badge>;
}
