"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_vencimiento: string;
  estado: string;
  prioridad: string;
  lugar: string;
  cantidad_horas: number;
  imagen?: string;
  completada?: boolean;
  usuario_id: number;
}

interface Usuario {
  id: number;
  nombre: string;
}

export default function EditTaskForm({ id }: { id: number }) {
  const router = useRouter();

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    // Obtener tarea por ID
    const fetchTarea = async () => {
      const res = await fetch(`/api/tareas/${id}`);
      const data = await res.json();
      setTarea(data);
    };

    // Obtener usuarios
    const fetchUsuarios = async () => {
      const res = await fetch("/api/usuarios");
      const data = await res.json();
      setUsuarios(data);
    };

    fetchTarea();
    fetchUsuarios();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (tarea) {
      setTarea({ ...tarea, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tareas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea),
      });

      if (!res.ok) throw new Error("Error actualizando tarea");

      alert("Tarea actualizada");
      router.push("/tareas");
    } catch (err) {
      alert("Hubo un error al actualizar");
      console.error(err);
    }
  };

  if (!tarea) return <p>Cargando tarea...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="titulo"
        value={tarea.titulo}
        onChange={handleChange}
        placeholder="Título"
        className="border px-3 py-2 w-full"
        required
      />
      <textarea
        name="descripcion"
        value={tarea.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="border px-3 py-2 w-full"
        required
      />
      <input
        type="date"
        name="fecha_vencimiento"
        value={tarea.fecha_vencimiento.split("T")[0]}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
        required
      />
      <select
        name="estado"
        value={tarea.estado}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
      >
        <option value="pendiente">Pendiente</option>
        <option value="en-progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      <select
        name="prioridad"
        value={tarea.prioridad}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <input
        type="text"
        name="lugar"
        value={tarea.lugar}
        onChange={handleChange}
        placeholder="Lugar"
        className="border px-3 py-2 w-full"
      />
      <input
        type="number"
        name="cantidad_horas"
        value={tarea.cantidad_horas}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
        required
      />
      <select
        name="usuario_id"
        value={tarea.usuario_id}
        onChange={handleChange}
        className="border px-3 py-2 w-full"
      >
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.nombre}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
