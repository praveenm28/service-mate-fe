import api from "@/lib/axios";

export async function getAdminTags(pageCount: number, pageSize: number) {
  try {
    const res = await api.get("/tag/filter", {
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


export async function createTag(values: { name: string; }) {
  console.log("🚀 ~ createTag ~ values:", values);
  try {
    const res = await api.post("/tag", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res?.data;
  } catch (err) {
    console.error("Error creating tag:", err);
    return {
      success: false,
      message:
        "Oops! Something went wrong while creating the tag. Please try again.",
    };
  }
}


export async function updateTag(id: number, values: { name: string; }) {
  try {
    const res = await api.put(`/tag/${id}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res?.data;
  } catch (err) {
    console.error("Error updating tag:", err);
    return {
      success: false,
      message:
        "Oops! Something went wrong while updating the tag. Please try again.",
    };
  }
}


export async function archiveTag(id: number) {
  try {
    const res = await api.put(`/tag/active?id=${id}`);
    return res?.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong while archiving category. Please try again.",
    };
  }
}
