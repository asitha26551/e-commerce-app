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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-display font-bold mb-4 gradient-text">
              GearRealm
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              Premium gear for players who want performance and style.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-display font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-display font-bold mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>support@gearrealm.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GearRealm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
