import { RepositorioUsuarios } from "@/domain/repositories/RepositorioUsuarios";

import Usuario from "@/domain/entities/Usuario";

class UsuarioUseCases {
    private repositorioUsuarios: RepositorioUsuarios;

    constructor(repositorioUsuarios: RepositorioUsuarios) {
        this.repositorioUsuarios = repositorioUsuarios;
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        return await this.repositorioUsuarios.obtenerUsuarios();
    }

    async obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
        return await this.repositorioUsuarios.obtenerUsuarioPorId(id);
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
        return await this.repositorioUsuarios.crearUsuario(usuario);
    }

    async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
        return await this.repositorioUsuarios.actualizarUsuario(usuario);
    }

    async eliminarUsuario(id: number): Promise<void> {
        await this.repositorioUsuarios.eliminarUsuario(id);
    }
}

export default UsuarioUseCases;