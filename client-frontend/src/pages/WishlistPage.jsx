// WishlistPage placeholder
import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { products } from '../utils/mockData' // Mock wishlist data

export function WishlistPage() {
  // Mock wishlist items
  const wishlistItems = products.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-gray-500">{wishlistItems.length} items</span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row items-center"
                >
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-md border border-gray-200"
                    />
                  </Link>

                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    <div className="mt-2 font-bold text-lg text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-0 flex items-center space-x-4">
                    <Button variant="primary" size="sm" className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                    <button className="p-2 text-gray-400 hover:text-error transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-lg shadow-sm border border-gray-100">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <Link to="/products">
              <Button variant="outline" className="mt-4">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
