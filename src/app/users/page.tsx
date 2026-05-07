import { getDbAsync } from "@/lib/db";
import { usersTable } from "@/schema/schema.hyperdrive";
import Link from "next/link";
import DeleteUserButton from "./_components/delete-user-button";

export default async function Users() {
    const db = await getDbAsync();
    const usersData = await db.select().from(usersTable);

    return (
        <div className="space-y-4">
            <div></div>
            <div>
                <h1>List of users from Hyperdrive Databases</h1>{" "}
                <Link href="/users/new">
                    <button>Add New User</button>
                </Link>
            </div>
            <div>
                {usersData.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Email
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.email}
                                    </td>

                                    <td className="border border-gray-300 px-4 py-2">
                                        <DeleteUserButton userId={user.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}
