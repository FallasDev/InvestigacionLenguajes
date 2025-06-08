"use client";

import { useState } from "react";

export default function AddUsuarioForm() {
  const [nombre, setNombre] = useState("");

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

      alert("Usuario creado correctamente");
      setNombre("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre del Usuario</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear Usuario
      </button>
    </form>
  );
}
