import { Customer } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function Customers() {
    const { env } = await getCloudflareContext({ async: true });
    const d1 = env.D1_NC;

    const { results: customers } = await d1
        .prepare("SELECT * FROM customers")
        .all<Customer>();

    console.log(customers);
    return (
        <div className="space-y-4">
            <h1>List of users from D1 Databases</h1>

            <ul>
                {customers.map((customer) => (
                    <li key={customer.customer_id}>{customer.customer_name}</li>
                ))}
            </ul>
        </div>
    );
}
