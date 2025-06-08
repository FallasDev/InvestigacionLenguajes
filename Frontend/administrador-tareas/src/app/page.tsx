import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/tareas" className="text-blue-600 underline text-lg">
        Ir a gestión de tareas
      </Link>
    </div>
  );
}
