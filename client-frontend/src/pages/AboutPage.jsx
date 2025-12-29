import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Users, Heart, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Trust & Security',
      description:
        'We prioritize your safety with secure payments and data protection.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of every decision we make.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description:
        'Constantly pushing boundaries to improve your shopping experience.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a vibrant community of buyers and sellers.',
    },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/office/2000/1000')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reimagining Commerce
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
              We're on a mission to connect people through commerce, making it
              easier than ever to find what you love.
            </p>
            <Link to="/contact">
              <Button variant="cta" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://picsum.photos/seed/story/800/600"
                  alt="Our Story"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2020, MarketPlace began with a simple idea:
                    shopping online should be as personal and engaging as
                    visiting your favorite local store.
                  </p>
                  <p>
                    What started as a small team in a garage has grown into a
                    global platform connecting millions of buyers and sellers.
                    We've weathered challenges, celebrated milestones, and
                    stayed true to our core belief that technology should serve
                    people, not the other way around.
                  </p>
                  <p>
                    Today, we continue to innovate, driven by the feedback of
                    our community and the passion of our diverse team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from product
                development to customer support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary mb-6">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you're looking to buy, sell, or join our team, there's a
              place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="cta" size="lg">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
