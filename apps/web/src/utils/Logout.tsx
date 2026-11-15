import { Logout_Action } from "@/api/auth";
import { AUTH_CHANNEL_NAME, type AuthMessage } from "@/config/auth";
import useAuthStore from "@/stores/useAuthStore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Logout = async (
    router: AppRouterInstance,
    callServer: boolean = false,
    isSpecific: boolean = false,
    isAll: boolean = false,
    sessionID?: string,
) => {
    if (isSpecific && isAll)
        return "Choose either specific logout or logout all.";

    if ((isSpecific || isAll) && !callServer)
        return "Specific and all-session logout require a server call.";

    if (isSpecific && !sessionID)
        return "Session ID is required for specific logout.";

    if (callServer) {
        const token = useAuthStore.getState().accessToken;
        if(!token) return "Access token is required for server logout.";
        const data = await Logout_Action({
            token,
            isSpecific,
            isAll,
            sessionID,
        });
        if (data.success && isSpecific) return data;
    }

    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

    useAuthStore.getState().logout();

    channel.postMessage({
        type: "LOGOUT",
    } satisfies AuthMessage);

    router.replace("/login");
};

export default Logout;
