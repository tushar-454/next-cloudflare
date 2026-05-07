import { ZodSchema } from "zod";

export function zodValidation<T>(schema: ZodSchema, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues;
        throw new Error(errors[0].message);
    }

    return result.data as T;
}
