"use client";

import HandleOutsideClick from "@/utils/HandleOutsideClick";
import { AtSign, Mail } from "lucide-react";
import { useState } from "react";

const UsernameOrEmailInput = ({
    validate = false,
    required = true,
    value,
    setValue,
    type,
}: {
    validate?: boolean;
    type: "username" | "email" | "both";
    required?: boolean;
    value: string;
    setValue: (e: string) => void;
}) => {
    const label = (() => {
        if (type === "username") return "Username";
        else if (type === "email") return "Email";
        else return "Username or Email";
    })();

    const [isClicked, setIsClicked] = useState(false);

    const validateFirstField = () => {
        const validateEmail = () => {
            const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailReg.test(value)) return "Enter a valid email address";
        };

        const validateUserName = () => {
            const userNameReg = /^(?!.*[\_\-\.]{2})[a-z][a-z0-9_\-\.]{3,19}$/;
            if (value.length < 4 || value.length > 20) {
                return "Username must be between 4 to 20 characters.";
            } else if (!/^[a-z]/.test(value)) {
                return "Username must start with a letter.";
            } else if (/[\_\-\.]{2}/.test(value)) {
                return "Username cannot contain consecutive special characters (like __, --, or ..).";
            } else if (!userNameReg.test(value)) {
                return "Username can only contain lowercase letters, numbers, underscores, hyphens, and periods.";
            }
        };

        if (type === "both") {
            if (required && !value?.trim())
                return "Username or Email is required.";
            if (value.includes("@")) return validateEmail();
            else return validateUserName();
        } else if (type === "email") {
            if (required && !value?.trim()) return "Email is required.";
            return validateEmail();
        } else if (type === "username") {
            if (required && !value?.trim()) return "Username is required.";
            return validateUserName();
        }
    };

    const showIcon = () => {
        if (type === "email")
            return (
                <Mail
                    size={20}
                    className={`input-box-icon ${(isClicked || validate) && validateFirstField() && "input-box-icon-error"}`}
                ></Mail>
            );
        else
            return (
                <AtSign
                    size={20}
                    className={`input-box-icon ${(isClicked || validate) && validateFirstField() && "input-box-icon-error"}`}
                ></AtSign>
            );
    };

    const obj = !required
        ? HandleOutsideClick(() => setIsClicked(false))
        : null;

    return (
        <div className="flex flex-col animate-main gap-tight">
            <div className="relative w-full">
                <input
                    ref={obj?.ref || null}
                    id={label}
                    type="text"
                    value={value}
                    onFocus={() => setIsClicked(true)}
                    onClick={() => {
                        setIsClicked(true);
                        obj?.reset?.();
                    }}
                    onChange={(e) => setValue(e.target.value)}
                    className={`peer input-box pl-12 pr-4 ${(isClicked || validate) && validateFirstField() && "input-box-error"}`}
                    placeholder=" "
                />
                {showIcon()}

                <label
                    htmlFor={label}
                    className={`input-box-label ${(isClicked || validate) && validateFirstField() && "input-box-label-error"}`}
                >
                    {label}
                </label>
            </div>

            {(isClicked || validate) && (
                <p className="text-status-error px-btn-md">
                    {validateFirstField()}
                </p>
            )}
        </div>
    );
};

export default UsernameOrEmailInput;
