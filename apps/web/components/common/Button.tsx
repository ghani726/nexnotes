"use client";

import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

const Button = ({
    onClick,
    isSubmitting = false,
    type = "Primary",
    size = "M",
    isWidthFull = false,
    showShadow = false,
    showBorder = false,
    className,
    isSquare = false,
    children,
}: {
    onClick?: () => void;
    isSubmitting?: boolean;
    type?: "Primary" | "Secondary" | "Tertiary";
    size?: "S" | "M" | "L";
    isWidthFull?: boolean;
    showShadow?: boolean;
    showBorder?: boolean;
    isSquare?: boolean;
    className?: string;
    children: ReactNode;
}) => {
    const styles = [];

    if (size === "S") {
        styles.push(
            "h-10",
            "max-h-10",
            "text-body-sm",
            `${isSquare ? "px-0 aspect-square" : "px-btn-md"}`,
        );
    } else if (size === "M") {
        styles.push(
            "h-12",
            "max-h-12",
            `${isSquare ? "px-0 aspect-square" : "px-btn-lg"}`,
        );
    } else if (size === "L") {
        styles.push(
            "h-14",
            "max-h-14",
            `${isSquare ? "px-0 aspect-square" : "px-btn-xl"}`,
        );
    }

    if (type === "Primary") {
        styles.push("button-brand", "text-link");
    } else if (type === "Secondary") {
        styles.push("button-secondary");
    } else if (type === "Tertiary") {
        styles.push("button-tertiary");
    }

    if (isWidthFull) styles.push("w-full");
    if (showShadow) styles.push("shadow-medium");
    if (showBorder) styles.push("border-main");
    // if (isSquare) styles.push("px-0 aspect-square");

    return (
        <button
            onClick={() => onClick && onClick()}
            disabled={isSubmitting}
            className={`${styles.join(" ")} ${className ? className : ""}`}
        >
            {isSubmitting && (
                <LoaderCircle size={20} className="animate-spin"></LoaderCircle>
            )}
            {children}
        </button>
    );
};

export default Button;
