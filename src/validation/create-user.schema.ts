import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(1, "User name is required")
        .min(3, "User name must be at least 3 characters")
        .max(100, "User name must not exceed 100 characters"),
    email: z.email("Invalid email address"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
