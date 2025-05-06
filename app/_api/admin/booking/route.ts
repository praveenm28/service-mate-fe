import api from "@/lib/axios";

export async function getAdminBookings(pageCount: number, pageSize: number) {
  try {
    const res = await api.get("/booking/filter", {
      params: {
        pageCount,
        pageSize,
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