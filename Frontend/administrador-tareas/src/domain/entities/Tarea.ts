interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_vencimiento: Date;
    estado: string;
    prioridad: string;
    lugar: string;
    cantidad_horas: number;
    imagen?: string; // Imagen es opcional
    completada?: boolean; // Completada es opcional, por defecto será false
    usuario_id: number; // ID del usuario al que pertenece la tarea
}

export default Tarea;

