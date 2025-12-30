// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface text-text-secondary pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-display font-bold mb-6 gradient-text">
              GAMEZONE
            </h3>
            <p className="text-sm mb-6 leading-relaxed">
              Level up your setup with premium gaming gear. High-performance
              peripherals, components, and accessories for the ultimate gaming
              experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-background p-2 rounded-full hover:text-primary hover:shadow-neon-purple transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background p-2 rounded-full hover:text-accent hover:shadow-neon-cyan transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background p-2 rounded-full hover:text-error hover:shadow-neon-purple transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-background p-2 rounded-full hover:text-error hover:shadow-neon-purple transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-display font-bold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary hover:pl-2 transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary hover:pl-2 transition-all"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary hover:pl-2 transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary hover:pl-2 transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary hover:pl-2 transition-all"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-display font-bold mb-6">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-accent hover:pl-2 transition-all"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-accent hover:pl-2 transition-all"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-accent hover:pl-2 transition-all"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-accent hover:pl-2 transition-all"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-accent hover:pl-2 transition-all"
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-display font-bold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-primary group-hover:text-accent transition-colors" />
                <span>123 Gaming Street, Tech District, CA 90210</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-primary group-hover:text-accent transition-colors" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-primary group-hover:text-accent transition-colors" />
                <span>support@gamezone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GameZone. All rights reserved. GG
            WP.
          </p>
        </div>
      </div>
    </footer>
  )
}
