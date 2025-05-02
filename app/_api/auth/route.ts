import api from "@/lib/axios";

export async function signIn(credentials: { email: string; password: string }) {
  try {
    const response = await api.post("/admin/auth", credentials);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong.",
    };
  }
}
