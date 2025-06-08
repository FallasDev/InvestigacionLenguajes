'use client'
import { useEffect, useState } from "react"
import Input from "./Input"
import Button from "../ui/Button"
import Tarea from "@/domain/entities/Tarea"
import Usuario from "@/domain/entities/Usuario"
import TareaUseCases from "@/useCases/TareaUseCases"
import UsuarioUseCases from "@/useCases/UsuarioUseCases"
import RepositorioTareasApi from "@/infraestructure/repositories/RepositorioTareasApi"
import RepositorioUsuariosApi from "@/infraestructure/repositories/RepositorioUsuarioApi"

const tareaUseCases = new TareaUseCases(new RepositorioTareasApi())
const usuarioUseCases = new UsuarioUseCases(new RepositorioUsuariosApi())

export default function AddTaskForm() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_vencimiento: "",
    estado: "pendiente",
    prioridad: "media",
    lugar: "",
    cantidad_horas: 1,
    completada: false,
    usuario_id: 0,
    imagen: null as File | null,
  })

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await usuarioUseCases.obtenerUsuarios()
      setUsuarios(data)
    }
    fetchUsuarios()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked })
    } else if (type === "file") {
      setForm({ ...form, imagen: files[0] })
    } else {
      setForm({ ...form, [name]: type === "number" ? Number(value) : value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Subir imagen al servidor
    let imagenRuta = ""
    if (form.imagen) {
      const data = new FormData()
      data.append("imagen", form.imagen)
      const res = await fetch("/api/upload", { method: "POST", body: data })
      const result = await res.json()
      imagenRuta = result.ruta
    }

    const nuevaTarea: Tarea = {
      ...form,
      fecha_vencimiento: new Date(form.fecha_vencimiento),
      imagen: imagenRuta,
      id: 0, // ID temporal
    }

    await tareaUseCases.crearTarea(nuevaTarea)
    alert("Tarea creada con éxito")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
      <Input label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} />
      <Input label="Fecha de vencimiento" name="fecha_vencimiento" type="date" value={form.fecha_vencimiento} onChange={handleChange} />
      <select name="estado" value={form.estado} onChange={handleChange} className="border rounded px-3 py-2 w-full">
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En proceso</option>
        <option value="completada">Completada</option>
      </select>
      <select name="prioridad" value={form.prioridad} onChange={handleChange} className="border rounded px-3 py-2 w-full">
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <Input label="Lugar" name="lugar" value={form.lugar} onChange={handleChange} />
      <Input label="Cantidad de horas" name="cantidad_horas" type="number" value={form.cantidad_horas} onChange={handleChange} />
      <div>
        <label className="block mb-1">Usuario responsable</label>
        <select name="usuario_id" value={form.usuario_id} onChange={handleChange} className="border rounded px-3 py-2 w-full">
          <option value="">Seleccione un usuario</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Imagen</label>
        <input type="file" name="imagen" onChange={handleChange} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="completada" checked={form.completada} onChange={handleChange} />
        <label>¿Está lista?</label>
      </div>
      <Button type="submit">Crear tarea</Button>
    </form>
  )
}
