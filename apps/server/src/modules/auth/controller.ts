import type { Request, Response } from "express";
import type { IRequest } from "@/types/request.js";
import { db } from "@/config/db.js";
import {
    UnauthorizedError,
    UnprocessableEntityError,
} from "@/utils/AppError.js";
import AuthService from "@/modules/auth/service.js";
import VerifyRequest from "@/utils/verifyRequest.js";

interface IBody {
    fullName: string;
    email: string;
    userName: string;
    password: string;
}

const Register = async (req: IRequest, res: Response) => {
    const { fullName, email, userName, password } = req.body as IBody;

    // 1. Start Transaction
    const result = await db.$transaction(async (tx) => {
        // 2. Check if any user exists in DB with given "userName" or "email", if found, it would automatically return error in response
        await AuthService.userCheck({ userName, email }, tx);

        // 3. Hash the password
        const hashedPassword = await AuthService.HashPassword(password);

        // 4. Create User
        const newUser = await AuthService.CreateUser(
            {
                fullName: fullName,
                email: email,
                userName: userName,
                password: hashedPassword,
            },
            tx,
        );

        // 5. Create new Session
        const newSession = await AuthService.CreateSession(
            {
                userID: newUser?.id,
                token: "Empty",
                expiresAt: new Date().toISOString(),
                deviceInfo: req.deviceInfo,
            },
            tx,
        );

        // 6. Generate a new Refresh Token
        const { refreshToken, refreshTokenHash, expiresAt } =
            await AuthService.GenerateRefreshToken(newUser?.id, newSession?.id);

        // 7. Assign the refresh token to the session
        await AuthService.UpdateSession(
            {
                sessionID: newSession?.id,
                userID: newUser?.id,
                token: refreshTokenHash,
                expiresAt: expiresAt,
            },
            tx,
        );

        // 8. Generate a new Access Token
        const accessToken = AuthService.GenerateAccessToken(
            newUser?.id,
            newSession?.id,
        );

        return {
            newUser,
            refreshToken,
            accessToken,
        };
    });

    // 9. Send response
    return res.status(201).json({
        success: true,
        status: 201,
        message: "Account created successfully.",
        data: {
            user: {
                fullName: result?.newUser?.fullName,
                email: result?.newUser?.email,
                userName: result?.newUser?.userName,
                emailVerified: result.newUser.emailVerified,
                avatarUrl: result.newUser.avatarUrl,
            },
            token: result?.accessToken,
            refreshToken: result?.refreshToken,
        },
    });
};

const Login = async (req: IRequest, res: Response) => {
    const { email, userName, password } = req.body as IBody;

    // 1. Start Transaction
    const result = await db.$transaction(async (tx) => {
        // 2. Check if any user exists in DB with given "userName" or "email", if found, it would automatically return error in response
        const existingUser = await AuthService.userCheck(
            { userName, email, isLogin: true },
            tx,
        );

        // 3. Check if password is correct
        const isPasswordCorrect = await AuthService.ComparePasswordHash(
            password,
            existingUser?.password ?? "",
        );

        // 4. If password is not correct, return error
        if (!isPasswordCorrect) {
            throw new UnauthorizedError(
                "Invalid details. Please provide correct ones.",
            );
        }

        // 5. Create new Session
        const newSession = await AuthService.CreateSession(
            {
                userID: existingUser!.id,
                token: "Empty",
                expiresAt: new Date().toISOString(),
                deviceInfo: req.deviceInfo,
            },
            tx,
        );

        // 6. Generate a new Refresh Token
        const { refreshToken, refreshTokenHash, expiresAt } =
            await AuthService.GenerateRefreshToken(
                existingUser!.id,
                newSession?.id,
            );

        // 7. Assign the refresh token to the session
        await AuthService.UpdateSession(
            {
                sessionID: newSession?.id,
                userID: existingUser!.id,
                token: refreshTokenHash,
                expiresAt: expiresAt,
            },
            tx,
        );

        // 8. Generate a new Access Token
        const accessToken = AuthService.GenerateAccessToken(
            existingUser!.id,
            newSession?.id,
        );

        return {
            existingUser,
            refreshToken,
            accessToken,
        };
    });

    // 9. Send response
    return res.status(200).json({
        success: true,
        status: 200,
        message: "Signed in successfully.",
        data: {
            user: {
                fullName: result?.existingUser!.fullName,
                email: result?.existingUser!.email,
                userName: result?.existingUser!.userName,
                emailVerified: result?.existingUser!.emailVerified,
                avatarUrl: result?.existingUser!.avatarUrl,
            },
            token: result?.accessToken,
            refreshToken: result?.refreshToken,
        },
    });
};

