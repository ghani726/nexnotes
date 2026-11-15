"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Login_Action } from "@/api/auth";
import toast from "react-hot-toast";
import useAuthStore from "@/stores/useAuthStore";
import Button from "@/components/common/Button";
import PasswordInput from "@/components/app/inputs/PasswordInput";
import UsernameOrEmailInput from "@/components/app/inputs/UsernameOrEmail";
import {
    emailSchema,
    passwordSchema,
    userNameSchema,
} from "@packages/validation/src/common";

const LoginForm = () => {
    // 1. States
    const [first, setFirst] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validate, setValidate] = useState(false);

    // 2. Global Variables
    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    // 3.  Function to handle submit
    const handleSubmit = async () => {
        // 4. Validate and Prepare the object to send
        const finalObj = { password: password, email: "", userName: "" };
        let isValid = false;

        if (!passwordSchema.safeParse(password).success) isValid = true;
        else if (first.includes("@")) {
            if (!emailSchema.safeParse(first).success) isValid = true;
            finalObj.email = first;
        } else {
            if (!userNameSchema.safeParse(first).success) isValid = true;
            finalObj.userName = first;
        }

        if (isValid) return setValidate(true);

        setIsSubmitting(true);
        // 5. Make Request
        const res = await Login_Action(finalObj);

        setIsSubmitting(false);
        if (res.success) {
            setUser(res.data.user);
            setAccessToken(res.data.token);
            redirect("/app");
        } else toast.error(res.message);
    };

    // 6. Form
    return (
        <div className="bg-surface shadow-medium animate-main h-auto min-w-80 max-w-9/10 w-9/10 ms:w-auto ms:max-w-130 ms:min-w-md lg:w p-inset-lg md:p-inset-xl rounded-5xl flex flex-col justify-center items-center gap-relaxed z-5 border-main">
            <div className="flex flex-col justify-center items-center gap-tight">
                <h2 className="text-h2 text-brand">
                    Nex
                    <span className="text-primary-text">Notes</span>
                </h2>
                <p className="text-body-sm text-tertiary-text">
                    Sign in into your account
                </p>
            </div>
            <div className="inputFields w-full flex flex-col gap-normal">
                <UsernameOrEmailInput
                    value={first}
                    setValue={setFirst}
                    type="both"
                    validate={validate}
                ></UsernameOrEmailInput>
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    validate={validate}
                ></PasswordInput>
            </div>
            <Button
                isWidthFull={true}
                isSubmitting={isSubmitting}
                onClick={handleSubmit}
            >
                Sign In
            </Button>
            <div className="flex justify-center items-center text-body-sm text-secondary-text">
                <p>{"Don't have an account?"}</p>
                <pre> </pre>
                <Link href="/register" className="text-brand text-link">
                    Create One
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
