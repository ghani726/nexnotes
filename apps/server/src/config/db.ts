import { PrismaClient } from "@prisma/client/extension";
import config from "./config";

// Creates a single global database instance for your app
export const db = new PrismaClient({
    datasources: {
        db: {
            url: config.Database_Connection_String,
        },
    },
});
