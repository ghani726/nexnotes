"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Refresh_Action } from "@/api/auth";
import useAuthStore from "@/stores/useAuthStore";
import {
    AUTH_CHANNEL_NAME,
    AUTH_LOCK_NAME,
    type AuthMessage,
} from "@/config/auth";
import Logout from "@/utils/Logout";

const RefreshProvider = () => {
    const router = useRouter();

    useEffect(() => {
        const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
        const controller = new AbortController();

        const lockLifetime = new Promise<void>((resolve) =>
            controller.signal.addEventListener("abort", () => resolve(), {
                once: true,
            }),
        );

        // Listen for messages from other tabs.
        channel.onmessage = (event: MessageEvent<AuthMessage>) => {
            const message = event.data;

            if (message.type === "TOKEN")
                useAuthStore.getState().setAccessToken(message.accessToken);

            if (message.type === "LOGOUT") {
                useAuthStore.getState().logout();
                router.replace("/login");
            }
        };
        // Refresh access token.
        const refresh = async () => {
            const res = await Refresh_Action();

            if (!res.success) return Logout(router);

            useAuthStore.getState().setAccessToken(res.data.token);

            channel.postMessage({
                type: "TOKEN",
                accessToken: res.data.token,
            } satisfies AuthMessage);
        };

        // Request the browser-wide exclusive lock.
        navigator.locks
            .request(
                AUTH_LOCK_NAME,
                { signal: controller.signal },
                async () => {
                    console.log("This tab is the NexNotes refresh leader.");
                    const intervalID = setInterval(
                        () => refresh().catch(()=> Logout(router)),
                        10 * 60 * 1000,
                    );

                    await lockLifetime;
                    clearInterval(intervalID);
                },
            )
            .catch(
                (error) =>
                    !controller.signal.aborted &&
                    console.error("Web Lock error:", error),
            );

        // Cleanup.
        return () => {
            controller.abort();
            channel.close();
        };
    }, [router]);

    return null;
};

export default RefreshProvider;
