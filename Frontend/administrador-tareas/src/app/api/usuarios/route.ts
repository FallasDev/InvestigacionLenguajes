import { NextResponse } from "next/server";
import RepositorioUsuarioApi from "@/infraestructure/repositories/RepositorioUsuarioApi";
import UsuarioUseCases from "@/useCases/UsuarioUseCases";


const usuarioRepo = new RepositorioUsuarioApi();
const usuarioUseCases = new UsuarioUseCases(usuarioRepo);

export async function GET() {
  const usuarios = await usuarioUseCases.obtenerUsuarios();
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  const usuario = await req.json();
  const nuevoUsuario = await usuarioUseCases.crearUsuario(usuario);
  return NextResponse.json(nuevoUsuario);
}