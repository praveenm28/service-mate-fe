import api from "@/lib/axios";

export async function getAdminCategories(pageCount: number, pageSize: number) {
  try {
    const res = await api.get("/category/filter", {
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

export async function createCategory(values: { name: string; image: File }) {
  console.log("🚀 ~ createCategory ~ values:", values);
  try {
    let formData = new FormData();
    formData.append("image", values.image);
    formData.append("categoryRequest", JSON.stringify({ name: values.name }));
    const res = await api.post("/category", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Oops! Something went wrong while creating category. Please try again.",
    };
  }
}

export async function updateCategory(id: number, values: { name: string; image: File }) {
  try {
    let formData = new FormData();
    formData.append("image", values.image);
    formData.append("categoryRequest", JSON.stringify({ name: values.name }));
    const res = await api.put(`/category/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Oops! Something went wrong while updating category. Please try again.",
    };
  }
}

export async function archiveCategory(id: number) {
  try {
    const res = await api.put(`/category/active?id=${id}`);
    return res?.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong while archiving category. Please try again.",
    };
  }
}
