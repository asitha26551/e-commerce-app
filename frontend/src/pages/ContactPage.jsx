import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form className="space-y-6">
            <Input label="Name" placeholder="Your name" required />
            <Input label="Email" type="email" placeholder="your@email.com" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                className="w-full rounded-md border border-gray-300 p-2 focus:border-accent focus:ring-accent"
                rows={5}
                placeholder="How can we help?"
                required
              />
            </div>
            <Button type="submit" variant="primary" fullWidth>Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
