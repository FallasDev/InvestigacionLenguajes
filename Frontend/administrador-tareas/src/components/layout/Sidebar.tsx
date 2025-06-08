import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-200 h-full p-4 space-y-2">
      <nav>
        {/* <Link href="/" className="block text-gray-800 font-medium hover:underline">
          Inicio
        </Link> */}
        <Link href="/tasks" className="block text-gray-800 font-medium hover:underline">
          Tareas
        </Link>
        <Link href="/usuarios" className="block text-gray-800 font-medium hover:underline">
          Usuarios
        </Link>
      </nav>
    </aside>
  )
}
