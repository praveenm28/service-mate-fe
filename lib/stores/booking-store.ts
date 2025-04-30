import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Booking {
  id: string
  serviceId: string
  date: Date
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

interface BookingState {
  bookings: Booking[]
  createBooking: (booking: Omit<Booking, "id" | "status">) => void
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  cancelBooking: (id: string) => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],

      createBooking: (booking) => {
        set((state) => ({
          bookings: [
            ...state.bookings,
            {
              ...booking,
              id: `booking_${Math.random().toString(36).substring(2, 9)}`,
              status: "pending",
            },
          ],
        }))
      },

      updateBookingStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
        }))
      },

      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status: "cancelled" } : booking,
          ),
        }))
      },
    }),
    {
      name: "booking-storage",
    },
  ),
)
