// Loader component placeholder
// Loader.jsx
import React from 'react'
import { Loader2 } from 'lucide-react'

export function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-accent`} />
    </div>
  )
}
