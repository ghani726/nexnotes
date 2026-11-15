"use server";

import api from "@/config/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Login_Action = async (newData: object) => {
    const { data } = await api.post("/auth/login", newData);

    if (data.success) {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: data.data.refreshToken,
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        // Clear sensitive token before sending back to frontend component if needed
        data.data.refreshToken = null;
    }

    return data;
};

export const Register_Action = async (newData: object) => {
    const { data } = await api.post("/auth/register", newData);

    if (data.success) {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: data.data.refreshToken,
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        data.data.refreshToken = null;
    }

    return data;
};

export const Refresh_Action = async (
    includeUser: boolean = false,
    rotateRefreshToken: boolean = true,
) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const url = `/auth/refresh?includeUser=${includeUser}&rotateRefreshToken=${rotateRefreshToken}`;
    const { data } = await api.post(url, { token });

    if (data.success && data.data.refreshToken) {
        cookieStore.set({
            name: "token",
            value: data.data.refreshToken,
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        data.data.refreshToken = null;
    }

    return data;
};

export const Logout_Action = async ({
    token,
    isSpecific,
    isAll,
    sessionID,
}: {
    token: string;
    isSpecific?: boolean;
    isAll?: boolean;
    sessionID?: string;
}) => {
    const cookieStore = await cookies();

    const url = isAll
        ? "/auth/logout/all"
        : `/auth/logout?type=${isSpecific ? "specific" : "current"}`;

    const { data } = await api.post(url, {
        token: token,
        ...(isSpecific && { sessionID }),
    });

    if (data.success && (!isSpecific || isAll)) {
        cookieStore.delete("token");
        redirect("/login");
    }
    return data;
};

export const Verify_Token_Action = async (token: string) =>
    (await api.post("/auth/verify", { token: token })).data;
