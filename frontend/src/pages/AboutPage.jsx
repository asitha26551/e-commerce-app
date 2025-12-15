import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-4">
            Welcome to our e-commerce platform. We're dedicated to providing the best shopping experience.
          </p>
          <p className="text-gray-600">
            Our mission is to bring quality products to customers worldwide with exceptional service and competitive prices.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
