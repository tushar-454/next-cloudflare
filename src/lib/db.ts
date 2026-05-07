import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

export const getDb = () => {
    const client = postgres(connectionString, { prepare: false });
    return drizzle({ client });
};

export const getDbAsync = async () => {
    const client = postgres(connectionString, { prepare: false });
    return drizzle({ client });
};
