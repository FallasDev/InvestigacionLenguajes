import Input from './Input'
import Select from './Select'
import Button from '../ui/Button'

interface TaskFormProps {
  onSubmit: (data: any) => void
  initialData?: {
    title?: string
    description?: string
    assignedTo?: string
  }
  users?: { value: string; label: string }[]
}

export default function TaskForm({ onSubmit, initialData = {}, users = [] }: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Título" name="title" defaultValue={initialData.title} required />
      <Input label="Descripción" name="description" defaultValue={initialData.description} required />
      <Select
        label="Asignado a"
        name="assignedTo"
        options={users}
        defaultValue={initialData.assignedTo}
      />
      <div className="flex justify-end gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" variant="secondary">Volver</Button>
      </div>
    </form>
  )
}
