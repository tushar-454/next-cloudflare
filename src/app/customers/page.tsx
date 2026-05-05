import { Customer } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Customers() {
    const { env } = await getCloudflareContext({ async: true });
    const d1 = env.D1_NC;

    const { results: customers } = await d1
        .prepare("SELECT * FROM customers")
        .all<Customer>();

    console.log(customers);
    return (
        <div className="space-y-4">
            <div>
                <h1>List of users from D1 Databases</h1>{" "}
                <Link href="/customers/new">
                    <button>Add New Customer</button>
                </Link>
            </div>
            <div>
                {customers.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Customer Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Contact Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Address
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    City
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Postal Code
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Country
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.customer_id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.customer_name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.contact_name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.address}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.city}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.postal_code}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {customer.country}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
        </div>
    );
}
