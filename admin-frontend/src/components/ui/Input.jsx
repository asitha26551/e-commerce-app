import React, { forwardRef } from 'react'

export const Input = forwardRef(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9)

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border
              disabled:bg-gray-50 disabled:text-gray-500
              ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : ''
              }
              ${className}
            `}
            {...props}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
