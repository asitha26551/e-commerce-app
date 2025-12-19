// Toast component placeholder
// Toast.jsx
import React, { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export function Toast({ id, type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 3000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className={`
        flex items-center p-4 rounded-lg shadow-lg mb-4 transform transition-all duration-300 translate-x-0
        ${type === 'success' ? 'bg-success text-white' : 'bg-error text-white'}
      `}
    >
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 mr-3" />
      ) : (
        <XCircle className="h-5 w-5 mr-3" />
      )}
      <p className="font-medium text-sm flex-1">{message}</p>
      <button onClick={() => onClose(id)} className="ml-4 hover:opacity-75">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
