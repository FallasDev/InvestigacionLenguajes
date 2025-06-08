
"use client";

import { useEffect, useState } from "react";
import Tarea from "@/domain/entities/Tarea";
import TaskCard from "@/app/components/ui/TaskCard";
import RepositorioTareasApi from "@/infraestructure/repositories/RepositorioTareasApi";
import TareaUseCases from "@/useCases/TareaUseCases";
import { useRouter } from "next/navigation";

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const router = useRouter();
  const useCases = new TareaUseCases(new RepositorioTareasApi());

  useEffect(() => {
    useCases.obtenerTareas().then(setTareas);
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/tareas/editar/${id}`);
  };

  const handleDelete = async (id: number) => {
    await useCases.eliminarTarea(id);
    setTareas(await useCases.obtenerTareas());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Tareas</h1>
        <button onClick={() => router.push("/tareas/agregar")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Agregar Tarea
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tareas.map((tarea) => (
          <TaskCard
            key={tarea.id}
            tarea={tarea}
            onEdit={() => handleEdit(tarea.id)}
            onDelete={() => handleDelete(tarea.id)}
          />
        ))}
      </div>
    </div>
  );
}
