interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export default function Input({ label, name, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        {...props}
      />
    </div>
  )
}
