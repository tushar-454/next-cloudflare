import Link from "next/link";

export default function Header() {
    return (
        <header className="space-y-6 mb-10">
            <h1 className="text-4xl font-bold">Hello worker!</h1>
            <ul className="flex items-center gap-5">
                <li className="underline">
                    <Link href="/">Home</Link>
                </li>
                <li className="underline">
                    <Link href="/images">Images</Link>
                </li>
                <li className="underline">
                    <Link href="/customers">Customers</Link>
                </li>
            </ul>
        </header>
    );
}
