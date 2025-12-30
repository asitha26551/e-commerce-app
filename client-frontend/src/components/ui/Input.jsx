// Input component placeholder
// Input.jsx
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function Input({
  label,
  error,
  type = 'text',
  className = '',
  fullWidth = true,
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-secondary mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`
            block w-full rounded-md border-border bg-background text-text shadow-sm
            focus:border-accent focus:ring-accent sm:text-sm p-2 border
            disabled:bg-background/40 disabled:text-text-secondary
            ${error ? 'border-error focus:border-error focus:ring-error' : ''}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}
