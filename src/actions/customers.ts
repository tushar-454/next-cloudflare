"use server";

import { getDbAsync } from "@/lib/db";
import { zodValidation } from "@/lib/validation";
import { customers as customerSchema } from "@/schema/schema.d1";
import {
    CreateCustomerInput,
    createCustomerSchema,
} from "@/validation/create-user.schema";
import { revalidatePath } from "next/cache";

// create customer action
export async function createCustomer(formData: FormData) {
    const customerName = formData.get("customer_name") as string;
    const contactName = formData.get("contact_name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postal_code") as string;
    const country = formData.get("country") as string;

    try {
        const validatedData = zodValidation<CreateCustomerInput>(
            createCustomerSchema,
            {
                customer_name: customerName,
                contact_name: contactName,
                address,
                city,
                postal_code: postalCode,
                country,
            },
        );

        const db = await getDbAsync();
        const newCustomer = await db
            .insert(customerSchema)
            .values(validatedData)
            .returning();
        revalidatePath("/customers");
        return { success: true, data: newCustomer };
    } catch (error) {
        console.error("Error creating customer:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create customer",
        };
    }
}
