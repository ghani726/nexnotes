import { RequestHandler, Router } from "express";
import AC from "@/modules/auth/controller.js";
import AM from "@/modules/auth/middleware.js";
import VerifyUser from "@/middlewares/verifyUser.js";

const AuthRoutes = Router();

AuthRoutes.post("/verify", AC.VerifyToken);
AuthRoutes.post(
    "/register",
    AM.Register,
    AC.Register as unknown as RequestHandler,
);
AuthRoutes.post("/login", AM.Login, AC.Login as unknown as RequestHandler);
AuthRoutes.post("/refresh", AC.RefreshToken);
AuthRoutes.use(VerifyUser as unknown as RequestHandler);
AuthRoutes.post("/logout", AC.Logout as unknown as RequestHandler);
AuthRoutes.post("/logout/all", AC.LogoutAll as unknown as RequestHandler);

export default AuthRoutes;
