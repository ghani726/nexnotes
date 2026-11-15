"use client";

import { Register_Action } from "@/api/auth";
import FullNameInput from "@/components/app/inputs/FullName";
import PasswordInput from "@/components/app/inputs/PasswordInput";
import UsernameOrEmailInput from "@/components/app/inputs/UsernameOrEmail";
import Button from "@/components/common/Button";
import useAuthStore from "@/stores/useAuthStore";
import { registerSchema } from "@packages/validation/src/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
    // 1. States
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
    });
    const [validate, setValidate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Global Variables
    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    // 3.  Function to handle submit
    const handleSubmit = async () => {
        // 4. Validate and Prepare the object to send
        if (!registerSchema.safeParse(form).success) return setValidate(true);

        setIsSubmitting(true);
        // 5. Make Request
        const res = await Register_Action(form);

        setIsSubmitting(false);
        if (res.success) {
            setUser(res.data.user);
            setAccessToken(res.data.token);
            redirect("/app");
        } else toast.error(res.message);
    };

    // 6. Form
    return (
        <div className="bg-surface shadow-medium animate-main h-auto min-w-80 max-w-9/10 w-9/10 ms:w-auto ms:max-w-130 ms:min-w-md  p-inset-lg md:p-inset-xl rounded-5xl flex flex-col justify-center items-center gap-relaxed z-5 border-main">
            <div className="flex flex-col justify-center items-center gap-tight">
                <h2 className="text-h2 text-center">
                    Welcome to <span className="text-brand">Nex</span>Notes
                </h2>
                <p className="text-body-sm text-tertiary-text">
                    {"Let's set up your account"}
                </p>
            </div>
            <div className="inputFields w-full flex flex-col gap-normal">
                <FullNameInput
                    value={form.fullName}
                    setValue={(e) =>
                        setForm((prev) => ({ ...prev, fullName: e }))
                    }
                    validate={validate}
                ></FullNameInput>
                <UsernameOrEmailInput
                    value={form.email}
                    setValue={(e) => setForm((prev) => ({ ...prev, email: e }))}
                    type="email"
                    validate={validate}
                ></UsernameOrEmailInput>
                <UsernameOrEmailInput
                    value={form.userName}
                    setValue={(e) =>
                        setForm((prev) => ({ ...prev, userName: e }))
                    }
                    type="username"
                    validate={validate}
                ></UsernameOrEmailInput>
                <PasswordInput
                    password={form.password}
                    setPassword={(e) =>
                        setForm((prev) => ({ ...prev, password: e }))
                    }
                    validate={validate}
                ></PasswordInput>
                <PasswordInput
                    type="confirm"
                    password={form.confirmPassword}
                    setPassword={(e) =>
                        setForm((prev) => ({ ...prev, confirmPassword: e }))
                    }
                    toConfirm={form.password}
                    validate={validate}
                ></PasswordInput>
            </div>
            <Button
                onClick={handleSubmit}
                isWidthFull={true}
                isSubmitting={isSubmitting}
            >
                Create Account
            </Button>
            <div className="flex justify-center items-center text-body-sm text-secondary-text">
                <p>{"Already have an account?"}</p>
                <pre> </pre>
                <Link href="/login" className="text-brand text-link">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
