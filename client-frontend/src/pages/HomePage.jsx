// HomePage.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Clock
} from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/product/ProductCard'
import { CategoryCard } from '../components/category/CategoryCard'
import { Button } from '../components/ui/Button'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '/api',
})

export function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/api/product'),
          api.get('/api/categories'),
        ])

        const productsArr = Array.isArray(productsRes.data.products)
          ? productsRes.data.products
          : []

        setProducts(
          productsArr.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category: p.categoryId?.name || '',
            images: p.images?.map(img => img.imageUrl) || [],
            rating: 4.5,
            description: p.description || '',
          }))
        )

        const categoriesArr = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : []

        setCategories(
          categoriesArr.map(c => ({
            id: c._id,
            name: c.name,
            image:
              c.image ||
              'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=500',
            productCount: c.subcategories?.length || 0,
          }))
        )
      } catch (err) {
        console.error('Home page fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Loading...
        </div>
        <Footer />
      </div>
    )
  }

  const featuredProducts = products.slice(0, 4)
  const bestSellers = products.slice(4, 8)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-primary text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold mb-6">
            Discover the Best <span className="text-cta">Deals Online</span>
          </h1>
          <p className="text-lg mb-8 max-w-xl">
            Shop premium products with fast delivery and secure payments.
          </p>
          <Link to="/products">
            <Button size="lg" variant="cta">
              Shop Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Fast Delivery', desc: 'Quick & reliable shipping' },
            { icon: Shield, title: 'Secure Payments', desc: '100% protected' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day returns' },
            { icon: Clock, title: '24/7 Support', desc: 'Always here to help' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="text-primary" />
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link to="/products" className="text-accent text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.length === 0 ? (
              <div className="col-span-full text-gray-400 text-center py-6">
                No categories found.
              </div>
            ) : (
              categories.slice(0, 12).map(c => (
                <div key={c.id} className="bg-white rounded-lg shadow-sm flex flex-col items-center p-2 sm:p-3 hover:shadow-md transition-all cursor-pointer">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-12 h-12 object-cover rounded mb-2 border"
                  />
                  <span className="text-xs font-medium text-gray-700 text-center line-clamp-2">{c.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length === 0 ? (
              <div className="col-span-full text-gray-400 text-center py-8">
                No featured products found.
              </div>
            ) : (
              featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.length === 0 ? (
              <div className="col-span-full text-gray-400 text-center py-8">
                No best sellers found.
              </div>
            ) : (
              bestSellers.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Trusted by thousands, we deliver quality products with unmatched service.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold text-primary">10k+</p>
            <p>Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">500+</p>
            <p>Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">99%</p>
            <p>Satisfaction</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Amazing quality and fast delivery!',
              'Excellent support and great products.',
              'Best online shopping experience!',
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded shadow">
                <p className="mb-4">“{t}”</p>
                <p className="font-semibold">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
        <Link to="/products">
          <Button size="lg" variant="cta">
            Browse Products
          </Button>
        </Link>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe for exclusive offers.
        </p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-3 rounded-md w-64"
          />
          <Button>Subscribe</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
