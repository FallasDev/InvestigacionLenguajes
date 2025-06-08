import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">
          Gestor de Tareas en Next.js
        </h1>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/tareas"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Gestionar Tareas
          </Link>
          <Link
            href="/usuarios"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
          >
            Gestionar Usuarios
          </Link>
        </div>
      </div>
    </div>
  );
}
