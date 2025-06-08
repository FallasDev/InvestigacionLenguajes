"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarUsuarioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      const res = await fetch(`/api/usuarios/${id}`);
      if (res.ok) {
        const usuario = await res.json();
        setNombre(usuario.nombre);
      }
      setLoading(false);
    };
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    router.push("/usuarios");
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={() => router.push("/usuarios")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 ml-2"
        >
          Cancelar
        </button>
      </form>
    </main>
  );
}