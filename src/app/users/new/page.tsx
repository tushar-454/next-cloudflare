"use client";

import { createUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function CreateNewUser() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                const formData = new FormData(e.currentTarget);
                const result = await createUser(formData);
                if (result.success) {
                    router.push("/users");
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong");
            }
        });
    };

    return (
        <div className="space-y-4">
            <h1>Create New User</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-xl"
            >
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
                >
                    {isPending ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
}
