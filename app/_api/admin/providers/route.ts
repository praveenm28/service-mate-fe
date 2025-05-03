import api from "@/lib/axios";

export async function getAdminProviders(
  pageCount: number,
  pageSize: number,
  filters?: {
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
    isActive?: boolean;
  }
) {
  try {
    const res = await api.get("/serviceProvider/filter", {
      params: {
        pageCount,
        pageSize,
        ...filters,
        avgRatings: filters?.avgRatings
          ? filters.avgRatings?.join(",")
          : undefined,
      },
    });
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong.",
    };
  }
}
