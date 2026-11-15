import type { NextFunction, Response } from "express";
import type { IRequest } from "@/types/request.js";
import VerifyRequest from "@/utils/verifyRequest.js";

const VerifyUser = async (req: IRequest, res: Response, next: NextFunction) => {
    // 1. Extract User from
    const { token }: { token: string } = req.body;

    // 2. Check if request is valid.
    const { user, sessionID } = await VerifyRequest(token);

    // 3. Append user to the request object
    req.user = user;
    req.sessionID = sessionID;

    // 4. Go forward
    next();
};

export default VerifyUser;
