import { z } from "zod";

export const createCustomerSchema = z.object({
    customer_name: z
        .string()
        .min(1, "Customer name is required")
        .min(3, "Customer name must be at least 3 characters")
        .max(100, "Customer name must not exceed 100 characters"),
    contact_name: z
        .string()
        .min(1, "Contact name is required")
        .min(2, "Contact name must be at least 2 characters")
        .max(100, "Contact name must not exceed 100 characters"),
    address: z
        .string()
        .min(1, "Address is required")
        .min(5, "Address must be at least 5 characters")
        .max(255, "Address must not exceed 255 characters"),
    city: z
        .string()
        .min(1, "City is required")
        .min(2, "City must be at least 2 characters")
        .max(100, "City must not exceed 100 characters"),
    postal_code: z
        .string()
        .min(1, "Postal code is required")
        .min(2, "Postal code must be at least 2 characters")
        .max(20, "Postal code must not exceed 20 characters"),
    country: z
        .string()
        .min(1, "Country is required")
        .min(2, "Country must be at least 2 characters")
        .max(100, "Country must not exceed 100 characters"),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
