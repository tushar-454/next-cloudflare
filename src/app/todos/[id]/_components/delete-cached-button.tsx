"use client";
import { deleteTodoFromCache } from "@/actions/delete-cache-kv";
import { useRouter } from "next/navigation";
export default async function DeleteCachedButton({ id }: { id: string }) {
    const router = useRouter();
    const handleDeleteCache = async () => {
        const result = await deleteTodoFromCache(id);

        if (result.success) {
            console.log("Cache deleted successfully");
            router.refresh();
        } else {
            console.error("Failed to delete cache:", result.error);
        }
    };
    return <button onClick={handleDeleteCache}>Delete Cache</button>;
}
