import { z } from "zod";

export const fullNameSchema = z
    .string("Full Name is required.")
    .trim()
    .min(4, {
        error: "Full name must be at least 4 characters.",
    })
    .max(30, {
        error: "Full name cannot exceed 30 characters.",
    })
    .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, {
        error: "Enter a valid full name.",
    });

export const emailSchema = z
    .string("Email is required.")
    .trim()
    .max(254, { error: "Email address is too long." })
    .pipe(
        z.email({
            error: "Please enter a valid email address.",
        }),
    );

export const userNameSchema = z
    .string("Username is required.")
    .trim()
    .min(4, {
        error: "Username must be at least 4 characters.",
    })
    .max(20, {
        error: "Username cannot exceed 20 characters.",
    })
    .regex(/^(?!.*[._-]{2})/, {
        error: "Username cannot contain consecutive special characters.",
    })
    .regex(/^[a-z][a-z0-9._-]*(?<![._-])$/, {
        error: "Username must start with a lowercase letter and contain only lowercase letters, numbers, underscores, hyphens, and periods. Also it cannot end with special characters.",
    });

export const passwordSchema = z
    .string("Password is required.")
    .min(8, {
        error: "Password must be at least 8 characters.",
    })
    .max(32, {
        error: "Password cannot exceed 32 characters.",
    })
    .regex(/[a-z]/, {
        error: "Include a lowercase letter (a-z).",
    })
    .regex(/[A-Z]/, {
        error: "Include an uppercase letter (A-Z).",
    })
    .regex(/[0-9]/, {
        error: "Include a number (0-9).",
    })
    .regex(/[!@#$%^&*_.\-]/, {
        error: "Include at least one special character.",
    })
    .regex(/^[A-Za-z0-9!@#$%^&*_.\- ]+$/, {
        error: "Password contains unsupported characters.",
    });
