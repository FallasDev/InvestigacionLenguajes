"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddUsuarioFormProps {
  onSuccessAction: () => void;
  onCancelAction: () => void;
}

export default function AddUsuarioForm({ onSuccessAction, onCancelAction }: AddUsuarioFormProps) {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoUsuario = { nombre };
    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!response.ok) throw new Error("Error al crear usuario");
      onSuccessAction();
    } catch (error) {
      alert("Error al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="border px-3 py-2 w-full"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Usuario
        </button>
        <button
          type="button"
          onClick={onCancelAction}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
