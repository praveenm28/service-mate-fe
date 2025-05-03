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
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  categoryLoading: false,
  error: null,
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
}));
