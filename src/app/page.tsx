import { TODO } from "@/types";
import Link from "next/link";

export default async function Home() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: TODO[] = await res.json();

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold">Hello worker!</h1>
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
        </div>
    );
}
