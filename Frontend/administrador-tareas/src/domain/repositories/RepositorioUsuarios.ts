import Usuario from "@entities/Usuario"

export interface RepositorioUsuarios {
    obtenerUsuarios(): Promise<Usuario[]>; 
    obtenerUsuarioPorId(id: number): Promise<Usuario | null>; 
    crearUsuario(usuario: Usuario): Promise<Usuario>; 
    actualizarUsuario(usuario: Usuario): Promise<Usuario>; 
    eliminarUsuario(id: number): Promise<void>;
}
