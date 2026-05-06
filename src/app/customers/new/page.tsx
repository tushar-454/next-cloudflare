"use client";

import { createCustomer } from "@/actions/customers";
import { CreateCustomerInput } from "@/validation/create-user.schema";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";

export default function CreateNewCustomer() {
    const [error, setError] = useState<CreateCustomerInput | null>(null);
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
                    const parse = JSON.parse(result.error as string);
                    setError(parse);
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
                className="space-y-4 max-w-xl"
            >
                <div>
                    <label className="block text-sm font-medium">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        name="customer_name"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.customer_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.customer_name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Contact Name
                    </label>
                    <input
                        type="text"
                        name="contact_name"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.contact_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.contact_name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.address}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.city && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.city}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        name="postal_code"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.postal_code && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.postal_code}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        name="country"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error?.country && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.country}
                        </p>
                    )}
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
