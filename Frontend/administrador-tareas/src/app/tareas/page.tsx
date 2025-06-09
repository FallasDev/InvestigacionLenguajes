"use client";

import { useEffect, useState } from "react";
import Tarea from "@/domain/entities/Tarea";
import TaskCard from "@/components/ui/TaskCard";
import AddTaskForm from "@/components/forms/AddTaskForm";
import { useRouter } from "next/navigation";

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  const fetchTareas = async () => {
    const res = await fetch("/api/tareas");
    const data = await res.json();
    setTareas(data);
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/tareas/editar/${id}`);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/tareas/${id}`, { method: "DELETE" });
    fetchTareas();
  };

  const handleAddTask = async () => {
    setShowAddForm(true);
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    fetchTareas();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Tareas</h1>
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Agregar Tarea
        </button>
      </div>
      {showAddForm ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Agregar Nueva Tarea</h2>
          <AddTaskForm
            onSuccessAction={handleFormSuccess}
            onCancelAction={() => setShowAddForm(false)}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
}
