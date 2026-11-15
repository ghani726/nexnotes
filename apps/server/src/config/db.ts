import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import env from "@/config/env.js";
const adapter = new PrismaPg({ connectionString: env.Database_Connection_String })

export const db = new PrismaClient({adapter});

export const connectDB = async () => {
    try {
        await db.$connect();
        // Verify an actual database connection
        await db.$queryRaw`SELECT 1`;
        console.log("PostgreSQL connected successfully");
    } catch (error) {
        console.error("PostgreSQL connection failed:", error);
        process.exit(1);
    }
};

// Type for database transactions
export type DBClient = Prisma.TransactionClient | typeof db;


export const disconnectDB = async () => {
    try {
        await db.$disconnect();
        console.log("PostgreSQL disconnected successfully");
    } catch (error) {
        console.error("PostgreSQL disconnection failed:", error);
    }
};