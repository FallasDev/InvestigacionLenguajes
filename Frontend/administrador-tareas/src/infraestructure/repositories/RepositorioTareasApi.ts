import Tarea from "@entities/Tarea";
import { RepositorioTareas } from "@repositories/RepositorioTareas";

const API_URL = "http://localhost:5000/api/tareas";

class RepositorioTareasApi implements RepositorioTareas {
    async obtenerTareas(): Promise<Tarea[]> {
        const res = await fetch(`${API_URL}/`);
        if (!res.ok) throw new Error("Error al obtener tareas");
        const data = await res.json();
        data.forEach((t: any) => t.fecha_vencimiento = new Date(t.fecha_vencimiento));
        return data;
    }

    async obtenerTareaPorId(id: number): Promise<Tarea | null> {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.fecha_vencimiento) {
            data.fecha_vencimiento = new Date(data.fecha_vencimiento);
        }
        return data;
    }

    async crearTarea(tarea: Tarea): Promise<Tarea> {
        const res = await fetch(`${API_URL}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarea),
        });
        if (!res.ok) throw new Error("Error al crear tarea");
        return res.json();
    }

    async actualizarTarea(tarea: Tarea): Promise<Tarea> {
        const res = await fetch(`${API_URL}/${tarea.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarea),
        });
        if (!res.ok) throw new Error("Error al actualizar tarea");
        return res.json();
    }

    async eliminarTarea(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar tarea");
    }
}

export default RepositorioTareasApi;