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
                    <ul className="list-disc list-inside">
                        {customers.map((customer) => (
                            <li key={customer.customer_id}>
                                {customer.customer_name} -{" "}
                                {customer.contact_name} - {customer.address} -{" "}
                                {customer.city} - {customer.postal_code} -{" "}
                                {customer.country}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
        </div>
    );
}
