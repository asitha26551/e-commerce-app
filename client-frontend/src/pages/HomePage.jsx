// HomePage.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Clock,
  Zap,
  Cpu,
  Gamepad2,
} from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/product/ProductCard'
import { CategoryCard } from '../components/category/CategoryCard'
import { Button } from '../components/ui/Button'
import api from '../services/api'

export function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, bestSellersRes] = await Promise.all([
          api.get('/product'),
          api.get('/categories'),
          api.get('/product/bestsellers'),
        ])

        const productsArr = Array.isArray(productsRes.data.products)
          ? productsRes.data.products
          : []

        setProducts(
          productsArr.map((p) => ({
            id: p._id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category: p.categoryId?.name || '',
            images: p.images?.map((img) => img.imageUrl) || [],
            rating: 4.5,
            description: p.description || '',
          }))
        )

        const categoriesArr = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : []

        setCategories(
          categoriesArr.map((c) => ({
            id: c._id,
            name: c.name,
            image:
              c.image ||
              'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=500',
            itemCount: c.subcategories?.length || 0,
          }))
        )

        const bestSellersArr = Array.isArray(bestSellersRes.data.products)
          ? bestSellersRes.data.products
          : []

        setBestSellers(
          bestSellersArr.map((p) => ({
            id: p._id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category: p.categoryId?.name || '',
            images: p.images?.map((img) => img.imageUrl) || [],
            rating: 4.5,
            description: p.description || '',
          }))
        )
      } catch (err) {
        // console.error('Home page fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-text">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Loading...
        </div>
        <Footer />
      </div>
    )
  }

  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background text-text selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-background overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
          <div className="absolute inset-0 scan-lines"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 mb-4 border border-accent/50 rounded-full bg-accent/10 backdrop-blur-sm">
                <span className="text-accent font-bold tracking-wider text-sm uppercase">
                  Next Gen Gaming Gear
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight text-white">
                LEVEL UP YOUR <br />
                <span className="gradient-text text-shadow-glow">
                  BATTLE STATION
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Dominate the competition with high-performance peripherals.
                Precision engineered for the ultimate gaming experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" variant="cta" className="w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-surface border-y border-border relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-center space-x-4 group">
                <div className="bg-background p-3 rounded-lg border border-border group-hover:border-primary group-hover:shadow-neon-purple transition-all">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white group-hover:text-primary transition-colors">
                    Fast Shipping
                  </h3>
                  <p className="text-sm text-gray-400">
                    Overnight delivery available
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="bg-background p-3 rounded-lg border border-border group-hover:border-success group-hover:shadow-neon-lime transition-all">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white group-hover:text-success transition-colors">
                    Secure Checkout
                  </h3>
                  <p className="text-sm text-gray-400">256-bit encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="bg-background p-3 rounded-lg border border-border group-hover:border-cta group-hover:shadow-neon-lime transition-all">
                  <RefreshCw className="h-6 w-6 text-cta" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white group-hover:text-cta transition-colors">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-gray-400">30-day money back</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="bg-background p-3 rounded-lg border border-border group-hover:border-accent group-hover:shadow-neon-cyan transition-all">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white group-hover:text-accent transition-colors">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-gray-400">Expert gamers online</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-background relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  Shop by <span className="text-primary">Category</span>
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>
              <Link
                to="/products"
                className="text-accent font-bold hover:text-white flex items-center transition-colors"
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
        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Featured <span className="text-accent">Gear</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Top-rated equipment chosen by pro players and streamers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner (commented out)
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface rounded-2xl overflow-hidden relative border border-border shadow-neon-purple group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>

              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center md:text-left max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-cta font-bold mb-4">
                  <Cpu className="h-5 w-5" />
                  <span>LIMITED TIME OFFER</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
                  UPGRADE YOUR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    PERFORMANCE
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get up to 50% off on selected gaming peripherals. Don't let
                  your gear hold you back.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="cta" size="lg">
                    Shop the Sale
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Best Sellers */}
        <section className="py-20 bg-background relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 mb-10">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Best <span className="text-cta">Sellers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((product) => (
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
