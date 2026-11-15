import { ConflictError, UnauthorizedError } from "@/utils/AppError.js";
import { db, type DBClient } from "@/config/db.js";
import env from "@/config/env.js";
import type { ISession, IToken, IUser } from "@packages/types/auth.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { NotFoundError } from "@/utils/AppError.js";

interface IUserCheck {
    userName: string;
    email: string;
    isLogin?: boolean;
}

// #region => User CRUD
const CreateUser = async (newData: IUser, client: DBClient = db) =>
    await client.user.create({ data: newData });

const UpdateUser = async (
    userID: string,
    newData: IUser,
    client: DBClient = db,
) =>
    await client.user.update({
        where: { id: userID },
        data: newData,
    });

const FindUser = async (userID: string, client: DBClient = db) =>
    await client.user.findUnique({ where: { id: userID } });

const DeleteUser = async (userID: string, client: DBClient = db) =>
    await client.user.delete({ where: { id: userID } });

// #endregion

// #region => Session CRUD
const CreateSession = async (newData: ISession, client: DBClient = db) =>
    await client.session.create({ data: newData });

    const UpdateSession = async (
        newData: {
            userID: string;
            sessionID: string;
            oldToken?: string;
            token: string;
            expiresAt: string;
        },
        client: DBClient = db,
    ) =>
        await client.session.update({
            where: {
                id: newData.sessionID,
                userID: newData.userID,
                ...(newData.oldToken && { token: newData.oldToken }),
            },
            data: { token: newData.token, expiresAt: newData.expiresAt },
        });

const FindSession = async (
    userID: string,
    sessionID: string,
    client: DBClient = db,
) =>
    await client.session.findUnique({
        where: { id: sessionID, userID: userID },
    });

const FindSessions = async (userID: string, client: DBClient = db) =>
    await client.session.findMany({ where: { userID: userID } });

const DeleteSession = async (
    userID: string,
    sessionID: string,
    client: DBClient = db,
) => await client.session.delete({ where: { id: sessionID, userID: userID } });

const DeleteSessions = async (userID: string, client: DBClient = db) =>
    await client.session.deleteMany({ where: { userID: userID } });

// #endregion

const userCheck = async (
    { userName, email, isLogin }: IUserCheck,
    client: DBClient = db,
) => {
    // 1. Find the user
    const existingUser = await client.user.findFirst({
        where: {
            OR: [{ email: email }, { userName: userName }],
        },
    });

    // 2. If register controller
    if (existingUser && existingUser.email === email && !isLogin) {
        throw new ConflictError("This email is already registered.");
    } else if (existingUser && existingUser.userName === userName && !isLogin) {
        throw new ConflictError(
            "This username is already taken. Try something else.",
        );

        // 3. If login controller
    } else if (!existingUser && isLogin) {
        throw new NotFoundError("No user found with this email or username.");
    }

    return existingUser;
};

const HashPassword = async (value: string) => await bcrypt.hash(value, 12);

const ComparePasswordHash = async (value: string, hash: string) =>
    await bcrypt.compare(value, hash);

const HashToken = (token: string): string =>
    crypto.createHash("sha512").update(token).digest("hex");

const CompareTokenHash = (token: string, hash: string): boolean =>
    HashToken(token) === hash;

const GenerateRefreshToken = async (userID: string, sessionID: string) => {
    const refreshToken = jwt.sign(
        { id: userID, sessionID: sessionID },
        env.REFRESH_JWT_KEY,
        {
            expiresIn: "7d",
        },
    );
    const refreshTokenHash = await HashToken(refreshToken);
    const endTime = await VerifyToken(refreshToken).exp;
    const expiresAt = new Date(endTime).toISOString();
    return { refreshToken, refreshTokenHash, expiresAt };
};

const GenerateAccessToken = (userID: string, sessionID: string) => {
    const accessToken = jwt.sign(
        { id: userID, sessionID: sessionID },
        env.ACCESS_JWT_KEY,
        {
            expiresIn: "10m",
        },
    );
    return accessToken;
};

const VerifyToken = (token: string, isAccess = false) => {
    let decodedToken = null;
    try {
        if (isAccess) decodedToken = jwt.verify(token, env.ACCESS_JWT_KEY);
        else decodedToken = jwt.verify(token, env.REFRESH_JWT_KEY);
    } catch {
        throw new UnauthorizedError(
            "You have been logged out successfully.",
            "Invalid Token.",
        );
    }
    return decodedToken as IToken;
};

const AuthService = {
    userCheck,
    HashPassword,
    ComparePasswordHash,
    HashToken,
    CompareTokenHash,

    // User
    CreateUser,
    UpdateUser,
    FindUser,
    DeleteUser,

    // Session
    CreateSession,
    UpdateSession,
    FindSession,
    FindSessions,
    DeleteSession,
    DeleteSessions,

    // Tokens
    GenerateRefreshToken,
    GenerateAccessToken,
    VerifyToken,
};

export default AuthService;
