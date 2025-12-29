// Select component placeholder
// Select.jsx
import React from 'react'
import { ChevronDown } from 'lucide-react'

export function Select({
  label,
  options,
  error,
  className = '',
  fullWidth = true,
  id,
  ...props
}) {
  const selectId = id || props.name || Math.random().toString(36).substr(2, 9)

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-text-secondary mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`
            block w-full rounded-md border border-border bg-surface text-text shadow-sm appearance-none
            focus:border-accent focus:ring-accent sm:text-sm p-2 pr-10
            disabled:bg-background disabled:text-text-secondary
            ${error ? 'border-error focus:border-error focus:ring-error' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}
