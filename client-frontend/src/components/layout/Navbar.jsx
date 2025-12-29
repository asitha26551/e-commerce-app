// Navbar.jsx
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Settings,
} from 'lucide-react'
import { useCart } from '../../context/CartContext'

export function Navbar() {
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  // Watch for token changes (login/logout in other tabs)
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('token'))
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsUserMenuOpen(false)
    setIsAuthenticated(false)
    navigate('/login')
  }

  // Close dropdown when clicking outside
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
    <nav className="bg-surface/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-display font-black tracking-wider text-white hover:text-primary transition-colors group"
            >
              GAME
              <span className="text-cta group-hover:text-shadow-glow transition-all">
                ZONE
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search gear..."
                className="w-full bg-background text-white border border-border rounded-md py-2 pl-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-500 group-hover:border-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/about"
              className="text-sm font-display font-medium text-gray-300 hover:text-primary hover:text-shadow-glow transition-all"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-display font-medium text-gray-300 hover:text-primary hover:text-shadow-glow transition-all"
            >
              Contact
            </Link>

            {/* User Dropdown Menu or Sign In */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none group"
                >
                  <User className="h-5 w-5 mr-1 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-display font-medium">
                    Account
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-md shadow-neon-purple py-1 animate-fade-in z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-background hover:text-primary transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-background hover:text-primary transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-3" />
                      My Orders
                    </Link>
                    <div className="border-t border-border my-1"></div>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-error hover:bg-background transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none group"
              >
                <User className="h-5 w-5 mr-1 group-hover:text-primary transition-colors" />
                <span className="text-sm font-display font-medium">Sign In</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center text-gray-300 hover:text-white transition-colors relative group"
            >
              <ShoppingCart className="h-5 w-5 mr-1 group-hover:text-cta transition-colors" />
              <span className="text-sm font-display font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cta text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-neon-lime">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart className="h-6 w-6 text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cta text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-surface focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border pb-4 px-4">
          <form onSubmit={handleSearch} className="pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gear..."
                className="w-full bg-background text-white border border-border rounded-md py-2 pl-4 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-400"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-3 mt-2">
            <Link
              to="/products"
              className="text-gray-300 hover:text-primary hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-primary hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-primary hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-border my-2"></div>
            <Link
              to="/profile"
              className="flex items-center text-gray-300 hover:text-primary hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 mr-2" />
              My Account
            </Link>
            <Link
              to="/orders"
              className="flex items-center text-gray-300 hover:text-primary hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="h-5 w-5 mr-2" />
              My Orders
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setIsMenuOpen(false)
              }}
              className="flex items-center text-error hover:bg-background px-3 py-2 rounded-md text-base font-display font-medium w-full text-left"
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
