import { create } from "zustand";

interface tag {
  id: number;
  name: string;
  image: string;
  active: boolean;
}

interface tagState {
  tags: tag[];
  tagLoading: boolean;
  error: string | null;
  setTags: (data: tag[]) => Promise<void>;
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
  createdTag:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
  setCreatedTag: (data: {
    success: boolean;
    message: string;
  }) => Promise<void>;
}

export const useAdminTagStore = create<tagState>((set) => ({
  tags: [],
  tagLoading: true,
  error: null,
  createdTag: undefined,
  setTags: async (data) => {
    try {
      set({ tagLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ tags: data, tagLoading: false });
    } catch (error) {
      console.error("Error fetching tags:", error);
      set({
        error: "Failed to fetch tags. Please try again later.",
        tagLoading: false,
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
      set({ tagLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ paginationOptions: data, tagLoading: false });
    } catch (error) {
      console.error("Error fetching tags:", error);
      set({
        error: "Failed to fetch tags. Please try again later.",
        tagLoading: false,
      });
    }
  },
  setCreatedTag: async (data) => {
      try {
        set({ tagLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ createdTag: data, tagLoading: false });
      } catch (error) {
        console.error("Error fetching tags:", error);
        set({
          error: "Failed to fetch tags. Please try again later.",
          tagLoading: false,
        });
      }
  }
}));
