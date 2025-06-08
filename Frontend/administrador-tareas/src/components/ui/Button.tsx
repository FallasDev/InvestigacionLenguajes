// src/components/ui/Button.tsx

'use client' 

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const base = 'px-4 py-2 rounded font-semibold transition text-white'
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    danger: 'bg-red-600 hover:bg-red-700'
  }

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}

export default Button
