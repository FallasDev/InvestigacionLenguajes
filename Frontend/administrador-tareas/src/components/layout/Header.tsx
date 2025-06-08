import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Administrador</h1>
      <nav className="space-x-4">
        <Link href="/tareas" className="hover:underline">
          Tareas
        </Link>
        <Link href="/usuarios" className="hover:underline">
          Usuarios
        </Link>
      </nav>
    </header>
  );
}
