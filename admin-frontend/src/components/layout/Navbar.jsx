import React from 'react'
import { Bell, Menu, User } from 'lucide-react'
import { Button } from '../ui/Button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2 lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex flex-shrink-0 items-center">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <span className="hidden text-xl font-bold text-gray-900 sm:block">
                AdminDash
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 transition-colors hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="mx-2 h-8 w-px bg-gray-200" />

            <div className="flex items-center space-x-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-gray-900">
                  Jane Admin
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
