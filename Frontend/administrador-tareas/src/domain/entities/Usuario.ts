import Tarea from "@entities/Tarea";

interface Usuario {
    id: number;
    nombre: string;
    tareas: Tarea[]; // Lista de tareas asociadas al usuario
}

export default Usuario;