import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Settings,
} from 'lucide-react'
import { Button } from '../ui/Button'

export function Navbar() {
  const cartCount = 0
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false)
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white hover:text-gray-200 transition-colors"
            >
              Market<span className="text-cta">Place</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full bg-white text-text rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/about"
              className="text-sm font-medium hover:text-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-gray-200 transition-colors"
            >
              Contact
            </Link>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center hover:text-gray-200 transition-colors focus:outline-none"
              >
                <User className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Account</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100 animate-fade-in">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3 text-gray-400" />
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="h-4 w-4 mr-3 text-gray-400" />
                    My Orders
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Admin Panel</span>
                    <span className="ml-auto text-xs bg-cta text-white px-2 py-0.5 rounded">
                      Temp
                    </span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-error hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/wishlist"
              className="flex items-center hover:text-gray-200 transition-colors"
            >
              <Heart className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center hover:text-gray-200 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 pb-4 px-4">
          <form onSubmit={handleSearch} className="pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white text-text rounded-md py-2 pl-4 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-3 mt-2">
            <Link
              to="/products"
              className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/about"
              className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-blue-800 my-2"></div>
            <Link
              to="/profile"
              className="flex items-center text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 mr-2" />
              My Account
            </Link>
            <Link
              to="/orders"
              className="flex items-center text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="h-5 w-5 mr-2" />
              My Orders
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </Link>
            <div className="border-t border-blue-800 my-2"></div>
            <Link
              to="/admin"
              className="flex items-center text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Admin Panel</span>
              <span className="ml-auto text-xs bg-cta px-2 py-0.5 rounded">
                Temp
              </span>
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setIsMenuOpen(false)
              }}
              className="flex items-center text-white hover:bg-red-900 px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
