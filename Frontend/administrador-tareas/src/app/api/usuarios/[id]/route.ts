import { NextResponse } from "next/server";
import RepositorioUsuarioApi from "@/infraestructure/repositories/RepositorioUsuarioApi";
import UsuarioUseCases from "@/useCases/UsuarioUseCases";

const usuarioRepo = new RepositorioUsuarioApi();
const usuarioUseCases = new UsuarioUseCases(usuarioRepo);

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const usuario = await usuarioUseCases.obtenerUsuarioPorId(Number(params.id));
  return NextResponse.json(usuario);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const usuario = await request.json();
  usuario.id = Number(params.id);
  const usuarioActualizado = await usuarioUseCases.actualizarUsuario(usuario);
  return NextResponse.json(usuarioActualizado);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await usuarioUseCases.eliminarUsuario(Number(params.id));
  return NextResponse.json({ mensaje: "Usuario eliminado" });
}