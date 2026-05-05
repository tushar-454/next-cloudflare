"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

// create customer action
export async function createCustomer(formData: FormData) {
    const { env } = await getCloudflareContext({ async: true });
    const d1 = env.D1_NC;

    const customerName = formData.get("customer_name") as string;
    const contactName = formData.get("contact_name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postal_code") as string;
    const country = formData.get("country") as string;

    try {
        const result = await d1
            .prepare(
                "INSERT INTO customers (customer_name, contact_name, address, city, postal_code, country) VALUES (?, ?, ?, ?, ?, ?)",
            )
            .bind(customerName, contactName, address, city, postalCode, country)
            .run();

        return { success: true, data: result };
    } catch (error) {
        console.error("Error creating customer:", error);
        return { success: false, error: "Failed to create customer" };
    }
}
