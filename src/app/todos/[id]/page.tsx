import { isTodo } from "@/lib/isTodo";
import { TODO } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import DeleteCachedButton from "./_components/delete-cached-button";

export default async function TodoDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const kv = env.KV;

    const jsonValue = await kv.get(id, { type: "json" });

    let todo: TODO;

    if (isTodo(jsonValue)) {
        todo = jsonValue;
    } else {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
        );

        const fetchedTodo: unknown = await res.json();
        if (!isTodo(fetchedTodo)) {
            throw new Error("Invalid todo response from API");
        }

        todo = fetchedTodo;

        await kv.put(id, JSON.stringify(todo), { expirationTtl: 60 * 2 });
    }

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold">Todo Details {id}</h1>
            <h2 className="text-2xl font-semibold">Title: {todo.title}</h2>

            <h2 className="text-2xl font-semibold">Status</h2>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            <DeleteCachedButton id={id} />
        </div>
    );
}
