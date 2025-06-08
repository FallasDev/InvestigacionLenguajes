// src/components/ui/TaskCard.tsx
import Tarea from "@/domain/entities/Tarea";

interface TaskCardProps {
  tarea: Tarea;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ tarea, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-700">{tarea.titulo}</h3>
      <p className="text-gray-600 text-sm">{tarea.descripcion}</p>
      <div className="mt-2 text-sm text-gray-500">
        📍 {tarea.lugar} | 🕒 {tarea.cantidad_horas} hrs | 📅 {new Date(tarea.fecha_vencimiento).toLocaleDateString()}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onEdit} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Editar</button>
        <button onClick={onDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
      </div>
    </div>
  );
}
