if (!Bun.env.DB_URL) {
    throw new Error("Database URL does not exists in .env");
}
if (!Bun.env.JWT_SECRET) {
    throw new Error("JWT Key does not exists in .env");
}
if (!Bun.env.FRONTEND_URL) {
    throw new Error("Front-End URL does not exists in .env");
}
if (!Bun.env.X_SECRET_HEADER) {
    throw new Error("Secret Header does not exists in .env");
}

const config = {
    Database_Connection_String: Bun.env.MONGO_URI,
    JWT_KEY: Bun.env.JWT_SECRET,
    FrontEnd_URL: Bun.env.FRONTEND_URL,
    Security_Header: Bun.env.X_SECRET_HEADER,
    PORT: Bun.env.PORT ? Number(Bun.env.PORT) : 7260,
};

export default config;
