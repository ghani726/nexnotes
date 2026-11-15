if (!process.env.BACKEND_URL) {
    throw new Error("Back-End URL does not exists in .env");
}
if (!process.env.X_SECRET_HEADER) {
    throw new Error("Secret Header does not exists in .env");
}
if (!process.env.API_TIMEOUT) {
    throw new Error("API Timeout does not exists in .env");
}

const env = {
    BackEnd_URL: process.env.BACKEND_URL,
    Security_Header: process.env.X_SECRET_HEADER,
    API_Timeout: Number(process.env.API_TIMEOUT || 10000),
};

export default env;
