// src/app/tareas/agregar/page.tsx
import AddTaskForm from "@/app/components/forms/AddTaskForm";

export default function AgregarTareaPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Nueva Tarea</h1>
      <AddTaskForm />
    </main>
  );
}
