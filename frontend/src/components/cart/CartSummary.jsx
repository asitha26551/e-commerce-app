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
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-24">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping Estimate</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax Estimate</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-bold text-gray-900">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-2 mb-4">
          <Input placeholder="Coupon code" fullWidth className="mb-0" />
          <Button variant="secondary" size="md">
            Apply
          </Button>
        </div>

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
            className="text-sm text-primary hover:text-blue-800 font-medium"
          >
            or Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
