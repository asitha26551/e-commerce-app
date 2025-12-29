import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: 'spring',
              duration: 0.3,
              bounce: 0,
            }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} transform rounded-xl bg-surface text-text shadow-neon-purple ring-1 ring-border transition-all`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              {title && (
                <h3
                  id="modal-title"
                  className="text-lg font-display font-semibold leading-6 text-white"
                >
                  {title}
                </h3>
              )}

              <button
                type="button"
                className="rounded-md bg-transparent text-text-secondary hover:text-text focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
