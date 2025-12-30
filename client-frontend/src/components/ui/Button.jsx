// Button.jsx
import React from 'react'
import { Loader2 } from 'lucide-react'

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/80 shadow-neon-purple/40',
    accent:
      'bg-accent text-white hover:bg-accent/80 shadow-neon-purple/40',
    cta: 'bg-cta text-white hover:bg-cta/80 shadow-neon-purple/40',
    secondary:
      'bg-surface text-text-secondary border border-border hover:bg-background',
    outline:
      'border border-border bg-transparent hover:bg-background text-text-secondary',
    ghost:
      'bg-transparent hover:bg-surface/60 text-text-secondary',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
