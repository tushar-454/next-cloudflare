import { defineConfig } from "drizzle-kit";
import { readdirSync } from "fs";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    schema: "./src/schema/schema.d1.ts",
    out: "./drizzle/migrations",
    dialect: "sqlite",

    ...(isProduction
        ? {
              driver: "d1-http",
              dbCredentials: {
                  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
                  databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
                  token: process.env.CLOUDFLARE_D1_TOKEN!,
              },
          }
        : {
              dbCredentials: {
                  url: getLocalD1Url(),
              },
          }),
});

function getLocalD1Url(): string {
    try {
        const basePath = path.resolve(
            ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
        );

        if (!require("fs").existsSync(basePath)) {
            console.warn("⚠️ Local D1 folder not found. Using in-memory DB.");
            return ":memory:";
        }

        const files = readdirSync(basePath, {
            encoding: "utf8",
            recursive: true,
        }) as string[];

        const sqliteFile = files.find((file) => file.endsWith(".sqlite"));

        if (sqliteFile) {
            const fullPath = path.join(basePath, sqliteFile);

            return fullPath;
        }
    } catch (err) {
        console.warn("⚠️ Could not locate local D1 database file:", err);
    }

    console.warn("⚠️ Falling back to :memory: database");
    return ":memory:";
}
