"use client";

import { deleteUser } from "@/actions/users";
export default function DeleteUserButton({ userId }: { userId: number }) {
    return (
        <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => deleteUser(userId)}
        >
            Delete
        </button>
    );
}
