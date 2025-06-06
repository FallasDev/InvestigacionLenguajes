import { RepositorioTareas } from "@repositories/RepositorioTareas";

import Tarea from "@entities/Tarea";

class TareaUseCases {
    private repositorioTareas: RepositorioTareas;

    constructor(repositorioTareas: RepositorioTareas) {
        this.repositorioTareas = repositorioTareas;
    }

    async obtenerTareas(): Promise<Tarea[]> {
        return await this.repositorioTareas.obtenerTareas();
    }

    async obtenerTareaPorId(id: number): Promise<Tarea | null> {
        return await this.repositorioTareas.obtenerTareaPorId(id);
    }

    async crearTarea(tarea: Tarea): Promise<Tarea> {
        return await this.repositorioTareas.crearTarea(tarea);
    }

    async actualizarTarea(tarea: Tarea): Promise<Tarea> {
        return await this.repositorioTareas.actualizarTarea(tarea);
    }

    async eliminarTarea(id: number): Promise<void> {
        await this.repositorioTareas.eliminarTarea(id);
    }
}

export default TareaUseCases;