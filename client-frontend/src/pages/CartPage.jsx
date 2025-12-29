import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CartItem } from '../components/cart/CartItem'
import { CartSummary } from '../components/cart/CartSummary'
import { Button } from '../components/ui/Button'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center mb-8">
          <ShoppingBag className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-display font-bold text-white">
            YOUR <span className="text-primary">LOADOUT</span>
          </h1>
        </div>

        {items.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8">
              <div className="bg-surface rounded-lg border border-border shadow-neon-purple/20 overflow-hidden mb-8 lg:mb-0">
                <div className="p-6 divide-y divide-border">
                  {items.map(item => (
                    <CartItem
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-surface rounded-lg shadow-neon-purple/20 border border-border">
            <div className="flex justify-center mb-6">
              <div className="bg-background p-6 rounded-full border border-border">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore
              our products and find something you love!
            </p>
            <Link to="/products">
              <Button variant="cta" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
