import Image from "next/image";

export default function Images() {
    return (
        <div>
            <h1>Images</h1>
            <Image
                src={"/images/background.jpg"}
                alt="Background"
                width={500}
                height={300}
            />
        </div>
    );
}
