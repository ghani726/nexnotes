"use client";

import HandleOutsideClick from "@/utils/HandleOutsideClick";
import { UserRound } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

const FullNameInput = ({
    required = true,
    value,
    setValue,
    validate = false,
}: {
    required?: boolean;
    validate?: boolean;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const validateValue = () => {
        const fullNameReg =
            /^(?!.*[-' ]{4})[a-zA-Z](?:[a-zA-Z' -]{0,26}[a-zA-Z])?$/;
        if (required && !value.trim()) return "Full name is required.";
        if (value.length < 4 || value.length > 30) {
            return "Full name must be between 4 to 30 characters.";
        } else if (!fullNameReg.test(value)) {
            return "Enter a valid full name";
        }
    };

    const obj = !required
        ? HandleOutsideClick(() => setIsClicked(false))
        : null;

    return (
        <div className="flex flex-col animate-main gap-tight">
            <div className="relative w-full">
                <input
                    ref={obj?.ref || null}
                    id={"FullName"}
                    type="text"
                    value={value}
                    onClick={() => {
                        setIsClicked(true);
                        obj?.reset?.();
                    }}
                    onChange={(e) => setValue(e.target.value)}
                    className={`peer input-box pl-12 pr-4 ${(isClicked || validate) && validateValue() && "input-box-error"}`}
                    placeholder=" "
                />
                <UserRound
                    size={20}
                    className={`input-box-icon ${(isClicked || validate) && validateValue() && "input-box-icon-error"}`}
                ></UserRound>

                <label
                    htmlFor="fullNameInput"
                    className={`input-box-label ${(isClicked || validate) && validateValue() && "input-box-label-error"}`}
                >
                    Full Name
                </label>
            </div>

            {(isClicked || validate) && (
                <p className="text-status-error px-btn-md">{validateValue()}</p>
            )}
        </div>
    );
};

export default FullNameInput;
