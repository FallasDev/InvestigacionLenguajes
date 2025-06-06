import Tarea from "@entities/Tarea";

export interface RepositorioTareas {
    obtenerTareas(): Promise<Tarea[]>; 
    obtenerTareaPorId(id: number): Promise<Tarea | null>; 
    crearTarea(tarea: Tarea): Promise<Tarea>; 
    actualizarTarea(tarea: Tarea): Promise<Tarea>; 
    eliminarTarea(id: number): Promise<void>; 
}