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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, FolderX, MoreHorizontal, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { BookingResponse } from "@/lib/types/BookingResponse";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getAdminBookings } from "@/app/_api/admin/booking/route";
import { toast } from "sonner";
import { useAdminBookingStore } from "@/lib/stores/admin/admin-booking-store";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState<Date>();
  const initialLoad = useRef(true);
  const {
    bookingLoading,
    bookings,
    paginationOptions,
    setPaginationOptions,
    setBookings,
    createdBooking,
    setCreatedBooking,
  } = useAdminBookingStore();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getAdminBookings(
          paginationOptions.pageCount,
          paginationOptions.pageSize
        );

        setBookings(res?.records);
        setPaginationOptions({
          pageCount: res?.pageNumber,
          pageSize: res?.pageSize,
          totalRecords: res?.totalRecords,
          totalPages: res?.totalPages,
        });
      } catch (error) {
        toast.error("Failed to fetch bookings");
      }
    };

    if (initialLoad.current) {
      // Initial load
      fetchBookings();
      initialLoad.current = false;
    }
  }, [
    paginationOptions.pageCount,
    paginationOptions.pageSize,
    setBookings,
    setPaginationOptions,
  ]);

  // Filter bookings based on search query and filters
  const filteredBookings = (bookings || []).filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesDate =
      !date ||
      format(new Date(booking.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd");

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {filteredBookings.length === 0 ? (
    <TableRow>
      <TableCell colSpan={8}>
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
          <FolderX className="size-12 mb-2" />
          <div className="text-lg font-medium">No bookings found</div>
        </div>
      </TableCell>
    </TableRow>
  ) : (
    filteredBookings.map((booking) => (
      <TableRow key={booking.id}>
        <TableCell className="font-medium">{booking.id}</TableCell>
        <TableCell>{booking.service}</TableCell>
        <TableCell>{booking.customer}</TableCell>
        <TableCell>{booking.provider}</TableCell>
        <TableCell>
          {new Date(booking.date).toLocaleDateString()} at {booking.time}
        </TableCell>
        <TableCell>${booking.price}</TableCell>
        <TableCell>
          <StatusBadge status={booking.status} />
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
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Booking</DropdownMenuItem>
              <DropdownMenuSeparator />
              {booking.status === "pending" && (
                <DropdownMenuItem>Confirm Booking</DropdownMenuItem>
              )}
              {booking.status === "confirmed" && (
                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
              )}
              {(booking.status === "pending" || booking.status === "confirmed") && (
                <DropdownMenuItem className="text-destructive">
                  Cancel Booking
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </div>

      {bookings.length > 0 && (
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
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

  switch (status) {
    case "confirmed":
      variant = "default";
      break;
    case "pending":
      variant = "secondary";
      break;
    case "completed":
      variant = "outline";
      break;
    case "cancelled":
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}
