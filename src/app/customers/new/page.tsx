"use client";

import { createCustomer } from "@/actions/customers";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function CreateNewCustomer() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                const formData = new FormData(e.currentTarget);
                const result = await createCustomer(formData);

                if (result.success) {
                    router.push("/customers");
                } else {
                    alert("Error: " + result.error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong");
            }
        });
    };

    return (
        <div className="space-y-4">
            <h1>Create New Customer</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md"
            >
                <div>
                    <label className="block text-sm font-medium">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        name="customer_name"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Contact Name
                    </label>
                    <input
                        type="text"
                        name="contact_name"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        name="postal_code"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        name="country"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
                >
                    {isPending ? "Creating..." : "Create Customer"}
                </button>
            </form>
        </div>
    );
}
