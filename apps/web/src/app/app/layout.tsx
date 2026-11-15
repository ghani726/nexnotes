import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Refresh_Action } from "@/api/auth";
import AuthProvider from "@/components/app/providers/Auth";
import RefreshProvider from "@/components/app/providers/Refresh";
import Sidebar from "@/components/app/navigation/Sidebar";
import Navbar from "@/components/app/navigation/Navbar";

const AppLayout = async ({ children }: { children: ReactNode }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 1. Quick check: If cookie doesn't even exist, bail out immediately
    if (!token) redirect("/login");

    // 2. Get a new access token and user data from the backend using the refresh token stored in cookies
    const res = await Refresh_Action(true, false); // includeUser = true, rotateRefreshToken = false

    // 3. If token is fake, expired, or invalid -> redirect to login
    if (!res.success) redirect("/login");

    return (
        <AuthProvider user={res?.user} accessToken={res?.data.token}>
            <RefreshProvider></RefreshProvider>
            <div className="flex h-dvh w-full">
                <Sidebar></Sidebar>
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
                <Navbar></Navbar>
            </div>
        </AuthProvider>
    );
};

export default AppLayout;
