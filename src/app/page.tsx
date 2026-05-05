import { TODO } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Link from "next/link";

export default async function Home() {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
    );
    const todos: TODO[] = await res.json();

    const { env } = await getCloudflareContext({ async: true });
    const kv = env.KV;

    const { keys } = await kv.list();

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold">Hello worker!</h1>
            <ul className="flex items-center gap-5">
                <li className="underline">
                    <Link href="/images">Images</Link>
                </li>
                <li className="underline">
                    <Link href="/customers">Customers</Link>
                </li>
            </ul>
            <div className="flex gap-10 items-start lg:flex-row flex-col">
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <Link href={`/todos/${todo.id}`}>
                                {todo.id} - {todo.title}{" "}
                                {todo.completed ? "✅" : "❌"}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="space-y-2">
                    {!keys.length && <p>No KV pairs found.</p>}
                    {keys.map((key) => (
                        <li key={key.name}>
                            {key.name} -{" "}
                            {key.expiration &&
                                new Date(
                                    key.expiration * 1000,
                                ).toLocaleTimeString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
