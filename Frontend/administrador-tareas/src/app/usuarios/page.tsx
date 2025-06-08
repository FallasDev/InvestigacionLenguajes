"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddUsuarioForm from "@/components/forms/AddUsuarioForm";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  const fetchUsuarios = async () => {
    const res = await fetch("/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    fetchUsuarios();
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    fetchUsuarios();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      {showAddForm ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Agregar Usuario</h2>
          <AddUsuarioForm
            onSuccessAction={handleFormSuccess}
            onCancelAction={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
        >
          ➕ Agregar Usuario
        </button>
      )}
      <table className="min-w-full border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No hay usuarios registrados.
              </td>
            </tr>
          ) : (
            usuarios.map((usuario: any) => (
              <tr key={usuario.id}>
                <td className="border px-4 py-2">{usuario.id}</td>
                <td className="border px-4 py-2">{usuario.nombre}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => router.push(`/usuarios/editar/${usuario.id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}