import React, { forwardRef } from 'react'

export const Input = forwardRef(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9)

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-text-secondary mb-1 tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full rounded-md border border-border bg-background text-text shadow-sm
              focus:border-primary focus:ring-primary sm:text-sm p-2
              disabled:bg-surface/60 disabled:text-text-secondary
              ${
                error
                  ? 'border-error focus:border-error focus:ring-error'
                  : ''
              }
              ${className}
            `}
            {...props}
          />
        </div>

        {error && <p className="mt-1 text-xs text-error">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-xs text-text-secondary">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
