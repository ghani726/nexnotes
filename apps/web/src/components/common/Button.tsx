"use client";

import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

const Button = ({
    onClick,
    isSubmitting = false,
    title = "Button",
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
    title?: string;
    type?: "Primary" | "Secondary" | "Tertiary";
    size?: "S" | "M" | "L" | "XL" | "NULL";
    isWidthFull?: boolean;
    showShadow?: boolean;
    showBorder?: boolean;
    isSquare?: boolean;
    className?: string;
    children: ReactNode;
}) => {
    const styles = [];

    if (size === "S") styles.push("px-btn-md h-10 max-h-10 text-body-sm");
    else if (size === "M") styles.push("px-btn-lg h-12 max-h-12");
    else if (size === "L") styles.push("px-btn-xl h-14 max-h-14");
    else if (size === "XL") styles.push("px-btn-2xl h-16 max-h-16");
    else if (size === "NULL") styles.push("");

    if (type === "Primary") styles.push("button-brand", "text-link");
    else if (type === "Secondary") styles.push("button-secondary");
    else if (type === "Tertiary") styles.push("button-tertiary");

    if (isSquare) styles.push("px-0 aspect-square");
    if (isWidthFull) styles.push("w-full");
    if (showShadow) styles.push("shadow-medium");
    if (showBorder) styles.push("border-main");
    // if (isSquare) styles.push("px-0 aspect-square");

    return (
        <button
            title={title}
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
