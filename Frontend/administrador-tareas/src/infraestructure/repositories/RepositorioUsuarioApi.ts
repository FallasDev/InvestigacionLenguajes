import Usuario from "@entities/Usuario";
import { RepositorioUsuarios } from "@repositories/RepositorioUsuarios";

const API_URL = "http://localhost:5000/api/usuarios";

class RepositorioUsuarioApi implements RepositorioUsuarios {
    async obtenerUsuarios(): Promise<Usuario[]> {
        const res = await fetch(`${API_URL}/`);
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
    }

    async obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) return null;
        return res.json();
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
        const res = await fetch(`${API_URL}/crear`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });
        if (!res.ok) throw new Error("Error al crear usuario");
    
        return usuario;
    }

    async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
        const res = await fetch(`${API_URL}/editar/${usuario.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });
        if (!res.ok) throw new Error("Error al actualizar usuario");

        return usuario;
    }

    async eliminarUsuario(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/eliminar/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
    }
}

export default RepositorioUsuarioApi;