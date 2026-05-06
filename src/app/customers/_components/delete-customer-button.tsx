"use client";

import { deleteCustomer } from "@/actions/customers";
export default function DeleteCustomerButton({
    customerId,
}: {
    customerId: number;
}) {
    return (
        <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => deleteCustomer(customerId)}
        >
            Delete
        </button>
    );
}
