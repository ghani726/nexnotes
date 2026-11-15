"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { IUser } from "@packages/types/auth";
import useAuthStore from "@/stores/useAuthStore";
import { AUTH_CHANNEL_NAME, type AuthMessage } from "@/config/auth";

interface AuthProviderProps {
    children: ReactNode;
    user: IUser;
    accessToken: string;
}

const AuthProvider = ({ children, user, accessToken }: AuthProviderProps) => {
    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

        // Initialize Zustand.
        setUser(user);
        setAccessToken(accessToken);

        // Broadcast initial authentication to other tabs.
        channel.postMessage({
            type: "TOKEN",
            accessToken,
        } satisfies AuthMessage);

        setInitialized(true); // eslint-disable-line

        return () => channel.close();
    }, [user, accessToken, setUser, setAccessToken]);

    if (!initialized) return null;

    return <>{children}</>;
};

export default AuthProvider;
