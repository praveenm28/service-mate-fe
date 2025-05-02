import api from "@/lib/axios";

export async function getFilteredProviders(
  pageCount: number,
  pageSize: number,
  filters: {
    date?: string;
    isVerified?: boolean;
    minFee?: number;
    maxFee?: number;
    day?: string;
    cityId?: number;
    categoryId?: number;
    tagId?: number;
    search?: string;
    avgRatings?: number[];
  }
) {
  try {
    const response = await api.get("/serviceProvider/filter", {
      params: {
        pageCount,
        pageSize,
        ...filters,
      },
    });
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong.",
    };
  }
}
