import { TODO } from "@/types";

export default async function TodoDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const todo: TODO = await res.json();

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold">Todo Details {id}</h1>
            <h2 className="text-2xl font-semibold">Title: {todo.title}</h2>

            <h2 className="text-2xl font-semibold">Status</h2>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
        </div>
    );
}
