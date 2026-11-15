import env from "@/config/env.js";
import { connectDB, disconnectDB } from "@/config/db.js";
import app from "@/app.js";

// connectDB
// Start server
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();

        const server = app.listen(env.PORT, () => {
            console.log(`Server running on http://localhost:${env.PORT}`);
        });

        // Prevent multiple shutdown executions
        let isShuttingDown = false;

        // Graceful shutdown
        const shutdown = (signal: string) => {
            if (isShuttingDown) return;

            isShuttingDown = true;
            console.log(`\n${signal} received. Shutting down gracefully...`);

            server.close(async (error) => {
                if (error) {
                    console.error("Error closing HTTP server:", error);
                    process.exitCode = 1;
                }

                try {
                    await disconnectDB();
                    console.log("Server shutdown completed.");
                } catch (error) {
                    console.error("Database disconnection failed:", error);
                    process.exitCode = 1;
                } finally {
                    process.exit();
                }
            });
        };

        // Listen for termination signals
        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error("Server startup failed:", error);
        await disconnectDB();
        process.exit(1);
    }
};

startServer();
