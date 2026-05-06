"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function deleteTodoFromCache(id: number | string) {
    const { env } = await getCloudflareContext({ async: true });
    const kv = env.KV;
    try {
        await kv.delete(id.toString());
        return { success: true };
    } catch (error) {
        console.error("Failed to delete from KV:", error);
        return { success: false, error: "Failed to delete cache" };
    }
}
