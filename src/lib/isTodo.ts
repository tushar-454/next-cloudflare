import { TODO } from "@/types";

export function isTodo(obj: any): obj is TODO {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.userId === "number" &&
        typeof obj.id === "number" &&
        typeof obj.title === "string" &&
        typeof obj.completed === "boolean"
    );
}
