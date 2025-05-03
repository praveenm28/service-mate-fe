import api from "@/lib/axios";

export async function getAdminCities(pageCount: number, pageSize: number) {
  try {
    const res = await api.get("/city/filter", {
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

export async function createCity(values: { name: string }) {
    console.log("🚀 ~ createCity ~ values:", values);
    try {
      const res = await api.post("/city", {
        name: values.name,
      });
      return res?.data;
    } catch (err) {
      return {
        success: false,
        message:
          "Oops! Something went wrong while creating city. Please try again.",
      };
    }
  }

  export async function updateCity(id: number, values: { name: string }) {
    try {
      const res = await api.put(`/city/${id}`, { name: values.name }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res?.data;
    } catch (err) {
      return {
        success: false,
        message:
          "Oops! Something went wrong while updating the city. Please try again.",
      };
    }
  }

  export async function archiveCity(id: number) {
    try {
      const res = await api.put(`/city/active?id=${id}`);
      return res?.data;
    } catch (err) {
      return {
        success: false,
        message: "Oops! Something went wrong while archiving the city. Please try again.",
      };
    }
  }
  