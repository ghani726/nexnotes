import { AppError } from "@/utils/AppError.js";
import { Response } from "express";

const error = async (
    err: AppError,
    req: unknown,
    res: Response,
    next: unknown, // eslint-disable-line
) => {
    const message =
        err instanceof AppError
            ? err.message
            : "Something went wrong on our end. Try again later.";
    const error = err instanceof AppError ? err.error : (err as Error).message;

    console.log(error);
    console.log(message);
    
    return res.status(err.statusCode || 500).json({
        success: false,
        status: err.statusCode || 500,
        message: message,
        error: error,
    });
};

export default error;
