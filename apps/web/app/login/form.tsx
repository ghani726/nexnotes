"use client";

import PasswordInput from "@/components/app/inputs/PasswordInput";
import UsernameOrEmailInput from "@/components/app/inputs/UsernameOrEmail";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
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
                    value={usernameOrEmail}
                    setValue={setUsernameOrEmail}
                    type="both"
                ></UsernameOrEmailInput>
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                ></PasswordInput>
            </div>
            <Button isWidthFull={true} isSubmitting={isSubmitting}>
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
