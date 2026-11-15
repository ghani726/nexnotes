// Web Lock name.
export const AUTH_LOCK_NAME = "nexnotes-refresh-leader";

// BroadcastChannel name.
export const AUTH_CHANNEL_NAME = "nexnotes-auth";

export type AuthMessage =
    | { type: "TOKEN"; accessToken: string }
    | { type: "LOGOUT" };
