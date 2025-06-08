"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddTaskForm from "@/components/forms/AddTaskForm";

type AddTaskFormProps = {
  initialData?: any;
  onSuccessAction: () => void;
  onCancelAction: () => void;
};

export default function EditarTareaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tarea, setTarea] = useState(null);

  useEffect(() => {
    const fetchTarea = async () => {
      const res = await fetch(`/api/tareas/${id}`);
      if (res.ok) {
        setTarea(await res.json());
      } else {
        router.push("/tareas");
      }
    };
    fetchTarea();
  }, [id, router]);

  if (!tarea) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Tarea</h1>
      <AddTaskForm
        initialData={tarea}
        onSuccessAction={() => router.push("/tareas")}
        onCancelAction={() => router.push("/tareas")}
      />
    </div>
  );
}