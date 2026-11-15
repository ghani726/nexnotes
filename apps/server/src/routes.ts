import AuthRoutes from "@/modules/auth/routes.js";

// import TransactionRoutes from "@/modules/transactions/transaction.routes";

import { Router } from "express";

// 1. Creating Router
const MainRoute = Router();

// 2. Routes
MainRoute.use("/auth", AuthRoutes);


// 3. Export
export default MainRoute;
