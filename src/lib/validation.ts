import { ZodSchema } from "zod";

export function zodValidation<T>(
    schema: ZodSchema,
    data: unknown,
    isFieldErrors = true,
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues;
        const fieldErrors: Record<string, string> = {};

        for (const issue of errors) {
            const key = issue.path.join(".") || "root";

            if (!fieldErrors[key]) {
                fieldErrors[key] = "";
            }

            fieldErrors[key] += issue.message + " ";
        }

        throw new Error(
            JSON.stringify(isFieldErrors ? fieldErrors : errors[0].message),
        );
    }

    return result.data as T;
}
