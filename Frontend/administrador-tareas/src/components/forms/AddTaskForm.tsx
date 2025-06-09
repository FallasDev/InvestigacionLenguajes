'use client'
import React, { useEffect, useState } from "react"
import Input from "./Input"
import Button from "../ui/Button"
import Usuario from "@/domain/entities/Usuario"


interface AddTaskFormProps {
  onSuccessAction: () => void;
  onCancelAction: () => void;
  initialData?: any; 
}

export default function AddTaskForm({
  onSuccessAction,
  onCancelAction,
  initialData,
}: AddTaskFormProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [form, setForm] = useState(
    initialData || {
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
    }
  );

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await fetch("/api/usuarios");
      const data = await res.json();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, [])

  useEffect(() => {

    if (initialData) {
      setForm({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        fecha_vencimiento: new Date(initialData.fecha_vencimiento).toISOString().split('T')[0], // Formatear a YYYY-MM-DD
        estado: initialData.estado || "pendiente",
        prioridad: initialData.prioridad || "media",
        lugar: initialData.lugar || "",
        cantidad_horas: initialData.cantidad_horas || 1,
        completada: initialData.completada || false,
        usuario_id: initialData.usuario_id || 0,
        imagen: null, // No se puede prellenar un archivo
      });
    }
  }, [initialData]);

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
    e.preventDefault();

    if (initialData && initialData.id) {
      // Modo edición: PUT
      await fetch(`/api/tareas/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Modo creación: POST
      await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    onSuccessAction();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
      <Input label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} />
      <Input label="Fecha de vencimiento" name="fecha_vencimiento" type="date" value={form.fecha_vencimiento} onChange={handleChange} />
      <label className="block mb-1 text-neutral-700">Estado</label>
      <select name="estado" value={form.estado} onChange={handleChange} className="border text-neutral-700 rounded px-3 py-2 w-full">
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En proceso</option>
        <option value="completada">Completada</option>
      </select>
      <label className="block mb-1 text-neutral-700">Prioridad</label>
      <select name="prioridad" value={form.prioridad} onChange={handleChange} className="border text-neutral-700 rounded px-3 py-2 w-full">
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <Input label="Lugar" name="lugar" value={form.lugar} onChange={handleChange} />
      <Input label="Cantidad de horas" name="cantidad_horas" type="number" value={form.cantidad_horas} onChange={handleChange} />
      <div>
        <label className="block mb-1 text-neutral-700">Usuario responsable</label>
        <select name="usuario_id" required value={form.usuario_id} onChange={handleChange} className="border text-neutral-500 rounded px-3 py-2 w-full">
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
      <div className="flex gap-2">
        <Button type="submit">
          {initialData && initialData.id ? "Guardar tarea" : "Crear tarea"}
        </Button>
        <Button type="button" onClick={onCancelAction} variant="secondary">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
