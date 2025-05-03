import { create } from "zustand";

interface City {
  id: number;
  name: string;
}

interface CityState {
  cities: City[];
  cityLoading: boolean;
  error: string | null;
  setCities: (data: City[]) => Promise<void>;
  paginationOptions: {
    pageCount: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
  createdCity?:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
  setCreatedCity: (data: {
    success: boolean;
    message: string;
    pageCount: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  }) => Promise<void>;
}

export const useAdminCityStore = create<CityState>((set) => ({
  cities: [],
  cityLoading: true,
  error: null,
  createdCity: undefined,

  setCities: async (data) => {
    try {
      set({ cityLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ cities: data, cityLoading: false });
    } catch (error) {
      console.error("Error fetching cities:", error);
      set({
        error: "Failed to fetch cities. Please try again later.",
        cityLoading: false,
      });
    }
  },
  paginationOptions: {
    pageCount: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  },
  setPaginationOptions: async (data: any) => {
    try {
      set({ cityLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ paginationOptions: data, cityLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        error: "Failed to fetch categories. Please try again later.",
        cityLoading: false,
      });
    }
  },

  setCreatedCity: async (data) => {
    try {
      set({ cityLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ createdCity: data, cityLoading: false });
    } catch (error) {
      console.error("Error creating city:", error);
      set({
        error: "Failed to create city. Please try again later.",
        cityLoading: false,
      });
    }
  },
}));
