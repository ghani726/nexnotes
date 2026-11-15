import { NotFoundError, UnprocessableEntityError } from "@/utils/AppError.js";
import { registerSchema } from "@packages/validation/src/auth.js";
import {
    emailSchema,
    passwordSchema,
    userNameSchema,
} from "@packages/validation/src/common.js";
import type { NextFunction, Request, Response } from "express";

const Register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Destructure data from response body
    const {
        fullName,
        email,
        userName,
        password,
        confirmPassword,
    }: Record<string, string> = req.body;

    // 2. Validate using ZOD
    const result = registerSchema.safeParse({
        fullName,
        email,
        userName,
        password,
        confirmPassword,
    });

    // 3. If error, throw error
    if (!result.success)
        throw new UnprocessableEntityError(result.error?.issues[0].message);

    // 4. Pass the request
    next();
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Destructure data from response body
    const { email, userName, password }: Record<string, string> = req.body;
    
    // 2. If both are not provided, return error
    if (!email?.trim() && !userName?.trim()) {
        throw new NotFoundError("Email or Username is required.");
    }

    // 2. If both are provided, return error
    if (email && userName) {
        throw new UnprocessableEntityError("Provide either email or username.");
    }

    // 3. Validate the provided one
    if (email) {
        const result = emailSchema.safeParse(email);
        if (!result.success)
            throw new UnprocessableEntityError(result.error?.issues[0].message);
    } else if (userName) {
        const result = userNameSchema.safeParse(userName);
        if (!result.success)
            throw new UnprocessableEntityError(result.error?.issues[0].message);
    }

    // 4. Validate Password
    const result = passwordSchema.safeParse(password);
    if (!result.success)
        throw new UnprocessableEntityError(result.error?.issues[0].message);

    // 5. Pass the request
    next();
};

const AuthMiddleware = {
    Register,
    Login,
};

export default AuthMiddleware;
