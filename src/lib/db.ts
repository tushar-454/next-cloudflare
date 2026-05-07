import * as schema from "@/schema/schema.hyperdrive";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { cache } from "react";

export const getDb = cache(() => {
    const { env } = getCloudflareContext();
    const connectionString = env.HYPERDRIVE.connectionString;
    const pool = new Pool({
        connectionString,
        maxUses: 1,
    });
    return drizzle({ client: pool, schema });
});

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDbAsync = cache(async () => {
    const { env } = await getCloudflareContext({ async: true });
    const connectionString = env.HYPERDRIVE.connectionString;
    const pool = new Pool({
        connectionString,
        maxUses: 1,
    });
    return drizzle({ client: pool, schema });
});
