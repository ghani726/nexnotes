import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import env from "@/config/env.js";
import deviceInfo from "@/middlewares/deviceInfo.js";
import requireSecret from "@/middlewares/requireSecret.js";
import MainRoute from "@/routes.js";
import error from "@/middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    cors({
        origin: env.FrontEnd_URL,
        methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    }),
);
app.get("/health", (req, res) => res.send({ success: true }));
app.use(requireSecret);
app.use(deviceInfo as RequestHandler);
app.use("/api/v1", MainRoute);
app.use(error);

export default app;