const RefreshToken = async (req: Request, res: Response) => {
    const { token } = req.body as { token: string };
    const includeUser = req.query.includeUser === "true";
    const rotateRefreshToken =
        req.query.rotateRefreshToken === "false" ? false : true;
    // 1. Start Transaction
    const result = await db.$transaction(async (tx) => {
        // 2. Authenticate and verify the request
        const { user, sessionID } = await VerifyRequest(token, false, tx);

        // 3. Find the session
        const session = await AuthService.FindSession(user.id, sessionID, tx);

        // 4. If not found, return error
        if (!session) {
            throw new UnauthorizedError(
                "You were logged out successfully.",
                "No session found with provided refresh token.",
            );
        }

        // 5. Check if token is valid
        const isValidSession = await AuthService.CompareTokenHash(
            token,
            session.token,
        );

        // 6. If not valid, return error
        if (!isValidSession) {
            throw new UnauthorizedError(
                "You were logged out successfully.",
                "Refresh Token didn't matched the saved hash.",
            );
        }

        // 7. Generate a new Access Token
        const accessToken = AuthService.GenerateAccessToken(
            user.id,
            session.id,
        );

        // 8. Generate a new Refresh Token if asked to rotate, else return null
        let refreshToken = null;
        if (rotateRefreshToken) {
            const generated =
                await AuthService.GenerateRefreshToken(user.id, session.id);

            // 9. Assign the refresh token to the session
            await AuthService.UpdateSession(
                {
                    sessionID: session.id,
                    userID: user!.id,
                    oldToken: session.token,
                    token: generated.refreshTokenHash,
                    expiresAt: generated.expiresAt,
                },
                tx,
            );

            refreshToken = generated.refreshToken;
        }

        return {
            user,
            refreshToken,
            accessToken,
        };
    });

    // 10. Send response
    return res.status(200).json({
        success: true,
        status: 200,
        message: "Access token refreshed.",
        data: {
            token: result.accessToken,
            refreshToken: result.refreshToken,
        },
        ...(includeUser && {
            user: {
                fullName: result.user.fullName,
                email: result.user.email,
                userName: result.user?.userName,
                emailVerified: result.user?.emailVerified,
                avatarUrl: result.user?.avatarUrl,
            },
        }),
    });
};

const Logout = async (req: IRequest, res: Response) => {
    // 1. Check type, if not provided, then it is current
    const type = req.query.type ?? "current";

    // 2. Get Session ID, if type is current, get it from the middleware, else get it from body
    const sessionID =
        type === "current" ? req.sessionID! : (req.body.sessionID as string);

    // 3. If type is "specific", then make sure sessionID is not empty
    if (type === "specific" && !sessionID)
        throw new UnprocessableEntityError(
            "You were logged out successfully.",
            "No session id was found in request body.",
        );

    // 4. Delete the session
    await AuthService.DeleteSession(req.user.id!, sessionID);

    // 5. Send response
    return res.status(200).json({
        success: true,
        status: 200,
        message: "Logged out successfully.",
    });
};

const LogoutAll = async (req: IRequest, res: Response) => {
    // 1. Delete all sessions
    await AuthService.DeleteSessions(req.user.id!);

    // 2. Send response
    return res.status(200).json({
        success: true,
        status: 200,
        message: "Logged out successfully from all devices.",
    });
};

const VerifyToken = async (req: Request, res: Response) => {
    const { token } = req.body as { token: string };
    AuthService.VerifyToken(token);
    return res.status(200).json({
        success: true,
        status: 200,
        message: "Token is valid.",
    });
};

const AuthController = {
    Register,
    Login,
    RefreshToken,
    Logout,
    LogoutAll,
    VerifyToken,
};

export default AuthController;
