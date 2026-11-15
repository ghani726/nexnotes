import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("Database URL does not exists in .env");
}
if (!process.env.ACCESS_JWT_SECRET) {
    throw new Error("Access JWT Key does not exists in .env");
}
if (!process.env.REFRESH_JWT_SECRET) {
    throw new Error("Refresh JWT Key does not exists in .env");
}
if (!process.env.FRONTEND_URL) {
    throw new Error("Front-End URL does not exists in .env");
}
if (!process.env.X_SECRET_HEADER) {
    throw new Error("Secret Header does not exists in .env");
}
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE CLIENT ID does not exists in .env");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE CLIENT SECRET does not exists in .env");
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error("GOOGLE REFRESH TOKEN does not exists in .env");
}
if (!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE USER does not exists in .env");
}

const env = {
    Database_Connection_String: process.env.DATABASE_URL,
    ACCESS_JWT_KEY: process.env.ACCESS_JWT_SECRET,
    REFRESH_JWT_KEY: process.env.REFRESH_JWT_SECRET,
    FrontEnd_URL: process.env.FRONTEND_URL,
    Security_Header: process.env.X_SECRET_HEADER,
    PORT: process.env.PORT ? Number(process.env.PORT) : 7260,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER,
};

export default env;
