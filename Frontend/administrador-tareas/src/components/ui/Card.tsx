interface CardProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export default function Card({ title, description, actions }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
      {actions && <div className="mt-4 flex gap-2">{actions}</div>}
    </div>
  )
}
