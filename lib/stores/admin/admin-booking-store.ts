import { ReactNode } from "react";
import { create } from "zustand";

interface Booking {
  time: ReactNode;
  status: string;
  price: ReactNode;
  date: string | number | Date;
  service: any;
  provider: any;
  customer: any;
  id: number;
  name: string;
  image: string;
  active: boolean;
}

interface BookingState {
  bookings: Booking[];
  bookingLoading: boolean;
  error: string | null;
  setBookings: (data: Booking[]) => Promise<void>;
  paginationOptions: {
    pageCount: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
  setPaginationOptions: (data: {
    pageCount: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  }) => Promise<void>;
  createdBooking:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
  setCreatedBooking: (data: {
    success: boolean;
    message: string;
  }) => Promise<void>;
}

export const useAdminBookingStore = create<BookingState>((set) => ({
  bookings: [],
  bookingLoading: true,
  error: null,
  createdBooking: undefined,
  setBookings: async (data) => {
    try {
      set({ bookingLoading: true, error: null });
      // Simulating async call (e.g., fetching from API)
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ bookings: data, bookingLoading: false });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      set({
        error: "Failed to fetch bookings. Please try again later.",
        bookingLoading: false,
      });
    }
  },
  paginationOptions: {
    pageCount: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  },
  setPaginationOptions: async (data) => {
    try {
      set({ bookingLoading: true, error: null });
      // Simulating async call (e.g., fetching from API)
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ paginationOptions: data, bookingLoading: false });
    } catch (error) {
      console.error("Error fetching pagination options:", error);
      set({
        error: "Failed to fetch pagination options. Please try again later.",
        bookingLoading: false,
      });
    }
  },
  setCreatedBooking: async (data) => {
    try {
      set({ bookingLoading: true, error: null });
      // Simulating async call (e.g., creating a booking)
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ createdBooking: data, bookingLoading: false });
    } catch (error) {
      console.error("Error creating booking:", error);
      set({
        error: "Failed to create booking. Please try again later.",
        bookingLoading: false,
      });
    }
  }
}));
