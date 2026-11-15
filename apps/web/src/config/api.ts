import env from "@/config/env";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const api = axios.create({
    baseURL: env.BackEnd_URL,
    timeout: env.API_Timeout,
    withCredentials: true,
    headers: {
        x_server_secret: env.Security_Header,
    },
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        let errorMessage = "An unexpected error occurred.";

        if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
            errorMessage =
                "The server is taking too long to respond. Please try again later.";
        } else if (!err.response) {
            errorMessage = "The server is currently unreachable or down.";
        } else if (
            err.code === "ERR_NETWORK" ||
            err.code === "ERR_BAD_REQUEST"
        ) {
            errorMessage = "No internet connection. Try again later.";
        } else errorMessage = err?.response?.data?.message || err.message;

        if (err?.response?.status === 401) {
            const cookieStore = await cookies();
            cookieStore.delete("token");
        }

        return {
            data: err?.response?.data || {
                success: false,
                message: errorMessage,
                error: "An internal server error occurred.",
            },
        };
    },
);

export default api;
