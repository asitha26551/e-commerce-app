// HomePage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RefreshCw, Clock } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/product/ProductCard'
import { CategoryCard } from '../components/category/CategoryCard'
import { Button } from '../components/ui/Button'
import { products, categories } from '../utils/mockData'

export function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover the Best <br />
                <span className="text-cta">Deals Online</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Shop the latest trends in electronics, fashion, home, and more. Fast shipping and secure payments guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" variant="cta" className="w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products?category=electronics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                  >
                    View Electronics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-3 rounded-full text-success">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Secure Payment</h3>
                  <p className="text-sm text-gray-500">100% protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-orange-50 p-3 rounded-full text-cta">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30-day money back</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-50 p-3 rounded-full text-purple-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">24/7 Support</h3>
                  <p className="text-sm text-gray-500">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>
              <Link
                to="/products"
                className="text-accent font-medium hover:text-blue-700 flex items-center"
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
              <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  End of Season Sale
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                  Get up to 50% off on selected items. Limited time offer, don't miss out!
                </p>
                <Button variant="cta" size="lg">
                  Shop the Sale
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Best Sellers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
