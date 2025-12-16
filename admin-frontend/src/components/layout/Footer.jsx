import React from 'react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AdminDash Inc. All rights
            reserved.
          </p>

          <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
