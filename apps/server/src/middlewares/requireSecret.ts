import env from "@/config/env.js";
import { NextFunction, Request, Response } from "express";

const requireSecret = (req: Request, res: Response, next: NextFunction) => {
    const clientSecret = req.headers["x_server_secret"]?.toString();

    if (!clientSecret?.trim() || clientSecret !== env.Security_Header) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Something went wrong on our end.",
            error: "Unauthorized request to the server.",
        });
    }
    next();
};

export default requireSecret;
