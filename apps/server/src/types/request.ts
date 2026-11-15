import type { IDevice, IUser } from "@packages/types/auth.js";
import type { Request } from "express";

export interface IRequest extends Request {
    user: IUser;
    deviceInfo: IDevice;
    sessionID: string;
    token?: string;
}
