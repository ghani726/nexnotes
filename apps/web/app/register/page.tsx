import RegisterForm from "@/app/register/form";
import ThemeSwitcher from "@/components/web/ThemeSwitcher";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Join NexNotes to start managing your notes and tasks.",
    openGraph: {
        title: "Create an Account on NexNotes",
        description: "Set up your free NexNotes workspace today.",
        url:"https://nexnotes",
        siteName:"NexNotes",
        images: [{url:"", height: 1200, width: 630}],
        type: "website"
    },
};

const RegisterPage = () => {
    return (
        <div className="flex overflow-auto justify-center items-center w-full min-h-dvh h-auto py-btn-4xl">
            <div className="fixed py-btn-sm w-full left-0 top-0 flex justify-center items-center z-0">
                <ThemeSwitcher></ThemeSwitcher>
            </div>
            <RegisterForm></RegisterForm>
        </div>
    );
};

export default RegisterPage;
