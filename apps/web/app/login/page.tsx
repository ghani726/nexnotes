
import LoginForm from "@/app/login/form";
import ThemeSwitcher from "@/components/web/ThemeSwitcher";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In", 
    description: "Sign in to access and manage your notes and tasks.",
    openGraph: {
        title: "Sign in on NexNotes",
        description: "Sign in to your NexNotes workspace.",
    },
};

const LoginPage = () => {
    

    return (
        <div className="flex overflow-auto justify-center items-center w-full min-h-dvh h-auto py-btn-4xl">
            <div className="fixed py-btn-sm w-full left-0 top-0 flex justify-center items-center z-0">
                <ThemeSwitcher></ThemeSwitcher>
            </div>
            <LoginForm></LoginForm>
        </div>
    );
};

export default LoginPage;
