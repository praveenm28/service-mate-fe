import { ServiceProvider } from "@/lib/types/ServiceProvider";
import { create } from "zustand";

interface ServiceProviderState {
  providers: ServiceProvider[];
  providerLoading: boolean;
  error: string | null;
  setProviders: (data: ServiceProvider[]) => Promise<void>;
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
  createdProvider: {
    success: boolean;
    message: string;
  } | null;
  setCreatedProvider: (
    data: {
      success: boolean;
      message: string;
    } | null
  ) => Promise<void>;
}

export const useAdminServiceProviderStore = create<ServiceProviderState>(
  (set) => ({
    providers: [],
    providerLoading: true,
    error: null,
    createdProvider: null,
    paginationOptions: {
      pageCount: 1,
      pageSize: 10,
      totalRecords: 0,
      totalPages: 0,
    },
    setProviders: async (data) => {
      try {
        set({ providerLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ providers: data, providerLoading: false });
      } catch (error) {
        console.error("Error fetching providers:", error);
        set({
          error: "Failed to fetch providers. Please try again later.",
          providerLoading: false,
        });
      }
    },
    setPaginationOptions: async (data) => {
      try {
        set({ providerLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ paginationOptions: data, providerLoading: false });
      } catch (error) {
        console.error("Error fetching providers:", error);
        set({
          error: "Failed to fetch providers. Please try again later.",
          providerLoading: false,
        });
      }
    },
    setCreatedProvider: async (data) => {
      try {
        set({ providerLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ createdProvider: data, providerLoading: false });
      } catch (error) {
        console.error("Error fetching categories:", error);
        set({
          error: "Failed to fetch categories. Please try again later.",
          providerLoading: false,
        });
      }
    },
  })
);
