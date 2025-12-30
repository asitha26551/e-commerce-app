import React from 'react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} GAMEZONE Admin. All rights reserved.
          </p>

          <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
