import EditTaskForm from "@/app/components/forms/editTaskForm";

interface Props {
  params: { id: string };
}

export default function EditarTareaPage({ params }: Props) {
  const id = parseInt(params.id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Tarea</h1>
      <EditTaskForm id={id} />
    </main>
  );
}
