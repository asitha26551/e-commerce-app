// CartSummary.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useCart } from '../../context/CartContext'

export function CartSummary() {
  const { cartTotal } = useCart()
  const shipping = cartTotal > 50 ? 0 : 10
  const total = cartTotal + shipping

  return (
    <div className="bg-surface rounded-lg p-6 h-fit lg:sticky lg:top-24 border border-border shadow-neon-purple/20">
      <h2 className="text-lg font-display font-bold text-white mb-4 border-b border-border pb-4">
        ORDER SUMMARY
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Subtotal</span>
          <span className="text-white font-mono">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Shipping</span>
          <span
            className={`font-mono ${shipping === 0 ? 'text-success' : 'text-white'}`}
          >
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {/* Tax Estimate removed */}

        <div className="border-t border-border pt-4 flex justify-between text-base font-bold text-white">
          <span className="font-display">TOTAL</span>
          <span className="text-success font-mono text-shadow-glow">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/checkout">
          <Button
            variant="cta"
            fullWidth
            size="lg"
            className="flex items-center justify-center"
          >
            Checkout <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <div className="mt-4 text-center">
          <Link
            to="/products"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            or Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
