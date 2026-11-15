export interface IUser {
    id?: string;
    email: string;
    userName?: string | null;
    fullName?: string | null;
    password?: string | null;
    avatarUrl?: string | null;
    isEmailVerified?: boolean;
    isGoogleLinked?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface ISession {
    id?: string;
    userID: string;
    token: string;
    deviceInfo?: IDevice;
    expiresAt: string | Date;
    createdAt?: string | Date;
}

export interface IToken {
    id: string;
    sessionID: string;
    iat: number;
    exp: number;
}

export interface IDevice {
    [key: string]: string | null;
    browser: string;
    os: string;
    device: string;
}
