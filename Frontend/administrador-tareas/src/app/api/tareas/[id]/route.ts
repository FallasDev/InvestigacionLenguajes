import { NextResponse } from "next/server";
import RepositorioTareasApi from "@/infraestructure/repositories/RepositorioTareasApi";
import TareaUseCases from "@/useCases/TareaUseCases";

const tareaRepo = new RepositorioTareasApi();
const tareaUseCases = new TareaUseCases(tareaRepo);

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = await context;
  const tarea = await tareaUseCases.obtenerTareaPorId(Number(params.id));
  if (!tarea) {
    return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
  }
  return NextResponse.json(tarea);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = await context;
  const tarea = await request.json();
  tarea.id = Number(params.id);
  const tareaActualizada = await tareaUseCases.actualizarTarea(tarea);
  return NextResponse.json(tareaActualizada);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = await context;
  await tareaUseCases.eliminarTarea(Number(params.id));
  return NextResponse.json({ success: true });
}