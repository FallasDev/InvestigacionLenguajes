import { NextResponse } from "next/server";
import RepositorioTareasApi from "@/infraestructure/repositories/RepositorioTareasApi";
import TareaUseCases from "@/useCases/TareaUseCases";

const tareaRepo = new RepositorioTareasApi();
const tareaUseCases = new TareaUseCases(tareaRepo);

export async function GET() {
  const tareas = await tareaUseCases.obtenerTareas();
  return NextResponse.json(tareas);
}

export async function POST(req: Request) {
  const tarea = await req.json();
  const nuevaTarea = await tareaUseCases.crearTarea(tarea);
  return NextResponse.json(nuevaTarea);
}