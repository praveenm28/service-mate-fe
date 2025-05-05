import api from "@/lib/axios";

export async function signIn(credentials: { email: string; password: string }) {
  try {
    let values = JSON.stringify({ userName: credentials.email, password: credentials.password});
    const response = await api.post("/admin/auth", values);
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong.",
    };
  }
}

export async function signUp(credentials: { name: string; email: string; password: string; role: string }) {
  console.log("credentials", credentials)
  try {
    let formData = new FormData();
    formData.append("registerRequest", JSON.stringify({ name: credentials.name, 
      email: credentials.email, password: credentials.password, role: credentials.role }));
      
    const response = await api.post("/user", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Oops! Something went wrong.",
    };
  }
}

export async function forgotPassword(credentials: {email: string;}) {
  try {
    const response = await api.post(`/user/forgotPassword/${encodeURIComponent(credentials.email)}`, null, {
      headers: { accept: "*/*" },
    });
    return response.data;
  } catch (err) {
    return {
      success: false,
      message: "Failed to send reset link. Please try again.",
    };
  }
}
