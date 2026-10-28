"use client";

import HandleOutsideClick from "@/utils/HandleOutsideClick";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const PasswordInput = ({
    validate = false,
    type = "simple",
    password,
    setPassword,
    toConfirm,
    required = true,
}: {
    validate?: boolean;
    type?: "simple" | "confirm";
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    toConfirm?: string;
    required?: boolean;
}) => {
    const label = type === "confirm" ? "Confirm Password" : "Password";

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const passwordReg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*?&_\-\. ])[A-Za-z\d!@#$%*?&_\-\. ]{8,32}$/;

    const obj = !required
        ? HandleOutsideClick(() => setIsClicked(false))
        : null;

    const validateConfirmPassword = () => {
        if (!password.trim()) return "Please confirm your password";
        if (password !== toConfirm) return "Passwords do not match.";
    };

    const hasPasswordError =
        (isClicked || validate) &&
        (type === "confirm"
            ? validateConfirmPassword()
            : !passwordReg.test(password))
            
    return (
        <div className="flex flex-col animate-main gap-tight">
            <div className="relative w-full peer">
                <input
                    ref={obj?.ref || null}
                    id={`${label}Input`}
                    type={passwordHidden ? "password" : "text"}
                    className={`peer input-box px-btn-3xl ${hasPasswordError && "input-box-error"}`}
                    onClick={() => {
                        setIsClicked(true);
                        obj?.reset?.();
                    }}
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {type === "simple" ? (
                    <Lock
                        size={20}
                        className={`input-box-icon ${hasPasswordError && "input-box-label-error"}`}
                    ></Lock>
                ) : (
                    <ShieldCheck
                        size={20}
                        className={`input-box-icon ${hasPasswordError && "input-box-label-error"}`}
                    ></ShieldCheck>
                )}
                <button
                    className={`input-box-icon-password ${hasPasswordError && "input-box-label-error"}`}
                    onClick={() => setPasswordHidden((prev) => !prev)}
                >
                    {passwordHidden ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <label
                    htmlFor={`${label}Input`}
                    className={`input-box-label ${hasPasswordError && "input-box-label-error"}`}
                >
                    {label}
                </label>
            </div>

            {type === "simple" && (isClicked || validate) && !passwordReg.test(password) && (
                <div
                    className={`p-inset-md flex flex-col bg-background rounded-4xl border-main`}
                >
                    <div
                        className={`${password.length >= 8 && password.length <= 32 ? "text-status-success" : "text-status-error"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${password.length >= 8 && password.length <= 32 ? "bg-status-success" : "bg-status-error"}`}
                        ></span>
                        Must be between 8-32 characters.
                    </div>

                    <div
                        className={`${/(?=.*[a-z])/.test(password) ? "text-status-success" : "text-status-error"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${/(?=.*[a-z])/.test(password) ? "bg-status-success" : "bg-status-error"}`}
                        ></span>
                        Include a lowercase letter (a-z).
                    </div>

                    <div
                        className={`${/(?=.*[A-Z])/.test(password) ? "text-status-success" : "text-status-error"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${/(?=.*[A-Z])/.test(password) ? "bg-status-success" : "bg-status-error"}`}
                        ></span>
                        Include an uppercase letter (A-Z).
                    </div>

                    <div
                        className={`${/(?=.*\d)/.test(password) ? "text-status-success" : "text-status-error"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${/(?=.*\d)/.test(password) ? "bg-status-success" : "bg-status-error"}`}
                        ></span>
                        Include a number (0-9).
                    </div>

                    <div
                        className={`${/(?=.*[!@#$%^&*_\-\.])/.test(password) ? "text-status-success" : "text-status-error"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${/(?=.*[!@#$%^&*_\-\.])/.test(password) ? "bg-status-success" : "bg-status-error"}`}
                        ></span>
                        Include a special character (!, @, #, $, %, ^, &, *, _,
                        -, .)
                    </div>
                    <div
                        className={`${password.length > 0 && !/^[A-Za-z\d!@#$%^&*_\-\. ]+$/.test(password) ? "text-status-error" : "hidden"} font-normal flex justify-start items-center gap-tight`}
                    >
                        <span
                            className={`min-h-2 min-w-2 aspect-square rounded-full ${password.length > 0 && !/^[A-Za-z\d!@#$%^&*_\-\. ]+$/.test(password) ? "bg-status-error" : "hidden"}`}
                        ></span>
                        Password contains unsupported characters.
                    </div>
                </div>
            )}

            {type === "confirm" && (isClicked || validate) && (
                <p className="text-status-error px-btn-md">
                    {validateConfirmPassword()}
                </p>
            )}
        </div>
    );
};

export default PasswordInput;
