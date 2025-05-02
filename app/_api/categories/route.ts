import api from "@/lib/axios";

export async function getCategories() {
    try {
        const response = await api.get("/category");
        return response.data;
    } catch (err) {
        return {
            success: false,
            message: "Oops! Something went wrong.",
        };
    }
}