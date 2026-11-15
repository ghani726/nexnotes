import { IRequest } from "@/types/request.js";
import { NextFunction, Response } from "express";
import { UAParser } from "ua-parser-js";

const deviceInfo = (req: IRequest, res: Response, next: NextFunction) => {
    const ua = req.headers["user-agent"];
    const parser = new UAParser(ua);

    const result = parser.getResult();

    req.deviceInfo = {
        browser: `${result.browser.name ?? ""} ${result.browser.major ?? ""}`,
        os: `${result.os.name ?? ""} ${result.os.version ?? ""}`,
        device: `${result.device.type?.[0].concat(result.device.type.slice(1)) || "Desktop"}`,
    };

    next();
};

export default deviceInfo;
