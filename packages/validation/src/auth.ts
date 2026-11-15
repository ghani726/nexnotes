import { z } from "zod";
import {
    emailSchema,
    fullNameSchema,
    passwordSchema,
    userNameSchema,
} from "./common.ts";

export const registerSchema = z
    .object({
        fullName: fullNameSchema,
        email: emailSchema,
        userName: userNameSchema,
        password: passwordSchema,
        confirmPassword: z.string("Confirm Password is required."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    userName: userNameSchema,
    password: passwordSchema,
});
