import React from 'react'
import { Loader2 } from 'lucide-react'

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none rounded-md'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/80 focus:ring-primary shadow-neon-purple',
    secondary:
      'bg-surface text-text hover:bg-surface/80 focus:ring-accent border border-border',
    outline:
      'border border-border bg-transparent text-text hover:bg-surface/60 focus:ring-primary',
    ghost:
      'text-text-secondary hover:bg-surface/60 hover:text-text focus:ring-border',
    danger:
      'bg-error text-white hover:bg-error/80 focus:ring-error shadow-neon-cyan',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}
