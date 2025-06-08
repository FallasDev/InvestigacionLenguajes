interface AlertProps {
  type?: 'success' | 'error' | 'info'
  message: string
}

export default function Alert({ type = 'info', message }: AlertProps) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className={`p-3 rounded ${colors[type]} border`}>
      {message}
    </div>
  )
}
