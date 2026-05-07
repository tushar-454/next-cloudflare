"use server";

import { getDbAsync } from "@/lib/db";
import { zodValidation } from "@/lib/validation";
import { usersTable } from "@/schema/schema.hyperdrive";
import {
    CreateUserInput,
    createUserSchema,
} from "@/validation/create-user.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// create user action
export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
        const validatedData = zodValidation<CreateUserInput>(createUserSchema, {
            name,
            email,
        });

        const db = await getDbAsync();
        const newUser = await db
            .insert(usersTable)
            .values(validatedData)
            .returning();
        revalidatePath("/users");
        return { success: true, data: newUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create user",
        };
    }
}

// delete user action
export async function deleteUser(userId: number) {
    try {
        const db = await getDbAsync();
        await db.delete(usersTable).where(eq(usersTable.id, userId));
        revalidatePath("/users");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete user",
        };
    }
}
