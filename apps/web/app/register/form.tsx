"use client";

import FullNameInput from "@/components/app/inputs/FullName";
import PasswordInput from "@/components/app/inputs/PasswordInput";
import UsernameOrEmailInput from "@/components/app/inputs/UsernameOrEmail";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validateFullName, setValidateFullName] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [validateUsername, setValidateUsername] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const [validateConfirmPassword, setValidateConfirmPassword] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    value={fullName}
                    setValue={setFullName}
                    validate={validateFullName}
                ></FullNameInput>
                <UsernameOrEmailInput
                    value={email}
                    setValue={setEmail}
                    type="email"
                    validate={validateEmail}
                ></UsernameOrEmailInput>
                <UsernameOrEmailInput
                    value={username}
                    setValue={setUsername}
                    type="username"
                    validate={validateUsername}
                ></UsernameOrEmailInput>
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    validate={validatePassword}
                ></PasswordInput>
                <PasswordInput
                    type="confirm"
                    password={confirmPassword}
                    setPassword={setConfirmPassword}
                    toConfirm={password}
                    validate={validateConfirmPassword}
                ></PasswordInput>
            </div>
            <Button
                onClick={() => {
                    setValidateFullName(true);
                    setValidateEmail(true);
                    setValidateUsername(true);
                    setValidatePassword(true);
                    setValidateConfirmPassword(true);
                }}
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
