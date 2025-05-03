import { create } from "zustand";

interface Category {
  id: number;
  name: string;
  image: string;
  active: boolean;
}

interface CategoryState {
  categories: Category[];
  categoryLoading: boolean;
  error: string | null;
  setCategories: (data: Category[]) => Promise<void>;
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
  createdCategory:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
  setCreatedCategory: (data: {
    success: boolean;
    message: string;
  }) => Promise<void>;
}

export const useAdminCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  categoryLoading: true,
  error: null,
  createdCategory: undefined,
  setCategories: async (data) => {
    try {
      set({ categoryLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ categories: data, categoryLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        error: "Failed to fetch categories. Please try again later.",
        categoryLoading: false,
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
      set({ categoryLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ paginationOptions: data, categoryLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        error: "Failed to fetch categories. Please try again later.",
        categoryLoading: false,
      });
    }
  },
  setCreatedCategory: async (data) => {
      try {
        set({ categoryLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ createdCategory: data, categoryLoading: false });
      } catch (error) {
        console.error("Error fetching categories:", error);
        set({
          error: "Failed to fetch categories. Please try again later.",
          categoryLoading: false,
        });
      }
  }
}));
