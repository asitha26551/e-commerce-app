import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-accent hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" required placeholder="John" />
                <Input label="Last Name" required placeholder="Doe" />
              </div>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                type="password"
                required
                placeholder="••••••••"
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <a href="#" className="text-accent hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <Button type="submit" fullWidth size="lg">
              Create Account
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
